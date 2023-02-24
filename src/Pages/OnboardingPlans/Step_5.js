import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/Step_5.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { get_One_Task, Update_Task_Details, send_feedback } from '../../assets/API/Apis';
import { toast } from 'react-toastify';
import { CgSmileSad, CgSmileNone, CgSmile, CgAttribution, CgSearch } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { FiTool } from 'react-icons/fi';
import { MdMovie } from 'react-icons/md';
import { FaMailBulk, FaGraduationCap } from 'react-icons/fa';
import { axiosInstance } from '../../assets/API/axiosInstances';
import { useNavigate, useParams } from 'react-router-dom';
import WHERE_ARE_YOU_HEADED from '../../assets/images/route.png';
import TOOLS_ICON from '../../assets/images/wrench.png';
import VIDEO_TOOLS from '../../assets/images/Video_tools.png';
import SESSION_TOOLS from '../../assets/images/Session_tools.png';
import EDUCATION_TOOL from '../../assets/images/Education_tool.png';
import CONNECTION_ICON from '../../assets/images/Connection.png';
import CLARIFICATION_ICON from '../../assets/images/Clarification.png';
import CULTURE_ICON from '../../assets/images/Culture.png';
import COMPLIANCE_ICON from '../../assets/images/Compliance.png';
import Ellipse_Img from '../../assets/images/Photo_male_character_for_pathfinder.png';
import WAYPOINTS from '../../assets/images/location.png';
import CARIMAGE from '../../assets/images/taxi.png';
import ReactChart from '../../components/ReactChart';
import ToolTip from '../../components/ToolTip';

// Live Video And Documents Link.....
const CONNECTION_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Connection.mp4';
const ONE_ON_ONE_TEMPLATE = 'https://butler-media.fra1.digitaloceanspaces.com/how_to_communicate_effectively_template.pdf';
const COMMUNICATE_TEMPLATE = 'https://butler-media.fra1.digitaloceanspaces.com/one_on_one_guideline_template.pdf';
const HOW_WE_ONBOARD = 'https://obb.portal-agylia.com/#/catalogue/landingpage/item/b31a3a27-2c7c-4f28-a7e6-bc5dbcfeebe0/';

const ValidationErrors = {
  empty: {
    status: 'status is Required',
    start_date: 'start date is Required',
    due_date: 'due date is Required',
  },
  invalid: {
    status: '',
    start_date: '',
    due_date: '',
  },
};

const Step_5 = ({ selectedEmployee, setSelectedEmployee, refreshEmpData, managerName, reloadData, ...props }) => {
  useDocumentTitle('OBB - Plans');
  const [active, setActive] = useState('index');
  const [activeTab, setActiveTab] = useState('index');
  const [taskUrl, setTaskUrl] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [checkId, setCheckId] = useState(null);
  const addModalClose = useRef(null);
  const [validationPopUpOpen, setValidationPopUpOpen] = useState(false);
  const [redoingPopUpOpen, setRedoingPopUpOpen] = useState(false);
  const [goWellNoPopUpOpen, setGoWellNoPopUpOpen] = useState(false);
  const [taskSelectorPopUpOpen, setTaskSelectorPopUpOpen] = useState(false);

  const [values, setValues] = useState({
    status: '',
  });

  const [errors, setErrors] = useState({
    status: '',
    start_date: '',
    due_date: '',
  });

  const handleSave = (id) => {
    setCheckId(id);
    setPopUpOpen(true);
  };
  const navigate = useNavigate();

  const Confirmhandler = async (id = checkId, status) => {
    const payload = {
      status: '4',
    };
    await axiosInstance
      .patch(`/accounts/task/${checkId}/`, payload)
      .then(function (response) {
        setValues(values.status);
        toast.success('Task Completed Successfully');
        // window.location.reload();
        reloadData(selectedEmployee?.id);
        return response.data;
      })
      .catch(function (error) {});

    // Update_Task_Details({ ...values, id }).then(() => {

    // if (status) {
    //   setValues({ ...values, status: false });
    // } else {
    //   setValues({ ...values, status: true });
    // }
    setPopUpOpen(false);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDelete = async (id, cornerStone) => {
    let tempTasks = [...selectedEmployee?.[cornerStone]];
    try {
      await axiosInstance.delete(`/accounts/task/${id}/`);
      // window.location.reload();
      //
      // emploData(activeData.index);
      let updatedTasks = tempTasks.filter((task) => task.id !== id);
      tempTasks[cornerStone] = updatedTasks;

      // let tempDataCard = [...DataCard];
      // let tempEmployeeIndex = tempDataCard.findIndex((obj) => obj.id === selectedEmployee.id);
      // tempDataCard[tempEmployeeIndex] = { ...tempDataCard[tempEmployeeIndex], [cornerStone]: tempTasks };
      //
      // // return;
      // setDataCard(tempDataCard);
      setSelectedEmployee(tempTasks);

      reloadData(selectedEmployee?.id);
      toast.success('Task deleted successfully.');
    } catch (error) {}
  };
  const getFormattedDate = (date) => {
    if (date) {
      let dArr = date.split('-');
      return `${dArr[2]}-${dArr[1]}-${dArr[0]}`;
    } else {
      return '';
    }
  };
  const handleEditClick = async (id) => {
    localStorage.setItem('selectedTaskId', JSON.stringify([id]));
    get_One_Task({ id })
      .then((response) => {
        if (response) {
          setValues({ ...response?.data, due_date: getFormattedDate(response?.data?.due_date), start_date: getFormattedDate(response?.data?.start_date) });
        }
      })
      .catch((error) => {});
  };

  const handlePost = async (btnCloseId) => {
    const tempErrors = { ...errors };
    Object.keys(values).map(async (key) => {
      if (!values[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      } else {
        //error blank
        setErrors(tempErrors);
      }
    });

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }

    const { id, status, start_date, due_date } = values;
    await Update_Task_Details({ id, status, start_date, due_date }).then(() => {
      navigate('/onboarding_plans');
      reloadData(selectedEmployee?.id);
      let btnClose = document.getElementById(btnCloseId);
      btnClose.click();
      toast.success('Task updated successfully.');
      // addModalClose.current.click();
    });
  };

  const Task_SignIn = (props) => {
    return axiosInstance
      .get(`/accounts/task/sign_in`)
      .then(function (response) {
        setTaskUrl(response.data.url);
        return response.data;
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };

  const workingStatus = (status_id) => {
    if (status_id) {
      navigate('/tasks', { state: status_id });
    } else {
      toast.error('Not working on any task');
    }
  };
  const handleTaskSelector = (Selector_Id) => {
    if (Selector_Id) {
      navigate('/', { state: Selector_Id });
    } else {
      toast.error('Not working on any task');
    }
  };
  // const handleTaskList = (id) => {
  //   if (id) {
  //     navigate('/tasks', { state: id });
  //   } else {
  //     toast.error('Not working on any task');
  //   }
  // };

  useEffect(() => {
    Task_SignIn();
  }, []);

  const ExportHandler = async () => {
    window.location = `${taskUrl}`;
    // window.open(taskUrl);
  };

  const isWellStatusChange = async (obj) => {
    await Update_Task_Details({ id: obj.id, is_well: true }).then((response) => {
      if (response.status == 200) {
        toast.success('Task updated successfully.');
        reloadData(selectedEmployee?.id);
      }
    });
  };

  const [noDataIdSecond, setNoDataIdSecond] = useState(0);

  const setNoData = (id) => {
    setNoDataIdSecond(id);
    setGoWellNoPopUpOpen('1');
  };

  const setNoDataFirst = (id) => {
    setNoDataIdSecond(id);
    setRedoingPopUpOpen('1');
  };

  const resetTaskData = async (id) => {
    await Update_Task_Details({ id: id, reset_recom: true }).then((response) => {
      toast.success('Task updated successfully.');
      reloadData(selectedEmployee?.id);
    });
    setGoWellNoPopUpOpen(false);
    setRedoingPopUpOpen(false);
    navigate('/tasks', { state: noDataIdSecond });
  };

  const goBackReDo = (noDataIdSecond) => {
    if (noDataIdSecond) {
      navigate('/tasks', { state: noDataIdSecond });
    } else {
      toast.error('Not working on any task');
    }
  };

  const redirectToTask = ({ selectedEmployee, cornerStone }) => {
    navigate('/', { state: { ID: selectedEmployee?.employee?.id, cornerStone: cornerStone } });
  };
  var DynamicData = selectedEmployee?.duration_task?.spend_duration + '%';
  var dynamicWidth = `calc(${DynamicData}  - 15px)`;

  const feedbackStatus = async (status, id) => {
    let updateStatus = {
      feedback: status,
    };
    await send_feedback(id, updateStatus).then((response) => {
      if (response.status == 200) {
        reloadData(selectedEmployee?.id);
        toast.success(response.message);
      }
    });
  };

  return (
    <>
      <div>
        {selectedEmployee?.start_week_plan ? (
          <div className='d-flex onboarding-plan-box mb-4'>
            <div className='onboarding-plan-img'>
              <img src={WAYPOINTS} />
            </div>
            <div className='onboarding-plan-text ml-3 w-100'>
              <h3 className='poppins-semibold'>Waypoints:</h3>
              {(selectedEmployee?.duration_task?.spend_duration != 0 || selectedEmployee?.duration_task?.togo_duration != 0) && (
                <div className='d-flex mt-5 waypoint-section-main'>
                  <div className='mr-2 align-self-center chart-date'>{selectedEmployee?.onboarding_startdate}</div>
                  <div className='d-flex w-100 align-items-center  position-relative waypoint-section'>
                    <div className='' style={{ position: 'absolute', left: dynamicWidth, top: '-33px' }}>
                      <img src={CARIMAGE} />
                    </div>
                    <div className='start-day' style={{ width: selectedEmployee?.duration_task?.spend_duration + '%' }}>
                      <p>
                        {selectedEmployee?.duration_task?.spend_duration + '%'} <span className='ml-2'>{selectedEmployee?.duration_task?.spend_days} days spent so far</span>
                      </p>
                    </div>
                    <div className='end-day' style={{ width: selectedEmployee?.duration_task?.togo_duration + '%' }}>
                      <p>
                        {selectedEmployee?.duration_task?.togo_duration + '%'} <span className='ml-2'>{selectedEmployee?.duration_task?.togo_days} days to go</span>
                      </p>
                    </div>
                  </div>
                  <div className='ml-2 align-self-center chart-date'>{selectedEmployee?.onboarding_enddate}</div>
                </div>
              )}
              <div className='timeline-chart'>
                <ReactChart selectedEmployee={selectedEmployee} />
              </div>
              <div className=' task-deatils-box ml-4'>
                {!selectedEmployee?.feedback && (
                  <div className='d-flex flex-wrap'>
                    <p className='poppins-regular'>
                      You have spent {selectedEmployee?.duration_task?.spend_days}
                      {selectedEmployee?.duration_task?.spend_days > 1 ? ' days' : ' day'} on the onboarding of {selectedEmployee?.employee?.full_name}, how would you rate{' '}
                      {selectedEmployee?.employee?.full_name} productivity?
                    </p>
                    <div className='smiley-icon'>
                      <CgSmileSad onClick={() => feedbackStatus(3, selectedEmployee.id)} />
                      <CgSmileNone onClick={() => feedbackStatus(2, selectedEmployee.id)} />
                      <CgSmile onClick={() => feedbackStatus(1, selectedEmployee.id)} />
                    </div>
                  </div>
                )}
                <div className='task-deatils-btn d-flex flex-wrap mt-3'>
                  <p className='poppins-regular'>
                    This is what the distribution of waypoints in your pathfinder for {selectedEmployee?.employee?.full_name} looks like. Is there anything you would like to
                    change?
                  </p>
                  <button className='poppins-semibold ml-3 success-btn' onClick={() => setTaskSelectorPopUpOpen(true)}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='row mb-4'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
            <div className='d-flex onboarding-plan-box'>
              <div className='onboarding-plan-img'>
                <img src={WHERE_ARE_YOU_HEADED} />
                {/* <CgAttribution /> */}
              </div>
              <div className='onboarding-plan-text ml-3 w-100'>
                <h3 className='poppins-semibold'>Where are you headed?</h3>
                <div className='onboarding-plan-simpletext' style={{ height: '180px' }}>
                  {selectedEmployee?.current_task?.title ? (
                    <>
                      <p className='poppins-regular mt-4'>
                        You have recently started working on <span className='poppins-semibold'>{selectedEmployee?.current_task?.title}</span> do you want to complete it now?
                        <button className='poppins-semibold ml-3 success-btn' onClick={() => workingStatus(selectedEmployee?.current_task?.id)}>
                          Yes
                        </button>
                      </p>
                      <p className='poppins-regular mt-5'>
                        Would you like to request {selectedEmployee?.employee?.full_name} to give feedback on how she feels her onboarding is going?
                        <button className='poppins-semibold ml-3 success-btn'>Yes</button>
                      </p>
                    </>
                  ) : (
                    <p className='poppins-regular d-flex justify-content-center align-items-center h-100' style={{ fontSize: '20px' }}>
                      No task in progress
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
            <div className='d-flex onboarding-plan-box'>
              <div className='onboarding-plan-img'>
                <img src={TOOLS_ICON} />
              </div>
              <div className='onboarding-plan-text ml-3 w-100'>
                <h3 className='poppins-semibold'>Your Preferred Tools</h3>
                <div className='onboarding-plan-simpletext mt-5'>
                  <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='col-md-9 p-0 onboarding-plan-link ' onClick={() => window.open(CONNECTION_VIEDO)}>
                      <p>Understanding Connection</p>
                    </div>
                    <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                      {/* <img src={VIDEO_TOOLS} className='mr-3' /> */}
                      <MdMovie className='mr-3' />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='col-md-9 p-0 onboarding-plan-link' onClick={() => window.open(ONE_ON_ONE_TEMPLATE)}>
                      <p>Template for 1:1 sessions</p>
                    </div>
                    <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                      {/* <img src={SESSION_TOOLS} className='mr-3' /> */}
                      <FaMailBulk className='mr-3' />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='col-md-9 p-0 onboarding-plan-link' onClick={() => window.open(HOW_WE_ONBOARD)}>
                      <p>How we onboard</p>
                    </div>
                    <div className='col-md-3 p-0 onboarding-plan-tools text-center'>
                      {/* <img src={EDUCATION_TOOL} className='mr-3' /> */}
                      <FaGraduationCap className='mr-3' />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-2'>
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
            </div>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
            <div className='onboarding-plan-box'>
              <div className='d-flex'>
                <div className='onboarding-plan-img'>
                  <img src={CONNECTION_ICON} alt='connection-icon' />
                </div>
                <div className='onboarding-plan-text fix-height ml-3 w-100'>
                  <h3 className='poppins-semibold'>Connection</h3>
                  <div className='onboarding-plan-simpletext mt-4'>
                    <p className='poppins-regular'> Validate your progress of each task and take appropriate actions when you feel the need to.</p>
                  </div>
                  <div className='onbparding-plan-box'>
                    {selectedEmployee?.connection?.connection?.length > 0 &&
                      selectedEmployee?.connection?.connection?.map((obj, i) => {
                        return (
                          <div className='progress-main-box mt-3'>
                            <div className='d-flex justify-content-between align-items-center progress-text'>
                              <h5 className='poppins-semibold'>
                                {obj.wbs_id}-
                                <ToolTip toolTipText={obj?.task?.text}>
                                  <div className='poppins-light'> {obj?.task?.text?.substring(0, 10)} ...</div>
                                </ToolTip>
                              </h5>
                              {obj.completion_status != 100 ? <h6 className='poppins-semibold'>Is it going well?</h6> : <h6 className='poppins-semibold'>Did it go well?</h6>}
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Completion</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj.completion_status != 0 ? (
                                        <div
                                          class='progress-bar completion-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj.completion_status}
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                          style={{ width: obj.completion_status + '%' }}
                                        >
                                          {obj.completion_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold success-btn' onClick={() => setValidationPopUpOpen('1')}>
                                    Yes
                                  </button>
                                ) : (
                                  <button
                                    className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'success-btn'}`}
                                    disabled={obj?.is_well}
                                    onClick={() => isWellStatusChange(obj)}
                                  >
                                    Yes
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Duration</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj?.duration_status != 0 ? (
                                        <div
                                          class='progress-bar duration-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj?.duration_status}
                                          aria-valuemin='0'
                                          aria-valuemax={obj?.duration_status}
                                          style={{ width: obj?.duration_status + '%', background: 'red' }}
                                        >
                                          {obj?.duration_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold danger-btn' onClick={() => setNoDataFirst(obj?.id)}>
                                    No
                                  </button>
                                ) : (
                                  <button className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'danger-btn'}`} disabled={obj?.is_well} onClick={() => setNoData(obj?.id)}>
                                    No
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {selectedEmployee?.connection?.connection?.length == 0 && <div className='poppins-regular mt-4 no-data-found'>No data found</div>}
                  </div>
                  {!selectedEmployee?.connection?.remainder && (
                    <div className='task-deatils-main d-flex align-items-center mt-4'>
                      <div className='pathfinder-img'>
                        <img src={Ellipse_Img} alt='Ellipse_Img' />
                      </div>
                      <div className='task-deatils-box ml-4'>
                        <p className='poppins-regular'>There could be more tasks related to Connection, would you like to explore more?</p>
                        <div className='task-deatils-btn'>
                          <button className='poppins-semibold ml-3 success-btn' onClick={() => redirectToTask({ selectedEmployee, cornerStone: 0 })}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
            <div className='onboarding-plan-box'>
              <div className='d-flex'>
                <div className='onboarding-plan-img'>
                  <img src={CLARIFICATION_ICON} alt='connection-icon' />
                </div>
                <div className='onboarding-plan-text fix-height ml-3 w-100'>
                  <h3 className='poppins-semibold'>Clarification</h3>
                  <div className='onboarding-plan-simpletext mt-4'>
                    <p className='poppins-regular'> Validate your progress of each task and take appropriate actions when you feel the need to.</p>
                  </div>
                  <div className='onbparding-plan-box'>
                    {selectedEmployee?.clarification?.clarification?.length > 0 &&
                      selectedEmployee?.clarification?.clarification?.map((obj, i) => {
                        return (
                          <div className='progress-main-box mt-3'>
                            <div className='d-flex justify-content-between align-items-center progress-text'>
                              <h5 className='poppins-semibold'>
                                {obj.wbs_id}-
                                <ToolTip toolTipText={obj?.task?.text}>
                                  <div className='poppins-light'> {obj?.task?.text?.substring(0, 10)} ...</div>
                                </ToolTip>
                              </h5>
                              {obj.completion_status != 100 ? <h6 className='poppins-semibold'>Is it going well?</h6> : <h6 className='poppins-semibold'>Did it go well?</h6>}
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Completion</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj.completion_status != 0 ? (
                                        <div
                                          class='progress-bar completion-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj.completion_status}
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                          style={{ width: obj.completion_status + '%' }}
                                        >
                                          {obj.completion_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold success-btn' onClick={() => setValidationPopUpOpen('1')}>
                                    Yes
                                  </button>
                                ) : (
                                  <button
                                    className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'success-btn'}`}
                                    disabled={obj?.is_well}
                                    onClick={() => isWellStatusChange(obj)}
                                  >
                                    Yes
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Duration</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj?.duration_status != 0 ? (
                                        <div
                                          className='progress-bar duration-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj?.duration_status}
                                          aria-valuemin='0'
                                          aria-valuemax={obj?.duration_status}
                                          style={{ width: obj?.duration_status + '%' }}
                                        >
                                          {obj?.duration_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold danger-btn' onClick={() => setNoDataFirst(obj?.id)}>
                                    No
                                  </button>
                                ) : (
                                  <button className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'danger-btn'}`} disabled={obj?.is_well} onClick={() => setNoData(obj?.id)}>
                                    No
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {selectedEmployee?.clarification?.clarification?.length == 0 && <div className='poppins-regular mt-4 no-data-found'>No data found</div>}
                  </div>
                  {!selectedEmployee?.clarification?.remainder && (
                    <div className='task-deatils-main d-flex align-items-center mt-4'>
                      <div className='pathfinder-img'>
                        <img src={Ellipse_Img} alt='Ellipse_Img' />
                      </div>
                      <div className='task-deatils-box ml-4'>
                        <p className='poppins-regular'>There could be more tasks related to Clarification, would you like to explore more?</p>
                        <div className='task-deatils-btn'>
                          <button className='poppins-semibold ml-3 success-btn' onClick={() => redirectToTask({ selectedEmployee, cornerStone: 1 })}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
            <div className='onboarding-plan-box'>
              <div className='d-flex'>
                <div className='onboarding-plan-img'>
                  <img src={CULTURE_ICON} alt='culture-icon' />
                </div>
                <div className='onboarding-plan-text fix-height ml-3 w-100'>
                  <h3 className='poppins-semibold'>Culture</h3>
                  <div className='onboarding-plan-simpletext mt-4'>
                    <p className='poppins-regular'> Validate your progress of each task and take appropriate actions when you feel the need to.</p>
                  </div>
                  <div className='onbparding-plan-box'>
                    {selectedEmployee?.culture?.culture?.length > 0 &&
                      selectedEmployee?.culture?.culture?.map((obj, i) => {
                        return (
                          <div className='progress-main-box mt-3'>
                            <div className='d-flex justify-content-between align-items-center progress-text'>
                              <h5 className='poppins-semibold'>
                                {obj.wbs_id}-
                                <ToolTip toolTipText={obj?.task?.text}>
                                  <div className='poppins-light'> {obj?.task?.text?.substring(0, 10)} ...</div>
                                </ToolTip>
                              </h5>
                              {obj.completion_status != 100 ? <h6 className='poppins-semibold'>Is it going well?</h6> : <h6 className='poppins-semibold'>Did it go well?</h6>}
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Completion</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj.completion_status != 0 ? (
                                        <div
                                          class='progress-bar completion-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj.completion_status}
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                          style={{ width: obj.completion_status + '%' }}
                                        >
                                          {obj.completion_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold success-btn' onClick={() => setValidationPopUpOpen('1')}>
                                    Yes
                                  </button>
                                ) : (
                                  <button
                                    className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'success-btn'}`}
                                    disabled={obj?.is_well}
                                    onClick={() => isWellStatusChange(obj)}
                                  >
                                    Yes
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Duration</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj?.duration_status != 0 ? (
                                        <div
                                          class='progress-bar duration-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj?.duration_status}
                                          aria-valuemin='0'
                                          aria-valuemax={obj?.duration_status}
                                          style={{ width: obj?.duration_status + '%' }}
                                        >
                                          {obj?.duration_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold danger-btn' onClick={() => setNoDataFirst(obj?.id)}>
                                    No
                                  </button>
                                ) : (
                                  <button className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'danger-btn'}`} disabled={obj?.is_well} onClick={() => setNoData(obj?.id)}>
                                    No
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {selectedEmployee?.culture?.culture?.length == 0 && <div className='poppins-regular mt-4 no-data-found'>No data found</div>}
                  </div>
                  {!selectedEmployee?.culture?.remainder && (
                    <div className='task-deatils-main d-flex align-items-center mt-4'>
                      <div className='pathfinder-img'>
                        <img src={Ellipse_Img} alt='Ellipse_Img' />
                      </div>
                      <div className='task-deatils-box ml-4'>
                        <p className='poppins-regular'>There could be more tasks related to Culture, would you like to explore more?</p>
                        <div className='task-deatils-btn'>
                          <button className='poppins-semibold ml-3 success-btn' onClick={() => redirectToTask({ selectedEmployee, cornerStone: 2 })}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
            <div className='onboarding-plan-box'>
              <div className='d-flex'>
                <div className='onboarding-plan-img'>
                  <img src={COMPLIANCE_ICON} alt='compliance-icon' />
                </div>
                <div className='onboarding-plan-text fix-height ml-3 w-100'>
                  <h3 className='poppins-semibold'>Compliance</h3>
                  <div className='onboarding-plan-simpletext mt-4'>
                    <p className='poppins-regular'> Validate your progress of each task and take appropriate actions when you feel the need to.</p>
                  </div>
                  <div className='onbparding-plan-box'>
                    {selectedEmployee?.compliance?.compliance?.length > 0 &&
                      selectedEmployee?.compliance?.compliance?.map((obj, i) => {
                        return (
                          <div className='progress-main-box mt-3'>
                            <div className='d-flex justify-content-between align-items-center progress-text'>
                              <h5 className='poppins-semibold'>
                                {obj.wbs_id}-
                                <ToolTip toolTipText={obj?.task?.text}>
                                  <div className='poppins-light'> {obj?.task?.text?.substring(0, 10)} ...</div>
                                </ToolTip>
                              </h5>
                              {obj.completion_status != 100 ? <h6 className='poppins-semibold'>Is it going well?</h6> : <h6 className='poppins-semibold'>Did it go well?</h6>}
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Completion</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj.completion_status != 0 ? (
                                        <div
                                          class='progress-bar completion-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj.completion_status}
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                          style={{ width: obj.completion_status + '%' }}
                                        >
                                          {obj.completion_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold success-btn' onClick={() => setValidationPopUpOpen('1')}>
                                    Yes
                                  </button>
                                ) : (
                                  <button
                                    className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'success-btn'}`}
                                    disabled={obj?.is_well}
                                    onClick={() => isWellStatusChange(obj)}
                                  >
                                    Yes
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-2'>
                              <div className='col-9 p-0'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className=''>
                                    <p className='mr-2 poppins-regular progress-bar-text'>Duration</p>
                                  </div>
                                  <div className='step5-progress'>
                                    <div class='progress ' style={{ width: '200px' }}>
                                      {obj?.duration_status != 0 ? (
                                        <div
                                          class='progress-bar duration-progress-bar'
                                          role='progressbar'
                                          aria-valuenow={obj?.duration_status}
                                          aria-valuemin='0'
                                          aria-valuemax={obj?.duration_status}
                                          style={{ width: obj?.duration_status + '%' }}
                                        >
                                          {obj?.duration_status + '%'}
                                        </div>
                                      ) : (
                                        <p className='progress-status'>0%</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3' style={{ display: 'contents' }}>
                                {obj.completion_status != 100 ? (
                                  <button className='poppins-semibold danger-btn' onClick={() => setNoDataFirst(obj?.id)}>
                                    No
                                  </button>
                                ) : (
                                  <button className={`poppins-semibold ${obj?.is_well ? 'gray-btn' : 'danger-btn'}`} disabled={obj?.is_well} onClick={() => setNoData(obj?.id)}>
                                    No
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {selectedEmployee?.compliance?.compliance?.length == 0 && <div className='poppins-regular mt-4 no-data-found'>No data found</div>}
                  </div>
                  {!selectedEmployee?.compliance?.remainder && (
                    <div className='task-deatils-main d-flex align-items-center mt-4'>
                      <div className='pathfinder-img'>
                        <img src={Ellipse_Img} alt='Ellipse_Img' />
                      </div>
                      <div className='task-deatils-box ml-4'>
                        <p className='poppins-regular'>There could be more tasks related to Compliance, would you like to explore more?</p>
                        <div className='task-deatils-btn'>
                          <button className='poppins-semibold ml-3 success-btn' onClick={() => redirectToTask({ selectedEmployee, cornerStone: 3 })}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {popUpOpen && (
          <div className='custom-popup'>
            <div className='popup-content'>
              <hr />
              <div className={'popup-head'}>
                <h4 style={{ color: 'black', fontSize: '15px' }}>Are you sure you want to make this task complete ?</h4>
              </div>
              <hr />
              <div className='popup-footer'>
                <button className='btn btn-success mx-1 text-capitalize' onClick={() => Confirmhandler(true)}>
                  Yes
                </button>
                <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setPopUpOpen(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {validationPopUpOpen && (
          <div className='custom-popup'>
            <div className='popup-content'>
              <hr />
              <div className={'popup-head'}>
                <h4 style={{ color: 'black', fontSize: '15px' }}>
                  {validationPopUpOpen == '1' && 'Well done, you are one step closer to completing a good and valuable onboardingexperience for your NewHire'}
                </h4>
              </div>
              <hr />
              <div className='popup-footer'>
                <button className='btn btn-success mx-1 text-capitalize' data-dismiss='modal' onClick={() => setValidationPopUpOpen(false)}>
                  Ok
                </button>
                {/* <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => validationPopUpOpen(false)}>
                  No
                </button> */}
              </div>
            </div>
          </div>
        )}

        {redoingPopUpOpen && (
          <div className='custom-popup'>
            <div className='popup-content'>
              <hr />
              <div className={'popup-head'}>
                <h4 style={{ color: 'black', fontSize: '15px' }}>{redoingPopUpOpen == '1' && 'Would you like to go back and redo the task/recommendation?'}</h4>
              </div>
              <hr />
              <div className='popup-footer'>
                <button className='btn btn-success mx-1 text-capitalize' data-dismiss='modal' onClick={() => goBackReDo(noDataIdSecond)}>
                  Yes
                </button>
                <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setRedoingPopUpOpen(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {goWellNoPopUpOpen && (
          <div className='custom-popup'>
            <div className='popup-content'>
              <hr />
              <div className={'popup-head'}>
                <h4 style={{ color: 'black', fontSize: '15px' }}>{goWellNoPopUpOpen == '1' && 'Would you like to re-do the task/recommentations?'}</h4>
              </div>
              <hr />
              <div className='popup-footer'>
                <button className='btn btn-success mx-1 text-capitalize' data-dismiss='modal' onClick={() => resetTaskData(noDataIdSecond)}>
                  Yes
                </button>
                <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setGoWellNoPopUpOpen(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {taskSelectorPopUpOpen && (
          <div className='custom-popup'>
            <div className='popup-content'>
              <div className='d-flex justify-content-end close-icon' onClick={() => setTaskSelectorPopUpOpen(false)}>
                <IoClose />
              </div>
              <hr />
              <div className={'popup-head'}>
                <h4 style={{ color: 'black', fontSize: '15px' }}>Would you like to be taken to your task selector or your task list</h4>
                <div>
                  <div className='d-flex align-items-center selector-task'>
                    <input type='radio' id='task_Selector' name='tasks' value='selector' onClick={() => handleTaskSelector(selectedEmployee?.employee?.id)} />
                    <label htmlFor='task_Selector' className='ml-2'>
                      Task Selector
                    </label>
                  </div>
                  <div className='d-flex align-items-center selector-task'>
                    <input type='radio' id='task_List' name='tasks' value='list' onClick={() => navigate('/tasks')} />
                    <label htmlFor='task_List' className='ml-2'>
                      Task List
                    </label>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Step_5;
