import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Assign_division_group_role, getAdminstorById, Get_Divison, Get_Group, Get_Role, updateAdminstrator } from '../assets/API/Apis';
import { Active } from '../assets/icons/Active';
import { InActive } from '../assets/icons/InActive';
import '../assets/styles/DashboardCss/Administrator_info.css';
import DashCard from '../components/DashCard';
import { Multiselect } from 'multiselect-react-dropdown';
import COUNTRYLIST from '../Country_Nationality_List.json';

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
    first_name: 'First name Required',
    last_name: 'Last name Required',
  },
  invalid: {
    email: '',
    first_name: '',
    last_name: '',
  },
};

const Administrator_info = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();

  // const [show, setShow] = useState(false);

  const [AllDivisionData, setAllDivisionData] = useState([]);
  const [AllGroupData, setAllGroupData] = useState([]);
  const [isAssignChange, setIsAssignChange] = useState(false);
  const [AllRolesData, setAllRolesData] = useState([]);
  const [isChange, setIsChange] = useState(false);

  const [assignPayload, setAssignPayload] = useState({});

  const [groupsList, setGroupsList] = useState([]);
  const [selectGroups, setSelectGroups] = useState([]);

  const [edit, setEdit] = useState({});
  const [values, setValues] = useState({
    email: '',
    firstname: '',
    lastname: '',
    language: '',
    country: '',
    user_type: '1',
    division: '',
    role: '',
    groups: [],
    gender: 'others',
  });

  const { email, first_name, last_name, language, country, division, groups, group, role, gender } = values;

  const [errors, setErrors] = useState({
    email: '',
    first_name: '',
    last_name: '',
    city: '',
    mobile: '',
  });

  const handleChange = (e) => {
    setIsChange(true);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    // setEdit({
    //   ...edit,
    //   [e.target.name]: e.target.value,
    // });

    setErrors({ ...errors, [e.target.name]: '' });
  };

  const SaveBtnhandleClick = async (e) => {
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

    await updateAdminstrator({ id: state?.id, ...values })
      .then((response) => {
        setValues(values);
        toast.success('Administrator updated successfully');
        Navigate(`/administratorsdashboard`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //Update adminstrator Data....
  // const handleClick = async () => {
  //   await Update_Employee_Data({ id: state?.id, ...values })
  //     .then(() => {
  //       setValues(values);
  //       toast.success('Updated successfully');
  //       Navigate(`/employeedashboard`);
  //     })
  //     .catch((err) => {
  //       // toast.danger('Error');
  //       console.log(err.message);
  //     });
  // };

  const getAdminstorByIdFn = () => {
    getAdminstorById({ id: state?.id }).then((response) => {
      if (response) {
        setValues({
          first_name: response?.data?.first_name,
          last_name: response?.data?.last_name,
          email: response?.data?.email,
          language: response?.data?.language,
          country: response?.data?.country,
          division: response?.data?.division,
          role: response?.data?.role,
          groups: response?.data?.group?.id,
          gender: response?.data?.gender,
        });
        setSelectGroups(response?.data?.group);
      }
    });
  };
  const handleChangeForAssign = (e) => {
    setIsAssignChange(true);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // setAssignPayload({ ...assignPayload, [e.target.name]: Number(e.target.value), group: [Number(e.target.value)] });
  };

  const AssignSaveBtnHandler = async () => {
    await Assign_division_group_role({ id: state?.id, ...assignPayload })
      .then(() => {
        toast.success('Updated successfully');
        Navigate('/administratorsdashboard');
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
  const GetAllGroup = () => {
    Get_Group()
      .then((response) => {
        setAllGroupData(response?.data);
        let tempArr = [];
        {
          response?.data?.map((x) => tempArr.push({ name: x?.name, id: x?.id }));
          setGroupsList(tempArr);
        }
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
    getAdminstorByIdFn();
    GetAllDivision();
    GetAllGroup();

    Get_All_Role();
  }, []);

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
    <div className='administrator_backcolor m-3'>
      <div className='administrator_information '>
        <h6 className='mx-3 my-3 poppins-semibold'>Administrators Information</h6>
        <div className='row m-3'>
          <div className='col-md-6 col-lg-6  Edit_admin p-0'>
            <table className='w-100 '>
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
                  <label className='poppins-regular'>Language</label>
                  <select className='form-control' name='language' value={language} onChange={handleChange}>
                    <option selected value='' disabled hidden>
                      Select your Language
                    </option>
                    <option>Danish</option>
                    <option>English</option>
                    <option>French </option>
                    <option>Italian </option>
                    <option>Spanish </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='poppins-regular'>Country</label>
                  <select className='form-control' name='country' value={country} onChange={handleChange}>
                    <option selected>Select your Country</option>
                    {COUNTRYLIST.map((row, i) => (
                      <option>{row?.en_short_name}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <label className='poppins-regular'>Gender</label>
                <select className='form-control' name='gender' value={gender} onChange={handleChange}>
                  <option value='others'>Other</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </tr>
            </table>
          </div>
          <div className='col-md-6 p-0'>
            <div className='col-md-12 EditTables_Body '>
              <table className='w-100 '>
                <tr>
                  <td>
                    <label className='poppins-regular'>Role</label>
                    <select className='form-control' name='role' onChange={handleChangeForAssign}>
                      <option selected disabled value='' hidden>
                        {/* {role?.name} */}
                        {role?.name ? role?.name : 'Select one Option'}
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
                    <select className='form-control' name='division' onChange={handleChangeForAssign}>
                      <option selected disabled value='' hidden>
                        {/* {division?.division_name} */}
                        {division?.division_name ? division?.division_name : 'Select one Option'}
                      </option>
                      {AllDivisionData?.map((row) => (
                        <option value={row?.id}>{row?.division_name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='poppins-regular'>Groups</label>
                    {/* <select className='form-control' name='group' onChange={handleChangeForAssign}>
                        <option selected disabled>
                          Select Groups
                        </option>
                        {AllGroupData?.map((row) => (
                          <option value={row?.id}>{row?.name}</option>
                        ))}
                      </select> */}
                    {/* <Multiselect options={AllGroupData} displayValue='name' placeholder='Select Groups' hidePlaceholder={true} onChange={handleChangeForAssign} /> <span></span> */}
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
        <div className='row align-items-center justify-content-end'>
          <div className='d-flex align-items-center  mx-3'>
            <button className='save_btn poppins-semibold' onClick={SaveBtnhandleClick}>
              Save
            </button>
            <button className='cancel_btn poppins-semibold' onClick={() => Navigate('/administratorsdashboard')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrator_info;
