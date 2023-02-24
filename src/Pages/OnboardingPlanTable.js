import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Get_All_Emp, Get_All_HiringM, Get_plans, Get_plans_By_Id, Update_Emp_Data } from '../assets/API/Apis';
import { Active } from '../assets/icons/Active';
import { InActive } from '../assets/icons/InActive';
import '../assets/styles/DashboardCss/contact_info.css';
import DashCard from '../components/DashCard';
import Loader from '../components/Loader';

const ValidationErrors = {
  empty: {
    onboarding_startdate: 'Onboarding Start Date is Required',
    onboarding_enddate: 'Onboarding End Date is Required',
    first_workingday: 'First day at work is Required',
  },
  invalid: {
    onboarding_startdate: '',
    onboarding_enddate: '',
    first_workingday: '',
  },
};

const OnboardingPlanTable = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const [isChange, setIsChange] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avtarDetails, setAvtarDetails] = useState({
    assign_to_name: '',
    email: '',
    mobile: '',
    timezone: '',
    full_name: '',
    first_name: '',
    last_name: '',
    jobid: '',
    avtar_jobtitle: '',
    avt_profile_pic: '',
    is_active: '',
  });

  const [values, setValues] = useState({
    assign_to: '',
    profile_pic: '',
    jobtitle: '',
    onboardingbuddy: '',
    line_manager: '',
    department: '',
    employement_type: '',
    first_workingday: '',
    onboarding_startdate: '',
    onboarding_enddate: '',
    changeemail: '',
    status: '1',
    is_active: '',
  });

  const [errors, setErrors] = useState({
    onboarding_startdate: '',
    onboarding_enddate: '',
    first_workingday: '',
  });
  const [allHiringM, setAllHiringM] = useState('');

  const { assign_to, profile_pic, jobtitle, onboardingbuddy, line_manager, department, employement_type, first_workingday, onboarding_startdate, onboarding_enddate, status } =
    values;

  const { assign_to_name, email, mobile, timezone, full_name, first_name, avt_profile_pic, last_name, jobid, avtar_jobtitle, is_active } = avtarDetails;

  // console.log(assign_to_id, 'assign_to_id');

  const handleChange = (e) => {
    setIsChange(true);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
    console.log(e.target.value, '123');
  };

  const getFormattedDate = (date) => {
    if (date) {
      let dArr = date.split('-');
      return `${dArr[2]}-${dArr[1]}-${dArr[0]}`;
    } else {
      return '';
    }
  };

  const get_plans_By_Id = () => {
    setLoading(true);
    Get_plans_By_Id({ id: state?.id }).then((response) => {
      if (response) {
        setAvtarDetails({
          assign_to_name: response?.data?.assign_to?.full_name,
          mobile: response?.data?.employee?.mobile,
          email: response?.data?.employee?.email,
          timezone: response?.data?.employee?.timezone,
          full_name: response?.data?.employee?.full_name,
          first_name: response?.data?.employee?.first_name,
          last_name: response?.data?.employee?.last_name,
          jobid: response?.data?.jobid,
          avtar_jobtitle: response?.data?.jobtitle,
          avt_profile_pic: response?.data?.employee?.profile_pic,
          is_active: response?.data?.is_active,
        });
        setValues({
          assign_to: response?.data?.assign_to?.id,
          jobtitle: response?.data?.jobtitle,
          line_manager: response?.data?.line_manager,
          department: response?.data?.department,
          employement_type: response?.data?.employement_type,
          onboardingbuddy: response?.data?.onboardingbuddy,
          first_workingday: getFormattedDate(response?.data?.first_workingday),
          onboarding_startdate: getFormattedDate(response?.data?.onboarding_startdate),
          onboarding_enddate: getFormattedDate(response?.data?.onboarding_enddate),
          status: response?.data?.status,
        });
        setLoading(false);
      }
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

  useEffect(() => {
    get_plans_By_Id();
    getAllHiringM();
  }, []);
  const handleClick = async () => {
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
    await Update_Emp_Data({ id: state?.id, ...values })
      .then(() => {
        setValues(values);
        toast.success('Onboarding plan updated successfully');
        Navigate(`/onboardingdashboard`);
      })
      .catch((err) => {
        // toast.danger('Error');
        console.log(err.message);
      });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='contact_backcolor m-3'>
          <div className='contact_information'>
            <h6 className='mx-3 my-3 poppins-semibold'>Onboarding Plans Information</h6>
            <div className='row m-3'>
              <div className='col-lg-3 col-md-12 col-sm-12 p-0'>
                <DashCard
                  DashCard_Data={{
                    full_name: full_name,
                    jobtitle: avtar_jobtitle,
                    profile_pic: avt_profile_pic,
                    email: email,
                    mobile: mobile,
                    timezone: timezone,
                    is_active: is_active,
                    status: 'bbbb',
                  }}
                />
              </div>
              <div className='col-lg-8 col-md-12 col-sm-12 p-0 mx-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='col-md-12 EditTables_Body'>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Assign to Hiring Manager*</label>
                            <select className='form-control' name='assign_to' value={assign_to} onChange={handleChange}>
                              {/* <option value={assign_to_id}>{assign_to_name}</option> */}
                              <option selected value='' disabled hidden>
                                {assign_to ? assign_to_name : 'Select your Hiring Manager'}
                              </option>
                              {allHiringM?.data?.map((row, index) => {
                                console.log(row, '456');
                                return (
                                  <option key={index} value={row?.id}>
                                    {row?.full_name}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Jobtitle</label>
                            <input type='text' name='jobtitle' value={jobtitle} className='form-control' placeholder='Enter Jobtitle' onChange={handleChange} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Employement Type</label>
                            <input
                              type='text'
                              name='employement_type'
                              value={employement_type}
                              className='form-control'
                              placeholder='Enter Employement Type'
                              onChange={handleChange}
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
                            <label className='poppins-regular'>Onboarding Buddy</label>
                            <input type='text' name='onboardingbuddy' value={onboardingbuddy} className='form-control' placeholder='-' onChange={handleChange} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Department</label>
                            <input type='text' name='department' value={department} className='form-control' placeholder='Enter Department' onChange={handleChange} />
                            {/* <select className='form-control' name='department' onChange={handleChange}>
                          <option selected value='' disabled hidden>
                            Select your Department
                          </option>
                          <option> {department}</option>
                        </select> */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Status</label>
                            <select className='form-control' name='status' value={status} onChange={handleChange}>
                              <option selected value='' disabled hidden>
                                Select Status
                              </option>
                              <option value={'1'}>Not Started</option>
                              <option value={'2'}>In Progress</option>
                              <option value={'3'}>Completed</option>
                            </select>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <h6 className='mx-3 my-3 poppins-semibold'>Key Date</h6>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='col-md-12 EditTables_Body'>
                          <table className='w-100'>
                            <tr>
                              <td>
                                <label className='poppins-regular'>Onboarding Start Date*</label>
                                <input
                                  type='date'
                                  name='onboarding_startdate'
                                  id=''
                                  value={onboarding_startdate}
                                  onKeyDown={(e) => {
                                    e.preventDefault();
                                  }}
                                  className='form-control'
                                  placeholder='DD-MM-YYYY'
                                  onChange={handleChange}
                                />
                                {errors.onboarding_startdate && (
                                  <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                                    {errors.onboarding_startdate}
                                  </p>
                                )}
                              </td>
                            </tr>
                            {/* <tr>
                          <td>
                            <label className='poppins-regular'>Change Email*</label>
                            <input type='email' name='due_date' id='' value='' className='form-control' placeholder='-' onChange={handleChange} />
                          </td>
                        </tr> */}
                          </table>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='col-md-12 EditTables_Body'>
                          <table className='w-100 '>
                            <tr>
                              <td>
                                <label className='poppins-regular'>Onboarding End Date*</label>
                                <input
                                  type='date'
                                  name='onboarding_enddate'
                                  id=''
                                  onKeyDown={(e) => {
                                    e.preventDefault();
                                  }}
                                  value={onboarding_enddate}
                                  min={onboarding_startdate}
                                  disabled={!onboarding_startdate}
                                  className='form-control'
                                  placeholder='DD-MM-YYYY'
                                  onChange={handleChange}
                                />
                                {errors.onboarding_enddate && (
                                  <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                                    {errors.onboarding_enddate}
                                  </p>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label className='poppins-regular'>First day at work*</label>
                                <input
                                  type='date'
                                  name='first_workingday'
                                  id=''
                                  onKeyDown={(e) => {
                                    e.preventDefault();
                                  }}
                                  value={first_workingday}
                                  max={onboarding_enddate}
                                  min={onboarding_startdate}
                                  disabled={!onboarding_enddate}
                                  className='form-control'
                                  placeholder='DD-MM-YYYY'
                                  onChange={handleChange}
                                />
                                {errors.first_workingday && (
                                  <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                                    {errors.first_workingday}
                                  </p>
                                )}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center justify-content-end my-3'>
                  {/* <div className='mx-6 d-flex align-items-center mx-3'>
                <h5 className='mx-3 poppins-regular my-6'>Active</h5>
                <a onClick={() => setShow(!show)}>{!show ? <InActive /> : <Active />}</a>
              </div> */}
                  <div className='d-flex align-items-center mx-3'>
                    <button className={`save_btn poppins-semibold ${!isChange ? 'disabled' : ''}`} onClick={handleClick} disabled={!isChange}>
                      Save
                    </button>
                    <button className='cancel_btn poppins-semibold' onClick={() => Navigate('/onboardingdashboard')}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OnboardingPlanTable;
