import React, { useEffect, useState } from 'react';
import '../../assets/styles/DashboardCss/EmployeeDashboard.css';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { Additions_Icon } from '../../assets/icons/Additions_Icon';
import { InActive } from '../../assets/icons/InActive';
import { Active } from '../../assets/icons/Active';
import EMployeeImg from '../../assets/images/default.jpg';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { createPlans, getEmployeeByPlans, Get_All_Emp, Get_All_HiringM, Get_Emp_data, Get_plans, Update_Emp_Data } from '../../assets/API/Apis';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import '../../assets/styles/DashboardCss/contact_info.css';
import { TiTick } from 'react-icons/ti';
import { axiosInstance } from '../../assets/API/axiosInstances';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { useRef } from 'react';

const initialState = {
  employee: '',
  assign_to: '',
  jobtitle: '',
  first_workingday: null,
  onboarding_startdate: null,
  onboarding_enddate: null,
  // line_manager: '',
  onboardingbuddy: '-',
  employement_type: '',
  department: '',
  status: '1',
};

const initialPlanState = {
  first_workingday: '',
  onboarding_startdate: '',
  onboarding_enddate: '',
  is_active: true,
};

const ValidationErrors = {
  empty: {
    employee: 'Select Employee',
    assign_to: 'Select Hiring Manager',
    jobtitle: 'Jobtitle Required',
    employement_type: 'Employement Type Required',
    department: 'Department Required',
    // first_workingday: 'Select First day at work',
    // onboarding_startdate: 'Select Onboarding Start Date',
    // onboarding_enddate: 'Select Onboarding End Date',
  },
  invalid: {
    employee: '',
    assign_to: '',
    jobtitle: '',
    employement_type: '',
    department: '',
    // first_workingday: '',
    // onboarding_startdate: '',
    // onboarding_enddate: '',
  },
};

const OnboardingDashboard = () => {
  // const [show, setShow] = useState(false);
  // const [getPlan, setGetPlan] = useState();
  const [loading, setLoading] = useState(false);
  const [selectTask, setSelectTask] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [planCreatePopupOpen, setPlanCreatePopupOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState('');
  const [order, setOrder] = useState(false);
  const Navigate = useNavigate();
  const [search, setSearch] = useState();

  const [allObbPlan, setAllObbPlan] = useState({
    full_name: '',
  });
  const [allHiringM, setAllHiringM] = useState({
    full_name: '',
  });
  const [allEmpData, setEmpData] = useState([]);
  const [allPlans, setAllPlans] = useState({
    full_name: '',
    first_name: '',
    last_name: '',
  });
  const [values, setValues] = useState({
    employee: '',
    assign_to: '',
    jobtitle: '',
    first_workingday: null,
    onboarding_startdate: null,
    onboarding_enddate: null,
    // line_manager: '',
    onboardingbuddy: '-',
    employement_type: '',
    department: '',
    status: '1',
  });

  const [planId, setPlanId] = useState('');
  const [planValues, setPlanValues] = useState({
    first_workingday: '',
    onboarding_startdate: '',
    onboarding_enddate: '',
    is_active: true,
  });

  const [errors, setErrors] = useState({
    employee: '',
    assign_to: '',
    jobtitle: '',
    employement_type: '',
    department: '',
    first_workingday: null,
    onboarding_startdate: null,
    onboarding_enddate: null,
  });
  const addModalClose = useRef(null);

  const Handlerr = () => {
    setValues({ ...initialState });
  };

  const getAllPlan = () => {
    // setLoading(true);
    Get_plans()
      .then((response) => {
        setAllPlans(response);
        setAllObbPlan(response?.data);
        // setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const getAllEmployees = () => {
    // setLoader(true);
    Get_Emp_data()
      .then((response) => {
        setEmpData(response?.data);
        // setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        // setLoader(false);
      });
  };

  useEffect(() => {
    getAllPlan();
    getAllEmployees();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    Navigate(`/onboardingplan_table/${id}/`, { state: { id: id } });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // setPlanValues({
    //   ...planValues,
    //   [e.target.name]: e.target.value,
    // });
    setErrors({ ...errors, [e.target.name]: null });
  };
  const handlePlanChange = (e) => {
    setPlanValues({
      ...planValues,
      [e.target.name]: e.target.value,
    });
  };

  const getAllHiringM = () => {
    Get_All_HiringM()
      .then((response) => {
        setAllHiringM(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleModalClick = async (e) => {
    e.preventDefault();
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
    await createPlans(values)
      .then((response) => {
        toast.success('Onboarding plan created successfully');

        // toast.success(response.message);
        getAllPlan();
        getAllEmployees();
        addModalClose.current.click();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response.message);
      });
  };

  useEffect(() => {
    getAllPlan();
    getAllHiringM();
  }, []);

  // Plans handleDelete api call...
  const handleDelete = async (id) => {
    setIsSubmitted(id);
    setPopUpOpen(true);
  };

  const Confirmhandler = async (id = isSubmitted) => {
    try {
      await axiosInstance.delete(`/dashboard/plan/${id}/`);
      // let delData = allGroup.filter((item) => {
      //   return item.id !== id;
      // });
      await Get_plans();
      getAllPlan();
      getAllEmployees();
      setPopUpOpen(false);
      toast.success('Onboarding plan deleted successfully');
    } catch (error) {
      console.log('Something Want Wrong');
    }
  };

  // PATCH api for onboarding active - inactive  details updations...
  const changeEmpStatusAPI = async (is_active, id, event, row) => {
    setPlanId(id);
    if (is_active == true) {
      is_active = false; // console.log(staus);
    } else {
      is_active = true;
    }
    if (event.target.checked == true && row?.onboarding_startdate == null) {
      setPlanCreatePopupOpen(true);
    } else {
      await Update_Emp_Data({ id: id, is_active })
        .then((response) => {
          if (is_active == true) {
            toast.success('Onboarding plan Activated.');
          } else {
            toast.error('Onboarding plan Deactivated.');
          }
        })
        .catch((err) => {
          toast.danger('Error');
          console.log(err.message);
        });
      getAllPlan();
    }
  };

  const handleSelectedTask = (id) => {
    if (selectTask.indexOf(id) !== -1) {
      let tempArray = [...selectTask];
      tempArray.splice(selectTask?.indexOf(id), 1);
      setSelectTask(tempArray);
      return;
    }
    setSelectTask([...selectTask, id]);
    return;
  };

  const sorting = async (parentKey, key) => {
    const data = [...allObbPlan];
    let newArr = null;
    newArr = await new Promise((resolve, reject) =>
      resolve(
        data.sort((a, b) => {
          let fa = '';
          let fb = '';
          if (parentKey) {
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
    setAllObbPlan(newArr);
  };

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePlanClick = async () => {
    console.log(planValues, 'planValues');
    await Update_Emp_Data({ id: planId, ...planValues })
      .then(() => {
        setPlanValues(planValues);
        setPlanCreatePopupOpen(false);
        toast.success('Onboarding plan updated successfully');
        setPlanValues(initialPlanState);
        getAllPlan();
        // Navigate(`/onboardingdashboard`);
      })
      .catch((err) => {
        // toast.danger('Error');
        console.log(err.message);
      });
  };

  const filtered = !search ? allObbPlan : allObbPlan.filter((person) => person?.employee?.full_name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className='row align-items-center justify-content-between m-3'>
        <div className='row align-items-center Search_Body m-0'>
          <div className='input-group flex-nowrap Search_Input '>
            <div className='input-group-prepend'>
              <span className='input-group-text SeachIcon' id='addon-wrapping'>
                <SearchIcon />
              </span>
            </div>
            <input
              type='text'
              className='form-control Input_type'
              placeholder='Search'
              aria-label='Search'
              aria-describedby='addon-wrapping'
              //  onChange={searchHandler}
              onChange={handlesearch}
            />
          </div>
        </div>
        <div className='d-flex align-items-center Default_Body'>
          <div className='Default_Icon' data-toggle='modal' title='create' data-target='#exampleModalCenter' onClick={Handlerr}>
            <Additions_Icon />
          </div>
        </div>
        {/* Addition Model Start*/}
        <div
          className='modal fade  Onboard_Modal'
          id='exampleModalCenter'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
          data-backdrop='static'
          data-keyboard='false'
        >
          <div className='modal-dialog modal-dialog-centered ' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title  poppins-semibold' id='exampleModalLongTitle'>
                  Onboarding Plans Information
                </h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-md-12 EditTables_Body'>
                    <table className='w-100 '>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Employee*</label>
                          <select className='form-control' name='employee' value={values?.employee} onChange={handleChange}>
                            <option selected value='' disabled hidden>
                              Select your Employee
                            </option>
                            {allEmpData.length == 0 && (
                              <option value='' disabled>
                                No employees to select
                              </option>
                            )}
                            {/* {allPlans?.data?.map((item) => {
                              return <option value={item?.employee?.id}>{item?.employee?.full_name}</option>;
                            })} */}
                            {allEmpData?.map((item, index) => {
                              return (
                                <option key={index} value={item?.id}>
                                  {item?.full_name}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                      </tr>
                      {errors.employee && (
                        <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                          {errors.employee}
                        </p>
                      )}
                    </table>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='col-md-12 EditTables_Body p-0'>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Assign to Hiring Manager*</label>
                            <select className='form-control' name='assign_to' value={values?.assign_to} onChange={handleChange}>
                              <option selected value='' disabled hidden>
                                Select your Hiring Manager
                              </option>
                              {allHiringM?.data?.map((row, index) => {
                                return (
                                  <option key={index} value={row?.id}>
                                    {row?.full_name}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                        </tr>
                        {errors.assign_to && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.assign_to}
                          </p>
                        )}
                        <tr>
                          <td>
                            <label className='poppins-regular'>Jobtitle*</label>
                            <input type='text' name='jobtitle' value={values?.jobtitle} className='form-control' placeholder='Enter Jobtitle' onChange={handleChange} />
                          </td>
                        </tr>

                        {errors.jobtitle && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.jobtitle}
                          </p>
                        )}
                        {/* <tr>
                          <td>
                            <label className='poppins-regular'>Manager</label>
                            <input type='text' name='line_manager' value={values?.line_manager} className='form-control' placeholder='Natalie Egger' onChange={handleChange} />
                          </td>
                        </tr> */}
                        <tr>
                          <td>
                            <label className='poppins-regular'>Department*</label>
                            <input type='text' name='department' value={values?.department} className='form-control' placeholder='Enter Department' onChange={handleChange} />
                            {/* <select className='form-control' name='department' value={values?.department} onChange={handleChange}>
                              <option selected value='' disabled hidden>
                                Select your option
                              </option>
                              <option value='marketing'>Marketing</option>
                            </select> */}
                          </td>
                        </tr>
                        {errors.department && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.department}
                          </p>
                        )}
                      </table>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='col-md-12 EditTables_Body p-0'>
                      <table className='w-100 '>
                        {/* <tr>
                          <td>
                            <label className='poppins-regular'>jobid</label>
                            <input type='text' name='jobid' value={values?.jobid} className='form-control' placeholder='02165' onChange={handleChange} />
                          </td>
                        </tr> */}

                        <tr>
                          <td>
                            <label className='poppins-regular'>Onboarding Buddy</label>
                            <input type='text' name='onboardingbuddy' value={values?.onboardingbuddy} className='form-control' placeholder='-' onChange={handleChange} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Employement Type*</label>
                            <input
                              type='text'
                              name='employement_type'
                              value={values?.employement_type}
                              className='form-control'
                              placeholder='Enter Employement Type'
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        {errors.employement_type && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.employement_type}
                          </p>
                        )}
                      </table>
                    </div>
                  </div>
                </div>

                {/* <div>
                  <h5 className='my-3 poppins-semibold'>Onboarding Plans Key Dates </h5>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='col-md-12 EditTables_Body p-0'>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Onboarding Start Date*</label>
                            <input
                              type='date'
                              name='onboarding_startdate'
                              id=''
                              value={values?.onboarding_startdate}
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              className='form-control'
                              placeholder='YYYY-MM-DD'
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        {errors.onboarding_startdate && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.onboarding_startdate}
                          </p>
                        )}
                        <tr>
                          <td>
                            <label className='poppins-regular'>First day at work*</label>
                            <input
                              type='date'
                              name='first_workingday'
                              value={values?.first_workingday}
                              id=''
                              className='form-control'
                              placeholder='YYYY-MM-DD'
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              disabled={values?.onboarding_enddate === ''}
                              max={values?.onboarding_enddate}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        {errors.first_workingday && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.first_workingday}
                          </p>
                        )}
                      </table>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='col-md-12 EditTables_Body p-0'>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Onboarding End Date*</label>
                            <input
                              type='date'
                              name='onboarding_enddate'
                              value={values?.onboarding_enddate}
                              id=''
                              className='form-control'
                              placeholder='YYYY-MM-DD'
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              min={values?.onboarding_startdate}
                              disabled={values?.onboarding_startdate === ''}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        {errors.onboarding_enddate && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.onboarding_enddate}
                          </p>
                        )}
                      </table>
                    </div>
                  </div>
                </div> */}

                <div className='d-flex align-items-center mx-3 modal-footer'>
                  <button
                    className='save_btn poppins-semibold'
                    // data-dismiss='modal'
                    onClick={handleModalClick}
                  >
                    Save
                  </button>
                  <button className='cancel_btn poppins-semibold' data-dismiss='modal' ref={addModalClose} onClick={() => setErrors('')}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Addition Model End*/}
      </div>

      <div className='Employee_Table m-3'>
        <div className='Emptable-wrapper'>
          <table className='table table-bordered Action_Part'>
            <thead>
              <tr>
                <th>
                  {/* <label className='Rounded_CheckBox'>
                    <input type='checkbox' className='form-check-input' id='policyInput' name='policyCheckmark' />
                    <span className='checkmark'></span>
                  </label> */}
                  <label
                    className={`checkboxLabel ${selectTask?.length === allObbPlan?.length ? 'active' : ''}`}
                    onClick={() => {
                      setSelectTask(selectTask?.length !== allObbPlan?.length ? allObbPlan?.reduce((prev, next) => [...prev, next.id], []) : []);
                    }}
                  >
                    {selectTask?.length === allObbPlan?.length && <TiTick className='activeIcon' />}
                  </label>
                </th>
                <th className='poppins-semibold'>
                  Employee Name
                  <RiArrowUpDownLine
                    className='mx-1 UpDownArrow'
                    onClick={() => {
                      setOrder(!order);
                      sorting('employee', 'full_name');
                    }}
                  />
                </th>
                <th className='poppins-semibold'>Hiring Manager</th>
                <th className='poppins-semibold'>Job Title</th>
                <th className='poppins-semibold'>Employement Type</th>
                <th className='poppins-semibold'>First day at work</th>
                <th className='poppins-semibold'>Status</th>
                <th className='poppins-semibold'>Active/InActive</th>
                <th className='poppins-semibold'>Action</th>
              </tr>
            </thead>
            {/* adding map function to the display all thye obb plans list */}
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : filtered?.length > 0 ? (
              filtered?.map((row, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        {/* <label className='Rounded_CheckBox'>
                          <input type='checkbox' className='form-check-input' id='policyInput' name='policyCheckmark' />
                          <span className='checkmark'></span>
                        </label> */}
                        <label
                          className={`checkboxLabel ${selectTask.indexOf(row?.id) !== -1 ? 'active' : ''}`}
                          onClick={() => {
                            handleSelectedTask(row?.id);
                          }}
                        >
                          {selectTask.indexOf(row?.id) !== -1 && <TiTick className='activeIcon' />}
                        </label>
                      </td>
                      <td>
                        <div className='Emy_TableImg d-flex align-items-center'>
                          <span className=' Emp_Img'>
                            <img src={row?.employee?.profile_pic} alt='image' />
                          </span>
                          <span className='name poppins-regular mx-3'>{row?.employee?.full_name}</span>
                        </div>
                      </td>
                      <td className='poppins-regular'>{row?.assign_to?.full_name}</td>
                      <td className='poppins-regular'>{row?.jobtitle}</td>
                      <td className='poppins-regular'>{row?.employement_type}</td>
                      <td className='poppins-regular'>{row?.first_workingday}</td>
                      <td className='poppins-regular'>
                        {row.status !== '' ? (row.status == '1' ? 'Not Started' : row.status == '2' ? 'In Progress' : row.status == '3' ? 'Completed' : null) : 'Not known'}
                      </td>
                      <td className='poppins-regular' style={{ textAlign: 'center' }}>
                        <label className='switch'>
                          <input type='checkbox' id={row?.id} checked={row.is_active ?? false} onChange={(e) => changeEmpStatusAPI(row?.is_active, row?.id, e, row)} />
                          <span className='slider round'></span>
                        </label>
                      </td>
                      <td className='poppins-regular'>
                        {/* {row?.is_active ? <Active /> : <InActive />} */}
                        <div className='specialDiv'>
                          <MdOutlineModeEditOutline className='mx-3' style={{ fontSize: '23px', color: '#868689' }} onClick={(e) => handleClick(e, row?.id)} />
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
              <h4 style={{ color: 'black', fontSize: '15px' }}>Are you sure you want to delete this Onboarding plan?</h4>
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
      {planCreatePopupOpen && (
        <div className='custom-popup OBBplan-create-popup'>
          <div className='popup-content'>
            <div>
              <h5 className='my-3 poppins-semibold'>Onboarding Plans Key Dates </h5>
            </div>
            <hr />
            <div className={'popup-head'}>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='col-md-12 EditTables_Body p-0'>
                    <table className='w-100 '>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Onboarding Start Date*</label>
                          <input
                            type='date'
                            name='onboarding_startdate'
                            id=''
                            value={planValues?.onboarding_startdate}
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                            className='form-control'
                            placeholder='YYYY-MM-DD'
                            onChange={handlePlanChange}
                          />
                        </td>
                      </tr>
                      {errors.onboarding_startdate && (
                        <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                          {errors.onboarding_startdate}
                        </p>
                      )}
                      <tr>
                        <td>
                          <label className='poppins-regular'>First day at work*</label>
                          <input
                            type='date'
                            name='first_workingday'
                            value={planValues?.first_workingday}
                            id=''
                            className='form-control'
                            placeholder='YYYY-MM-DD'
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                            disabled={planValues?.onboarding_enddate === ''}
                            max={planValues?.onboarding_enddate}
                            onChange={handlePlanChange}
                          />
                        </td>
                      </tr>
                      {errors.first_workingday && (
                        <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                          {errors.first_workingday}
                        </p>
                      )}
                    </table>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='col-md-12 EditTables_Body p-0'>
                    <table className='w-100 '>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Onboarding End Date*</label>
                          <input
                            type='date'
                            name='onboarding_enddate'
                            value={planValues?.onboarding_enddate}
                            id=''
                            className='form-control'
                            placeholder='YYYY-MM-DD'
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                            min={planValues?.onboarding_startdate}
                            disabled={planValues?.onboarding_startdate === ''}
                            onChange={handlePlanChange}
                          />
                        </td>
                      </tr>
                      {errors.onboarding_enddate && (
                        <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                          {errors.onboarding_enddate}
                        </p>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='popup-footer d-flex align-items-center justify-content-end'>
              <button className='btn save_btn mx-1 text-capitalize' onClick={handlePlanClick}>
                Save
              </button>
              <button className='btn cancel_btn mx-1 text-capitalize' data-dismiss='modal' onClick={() => setPlanCreatePopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* pagination  */}
      {/* {allObbPlan?.data?.length > 0 ? (
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
      ) : null} */}
    </div>
  );
};

export default OnboardingDashboard;
