import React, { useEffect, useState, useMemo, useRef } from 'react';
import '../../assets/styles/Step_4.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { DateSorting, get_All_Task, get_One_Task, Update_Task_Details } from '../../assets/API/Apis';
import { useNavigate } from 'react-router-dom';
import EMployeeImg from '../../assets/images/default.jpg';
import { axiosInstance } from '../../assets/API/axiosInstances';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useCustomTheme from '../../hooks/useCustomTheme';
import { IsAuthenticated } from '../../assets/Helper/utils';
import DatePicker from 'react-datepicker';
import { MdMovie } from 'react-icons/md';
import { FaMailBulk, FaGraduationCap } from 'react-icons/fa';

import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import ToolTip from '../../components/ToolTip';
import TOOLS_ICON from '../../assets/images/wrench.png';
import VIDEO_TOOLS from '../../assets/images/Video_tools.png';
import SESSION_TOOLS from '../../assets/images/Session_tools.png';
import EDUCATION_TOOL from '../../assets/images/Education_tool.png';
import TROPHY from '../../assets/images/trophy.png';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

// Live Video And Documents Link.....
const CONNECTION_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Connection.mp4';
const CLARIFICATION_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Clarification.mp4';
const CULTURE_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Culture.mp4';
const COMPLIANCE_VIEDO = 'https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Compliance.mp4';
const COMMUNICATE_TEMPLATE = 'https://butler-media.fra1.digitaloceanspaces.com/how_to_communicate_effectively_template.pdf';
const ONE_ON_ONE_TEMPLATE = 'https://butler-media.fra1.digitaloceanspaces.com/one_on_one_guideline_template.pdf';
const HOW_WE_ONBOARD = 'https://obb.portal-agylia.com/#/catalogue/landingpage/item/b31a3a27-2c7c-4f28-a7e6-bc5dbcfeebe0/';

const headers = [
  { label: 'Employee Name', key: 'employee.employee' },
  { label: 'Title Name', key: 'title' },
  { label: 'Cornerstone', key: 'task.cornerstone' },
  { label: 'Start Date', key: 'start_date' },
  { label: 'Due Date', key: 'due_date' },
  { label: 'Status', key: 'status' },
  { label: 'Exported	', key: 'exported' },
];

const ValidationErrors = {
  empty: {
    status: 'status is Required',
    passStartDate: 'start date is Required',
  },
  invalid: {
    status: '',
    start_date: '',
  },
};

const Tasks = (selectedData = { selectedData }) => {
  useDocumentTitle('OBB - Tasks');

  const [taskData, setTaskData] = useState([]);
  const [taskLength, setTaskLength] = useState(0);
  const [selectTask, setSelectTask] = useState([]);
  const [order, setOrder] = useState(false);
  const [values, setValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(false);
  // const [taskUrl, setTaskUrl] = useState('');
  // const addModalClose = useRef(null);

  const [state, setState] = useState('ASC');
  const [date, setDate] = useState('Asc');
  const [Asc, setAsc] = useState(true);
  const [downloadData, setDownloadData] = useState([]);
  const [taskValue, setTaskValue] = useState(false);
  const [sessionEmployee, setSessionEmployee] = useState(false);
  const [taskDescription, setTaskDescription] = useState([]);
  const [disableField, setDisableField] = useState(false);
  const [taskUrl, setTaskUrl] = useState('');
  const [taskIds, setTaskIds] = useState([]);
  let newTempArray = [];
  const [passDueDate, setPassDueDate] = useState('');
  const [passStartDate, setPassStartDate] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [dueDateDisable, setDueDateDisable] = useState('');

  const navigate = useNavigate();

  const theme = useCustomTheme();

  let workingData = useLocation();
  const [newWorking, setNewWorking] = useState(workingData);
  const [errors, setErrors] = useState({
    status: '',
    start_date: '',
    due_date: '',
  });

  useEffect(() => {
    !isLoading && getTaskAllDataAPI();
  }, [isLoading]);

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: downloadData,
    // taskData.map((emp) => {
    //   return emp.employee;
    // }),
  };
  const getTaskAllDataAPI = async () => {
    var taskCount = 0;
    await get_All_Task()
      .then((response) => {
        setTaskData(response?.data);
        if (response.data.length == 0) {
          setTaskLength(taskCount);
        } else {
          response.data.forEach((element) => {
            if (element.status != '3') {
              taskCount++;
              setTaskLength(taskCount);
            } else {
              setTaskLength(taskCount);
            }
          });
        }

        setSelectTask([]);
        // localStorage.setItem('selectedTaskId', JSON.stringify(''));
      })
      .catch(function (error) {
        console.log(error);
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

  useEffect(() => {
    Task_SignIn();
  }, [values]);

  const singleExportHandler = async () => {
    window.location = `${taskUrl}`;
  };

  const endDatehandleChange = (e, endDate) => {
    setPassDueDate(e);
    var selectedEndDate = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    if (endDate < selectedEndDate) {
      toast.error('You have entered a date that falls outside the onboarding start and due date. Please contact your Human Resouces to extend the duration of the onboarding.');
      return false;
    }

    setValues({
      ...values,
      ['due_date']: selectedEndDate,
    });
  };

  function addWeekdays(date, days) {
    date = moment(date); // use a clone
    while (days > 0) {
      date = date.add(1, 'days');
      // decrease "days" only if it's a weekday.
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    return date;
  }

  const handleChange = (e, status, startDate, endDate) => {
    var selectedStartDate = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    if (status == 'StartDate') {
      if (startDate > selectedStartDate || selectedStartDate > endDate) {
        toast.error('You have entered a date that falls outside the onboarding start and due date. Please contact your Human Resouces to extend the duration of the onboarding.');
        return false;
      }
      let newEndDate = moment(endDate, 'YYYY-MM-DD').subtract(5, 'd').format('YYYY-MM-DD');

      if (selectedStartDate > newEndDate) {
        toast.error('You must select 5 days before End date');
        return false;
      }
      var newDate = addWeekdays(selectedStartDate, 5);
      setDueDateDisable(selectedStartDate);
      // let newDate = moment(selectedStartDate, "YYYY-MM-DD").add(5, 'days');
      var day = newDate.format('DD');
      var month = newDate.format('MM');
      var year = newDate.format('YYYY');
      let dueDate = year + '-' + month + '-' + day;
      var formatedDueDate = new Date(dueDate);
      setPassStartDate(e);
      setPassDueDate(formatedDueDate);
      var sendEndDate = moment(formatedDueDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      var sendStartDate = moment(selectedStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      setValues({
        ...values,
        ['start_date']: sendStartDate,
        ['due_date']: sendEndDate,
      });
      setStartDateError(false);
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const getOnboardingStartDateFormate = () => {
    if (values?.onboarding_plan?.onboarding_startdate) {
      const STARTDATE = values?.onboarding_plan?.onboarding_startdate?.split('-');
      const OnboardingFormatedStartDate = `${STARTDATE[1]}/${STARTDATE[2]}/${STARTDATE[0]}`;
      return OnboardingFormatedStartDate;
    }
  };
  const getOnboardingEndDateFormate = () => {
    if (values?.onboarding_plan?.onboarding_enddate) {
      const ENDDATE = values?.onboarding_plan?.onboarding_enddate?.split('-');
      const OnboardingFormatedEndDate = `${ENDDATE[1]}/${ENDDATE[2]}/${ENDDATE[0]}`;
      return OnboardingFormatedEndDate;
    }
  };

  const taskChangeHandler = (e) => {
    setTaskValue(!taskValue);
    let tempTeskReCom = { ...values };

    values?.task?.task_comp[0]?.task_recom.map((element, index) => {
      tempTeskReCom.task.task_comp[0].task_recom[index].rec_status = e.target.checked;
      setValues(tempTeskReCom);
    });
    tempTeskReCom.task.task_comp[0].task_status = e.target.checked;
  };

  const sessionEmployeeChangeHandler = (e, taskRecom) => {
    let tempCount = 0;
    let tempTeskReCom = { ...values };
    newTempArray = taskDescription;
    var myBool = Boolean(e.target.checked);
    values?.task?.task_comp[0]?.task_recom.map((element, index) => {
      if (element.id == taskRecom.id) {
        tempTeskReCom.task.task_comp[0].task_recom[index].rec_status = myBool;
        setValues(tempTeskReCom);
      }
      if (values.task.task_comp[0].task_recom[index].rec_status == true) {
        tempCount++;
        if (tempCount == values?.task?.task_comp[0]?.task_recom.length) {
          tempTeskReCom.task.task_comp[0].task_status = true;
          setValues(tempTeskReCom);
          setTaskValue(true);
        } else {
          tempTeskReCom.task.task_comp[0].task_status = false;
          setValues(tempTeskReCom);
          setTaskValue(false);
        }
      }
    });
  };

  const getFormattedDate = (date) => {
    if (date != null) {
      let dArr = date.split('-');
      let formatedDate = `${dArr[2]}-${dArr[1]}-${dArr[0]}`;
      var formatedStartDate = new Date(formatedDate);
      setPassStartDate(formatedStartDate);
      return formatedDate;
    }
  };

  const getFormattedDueDate = (date) => {
    if (date != null) {
      let dArr = date.split('-');
      let formatedDate = `${dArr[2]}-${dArr[1]}-${dArr[0]}`;
      var formatedDueDate = new Date(formatedDate);
      setPassDueDate(formatedDueDate);
      return formatedDate;
    }
  };

  const handleClick = async ({ id, ...obj }) => {
    localStorage.setItem('selectedTaskId', JSON.stringify([id]));
    setPassStartDate('');
    setPassDueDate('');
    setDisableField(false);
    get_One_Task({ id })
      .then((response) => {
        if (response) {
          setValues({ ...response?.data, due_date: getFormattedDueDate(response.data.due_date), start_date: getFormattedDate(response.data.start_date) });
          let tempTeskReCom = { ...response?.data };
          let tempCount = 0;
          tempTeskReCom.task.task_comp[0].task_recom.map((element) => {
            if (element.rec_status == true) {
              tempCount++;
              if (tempCount == tempTeskReCom.task.task_comp[0].task_recom.length) {
                setDisableField(true);
                setTaskValue(true);
              }
            } else {
              setTaskValue(false);
            }
          });
          // tempTeskReCom.task.task_comp[0].task_recom[index].rec_status = myBool
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlePost = async () => {
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

    const { id, status, start_date, due_date, wbs_id, task } = values;
    if (start_date == undefined || start_date == '') {
      setStartDateError(true);
      return;
    } else {
      setStartDateError(false);
    }
    await Update_Task_Details({ id, status, start_date, due_date, wbs_id, task }).then((response) => {
      setDisableField(false);
      getTaskAllDataAPI();

      setNewWorking(null);
      // if (response?.status === 400) {
      //   toast.error(response?.message);
      // } else {
      //   toast.success(response?.message);
      //   addModalClose.current.click();
      // }
      // setValues(null);
      // addModalClose.current.click();
      toast.success('Task updated successfully.');
    });
    setIsLoading(false);
  };

  const ExportHandler = async () => {
    if (selectTask?.length > 0) {
      window.location = `${taskUrl}`;
    } else {
      toast.error('Task is not selected');
    }
  };

  const handleDelete = async (id) => {
    setIsSubmitted(id);
    setPopUpOpen(true);
  };

  const Confirmhandler = async (id = isSubmitted) => {
    try {
      await axiosInstance.delete(`/accounts/task/${id}/`);
      // let delData = selectTask.filter((item) => {
      //   return item.id !== id;
      // });
      // setSelectTask(delData);
      // setTaskLength(taskLength - 1);
      // setSelectTask([]);
      getTaskAllDataAPI();
      setPopUpOpen(false);
      toast.success('Task deleted successfully');
    } catch (error) {
      console.log('Something Want Wrong');
    }
  };

  const handleSelectedTask = (obj, status, objData) => {
    if (status == false) {
      if (objData.start_date == null || objData.start_date == '' || objData.due_date == null || objData.due_date == '') {
        toast.error('Select start date & due date to export');
        return;
      }
      setTaskIds([...taskIds, obj]);
      localStorage.setItem('selectedTaskId', JSON.stringify([...taskIds, obj]));
    } else {
      taskIds.forEach((element, index) => {
        if (element == obj) {
          taskIds.splice(index, 1);
          setTaskIds([...taskIds]);
          localStorage.setItem('selectedTaskId', JSON.stringify([...taskIds]));
        }
      });
    }
    if (selectTask.indexOf(obj) !== -1) {
      let tempArray = [...selectTask];
      tempArray.splice(selectTask?.indexOf(obj), 1);
      downloadData.forEach((element, index) => {
        if (element.id == obj.id) {
          downloadData.splice(index, 1);
        }
        setDownloadData(downloadData);
      });
      setSelectTask(tempArray);
      return;
    }
    setSelectTask([...selectTask, obj]);
    setDownloadData(downloadData);
    // localStorage.setItem('selectedTaskId', JSON.stringify([...selectTask, id]));
    return;
  };
  const handleSort = async (parentKey, key) => {
    const data = [...taskData];
    let newArr = null;
    newArr = await new Promise((resolve, reject) =>
      resolve(
        data.sort((a, b) => {
          let fa = '';
          let fb = '';
          if (parentKey == 'title') {
            fa = a[parentKey];

            fb = b[parentKey];
          } else if (parentKey) {
            fa = a[parentKey];
            fa = fa[key]?.toLowerCase();

            fb = b[parentKey];
            fb = fb[key]?.toLowerCase();
          }
          if (!order) {
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
          } else {
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
          }
          return 0;
        })
      )
    );
    setTaskData(newArr);
  };

  const sorting = (col) => {
    if (state == 'ASC' && col != 'exported') {
      const sorter = [...taskData].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
      setTaskData(sorter);
      setState('DSC');
    }
    if (state == 'DSC' && col != 'exported') {
      const sorter = [...taskData].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
      setTaskData(sorter);
      setState('ASC');
    }

    if (state == 'ASC' && col == 'exported') {
      const sorter = [...taskData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setTaskData(sorter);
      setState('DSC');
    }

    if (state == 'DSC' && col == 'exported') {
      const sorter = [...taskData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setTaskData(sorter);
      setState('ASC');
    }
  };

  const getDueDateSorted = (data) => {
    DateSorting(data)
      .then((response) => {
        setTaskData(response?.data);
        setSelectTask([]);
        // localStorage.setItem('selectedTaskId', JSON.stringify(''));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const DateSortingHandler = () => {
    Asc ? getDueDateSorted({ sort_type: 'asc' }) : getDueDateSorted({ sort_type: 'desc' });
    setAsc(!Asc);
  };

  // const setSelectedTaskData = (selected, task, status) => {
  //   let tempArrayIds = [];
  //   if (status == false) {
  //     task.forEach((element) => {
  //       tempArrayIds.push(element?.id);
  //     });
  //   } else {
  //     tempArrayIds = [];
  //   }
  //   setTaskIds(tempArrayIds);
  //   localStorage.setItem('selectedTaskId', JSON.stringify(tempArrayIds));
  //   setSelectTask(selected?.length !== task?.length ? task?.reduce((prev, next) => [...prev, next.id], []) : []);
  //   setDownloadData(task);
  //   if (selected.length != task.length) {
  //     setDownloadData(task);
  //   } else {
  //     setDownloadData([]);
  //   }
  // };

  const setSelectedTaskData = (selected, task, status) => {
    let tempArrayIds = [];
    if (status == false) {
      task.forEach((element) => {
        if (element.start_date != null) {
          tempArrayIds.push(element?.id);
        } else {
          toast.dismiss();
          toast.error('Start & end date is not selected');
          tempArrayIds = [];
          return;
        }
      });
    } else {
      tempArrayIds = [];
    }
    if (tempArrayIds.length == task?.length || tempArrayIds.length == 0) {
      setSelectTask(selected?.length !== task?.length ? task?.reduce((prev, next) => [...prev, next.id], []) : []);
    } else {
      tempArrayIds = [];
    }
    setTaskIds(tempArrayIds);
    localStorage.setItem('selectedTaskId', JSON.stringify(tempArrayIds));
    setDownloadData(task);
    if (selected.length != task.length) {
      setDownloadData(task);
    } else {
      setDownloadData([]);
    }
  };

  const GeneralProdComp = (taskRecom, index) => (
    <>
      {index == 0 && (
        <div>
          <p className='mark-complete text-right'>Mark complete</p>
        </div>
      )}
      <div className='task-field-area d-flex justify-content-between'>
        <p className='task-field-data'>{taskRecom?.text}</p>
        <div>
          <label></label>
          <input
            type='checkbox'
            name='index'
            id={taskRecom?.rec_status}
            className='taskValue'
            checked={taskRecom?.rec_status}
            value={taskRecom?.rec_status}
            onChange={(event) => sessionEmployeeChangeHandler(event, taskRecom)}
            disabled={disableField == true}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className='container' style={{ height: '100vh' }}>
        <div className='Table_container mt-4'>
          <div className='table-title d-flex align-items-center justify-content-between'>
            <h5 className='poppins-semibold'>
              You are currently working on the following <span className='poppins-extrabold taskLength'>{taskLength} </span> <span className='poppins-semibold'>Task.</span>
            </h5>
            <button className='btn poppins-semibold csvReport' type='button' onClick={ExportHandler}>
              Export to O365:<span className='poppins-light text-white'> {selectTask?.length} Task</span>
              {/* <CSVLink {...csvReport}>
                Expoted to O365:<span className='poppins-light text-white'> {selectTask?.length} Task</span>
              </CSVLink> */}
            </button>
          </div>
          <div className='table-wrapper'>
            <table className='table'>
              <thead>
                <tr>
                  <th>
                    <label
                      className={`checkboxLabel ${selectTask?.length === taskData?.length ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedTaskData(selectTask, taskData, selectTask?.length === taskData?.length);
                        // setSelectTask(selectTask?.length !== taskData?.length ? taskData?.reduce((prev, next) => [...prev, next.id], []) : []);
                        // localStorage.setItem(
                        //   'selectedTaskId',
                        //   JSON.stringify(selectTask?.length !== taskData?.length ? taskData?.reduce((prev, next) => [...prev, next.id], []) : [])
                        // );
                      }}
                    >
                      {selectTask?.length === taskData?.length && <TiTick className='activeIcon' />}
                    </label>
                  </th>
                  <th className='poppins-semibold'>
                    Employee Name
                    <RiArrowUpDownLine
                      className='mx-1 UpDownArrow'
                      onClick={() => {
                        setOrder(!order);
                        handleSort('employee', 'employee');
                      }}
                    />
                  </th>
                  <th className='poppins-semibold'>
                    Title
                    <RiArrowUpDownLine
                      className='mx-1 UpDownArrow'
                      onClick={() => {
                        setOrder(!order);
                        handleSort('title', 'title');
                      }}
                    />
                  </th>
                  <th className='poppins-semibold'>
                    Cornerstone
                    <RiArrowUpDownLine
                      className='mx-1 UpDownArrow'
                      onClick={() => {
                        setOrder(!order);
                        handleSort('task', 'cornerstone');
                      }}
                    />
                  </th>
                  <th className='poppins-semibold'>
                    Start Date
                    <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={DateSortingHandler} />
                  </th>
                  <th className='poppins-semibold'>
                    Due Date
                    <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={DateSortingHandler} />
                  </th>
                  <th className='poppins-semibold'>
                    Status
                    <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('status')} />
                  </th>
                  <th className='poppins-semibold'>
                    Exported
                    <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('exported')} />
                  </th>
                  <th className='poppins-semibold'>Actions </th>
                  <th className='poppins-semibold'>Completion </th>
                </tr>
              </thead>

              <tbody>
                {taskData?.map((obj, i) => {
                  const color_data = theme.cornerStone.find((cs) => {
                    if (cs.text === obj.task.cornerstone) return cs;
                  });
                  return (
                    <tr key={i}>
                      <td>
                        <label
                          className={`checkboxLabel ${selectTask.indexOf(obj?.id) !== -1 ? 'active' : ''}`}
                          onClick={() => {
                            handleSelectedTask(obj?.id, selectTask.indexOf(obj?.id) !== -1, obj);
                          }}
                        >
                          {selectTask.indexOf(obj?.id) !== -1 && <TiTick className='activeIcon' />}
                        </label>
                      </td>
                      <td>
                        <div className='profile-container'>
                          <span className='image-container'>
                            {/* <img src={obj?.employee?.profile_pic || EMployeeImg} alt='image' /> */}
                            <img src={obj?.employee?.profile_pic} alt='image' />
                          </span>
                          {newWorking?.state == obj?.id ? (
                            <span className='name poppins-bold'>{obj?.employee?.employee}</span>
                          ) : (
                            <span className='name poppins-light'>{obj?.employee?.employee}</span>
                          )}
                        </div>
                      </td>
                      {/* <td className='poppins-light'> {obj?.task?.task_comp?.[0]?.text}</td> */}
                      <td>
                        {newWorking?.state == obj?.id ? (
                          <ToolTip toolTipText={obj?.title}>
                            <div className='poppins-bold'> {obj?.title?.substring(0, 36)} ...</div>
                          </ToolTip>
                        ) : (
                          <ToolTip toolTipText={obj?.title}>
                            <div className='poppins-light'> {obj?.title?.substring(0, 36)} ...</div>
                          </ToolTip>
                        )}
                      </td>

                      <td className='poppins-light'>
                        <p style={{ padding: '5px', borderRadius: '14px', color: '#fff', textAlign: 'center', backgroundColor: color_data?.color }}>{obj?.task?.cornerstone}</p>
                      </td>
                      {newWorking?.state == obj?.id ? (
                        <td className='poppins-bold'>{obj?.start_date == null ? '-' : obj?.start_date}</td>
                      ) : (
                        <td className='poppins-light'>{obj?.start_date == null ? '-' : obj?.start_date}</td>
                      )}
                      {newWorking?.state == obj?.id ? (
                        <td className='poppins-bold'>{obj?.due_date == null ? '-' : obj?.due_date}</td>
                      ) : (
                        <td className='poppins-light'>{obj?.due_date == null ? '-' : obj?.due_date}</td>
                      )}

                      {newWorking?.state == obj?.id ? (
                        <td className='poppins-bold'>{obj?.status == '1' ? 'Not Started' : obj?.status == '2' ? 'In Progress' : obj?.status == '3' ? 'Completed' : null}</td>
                      ) : (
                        <td className='poppins-light'>{obj?.status == '1' ? 'Not Started' : obj?.status == '2' ? 'In Progress' : obj?.status == '3' ? 'Completed' : null}</td>
                      )}

                      {newWorking?.state == obj?.id ? (
                        <td className='poppins-bold'>{obj?.exported == false ? 'No' : 'Yes'}</td>
                      ) : (
                        <td className='poppins-light'>{obj?.exported == false ? 'No' : 'Yes'}</td>
                      )}

                      <td>
                        {/* modal Start */}
                        <div className='modal fade Onboard_Modal' id='exampleModalCenter' tabIndex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>
                          <div className='modal-dialog modal-dialog-centered' role='document'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h5 className='modal-title poppins-semibold' id='exampleModalLongTitle'>
                                  Task Information
                                </h5>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                  <span aria-hidden='true'>&times;</span>
                                </button>
                              </div>
                              <div className='modal-body'>
                                <div className='container '>
                                  <div className='row mt-2'>
                                    <div className='col-md-6 '>
                                      <div className='mb-3 Table_txt '>
                                        <label className='poppins-semibold'>Employee Name </label>
                                        <input type='text' name='' id='' className='form-control' value={values?.employee?.employee} disabled />
                                      </div>
                                      <div className='mb-3 Table_txt'>
                                        <label className='poppins-semibold'>WBS ID</label>
                                        <input
                                          type='text'
                                          name='wbs_id'
                                          id='wbs_id'
                                          className='form-control'
                                          value={values?.wbs_id}
                                          disabled={disableField == true}
                                          onChange={(event) => handleChange(event, 'WBSID', 'newDate', 'endDate')}
                                        />
                                      </div>
                                      <div className='mb-3 Table_txt'>
                                        <label className='poppins-semibold'>Cornerstone</label>
                                        <input type='text' name='' id='' className='form-control' value={values?.task?.cornerstone} disabled />
                                      </div>
                                      <div className='mb-3 Table_txt'>
                                        <label className='poppins-semibold'>Status</label>
                                        <select
                                          className='form-control mb-3'
                                          name='status'
                                          value={values?.status}
                                          onChange={(event) => handleChange(event, 'Status', 'newDate', 'endDate')}
                                          disabled={disableField == true}
                                        >
                                          <option value={'1'}>Not Started</option>
                                          <option value={'2'}>In Progress</option>
                                          <option value={'3'}>Completed</option>
                                        </select>
                                      </div>
                                      {errors.status && (
                                        <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                                          {errors.status}
                                        </p>
                                      )}

                                      <div className='mb-2 Table_txt'>
                                        <label className='poppins-semibold'>Start Date</label>
                                        <DatePicker
                                          selected={passStartDate}
                                          onChange={(event) =>
                                            handleChange(event, 'StartDate', values?.onboarding_plan?.onboarding_startdate, values?.onboarding_plan?.onboarding_enddate)
                                          }
                                          className='form-control'
                                          placeholderText='MM/DD/YYYY'
                                          disabled={disableField == true}
                                          customInput={<input type='text' id='start_date' placeholder='Date' />}
                                        />

                                        {/* <input type='date' name='start_date' id='' className='form-control' value={values?.start_date}
                                          // min={values?.onboarding_plan?.onboarding_startdate}
                                          // disabled={!values?.onboarding_plan?.onboarding_startdate}
                                          disabled={disableField == true}
                                          onChange={event =>
                                            handleChange(event, 'StartDate', values?.onboarding_plan?.onboarding_startdate, values?.onboarding_plan?.onboarding_enddate)} /> */}
                                      </div>
                                      {startDateError && (
                                        <p className='text-danger text-left' style={{ margin: '0px 9px', fontSize: '13px' }}>
                                          Start date is required
                                        </p>
                                      )}
                                      <div className='mb-2 Table_txt'>
                                        <label className='poppins-semibold'>Due Date</label>
                                        <DatePicker
                                          selected={passDueDate}
                                          onChange={(date) => {
                                            endDatehandleChange(date, values?.onboarding_plan?.onboarding_enddate);
                                          }}
                                          className='form-control'
                                          placeholderText='MM/DD/YYYY'
                                          disabled={disableField == true}
                                          customInput={<input type='text' id='due_date' placeholder='Date' />}
                                          minDate={new Date(dueDateDisable)}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 EditTable_Body mb-3 Table_txt'>
                                      {/* <div className='col-lg-6 col-md-6 col-sm-12 col-12'> */}

                                      <div className='d-flex preferred-plan-box'>
                                        <div className='onboarding-plan-img'>
                                          <img src={TOOLS_ICON} />
                                        </div>
                                        <div className='onboarding-plan-text ml-3 w-100'>
                                          <h3 className='poppins-semibold'>YOUR PREFERRED TOOLS</h3>
                                          <div className='onboarding-plan-simpletext mt-4'>
                                            <div className='d-flex justify-content-between align-items-center mt-2'>
                                              <div
                                                className='col-md-9 p-0 onboarding-plan-link'
                                                onClick={() =>
                                                  window.open(
                                                    values?.task?.cornerstone == 'CONNECTION'
                                                      ? CONNECTION_VIEDO
                                                      : values?.task?.cornerstone == 'CLARIFICATION'
                                                      ? CLARIFICATION_VIEDO
                                                      : values?.task?.cornerstone == 'CULTURE'
                                                      ? CULTURE_VIEDO
                                                      : values?.task?.cornerstone == 'COMPLIANCE'
                                                      ? COMPLIANCE_VIEDO
                                                      : CONNECTION_VIEDO
                                                  )
                                                }
                                              >
                                                <p>{`Understanding ${values?.task?.cornerstone}`}</p>
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

                                      {/* </div> */}
                                      <div className='Table_txt mb-2  task-due-date'>
                                        <label className='poppins-semibold'>Onboarding Start Date</label>
                                        <div className='task-field-area'>{getOnboardingStartDateFormate(values?.onboarding_plan?.onboarding_startdate)}</div>
                                      </div>
                                      <div className='Table_txt mb-2'>
                                        <label className='poppins-semibold'>Onboarding End Date</label>
                                        <div className='task-field-area'>{getOnboardingEndDateFormate(values?.onboarding_plan?.onboarding_Enddate)}</div>
                                      </div>
                                    </div>
                                    <div className='col-md-12'>
                                      <div className='row m-0'>
                                        <div className='p-0 col-md-12'>
                                          <div className='Table_txt mb-3 '>
                                            <label className='poppins-semibold'>Focus Area</label>
                                            <div className='task-field-area'>{values?.task?.text}</div>
                                            {/* <input type='text' name='' id='' className='form-control' value={values?.task?.text} disabled /> */}
                                          </div>
                                          <div className='Table_txt mb-3 '>
                                            <label className='poppins-semibold'>Task</label>
                                            <div className='task-field-area d-flex justify-content-between'>
                                              <p className='task-field-data' style={{ width: '85%' }}>
                                                {values?.task?.task_comp[0]?.text}
                                              </p>
                                              <div className='task-mark-complete'>
                                                <div className='mark-complete'>Mark complete</div>
                                                <label></label>
                                                <input
                                                  type='checkbox'
                                                  name='taskValue'
                                                  id='taskValue'
                                                  className='taskValue'
                                                  value={taskValue}
                                                  checked={taskValue == true}
                                                  onChange={taskChangeHandler}
                                                  disabled={disableField == true}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-md-12 Table_txt text-center'>
                                      <label className='poppins-semibold mb-3 text-uppercase'>Recommendation </label>
                                      <div className='row m-0'>
                                        <div className='form-control h-auto task-format'>
                                          {values?.task?.task_comp[0]?.task_recom.map((taskRecom, index) => GeneralProdComp(taskRecom, index))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='modal-footer'>
                                <button type='button' className='btn Btn_Save' onClick={() => handlePost()} disabled={disableField == true}>
                                  Save
                                </button>
                                <button
                                  type='button'
                                  className='btn Btn_Close'
                                  data-dismiss='modal'
                                  onClick={singleExportHandler}
                                  // ref={addModalClose}
                                >
                                  Sync
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* modal End */}
                        <div className='action d-flex  m-0'>
                          <MdOutlineModeEditOutline
                            className='Action_Icon'
                            title='Edit Task'
                            data-toggle='modal'
                            data-target='#exampleModalCenter'
                            onClick={(e) => {
                              handleClick(obj);
                            }}
                          />
                          <MdDeleteOutline className='Action_Icon1' title='Delete Task' onClick={() => handleDelete(obj.id)} />
                        </div>
                      </td>
                      <td className='poppins-light'>
                        <span className='completion_status_red'>{obj.completion_status > 0 && obj.completion_status <= 12.5 && obj?.completion_status + '%'}</span>
                        <span className='completion_status_yellow'>{obj.completion_status > 12.5 && obj.completion_status <= 75 && obj?.completion_status + '%'}</span>
                        <span className='completion_status_green'>{obj.completion_status > 75 && obj.completion_status <= 99 && obj?.completion_status + '%'}</span>
                        <span>{obj.completion_status == 100 && <img src={TROPHY} />}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {popUpOpen && (
        <div className='custom-popup'>
          <div className='popup-content'>
            <hr />
            <div className={'popup-head'}>
              <h4 style={{ color: 'black', fontSize: '15px' }}>Are you sure you want to delete this task?</h4>
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
      )}
    </>
  );
};

export default Tasks;
