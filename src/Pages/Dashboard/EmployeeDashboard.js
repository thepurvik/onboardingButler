import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/DashboardCss/EmployeeDashboard.css';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { Additions_Icon } from '../../assets/icons/Additions_Icon';
import { ImportFile_Icon } from '../../assets/icons/ImportFile_Icon';
import { useNavigate } from 'react-router-dom';
import {
  CreatedAtDateSorting,
  Create_employee,
  deleteEmployeeData,
  getEmployeeByName,
  Get_All_Emp,
  Get_Divison,
  Get_Group,
  Send_Mail,
  Update_Employee_Data,
} from '../../assets/API/Apis';
import { MdDeleteOutline, MdOutlineDeleteOutline, MdOutlineEmail } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../assets/API/axiosInstances';
import { TiTick } from 'react-icons/ti';
import Loader from '../../components/Loader';
// import { exportFile, preferredOrder } from './csv';
import { API_BASE_URLS, Timezone } from '../../assets/Helper/constant';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { IsAuthenticated } from '../../assets/Helper/utils';
import ExcelExportHelper from './ExcelExportHelper';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import COUNTRYLIST from '../../Country_Nationality_List.json';

const blank_state = {
  email: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  language: '',
  mobile: '',
  city: '',
  timezone: '',
  user_type: '',
  country: '',
  dob: null,
  gender: 'others',
  nationality: '',
  division: '',
  groups: [],
};

const exportColumnHeader = {
  id: 'Id',
  full_name: 'Name',
  profile_pic: 'Profile Pic',
  email: 'Email',
  mobile: 'Mobile',
  createdAt: 'Created At',
};

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
    first_name: 'First name Required',
    last_name: 'Last name Required',
    // gender: 'Select one Option',
    // timezone: 'Select one Option',
    user_type: 'Select one Option',
    // dob: 'Birth date is Required',
  },
  invalid: {
    email: '',
    first_name: '',
    last_name: '',
    // gender: '',
    // timezone: '',
    user_type: '',
    // dob: '',
  },
};

const EmployeeDashboard = () => {
  const Navigate = useNavigate();
  const [selectTask, setSelectTask] = useState([]);
  const [state, setState] = useState('ASC');
  const [search, setSearch] = useState();
  const [Asc, setAsc] = useState(true);
  const [AllDivisionData, setAllDivisionData] = useState([]);
  const [AllGroupData, setAllGroupData] = useState([]);
  // const [active, setActive] = useState([])
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);
  const [mailPopUpOpen, setMailPopUpOpen] = useState(false);
  const [mailIsSubmitted, setMailIsSubmitted] = useState('');
  const [isSubmitted, setIsSubmitted] = useState('');
  const [allEmpData, setAllEmpData] = useState({
    full_name: '',
  });

  const [values, setValues] = useState({
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    language: '',
    mobile: '',
    city: '',
    timezone: '',
    user_type: '',
    country: '',
    dob: null,
    gender: 'others',
    nationality: '',
    division: '',
    groups: [],
  });

  const [errors, setErrors] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [override, setOverride] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyData, setVerifyData] = useState(false);
  const [showAllEmployeeSelect, setShowAllEmployeeSelect] = useState(false);

  const [groupsList, setGroupsList] = useState([]);
  const [selectGroups, setSelectGroups] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const [newSelectedData, setNewSelectedData] = useState([]);

  const dragbox = useRef(null);
  const addModalClose = useRef(null);
  const bulkModalClose = useRef(null);

  const company = window.location.hostname?.split('.')?.[0];
  const Auth = IsAuthenticated()?.user?.access;

  // fetching all Employee Data data....
  const getAllEmployees = () => {
    let setNewEmployeeCount = [];
    setLoading(true);
    Get_All_Emp()
      .then((response) => {
        setAllEmpData(response?.data);
        response?.data.forEach((element) => {
          if (element.is_deleted == true) {
            setNewEmployeeCount.push(element.id);
            if (setNewEmployeeCount.length > 0) {
              setShowAllEmployeeSelect(true);
            }
          }
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  // searching by employee name

  const getEmployeeByNameFn = (search) => {
    getEmployeeByName(search)
      .then((response) => {
        setAllEmpData(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const execute = function (fn, delay) {
  //   let timer;
  //   return function () {
  //     let context = this,
  //       args = arguments;
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       fn.apply(context, arguments);
  //     }, delay);
  //   };
  // };

  // const searchHandler = (e) => {
  //   if (e.target.value === '') {
  //     getAllEmployees();
  //   } else {
  //     getEmployeeByNameFn(e.target.value);
  //   }
  // };

  useEffect(() => {
    getAllEmployees();
    GetAllDivision();
    GetAllGroup();
    setSelectTask([]);
    setNewSelectedData([]);
    setFile(null);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    Navigate(`/contact_info/${id}/`, { state: { id: id } });
  };

  // Employee handleDelete api call...
  const handleDelete = async (id) => {
    setIsSubmitted(id);
    setPopUpOpen(true);
  };

  const Confirmhandler = async (id = isSubmitted) => {
    try {
      await axiosInstance
        .delete(`/dashboard/structure/employee/${id}/`)
        .then((response) => {
          if (response.data.status == 200) {
            toast.dismiss();
            toast.success(response.data.message);
          } else {
            toast.dismiss();
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error("User can't be deleted");
        });

      // let delData = allGroup.filter((item) => {
      //   return item.id !== id;
      // });
      await Get_All_Emp();
      getAllEmployees();
      setPopUpOpen(false);
      // toast.success('Employee deleted successfully');
    } catch (error) {
      console.log(error);
      console.log('Something Want Wrong');
    }
  };

  const handleMail = async (id, row) => {
    setMailIsSubmitted(id);
    setMailPopUpOpen(true);
    setEmailData(row?.full_name);
  };
  const ConfirmMailhandler = async (id = mailIsSubmitted) => {
    setMailPopUpOpen(false);
    await Send_Mail({ id })
      .then((response) => {
        Get_All_Emp();
        getAllEmployees();
        toast.dismiss();
        toast.success('Mail Sent successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addIconEmpHandler = () => {
    setValues(blank_state);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handlepost = async (e) => {
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

    e.preventDefault();
    await Create_employee(values)
      .then((response) => {
        if (response?.status === 400) {
          toast.dismiss();
          toast.error(response?.message);
        } else {
          if (response.data.user_type == 2) {
            toast.dismiss();
            toast.success('Hiring Manager created successfully');
          } else {
            toast.dismiss();
            toast.success('Employee created successfully');
          }
          // toast.success(response?.message);
          getAllEmployees();
          addModalClose.current.click();
        }
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  // PATCH api for employee details updations...
  const changeEmpStatusAPI = async (is_active, id) => {
    await Update_Employee_Data({ id: id, is_active: !is_active })
      .then((response) => {
        if (is_active == true) {
          is_active = false; // console.log(staus);
          if (response.data.user_type == 2) {
            toast.dismiss();
            toast.error('Hiring Manager deactivated.');
          } else {
            toast.dismiss();
            toast.error('Employee deactivated.');
          }
        } else {
          is_active = true;
          if (response.data.user_type == 3) {
            toast.dismiss();
            toast.success('Employee activated.');
          } else {
            toast.dismiss();
            toast.success('Hiring Manager activated.');
          }
        }
        // // toast.success(response.message);
      })
      .catch((err) => {
        toast.error(err.response.message);
        console.log(err.message);
      });
    getAllEmployees();
  };

  const handleSelectedTask = (id, deleteData) => {
    let tempCount = deleteCount;
    if (selectTask.indexOf(id) !== -1) {
      let tempArray = [...selectTask];
      tempArray.splice(selectTask?.indexOf(id), 1);
      setSelectTask(tempArray);
      if (deleteData == true) {
        tempCount -= 1;
      }
      setDeleteCount(tempCount);
      return;
    }
    setSelectTask([...selectTask, id]);
    if (deleteData == true) {
      tempCount += 1;
    }
    setDeleteCount(tempCount);
    return;
  };

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  const filtered = !search
    ? allEmpData
    : allEmpData.filter(
        (person) =>
          person?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
          person?.email?.toLowerCase().includes(search.toLowerCase()) ||
          person?.mobile?.toLowerCase().includes(search.toLowerCase())
      );

  const sorting = (col) => {
    if (state === 'ASC') {
      const sorter = [...allEmpData].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
      setAllEmpData(sorter);
      setState('DSC');
    }
    if (state === 'DSC') {
      const sorter = [...allEmpData].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
      setAllEmpData(sorter);
      setState('ASC');
    }
  };

  const getCreatedAtDate = (data) => {
    CreatedAtDateSorting(data)
      .then((response) => {
        setAllEmpData(response?.data);
        setSelectTask([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleCreatedAtDate = () => {
    Asc ? getCreatedAtDate({ sort_type: 'asc' }) : getCreatedAtDate({ sort_type: 'desc' });
    setAsc(!Asc);
  };

  // fetching all Division data....
  const GetAllDivision = () => {
    Get_Divison()
      .then((response) => {
        setAllDivisionData(response?.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  // fetching all group data....
  const GetAllGroup = () => {
    Get_Group()
      .then((response) => {
        setAllGroupData(response?.data);
        let tempArr = [];
        {
          response?.data.map((x) => {
            tempArr.push({ name: x?.name, id: x?.id });
          });
        }
        setGroupsList(tempArr);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const addBulkEmpHandler = () => {
    setFile(null);
    setVerify(false);
    setVerifyData(false);
    setOverride(false);
    setUpdate(false);
  };

  const handleBulkModalClick = async () => {
    if (file == null) {
      toast.error('Please select file');
    } else {
      setLoading(true);
      if (file.type == 'text/csv' || file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type == 'application/vnd.ms-excel') {
        const formData = new FormData();
        formData.append('csv_file', file);
        formData.append('update', update.toString());
        // formData.append('override', override.toString());
        formData.append('verify', verify.toString());
        // formData.append('verifyData', verifyData.toString());
        await axios({
          method: 'post',
          url: API_BASE_URLS.baseUrl_V1 + '/dashboard/structure/UserCsvImportAPI',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            company: company || '',
            Authorization: Auth ? `Bearer ${Auth}` : '',
          },
        })
          .then(function (response) {
            toast.dismiss();
            bulkModalClose.current.click();
            // setFile(null);
            setLoading(false);
            setVerify(false);
            getAllEmployees();
            setVerifyData(false);
            setOverride(false);
            setUpdate(false);
            setTimeout(() => {
              toast.success(response?.data?.message);
            }, 3000);
            return response.data;
          })
          .catch(function (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message);
            getAllEmployees();
            setLoading(false);
            setFile(null);
            setVerify(false);
            setVerifyData(false);
            setOverride(false);
            setUpdate(false);
            throw new Error(error?.response?.data?.message);
          });
      } else {
        toast.error('Invalid File Type..!');
      }
    }
  };

  const handleSelectMultipleStandard = (selectedList) => {
    let selectedVal = selectedList.map(({ id }) => id);
    setSelectGroups(selectedList);
    setValues({
      ...values,
      groups: selectedVal,
    });
  };

  const handleRemoveMultipleStandard = (selectedList) => {
    let selectedVal = selectedList.map(({ id }) => id);
    setSelectGroups(selectedList);
    setValues({
      ...values,
      groups: selectedVal,
    });
  };

  const deleteEmployee = () => {
    if (newSelectedData.length > 0 || selectTask.length > 0) {
      let newData = {};
      if (newSelectedData.length > 0) {
        newData = {
          list_id: newSelectedData,
        };
      } else {
        newData = {
          list_id: selectTask,
        };
      }
      setDeletePopUpOpen(false);
      setFile(null);
      setLoading(true);
      deleteEmployeeData(newData)
        .then((response) => {
          setLoading(false);
          setShowAllEmployeeSelect(false);
          setSelectTask([]);
          setNewSelectedData([]);
          getAllEmployees();
          setDeleteCount(0);
          toast.success(response?.message);
        })
        .catch(function (error) {
          setLoading(false);
        });
    } else {
      setDeletePopUpOpen(false);
      toast.error('No employee is selected !!');
    }
  };

  const selectAllTask = (allEmpData, status) => {
    let setSelectDelete = [];
    if (status == false) {
      allEmpData?.forEach((next) => {
        if (next.is_deleted == true) {
          setNewSelectedData(newSelectedData.push(next.id));
          setSelectDelete.push(next.id);
        }
      });

      if (newSelectedData.length == 0) {
        setSelectTask([]);
        setSelectDelete = [];
        toast.error('No employee can be deleted !!');
      }
    } else {
      setNewSelectedData([]);
    }
    setDeleteCount(setSelectDelete.length);
  };

  return (
    <>
      {/* <div className='col-lg-10 col-md-9 p-0  align-items-stretch'> */}
      <div className='row align-items-center justify-content-between m-3'>
        <div className='row align-items-center Search_Body m-0'>
          <div className='input-group flex-nowrap Search_Input '>
            <div className='input-group-prepend'>
              <span className='input-group-text SeachIcon' id='addon-wrapping'>
                <SearchIcon />
              </span>
            </div>
            <input type='text' className='form-control Input_type' placeholder='Search' aria-label='Search' aria-describedby='addon-wrapping' onChange={handlesearch} />
          </div>
        </div>

        <div className='d-flex align-items-center Default_Body'>
          <div className='Default_Icon' title='Delete Employee' onClick={() => setDeletePopUpOpen(true)}>
            <MdOutlineDeleteOutline />
          </div>
          <div className='Default_Icon' title='Export'>
            <ExcelExportHelper data={allEmpData} />
          </div>
          <div className='Default_Icon' data-toggle='modal' title='create' data-target='#exampleModalCenter' onClick={addIconEmpHandler}>
            <Additions_Icon />
          </div>
          {/* Addition Model Start*/}
          <div
            className='modal fade Onboard_Modal'
            id='exampleModalCenter'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='exampleModalCenterTitle'
            aria-hidden='true'
            data-backdrop='static'
            data-keyboard='false'
          >
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLongTitle'>
                    Add Employee Information
                  </h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='col-lg-12 EditTables_Body'>
                        <table className='w-100 '>
                          <tr>
                            <td>
                              <label className='poppins-regular'>First name*</label>
                              <input type='text' name='first_name' value={values?.first_name} className='form-control' placeholder='Enter First name' onChange={handleChange} />
                            </td>
                          </tr>
                          {errors.first_name && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.first_name}
                            </p>
                          )}
                          <tr>
                            <td>
                              <label className='poppins-regular'>Last name*</label>
                              <input type='text' name='last_name' value={values?.last_name} className='form-control' placeholder='Enter Last Name' onChange={handleChange} />
                            </td>
                          </tr>
                          {errors.last_name && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.last_name}
                            </p>
                          )}
                          <tr>
                            <td>
                              <label className='poppins-regular'>Phone</label>
                              <input
                                type='tel'
                                name='mobile'
                                value={values?.mobile}
                                className='form-control'
                                placeholder='Enter Phone Number'
                                onChange={(e) => {
                                  if (e.target.value.length == 11 || isNaN(e.target.value)) {
                                    return false;
                                  } else {
                                    handleChange(e);
                                  }
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className='poppins-regular'>City</label>
                              <input type='text' name='city' value={values?.city} className='form-control' placeholder='Enter City' onChange={handleChange} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className='poppins-regular'>Time Zone</label>
                              {/* <input type='text' name='timezone' value={values?.timezone} className='form-control' placeholder='GMT+2' onChange={handleChange} /> */}
                              <select className='form-control' name='timezone' value={values?.timezone} onChange={handleChange}>
                                <option selected value='' disabled hidden>
                                  Select Time Zone
                                </option>
                                {Timezone.map((row, i) => (
                                  <option>{row.timezone}</option>
                                ))}
                                {/* <option>UTC</option> */}
                              </select>
                            </td>
                          </tr>
                          {/* {errors.timezone && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.timezone}
                            </p>
                          )} */}
                          <tr>
                            <label className='poppins-regular'>Gender</label>
                            <select className='form-control' name='gender' value={values?.gender} onChange={handleChange}>
                              <option value='others'>Other</option>
                              <option value='male'>Male</option>
                              <option value='female'>Female</option>
                            </select>
                          </tr>
                          {/* {errors.gender && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.gender}
                            </p>
                          )} */}
                          <tr>
                            <td>
                              <label className='poppins-regular'>Role*</label>
                              <select className='form-control' name='user_type' value={values?.user_type} onChange={handleChange}>
                                <option selected value='' disabled>
                                  Select Role
                                </option>
                                <option value={'2'}>Hiring Manager</option>
                                <option value={'3'}>Employee</option>
                              </select>
                            </td>
                          </tr>
                          {errors.user_type && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.user_type}
                            </p>
                          )}
                          <tr>
                            <td>
                              <label className='poppins-regular'>Groups</label>
                              {/* <select className='form-control' name='groups' onChange={handleChange}>
                                <option selected disabled>
                                  Select Group
                                </option>
                                {AllGroupData?.map((row) => (
                                  <option value={row?.id}>{row?.name}</option>
                                ))}
                              </select> */}
                              {/* <Multiselect options={AllGroupData} displayValue='name' placeholder='Select Groups' hidePlaceholder={true} /> */}
                              <Multiselect
                                options={groupsList} // Options to display in the dropdown
                                selectedValues={selectGroups} // Preselected value to persist in dropdown
                                onSelect={handleSelectMultipleStandard} // Function will trigger on select event
                                onRemove={handleRemoveMultipleStandard} // Function will trigger on remove event
                                displayValue='name' // Property name to display in the dropdown options
                                placeholder='Select Groups'
                                hidePlaceholder={true}
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='col-md-12 EditTables_Body'>
                        <table className='w-100 '>
                          <tr>
                            <td>
                              <label className='poppins-regular'>Middle name</label>
                              <input type='text' name='middle_name' value={values?.middle_name} className='form-control' placeholder='Enter Middle name' onChange={handleChange} />
                            </td>
                          </tr>
                          {/* {errors.middle_name && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.middle_name}
                            </p>
                          )} */}

                          <tr>
                            <td>
                              <label className='poppins-regular'>Email*</label>
                              <input type='email' name='email' value={values?.email} className='form-control' placeholder='Enter Email' onChange={handleChange} />
                            </td>
                          </tr>
                          {errors.email && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.email}
                            </p>
                          )}
                          <tr>
                            <label className='poppins-regular'>Country</label>
                            <select className='form-control' name='country' value={values?.country} onChange={handleChange}>
                              <option selected>Select Country</option>
                              {COUNTRYLIST.map((row, i) => (
                                <option>{row?.en_short_name}</option>
                              ))}
                            </select>
                          </tr>
                          <tr>
                            <td>
                              <label className='poppins-regular'>Language</label>
                              <select className='form-control' name='language' value={values?.language} onChange={handleChange}>
                                <option>Select Language</option>
                                <option>English</option>
                                <option>Danish</option>
                                <option>French </option>
                                <option>Italian </option>
                                <option>Spanish </option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className='poppins-regular'>Date Of Birth</label>
                              <input
                                type='date'
                                name='dob'
                                value={values?.dob}
                                max={new Date().toISOString().split('T')[0]}
                                onKeyDown={(e) => {
                                  e.preventDefault();
                                }}
                                className='form-control'
                                placeholder='YYYY-MM-DD'
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                          {/* {errors.dob && (
                            <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                              {errors.dob}
                            </p>
                          )} */}
                          <tr>
                            <td>
                              <label className='poppins-regular'>Nationality</label>
                              <select className='form-control' name='nationality' value={values?.nationality} onChange={handleChange}>
                                <option selected>Select Nationality</option>
                                {COUNTRYLIST.map((row, i) => (
                                  <option>{row?.nationality}</option>
                                ))}
                              </select>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <label className='poppins-regular'>Organization</label>
                              <select className='form-control' name='division' onChange={handleChange}>
                                <option selected disabled>
                                  Select Organization
                                </option>
                                {AllDivisionData?.map((row) => (
                                  <option value={row?.id}>{row?.division_name}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn Btn_Save'
                    // disabled={
                    //   (
                    //     values.dob &&
                    //     values.email &&
                    //     values.first_name &&
                    //     values.gender &&
                    //     values.last_name &&
                    //     values.timezone &&values?.user_type ) === ''
                    // }
                    onClick={handlepost}
                  >
                    Save
                  </button>
                  <button type='button' className='btn Btn_Close' data-dismiss='modal' ref={addModalClose} onClick={() => setErrors('')}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Addition Model End*/}

          {/* Bulk Model start*/}
          <div className='modal fade' id='myModal' style={{ marginTop: '20px' }}>
            <div className='modal-dialog bulk-modal-dialog' style={{ maxWidth: '60%', margin: 'auto' }}>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title poppins-bold'>Import users</h5>
                  <button type='button' className='close m-0' data-dismiss='modal' ref={bulkModalClose}>
                    &times;
                  </button>
                </div>
                <div className='modal-body'>
                  <div>
                    <span>
                      Use the form below to import or update one or more users. Simply {/* onClick={handleCsv} */}
                      <a href='https://butler-media.fra1.digitaloceanspaces.com/obb.xlsx' className='poppins-semibold'>
                        download the template file
                      </a>
                      and then add your user data.
                    </span>
                    <br />
                    <br />
                    {/* <span className='poppins-bold'>First time uploading users:</span> */}
                    <div className='d-flex align-items-center ml-5'>
                      <input type='checkbox' className='mx-2' onClick={() => setVerify(!verify)} checked={verify} />
                      <span>verify import file only</span>
                      <br />
                    </div>
                    {/* <h6 className='ml-3'>Once you have verified your import file,simply click upload in the form below.</h6>
                    <span className='poppins-bold'>Changes to existing users:</span> */}

                    {/* <div className='d-flex align-items-center ml-5'>
                      <input type='checkbox' className='mx-2' onClick={() => setVerifyData(!verifyData)} checked={verifyData} />
                      <span>verify import file only</span>
                    </div> */}
                    <div className='d-flex align-items-center ml-5'>
                      <input type='checkbox' className='mx-2' onClick={() => setUpdate(!update)} checked={update} />
                      <span>Update users</span>
                    </div>
                    {/* <div className='d-flex align-items-center ml-5'>
                      <input type='checkbox' className='mx-2' onClick={() => setOverride(!override)} checked={override} />
                      <span>Override mandatory checks (excluding username, first name , surname)</span>
                    </div> */}
                    <br />
                    <div style={{ background: '#d1cdcd' }}>
                      <div
                        style={{ width: '100%', height: '275px', background: 'transparent', border: '1px solid grey', position: 'relative', flexDirection: 'column' }}
                        className='d-flex align-items-center justify-content-center'
                        id='dragbox'
                        ref={dragbox}
                      >
                        <h5 className='my-2 poppins-semibold'>{file ? file.name : 'Drag and drop file here'}</h5>
                        <div>
                          <label htmlFor='upload-profile'>
                            <div className=''>
                              <a style={{ cursor: 'pointer' }} className='btn btn-secondary btn-md my-2 mr-3 poppins-semibold'>
                                Browse...
                              </a>
                            </div>
                          </label>

                          <input
                            type='file'
                            name='csv_file'
                            id='upload-profile'
                            // accept='file/*'
                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            onClick={(event) => {
                              event.target.value = null;
                            }}
                            style={{ height: '100%', width: '50%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                            }}
                            onDragEnterCapture={() => (dragbox.current.style.background = '#959595')}
                            onDropCapture={() => (dragbox.current.style.background = 'transparent')}
                            onDragLeaveCapture={() => (dragbox.current.style.background = 'transparent')}
                          />
                          <button className='btn poppins-semibold' style={{ border: '1px solid grey' }} data-dismiss='modal' onClick={(e) => handleBulkModalClick(e)}>
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn poppins-semibold' style={{ backgroundColor: '#fff', border: '2px solid #e6e6e7', color: 'black' }} data-dismiss='modal'>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Bulk Model End*/}
          <div className='Default_Icon' title='Bulk Upload Employee' data-toggle='modal' data-target='#myModal' onClick={() => addBulkEmpHandler()}>
            <ImportFile_Icon />
          </div>
        </div>
      </div>
      <div className='Employee_Table m-3'>
        <div className='Emptable-wrapper'>
          <table className='table table-bordered Action_Part'>
            <thead>
              <tr>
                <th>
                  {showAllEmployeeSelect && (
                    <label
                      className={`checkboxLabel ${selectTask?.length === allEmpData?.length ? 'active' : ''}`}
                      onClick={() => {
                        selectAllTask(allEmpData, selectTask?.length === allEmpData?.length);
                        setSelectTask(selectTask?.length !== allEmpData?.length ? allEmpData?.reduce((prev, next) => [...prev, next.id], []) : []);
                      }}
                    >
                      {selectTask?.length === allEmpData?.length && <TiTick className='activeIcon' />}
                    </label>
                  )}
                </th>
                <th className='poppins-semibold'>
                  Employee Name
                  <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('full_name')} />
                </th>
                <th className='poppins-semibold'>
                  Email
                  <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('email')} />
                </th>
                <th className='poppins-semibold'>
                  Phone
                  {/* <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('mobile')} /> */}
                </th>
                <th className='poppins-semibold'>
                  Role
                  <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('user_type')} />
                </th>
                <th className='poppins-semibold'>
                  Created
                  <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => HandleCreatedAtDate()} />
                </th>
                {/* <th className='poppins-semibold'>First day at work</th>
                <th className='poppins-semibold'>Status</th> */}
                <th className='poppins-semibold'>Active/InActive</th>
                <th className='poppins-semibold'>Action</th>
              </tr>
            </thead>
            {/* map method to render all emp data in the list */}
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <Loader file={file} />
                  </td>
                </tr>
              </tbody>
            ) : filtered?.length > 0 ? (
              filtered?.map((row) => {
                return (
                  <tbody>
                    <tr>
                      <td>
                        {row?.is_deleted && (
                          <label
                            className={`checkboxLabel ${selectTask.indexOf(row?.id) !== -1 ? 'active' : ''}`}
                            onClick={() => {
                              handleSelectedTask(row?.id, row?.is_deleted);
                            }}
                          >
                            {selectTask?.indexOf(row?.id) !== -1 && <TiTick className='activeIcon' />}
                          </label>
                        )}
                      </td>
                      <td>
                        <div className='Emy_TableImg'>
                          <span className=' Emp_Img'>
                            <img src={row?.profile_pic} alt='image' />
                          </span>
                          <span className='name poppins-regular mx-3'>{row?.full_name}</span>
                        </div>
                      </td>
                      <td className='poppins-regular'>{row?.email}</td>
                      <td className='poppins-regular'>{row?.mobile}</td>
                      <td className='poppins-regular'>{row?.user_type == 2 ? 'Hiring Manager' : 'Employee'}</td>
                      <td className='poppins-regular'>{row?.createdAt}</td>
                      {/* <td className='poppins-regular'>30-04-2022</td>
                      <td className='poppins-regular'>Process</td> */}
                      <td className='poppins-regulartext-center'>
                        <label className='switch'>
                          <input type='checkbox' id={row?.id} checked={row.is_active ?? false} onChange={() => changeEmpStatusAPI(row?.is_active, row?.id)} />
                          <span className='slider round'></span>
                        </label>
                      </td>
                      <td className='poppins-regular'>
                        {/* {row?.is_active ? <Active /> : <InActive />} */}

                        <div className='specialDiv'>
                          {/* <input type='checkbox' data-toggle='toggle' id='switch' checked={row.is_active ?? false} onChange={() => changeEmpStatusAPI(row?.is_active, row?.id)} />
                          <label for='switch'>Toggle</label> */}
                          {row?.user_type == '2' && (
                            <button className='btn btn-sm' onClick={() => handleMail(row?.id, row)}>
                              <MdOutlineEmail style={{ fontSize: '23px', color: '#868689' }} />
                            </button>
                          )}
                          <MdOutlineModeEditOutline className='mx-3' style={{ fontSize: '23px', color: '#868689' }} onClick={(e) => handleClick(e, row.id)} />
                          <MdDeleteOutline style={{ fontSize: '23px', color: '#868689' }} onClick={() => handleDelete(row.id)} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <tr>
                <td colSpan={8}>
                  <p className='text-center text-danger py-3' style={{ fontSize: '30px' }}>
                    No Records Found
                  </p>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>

      {popUpOpen && (
        <div className='custom-popup'>
          <div className='popup-content'>
            <hr />
            <div className={'popup-head'}>
              <h4 style={{ color: 'black', fontSize: '15px' }}>Are you sure you want to delete this employee?</h4>
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

      {deletePopUpOpen && (
        <div className='custom-popup'>
          <div className='popup-content'>
            <hr />
            <div className={'popup-head'}>
              <h4 style={{ color: 'black', fontSize: '15px' }}>Are you sure you want to delete {deleteCount} employee?</h4>
            </div>
            <hr />
            <div className='popup-footer'>
              <button className='btn btn-success mx-1 text-capitalize' onClick={() => deleteEmployee()}>
                Yes
              </button>
              <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setDeletePopUpOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {mailPopUpOpen && (
        <div className='custom-popup'>
          <div className='popup-content'>
            <hr />
            <div className={'popup-head'}>
              <h4 style={{ color: 'black', fontSize: '15px' }}>{`You are about to send a welcome e-mail to ${emailData}, are you sure you want to proceed?`}</h4>
            </div>
            <hr />
            <div className='popup-footer'>
              <button className='btn btn-success mx-1 text-capitalize' onClick={() => ConfirmMailhandler()}>
                Yes
              </button>
              <button className='btn btn-danger mx-1 text-capitalize' data-dismiss='modal' onClick={() => setMailPopUpOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* pagination  */}
      {allEmpData?.data?.length > 0 ? (
        <div className='mr-3'>
          <nav aria-label='Page navigation example m-0'>
            <ul className='pagination justify-content-end'>
              <li className='page-item disabled'>
                <a className='page-link'>Previous</a>
              </li>
              <li className='page-item active'>
                <a className='page-link' href='#'>
                  1
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  2
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  3
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default EmployeeDashboard;
