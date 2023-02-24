import React, { useState } from 'react';
import { RiVideoLine } from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import JPEG from '../../assets/images/JPEG.jpg';
import PDF from '../../assets/images/PDF.jpg';
import PPT from '../../assets/images/PPT.jpg';
import XLSX from '../../assets/images/XLSX.jpg';
import '../../assets/styles/Step_3.css';
import { StoreMyPlan } from '../../assets/API/Apis';
import { toast } from 'react-toastify';
import useCustomTheme from '../../hooks/useCustomTheme';
import TOOLS_ICON from '../../assets/images/wrench.png';
import VIDEO_TOOLS from '../../assets/images/Video_tools.png';
import SESSION_TOOLS from '../../assets/images/Session_tools.png';
import EDUCATION_TOOL from '../../assets/images/Education_tool.png';
import { MdMovie } from 'react-icons/md';
import { FaMailBulk, FaGraduationCap } from 'react-icons/fa';

// Live Video And Documents Link.....
const CONNECTION_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Connection.mp4';
const CLARIFICATION_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Clarification.mp4';
const CULTURE_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Culture.mp4';
const COMPLIANCE_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Compliance.mp4';
const COMMUNICATE_TEMPLATE = 'https://butler-media.fra1.digitaloceanspaces.com/how_to_communicate_effectively_template.pdf';
const ONE_ON_ONE_TEMPLATE = 'https://butler-media.fra1.digitaloceanspaces.com/one_on_one_guideline_template.pdf';
const HOW_WE_ONBOARD = 'https://obb.portal-agylia.com/#/catalogue/landingpage/item/b31a3a27-2c7c-4f28-a7e6-bc5dbcfeebe0/';

const Step_3 = ({ children, selectedLevelTasks, empData, selectedEmployee, selectedHierarchy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [storePlan, setStorePlan] = useState(null);
  // const [titleText, setTitleText] = useState(null);
  // const [values, setValues] = useState({
  //   titleText: '',
  // });
  const theme = useCustomTheme();

  const data = theme?.activeCornerStone?.label == undefined ? theme?.activeCornerStone?.text : theme?.activeCornerStone?.label;

  const Tab = ({ children = '', headText, icon = '', content = '', plan = '', titleBox = '', classes, handleStoreMyPlane }) => {
    return (
      <div
        className='row m-0 p-0 col-12 align-items-center'
        // onClick={() => {
        //   handleStoreMyPlane();
        // }}
      >
        <div className={`d-flex flex-wrap align-items-center justify-content-between w-100 ${classes?.head}`}>
          {titleBox}
          <div className='d-flex flex-wrap align-items-center justify-content-between w-100'>
            <div className='d-flex col-lg-9 p-0 align-items-center step3_Txt'>
              {icon}
              <p className='emp_tag poppins-regular'>{headText}</p>
            </div>
            {plan}
          </div>
        </div>
        {children}
        {content}
      </div>
    );
  };
  const handleStoreMyPlane = (obj, task) => {
    let payload = {
      employee: selectedEmployee.employee.id,
      onboarding_plan: selectedEmployee.id,
      title: task.text,
      task: {
        id: obj.id,
        text: obj.text,
        task_comp: [task],
        cornerstone: selectedHierarchy?.label || theme?.activeCornerStone?.text,
      },
      status: '1',
    };

    StoreMyPlan(payload)
      .then((response) => {
        setIsSubmitted(true);
        toast.success('Task created  successfully');
      })
      .catch((error) => {
        // toast.error(error.message);
        toast.error('Task Already Created');
      });
  };

  // const Confirmhandler = () => {
  //   let payload = {
  //     employee: selectedEmployee.employee.id,
  //     onboarding_plan: selectedEmployee.id,
  //     task: { ...storePlan, cornerstone: selectedHierarchy.label },
  //     status: '1',
  //   };
  //   StoreMyPlan(payload)
  //     .then((response) => {
  //       if (response) {
  //         setPopUpOpen(false);
  //         toast.success('Store my plan done successfull');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const Listing = () => {
    // let handlerTitle = (event) => {
    // const value = event.target.value;
    // setTitleText(event.target.value);
    // setValues(value);
    // };
    return (
      <>
        {selectedLevelTasks.map((obj, li) => (
          <div className='d-flex m-0 align-items-center w-100 view_timeline Border_align'>
            {Tab({
              children: (
                <div className={`multi-collapse w-100 ${li === activeTab ? 'show' : 'collapse'}`}>
                  {obj.task_comp?.map((child, ci) => {
                    return (
                      <div className=' align-items-center view_timeline'>
                        {Tab({
                          headText: child.text,
                          plan: (
                            <p
                              className='plan'
                              style={{ color: theme.activeCornerStone.color, border: `1px solid ${theme.activeCornerStone.color}` }}
                              onClick={() => handleStoreMyPlane(obj, child)}
                            >
                              Store on my plan
                            </p>
                          ),
                          id: child.id,
                          icon:
                            `${li}${ci}` === activeSubTab ? (
                              <AiOutlineMinusCircle
                                onClick={() => setActiveSubTab(null)}
                                className='mx-2 Ste3_Icon'
                                data-toggle='collapse'
                                data-target={`#collapse${li}${ci}`}
                                aria-expanded='true'
                                aria-controls={`collapse${li}${ci}`}
                                style={{ color: theme.activeCornerStone.color }}
                              />
                            ) : (
                              <AiOutlinePlusCircle
                                onClick={() => setActiveSubTab(`${li}${ci}`)}
                                className='mx-2 Ste3_Icon'
                                data-toggle='collapse'
                                data-target={`#collapse${li}${ci}`}
                                aria-expanded='true'
                                aria-controls={`collapse${li}${ci}`}
                                style={{ color: theme.activeCornerStone.color }}
                              />
                            ),
                          classes: { head: 'views_info' },
                          content: (
                            <div className={`multi-collapse w-100 ${`${li}${ci}` === activeSubTab ? 'collapse show' : 'collapse'}`}>
                              <div className='row m-0 align-items-center view_time p-3 mt-3'>
                                <h5>WE RECOMMEND THAT YOU:</h5>
                              </div>
                              {child.task_recom?.map((objcli, di) => (
                                <div className={`d-flex m-0 align-items-center view_time mt-3`}>
                                  <BsDot className='ml-4' style={{ color: theme.activeCornerStone.color }} />
                                  <p>{objcli.text}</p>
                                </div>
                              ))}
                            </div>
                          ),
                        })}
                      </div>
                    );
                  })}
                </div>
              ),

              headText: obj.text,
              plan: '',
              id: obj.id,
              icon:
                li === activeTab ? (
                  <AiFillMinusCircle
                    onClick={() => setActiveTab(null)}
                    className='mx-2 MainIcon'
                    style={{ color: theme.activeCornerStone.color }}
                    data-toggle='collapse'
                    data-target={`#collapse${li}`}
                  />
                ) : (
                  <AiFillPlusCircle
                    onClick={() => setActiveTab(li)}
                    className='mx-2 MainIcon'
                    style={{ color: theme.activeCornerStone.color }}
                    data-toggle='collapse'
                    data-target={`#collapse${li}`}
                  />
                ),
            })}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className='row justify-content-between m-0 my-2'>
        <div className='personal_info1 col-md-6 py-2'>
          <div className='row align-items-center m-0 py-2'>
            <RiVideoLine className='RiVideoLine' />
            <h5 className='mx-2 onboarding_tag'>Onboarding Explained Video</h5>
          </div>
          <div className='step_3-video row p-2 justify-content-around'>
            {data == 'CONNECTION' ? (
              <div className='step_3-iframe-background'>
                <video src={CONNECTION_VIEDO} width='100%' height='100%' controls />
              </div>
            ) : data == 'CLARIFICATION' ? (
              <div className='step_3-iframe-background'>
                <video src={CLARIFICATION_VIEDO} width='100%' height='100%' controls />
              </div>
            ) : data == 'CULTURE' ? (
              <div className='step_3-iframe-background'>
                <video src={CULTURE_VIEDO} width='100%' height='100%' controls />
              </div>
            ) : data == 'COMPLIANCE' ? (
              <div className='step_3-iframe-background'>
                <video src={COMPLIANCE_VIEDO} width='100%' height='100%' controls />
              </div>
            ) : (
              <div className='step_3-iframe-background'>
                <video src={CONNECTION_VIEDO} width='100%' height='100%' controls />
              </div>
            )}
          </div>
        </div>

        <div className='d-flex personal_info2 col-md-6 py-4'>
          <div className='onboarding-plan-img'>
            <img src={TOOLS_ICON} />
          </div>
          <div className='onboarding-plan-text ml-3 w-100'>
            <h3 className='poppins-semibold'>Your Preferred Tools</h3>
            <div className='onboarding-plan-simpletext mt-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div
                  className='col-md-9 p-0 onboarding-plan-link'
                  onClick={() =>
                    window.open(
                      data == 'CONNECTION'
                        ? CONNECTION_VIEDO
                        : data == 'CLARIFICATION'
                        ? CLARIFICATION_VIEDO
                        : data == 'CULTURE'
                        ? CULTURE_VIEDO
                        : data == 'COMPLIANCE'
                        ? COMPLIANCE_VIEDO
                        : CONNECTION_VIEDO
                    )
                  }
                >
                  <p>{`Understanding ${data}`}</p>
                </div>
                <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                  {/* <img src={VIDEO_TOOLS} className='mr-3' /> */}
                  <MdMovie className='mr-3' />
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='col-md-9 p-0 onboarding-plan-link' onClick={() => window.open(ONE_ON_ONE_TEMPLATE)}>
                  <p>Template for 1:1 sessions</p>
                </div>
                <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                  {/* <img src={SESSION_TOOLS} className='mr-3' /> */}
                  <FaMailBulk className='mr-3' />
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='col-md-9 p-0 onboarding-plan-link' onClick={() => window.open(HOW_WE_ONBOARD)}>
                  <p>How we onboard</p>
                </div>
                <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                  {/* <img src={EDUCATION_TOOL} className='mr-3' /> */}
                  <FaGraduationCap className='mr-3' />
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='col-md-9 p-0 onboarding-plan-link' onClick={() => window.open(COMMUNICATE_TEMPLATE)}>
                  <p>How to communicate clear expectations</p>
                </div>
                <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                  {/* <img src={EDUCATION_TOOL} className='mr-3' /> */}
                  <FaGraduationCap className='mr-3' />
                </div>
              </div>
            </div>
          </div>
          {/* <div className='row align-items-center m-0 px-4'>
            <FaRegFileAlt className='RiVideoLine' />
            <h5 className='mx-2 onboarding_tag'>Tools</h5>
          </div>
          <div className='row p-4 justify-content-around'>
            <div
              className='personal_info1 text-center col-md-5 p-2 '
              onClick={() =>
                window.open(
                  'https://obb.portal-agylia.com/#/catalogue/landingpage/item/38ee3988-7277-4852-be24-43f4b64b4913/',
                  '_blank' // <- This is what makes it open in a new window.
                )
              }
            >
              <img src={PPT} />
            </div>
            <div
              className='personal_info1 text-center col-md-5 p-2'
              onClick={() =>
                window.open(
                  'https://obb.portal-agylia.com/#/catalogue/landingpage/item/fef19c55-7765-4d78-92c4-9909585d5c55/',
                  '_blank' // <- This is what makes it open in a new window.
                )
              }
            >
              <img src={JPEG} />
            </div>
          </div>
          <div className='row p-4 justify-content-around'>
            <div
              className='personal_info1 text-center col-md-5 p-2'
              onClick={() =>
                window.open(
                  'https://obb.portal-agylia.com/#/catalogue/landingpage/item/b31a3a27-2c7c-4f28-a7e6-bc5dbcfeebe0/',
                  '_blank' // <- This is what makes it open in a new window.
                )
              }
            >
              <img src={XLSX} />
            </div>
            <div
              className='personal_info1 text-center col-md-5 p-2'
              onClick={() =>
                window.open(
                  'https://obb.portal-agylia.com/#/catalogue/landingpage/item/21a14c24-d622-4361-8a75-61938ca38849/',
                  '_blank' // <- This is what makes it open in a new window.
                )
              }
            >
              <img src={PDF} />
            </div>
          </div> */}
        </div>
      </div>
      {children}
      <div className='personal_infoMain mt-2'>
        <div className='onboarding '>
          <FaCalendarAlt className='RiVideoLine' style={{ color: theme.activeCornerStone.color }} />
          <div>
            <h5 className='onboarding_tag poppins-bold'>OK – what do I actually need to do to perform and complete {selectedLevelTasks.length} selected tasks?</h5>
            <h6 className=''>
              Step 3 of 3: Open each task (+) and study each recommendation. Then do your final selection, and store each task onto your onboarding plan for {empData?.fullName}
              &nbsp;and press “Save”.
            </h6>
          </div>
        </div>
        <div className='personal_info3  row align-items-center '>{Listing()}</div>
      </div>
      {/* {popUpOpen && (
        <div className='custom-popup'>
          <div className='popup-content'>
            <hr />
            <div className={'popup-head'}>
              <h4 style={{ color: 'black', fontSize: '20px' }}>Do you want to store it again?</h4>
            </div>
            <hr />
            <div className='popup-footer'>
              <button className='btn btn-success mx-1 text-capitalize' onClick={() => Confirmhandler()}>
                Yes
              </button>
              <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setPopUpOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};
export default Step_3;
