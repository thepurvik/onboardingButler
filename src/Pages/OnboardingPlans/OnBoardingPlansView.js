import React, { useMemo, useState, useEffect } from 'react';
import Personal_ifno from '../../components/Personal_ifno';
import Step_5 from './Step_5';
import Step_6 from './Step_6';
import '../../assets/styles/Carousel.css';
import EMployeeImg from '../../assets/images/p1-lg.png';
import { toast } from 'react-toastify';
import { CustomCarousel } from '../../components/CustomCarousel';
import { get_All_Employee_Details } from '../../assets/API/Apis';
import useCustomTheme from '../../hooks/useCustomTheme';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { Change_task_status } from '../../assets/API/Apis';
import Loader from '../../components/Loader';

const IndexTab = 1;
const EndTab = 2;

const OnBoardingPlansView = () => {
  const [step, setStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dataCard, setDataCard] = useState([]);
  const [active, setActive] = useState({ index: 0 });
  const [activeTab, setActiveTab] = useState({ index: 1, borderColor: 'red' });
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [empName, setEmpName] = useState('');
  const [empId, setEmpId] = useState(0);
  const [noteOneOpen, setNoteOneOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [managerName, setManagerName] = useState('');

  const Emplo_Data = async (i = 0) => {
    setLoading(true);
    await get_All_Employee_Details().then((response) => {
      if (response) {
        if (response.data && response.data[0]) {
          setDataCard(response?.data[0]?.onboarding_details);
          setManagerName(response?.data[0]?.full_name);
          setSelectedEmployee(response?.data[0]?.onboarding_details[i]);
          setLoading(false);
        }
      }
    });
  };

  const reloadData = (id) => {
    let tempIndex = dataCard.findIndex((obj) => obj.id === id);
    Emplo_Data(tempIndex);
  };

  const CarouselContent = (config) => {
    if (!config) {
      throw new Error('Configurations not provided');
    }

    const [carouselItems, setCarouselItems] = useState(5);
    const [toolTip, setToolTip] = useState(false);
    const theme = useCustomTheme();

    const onLoad = () => {
      Object.keys(config).map((key) => {
        if (window.innerWidth < config[key].breakpoint.max && window.innerWidth >= config[key].breakpoint.min) {
          setCarouselItems(config[key].items);
        }
      });
    };

    window.addEventListener('resize', () => {
      Object.keys(config).map((key) => {
        if (window.innerWidth < config[key].breakpoint.max && window.innerWidth >= config[key].breakpoint.min) {
          setCarouselItems(config[key].items);
        }
      });
    });

    useEffect(async () => {
      await Emplo_Data();
      onLoad();
    }, []); //carouselItems

    const taskStatusChange = async (currentUserDetails, userTaskStatus) => {
      let tempObj = {};
      let changeStatus = 0;
      dataCard.forEach((item, index) => {
        if (item.id == currentUserDetails.id) {
          dataCard[index].status = userTaskStatus;
          if (userTaskStatus == 'Not started') {
            changeStatus = 1;
          } else if (userTaskStatus == 'In progress') {
            changeStatus = 2;
          } else if (userTaskStatus == 'Paused') {
            changeStatus = 3;
          } else if (userTaskStatus == 'Completed') {
            changeStatus = 4;
          } else if (userTaskStatus == 'Cancelled') {
            changeStatus = 5;
          }
          tempObj = {
            status: changeStatus,
          };
        }
      });

      await Change_task_status(currentUserDetails.id, tempObj)
        .then((response) => {})
        .catch((err) => {
          toast.error(err.response.message);
        });
    };

    const handleChange = (event, id, name) => {
      let popoUpStatus = 0;
      let falsePopUpStatus = 0;
      let newPopUpStatus = false;
      if (event == 'noEvent') {
        var tempObj = {
          status: 3,
        };
        changePlanStatus(tempObj, id);
        return false;
      }
      if (event.target.value == 3) {
        setEmpName(name);
        setEmpId(id);
        dataCard.map((obj, i) => {
          if (obj.id == id) {
            if (dataCard[i].clarification.clarification.length > 0) {
              dataCard[i].clarification.clarification.map((clarificationObj, index) => {
                if (clarificationObj.status == 3) {
                  popoUpStatus++;
                } else {
                  falsePopUpStatus++;
                }
              });
            }

            if (dataCard[i].compliance.compliance.length > 0) {
              dataCard[i].compliance.compliance.map((complianceObj, index) => {
                if (complianceObj.status == 3) {
                  popoUpStatus++;
                } else {
                  falsePopUpStatus++;
                }
              });
            }

            if (dataCard[i].connection.connection.length > 0) {
              dataCard[i].connection.connection.map((connectionObj, index) => {
                if (connectionObj.status == 3) {
                  popoUpStatus++;
                } else {
                  falsePopUpStatus++;
                }
              });
            }

            if (dataCard[i].culture.culture.length > 0) {
              dataCard[i].culture.culture.map((cultureObj, index) => {
                if (cultureObj.status == 3) {
                  popoUpStatus++;
                } else {
                  falsePopUpStatus++;
                }
              });
            }
            if (
              dataCard[i]?.clarification?.clarification?.length == 0 &&
              dataCard[i]?.compliance?.compliance?.length == 0 &&
              dataCard[i]?.connection?.connection?.length == 0 &&
              dataCard[i]?.culture?.culture?.length == 0
            ) {
              newPopUpStatus = true;
            }
          }
        });

        if (newPopUpStatus == true) {
          setPopUpOpen(true);
          return;
        }

        if (falsePopUpStatus > 0) {
          setNoteOneOpen(true);
        } else {
          setPopUpOpen(true);
        }
      } else {
        var tempObj = {
          status: event.target.value,
        };
        changePlanStatus(tempObj, id);
      }
    };

    const changePlanStatus = async (value, id) => {
      await Change_task_status(id, value).then((response) => {
        toast.success(response.message);
        setPopUpOpen(false);
        setNoteOneOpen(false);
        Emplo_Data(id);
        setDataCard();
        Emplo_Data();
        // window.location.reload();
      });
    };

    const clickSliderData = (item) => {
      setSelectedEmployee(item);
    };

    const rows = useMemo(() => {
      return Array.from({ length: Math.ceil(dataCard?.length / carouselItems) }, (v, index) => (
        <div className='row justify-content-left m-0 box_cards_carousel'>
          {dataCard.map((obj, i) => {
            return (
              <>
                {i >= index * carouselItems && i < (index + 1) * carouselItems && (
                  <div
                    className={`col-lg-${parseInt(12 / carouselItems)} col-md-${parseInt(12 / carouselItems)} col-sm-${parseInt(12 / carouselItems)} col-12 Step4_card ${
                      active.index === i ? 'backside2' : ''
                    } ${obj.status != '3' ? 'InProgressBorder' : ''}`}
                    key={i}
                    onClick={() => {
                      clickSliderData(obj);
                      setActive({ index: i });
                    }}
                  >
                    <div className='card_profileTxt'>
                      {active.index === i && (
                        <>
                          <div className='info-icon' onClick={() => setToolTip(true)}>
                            <BsFillInfoCircleFill />
                          </div>
                        </>
                      )}

                      <div className='card-profile-img'>
                        <img src={obj?.employee?.profile_pic || EMployeeImg} />
                      </div>

                      <div>
                        <h6 className='pt-2 poppins-semibold mx-4'>{obj?.employee?.full_name}</h6>
                        <p className='poppins-regular'>{obj?.jobtitle}</p>
                        {/* <p className='poppins-regular mt-2'>{obj?.status == '1' ? 'Not Started' : obj?.status == '2' ? 'In Progress' : obj?.status == '3' ? 'Completed' : null}</p> */}
                        <p className='poppins-regular mt-2'>Onboarding status</p>

                        <div className='dropdown-select-option'>
                          <select name='status' className='form-control mt-2' value={obj?.status} onChange={(event) => handleChange(event, obj?.id, obj?.employee?.full_name)}>
                            <option value={'1'} disabled>
                              Not Started
                            </option>
                            <option value={'2'}>In Progress</option>
                            <option value={'3'}>Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}

          {popUpOpen && (
            <div className='custom-popup'>
              <div className='popup-content'>
                <hr />
                <div className={'popup-head'}>
                  <h4 style={{ color: 'black', fontSize: '15px' }}>You are about to complete the onboarding for {empName}. Are you sure?</h4>
                </div>
                <hr />
                <div className='popup-footer'>
                  <button className='btn btn-success mx-1 text-capitalize' onClick={() => handleChange('noEvent', empId, 'noName')}>
                    Yes
                  </button>
                  <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setPopUpOpen(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {noteOneOpen && (
            <div className='custom-popup'>
              <div className='popup-content'>
                <hr />
                <div className={'popup-head'}>
                  <h4 style={{ color: 'black', fontSize: '15px' }}>
                    You are about to mark onboarding 'complete' for {empName} but you still have open tasks on the tasklist for {empName}. Are you sure you want to continue?
                  </h4>
                </div>
                <hr />
                <div className='popup-footer'>
                  <button className='btn btn-success mx-1 text-capitalize' onClick={() => handleChange('noEvent', empId, 'noName')}>
                    Yes
                  </button>
                  <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setNoteOneOpen(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {toolTip && (
            <>
              <div className='tooltiptext'>
                <span className='Close-Icon' onClick={() => setToolTip(false)}>
                  <IoClose />
                </span>
                <Personal_ifno dataOptions={selectedEmployee} />
              </div>
            </>
          )}
        </div>
      ));
    }, [carouselItems, active, toolTip, popUpOpen, dataCard, noteOneOpen]);

    return rows;
  };

  const config = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1400 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 3,
    },
    tablet1: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet2: {
      breakpoint: { max: 768, min: 578 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 578, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className='container py-4'>
        <div className='Step4_Main my-3'>
          <h5 className='poppins-semibold'>You have the following active onboarding plans :</h5>
          <div className='d-flex Task_Main'>
            <CustomCarousel data={CarouselContent(config)} />
          </div>
        </div>

        {loading ? (
          <tbody className='d-flex justify-content-center'>
            <tr>
              <td colSpan={8}>
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          step == 1 && <Step_5 selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} reloadData={reloadData} managerName={managerName} />
        )}
        {step == 2 && <Step_6 />}

        <div className='row justify-content-end align-items-center Btn_PreNext py-3'>
          {step !== IndexTab && (
            <button
              className='btn mx-3'
              onClick={() => {
                step > IndexTab && setStep(step - 1);
              }}
            >
              Previous
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnBoardingPlansView;
