import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Assign_division, Assign_division_group_role, Get_Divison, Get_Employee_By_Id, Get_Group, Get_Role, Update_Employee_Data } from '../assets/API/Apis';
import { Active } from '../assets/icons/Active';
import { Call_Icon } from '../assets/icons/Call_Icon';
import { InActive } from '../assets/icons/InActive';
import '../assets/styles/DashboardCss/contact_info.css';
import DashCard from '../components/DashCard';
import { Multiselect } from 'multiselect-react-dropdown';
import { Timezone } from '../assets/Helper/constant';
import Loader from '../components/Loader';
import COUNTRYLIST from '../Country_Nationality_List.json';

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
    first_name: 'First name Required',
    last_name: 'Last name Required',
    // middle_name: 'Middle name Required',
    // gender: 'Select one Option',
    // timezone: 'Select one Option',
    user_type: 'Select one Option',
    // dob: 'Birth date is Required',
  },
  invalid: {
    email: '',
    first_name: '',
    // middle_name: '',
    last_name: '',
    // gender: '',
    // timezone: '',
    user_type: '',
    // dob: '',
  },
};

const Contact_info = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const [AllDivisionData, setAllDivisionData] = useState([]);
  const [AllGroupData, setAllGroupData] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [isAssignChange, setIsAssignChange] = useState(false);

  const [AllRolesData, setAllRolesData] = useState([]);
  const [assignPayload, setAssignPayload] = useState({});
  const [groupsList, setGroupsList] = useState([]);
  const [selectGroups, setSelectGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [empAvtar, setEmpAvtar] = useState({
    avtemail: '',
    avtmobile: '',
    avttimezone: '',
    avtfull_name: '',
    avtis_Active: '',
  });

  const { avtemail, avtfull_name, avtmobile, avttimezone, avtis_Active } = empAvtar;

  const [values, setValues] = useState({
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    full_name: '',
    profile_pic: '',
    language: '',
    createdAt: '',
    nationality: '',
    mobile: '',
    timezone: '',
    dob: null,
    country: '',
    city: '',
    gender: '',
    user_type: '',
    division: '',
    groups: [],
  });

  const [errors, setErrors] = useState({
    email: '',
    first_name: '',
    last_name: '',
    // gender: '',
    // timezone: '',
    user_type: '',
    // dob: '',
  });

  const [phoneNumber, setPhoneNumber] = useState('');

  const {
    email,
    first_name,
    middle_name,
    last_name,
    full_name,
    profile_pic,
    language,
    dob,
    city,
    country,
    gender,
    createdAt,
    nationality,
    mobile,
    timezone,
    user_type,
    division,
    groups,
  } = values;

  // const [assignValue, setAssignValue] = useState({
  //   employee: '',
  //   division: '',
  // });

  const handleChange = (e) => {
    setIsChange(true);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const Get_All_Employee_By_id = () => {
    setLoading(true);
    Get_Employee_By_Id({ id: state?.id }).then((response) => {
      if (response) {
        const {
          first_name,
          middle_name,
          last_name,
          full_name,
          email,
          mobile,
          nationality,
          profile_pic,
          timezone,
          dob,
          language,
          gender,
          city,
          division,
          country,
          user_type,
          is_active,
          group,
        } = response.data;
        setValues({
          first_name: first_name ?? '',
          middle_name: middle_name ?? '',
          last_name: last_name ?? '',
          full_name: full_name ?? '',
          email: email ?? '',
          mobile: mobile ?? '',
          nationality: nationality ?? '',
          profile_pic: profile_pic ?? '',
          timezone: timezone ?? '',
          dob: dob ?? null,
          language: language ?? '',
          gender: gender.toLowerCase() ?? '',
          city: city ?? '',
          country: country ?? '',
          user_type: user_type ?? '',
          division: division?.id ?? '',
          groups: group?.id ?? [],
        });
        setSelectGroups(group);
        setEmpAvtar({
          avtfull_name: full_name,
          avtemail: email,
          avttimezone: timezone,
          avtmobile: mobile,
          avtis_Active: is_active,
        });
        setLoading(false);
      }
    });
  };

  const handleChangeForAssign = (e) => {
    setIsAssignChange(true);
    setAssignPayload({ ...assignPayload, [e.target.name]: Number(e.target.value), group: [Number(e.target.value)] });
  };
  const AssignSaveBtnHandler = async () => {
    await Assign_division_group_role({ id: state?.id, ...assignPayload })
      .then(() => {
        toast.success('Updated successfully');
        Navigate('/employeedashboard');
      })
      .catch((err) => {
        toast.danger('Error');
        console.log(err.message);
      });
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
  // const GetAllGroup = () => {
  //   Get_Group()
  //     .then((response) => {
  //       setAllGroupData(response?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error, 'error');
  //     });
  // };

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

  // fetch all roles ...
  const Get_All_Role = () => {
    Get_Role()
      .then((response) => {
        setAllRolesData(response?.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  useEffect(() => {
    Get_All_Employee_By_id();
    GetAllDivision();
    GetAllGroup();
    Get_All_Role();
  }, []);

  //Update Data
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
    console.log(values, '<><><><');
    await Update_Employee_Data({ id: state?.id, ...values })
      .then((response) => {
        if (response?.status === 400) {
          toast.error(response?.message);
        } else {
          setValues(values);
          // toast.success('Employee updated successfully');
          toast.success(response.message);
          Navigate(`/employeedashboard`);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=' contact_backcolor m-3'>
          <div className='contact_information'>
            <h6 className='mx-3 my-3 poppins-semibold'>Contact Information</h6>
            <div className='row m-3'>
              <div className='col-lg-3 col-md-12 col-sm-12 p-0'>
                <DashCard
                  DashCard_Data={{
                    full_name: avtfull_name,
                    profile_pic: profile_pic,
                    email: avtemail,
                    mobile: avtmobile,
                    timezone: avttimezone,
                    is_active: avtis_Active,
                    status: 'aaaa',
                  }}
                />
              </div>
              <div className='col-lg-8 col-md-12 col-sm-12'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='col-lg-12 EditTables_Body'>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>First name*</label>
                            <input type='text' name='first_name' value={first_name} className='form-control' placeholder='Enter First name' onChange={handleChange} />
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
                            <input type='text' name='last_name' value={last_name} className='form-control' placeholder='Enter last name' onChange={handleChange} />
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
                              className='form-control'
                              placeholder='Enter Phone Number'
                              onChange={(e) => {
                                if (e.target.value.length == 11 || isNaN(e.target.value)) {
                                  return false;
                                } else {
                                  handleChange(e);
                                }
                              }}
                              value={values.mobile}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label className='poppins-regular'>City</label>
                            <input type='text' name='city' value={city} className='form-control' placeholder='Enter City' onChange={handleChange} />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label className='poppins-regular'>Time Zone</label>
                            {/* <input type='text'    placeholder='GMT+2'  /> */}
                            <select className='form-control' name='timezone' value={timezone} onChange={handleChange}>
                              <option selected value='' disabled hidden>
                                Select Time zone
                              </option>
                              {Timezone.map((row, i) => (
                                <option>{row.timezone}</option>
                              ))}
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
                          <select className='form-control' name='gender' value={gender} onChange={handleChange}>
                            <option selected disabled>
                              Select Gender
                            </option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Other</option>
                          </select>
                        </tr>
                        {errors.gender && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.gender}
                          </p>
                        )}
                        <tr>
                          <td>
                            <label className='poppins-regular'>Role*</label>
                            <select className='form-control' name='user_type' value={user_type} onChange={handleChange}>
                              <option selected disabled>
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
                            <label className='poppins-regular'>Group</label>
                            {/* <select className='form-control' name='nationality' onChange={handleChange}>
                          <option selected disabled>
                            Select Group
                          </option>
                          {AllGroupData?.map((row) => (
                            <option value={row?.id}>{row?.name}</option>
                          ))}
                        </select> */}
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
                            <input type='text' name='middle_name' value={middle_name} className='form-control' placeholder='Enter middle name' onChange={handleChange} />
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
                            <input type='email' name='email' value={email} className='form-control' placeholder='Enter Email' onChange={handleChange} />
                          </td>
                        </tr>
                        {errors.email && (
                          <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                            {errors.email}
                          </p>
                        )}
                        <tr>
                          <td>
                            <label className='poppins-regular'>Language</label>
                            <select className='form-control' name='language' value={language} onChange={handleChange}>
                              <option disabled selected value='' hidden>
                                Select Language
                              </option>
                              <option>English</option>
                              <option>Danish</option>
                              <option>French </option>
                              <option>Italian </option>
                              <option>Spanish </option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <label className='poppins-regular'>Country</label>
                          <select className='form-control' name='country' value={country} onChange={handleChange}>
                            <option disabled selected value='' hidden>
                              Select Country
                            </option>
                            {COUNTRYLIST.map((row, i) => (
                              <option>{row?.en_short_name}</option>
                            ))}
                          </select>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Date Of Birth</label>
                            <input
                              type='date'
                              name='dob'
                              max={new Date().toISOString().split('T')[0]}
                              value={dob}
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              className='form-control'
                              placeholder='DD-MM-YYYY'
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
                            <select className='form-control' name='nationality' value={nationality} onChange={handleChange}>
                              <option selected disabled value='' hidden>
                                Select Nationality
                              </option>
                              {COUNTRYLIST.map((row, i) => (
                                <option>{row?.nationality}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Organization</label>
                            <select className='form-control' name='division' value={division} onChange={handleChange}>
                              <option selected disabled value='' hidden>
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
                <div className='row align-items-center justify-content-end ml-3 my-4'>
                  {/* <div className='mx-6 d-flex align-items-center'>
                <h5 className='mx-2 poppins-regular my-6'>Active</h5>
                <a onClick={() => setShow(!show)} type='button'>
                  {!show ? <Active /> : <InActive />}
                </a>
              </div> */}
                  <div className='d-flex align-items-center mx-3'>
                    <button className='save_btn poppins-semibold' onClick={() => handleClick()}>
                      Save
                    </button>
                    <button className='cancel_btn poppins-semibold' onClick={() => Navigate('/employeedashboard')}>
                      Cancel
                    </button>
                  </div>
                </div>
                {/* <div className='col-md-6 p-0'>
              <div className='col-md-12 EditTables_Body '>
                <table className='w-100 '>
                  <tr>
                    <td>
                      <label className='poppins-regular'>Role</label>
                      <select className='form-control' name='role' onChange={handleChangeForAssign}>
                        <option selected disabled>
                          Select Roles
                        </option>
                        {AllRolesData?.map((row) => (
                          <option value={row?.id}>{row?.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='poppins-regular'>Organization</label>
                      <select className='form-control' name='division' onChange={handleChangeForAssign} data={AllDivisionData} touchUi={false}>
                        <option selected disabled>
                          Select Organization
                        </option>
                        {AllDivisionData?.map((row) => (
                          <option value={row?.id}>{row?.division_name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='poppins-regular'>Groups</label> */}
                {/* <select className='form-control' name='group' onChange={handleChangeForAssign}>
                        <option selected disabled>
                          Select Groups
                        </option>
                        {AllGroupData?.map((row) => (
                          <option value={row?.id}>{row?.name}</option>
                          ))}
                      </select> */}
                {/* <Multiselect options={AllGroupData} displayValue='name' placeholder='Select Groups' hidePlaceholder={true} /> */}
                {/* </td>
                  </tr>
                </table>
              </div>
            </div> */}
                {/* <div className='row align-items-center justify-content-end ml-3 my-4'>
              <div className='d-flex align-items-center mr-4'>
                <button
                  className={`save_btn poppins-semibold ${!isAssignChange ? 'disabled' : ''}`}
                  disabled={!isAssignChange}
                  // disabled={AllRolesData?.name === '' || AllDivisionData?.division_name === '' || AllGroupData?.name === ''}
                  onClick={AssignSaveBtnHandler}
                >
                  Assign To
                </button>
              </div>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact_info;
