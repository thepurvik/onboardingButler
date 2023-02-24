import React, { useEffect, useState } from 'react';
import '../../assets/styles/DashboardCss/EmployeeDashboard.css';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { Download_Icon } from '../../assets/icons/Download_Icon';
import { Additions_Icon } from '../../assets/icons/Additions_Icon';
import { InActive } from '../../assets/icons/InActive';
import { Active } from '../../assets/icons/Active';
import EMployeeImg from '../../assets/images/p1-sm.png';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import DashCard from '../../components/DashCard';
import { createAdmintrator, getAllAdminstrator, Get_Divison, Get_Group, Get_Role, updateAdminstrator } from '../../assets/API/Apis';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../assets/API/axiosInstances';
import Loader from '../../components/Loader';
import { TiTick } from 'react-icons/ti';
import { RiArrowUpDownLine } from 'react-icons/ri';
import Multiselect from 'multiselect-react-dropdown';
import { AiOutlineExport } from 'react-icons/ai';
import { useRef } from 'react';
import COUNTRYLIST from '../../Country_Nationality_List.json';

const initialStateAdmin = {
  email: '',
  first_name: '',
  last_name: '',
  user_type: '1',
  language: null,
  country: null,
  gender: 'others',
  division: '',
  groups: [],
};

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
    first_name: 'First name Required',
    last_name: 'Last name Required',
    // gender: 'Select one Option',
  },
  invalid: {
    email: '',
    first_name: '',
    last_name: '',
    // gender: '',
  },
};

const AdministratorsDashboard = () => {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectTask, setSelectTask] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState('');
  const [search, setSearch] = useState();
  const [state, setState] = useState('ASC');
  const [getAllAdminstratorState, setGetAllAdminstratorState] = useState([]);

  const [AllDivisionData, setAllDivisionData] = useState([]);
  const [AllGroupData, setAllGroupData] = useState([]);
  const [AllRolesData, setAllRolesData] = useState([]);

  const [groupsList, setGroupsList] = useState([]);
  const [selectGroups, setSelectGroups] = useState([]);

  const [createAdmin, setCreateAdmin] = useState({
    email: '',
    first_name: '',
    last_name: '',
    user_type: '1',
    language: null,
    country: null,
    gender: 'others',
    division: '',
    groups: [],
  });

  const [errors, setErrors] = useState({
    email: '',
    first_name: '',
    last_name: '',
    // gender: '',
  });

  const addModalClose = useRef(null);

  const getAllAdminFn = () => {
    getAllAdminstrator()
      .then((response) => {
        setGetAllAdminstratorState(response?.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    Navigate(`/administator_info/${id}/`, { state: { id: id } });
  };

  const changeHandler = (e) => {
    setCreateAdmin({
      ...createAdmin,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const createAdminApiFn = async (data) => {
    await createAdmintrator(data)
      .then((response) => {
        // window.location.reload();
        toast.success(response.message);
        // toast.success('Administrator Created Successfully!');
        getAllAdminFn();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const AdminstratorSaveBtnHandler = () => {
    const tempErrors = { ...errors };
    Object.keys(createAdmin).map(async (key) => {
      if (!createAdmin[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      } else {
        //error blank
        setErrors(tempErrors);
      }
    });

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }
    createAdminApiFn(createAdmin);
    Navigate(`/administratorsdashboard`);
    addModalClose.current.click();
  };

  useEffect(() => {
    getAllAdminFn();
    Get_All_Role();
    GetAllGroup();
    GetAllDivision();
  }, []);

  // Addministrators handleDelete api call...
  const handleDelete = async (id) => {
    setIsSubmitted(id);
    setPopUpOpen(true);
  };

  const Confirmhandler = async (id = isSubmitted) => {
    try {
      await axiosInstance.delete(`/dashboard/structure/administrator/${id}/`);
      // let delData = allGroup.filter((item) => {
      //   return item.id !== id;
      // });
      await getAllAdminstrator();
      getAllAdminFn();
      setPopUpOpen(false);
      toast.success('Administrator deleted successfully');
    } catch (error) {
      console.log('Something Want Wrong');
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

  const changeEmpStatusAPI = async (is_active, id) => {
    await updateAdminstrator({ id: id, is_active: !is_active })
      .then((response) => {
        if (is_active == true) {
          is_active = false; // console.log(staus);
          toast.dismiss();
          toast.error('Administrator deactivated.');
        } else {
          is_active = true;
          toast.dismiss();
          toast.success('Administrator activated.');
        }
        // toast.success('Updated successfully');
      })
      .catch((err) => {
        toast.danger('Error');
        console.log(err.message);
      });
    getAllAdminFn();
  };

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  const filtered = !search
    ? getAllAdminstratorState
    : getAllAdminstratorState.filter((person) => person?.full_name?.toLowerCase().includes(search.toLowerCase()) || person.email.toLowerCase().includes(search.toLowerCase()));

  const sorting = (col) => {
    if (state === 'ASC') {
      const sorter = [...getAllAdminstratorState].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
      setGetAllAdminstratorState(sorter);
      setState('DSC');
    }
    if (state === 'DSC') {
      const sorter = [...getAllAdminstratorState].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
      setGetAllAdminstratorState(sorter);
      setState('ASC');
    }
  };

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

  const handleSelectMultipleStandard = (selectedList) => {
    let selectedVal = selectedList.map(({ id }) => id);
    setSelectGroups(selectedList);
    setCreateAdmin({
      ...createAdmin,
      groups: selectedVal,
    });
  };

  const handleRemoveMultipleStandard = (selectedList) => {
    let selectedVal = selectedList.map(({ id }) => id);
    setSelectGroups(selectedList);
    setCreateAdmin({
      ...createAdmin,
      groups: selectedVal,
    });
  };

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
              value={search}
              onChange={handlesearch}
            />
          </div>
        </div>
        <div className='d-flex align-items-center Default_Body'>
          <div className='Default_Icon' title='Export'>
            {/* <Download_Icon /> */}
            <AiOutlineExport className='aioutline' />
          </div>
          <div
            className='Default_Icon'
            title='create'
            data-toggle='modal'
            data-target='#exampleModalCenter'
            onClick={() => {
              setCreateAdmin(initialStateAdmin);
            }}
          >
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
                    Add Administrators Information
                  </h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body m-2'>
                  <div className='row justify-content-around p-2'>
                    {/* <div className='col-md-8 col-lg-8 d-flex'> */}
                    <div className='col-md-5 col-12 Edit_admin p-0'>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Email*</label>
                            <input type='email' name='email' value={createAdmin?.email} className='form-control' placeholder='Enter Email' onChange={changeHandler} />
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
                            <input type='text' name='first_name' value={createAdmin?.first_name} className='form-control' placeholder='Enter First name' onChange={changeHandler} />
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
                            <input type='text' name='last_name' value={createAdmin?.last_name} className='form-control' placeholder='Enter Last name' onChange={changeHandler} />
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
                            <select className='form-control' name='language' value={createAdmin?.language} onChange={changeHandler}>
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
                            <select className='form-control' name='country' value={createAdmin?.country} onChange={changeHandler}>
                              <option selected>Select your Country</option>
                              {COUNTRYLIST.map((row, i) => (
                                <option>{row?.en_short_name}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <label className='poppins-regular'>Gender</label>
                          <select className='form-control' name='gender' value={createAdmin?.gender} onChange={changeHandler}>
                            <option value='others'>Other</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                          </select>
                        </tr>
                      </table>
                      {/* {errors.gender && (
                        <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                          {errors.gender}
                        </p>
                      )} */}
                    </div>
                    <div className='col-md-5 col-12 Edit_admin p-0 '>
                      <table className='w-100 '>
                        <tr>
                          <td>
                            <label className='poppins-regular'>Role</label>
                            <select className='form-control' name='role' onChange={changeHandler}>
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
                            <select className='form-control' name='division' onChange={changeHandler}>
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
                            <label className='poppins-regular'>Groups</label>
                            {/* <select className='form-control' name='group' onChange={changeHandler}>
                              <option selected disabled>
                                Select Groups
                              </option>
                              {AllGroupData?.map((row) => (
                                <option value={row?.id}>{row?.name}</option>
                              ))}
                            </select> */}
                            {/* <Multiselect options={AllGroupData} displayValue='name' placeholder='Select Groups' hidePlaceholder={true} onChange={handleChangeForAssign} />{' '} */}
                            <Multiselect
                              options={groupsList} // Options to display in the dropdown
                              selectedValues={selectGroups} // Preselected value to persist in dropdown
                              onSelect={handleSelectMultipleStandard} // Function will trigger on select event
                              onRemove={handleRemoveMultipleStandard} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                              placeholder='Select Groups'
                              hidePlaceholder={true}
                            />
                            <span></span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className='row align-items-center justify-content-between'>
                    <div className='mx-3 ml-5 d-flex align-items-center'>
                      <h5 className='mx-2 poppins-regular my-4'>Active</h5>
                      <a onClick={() => setShow(!show)}>{!show ? <Active /> : <InActive />}</a>
                    </div>
                    <div className='d-flex align-items-center mx-3'>
                      <button className='save_btn poppins-semibold' onClick={AdminstratorSaveBtnHandler}>
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
          </div>
          {/* Addition Model End*/}
        </div>
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
                    className={`checkboxLabel ${selectTask?.length === getAllAdminstratorState?.length ? 'active' : ''}`}
                    onClick={() => {
                      setSelectTask(selectTask?.length !== getAllAdminstratorState?.length ? getAllAdminstratorState?.reduce((prev, next) => [...prev, next.id], []) : []);
                    }}
                  >
                    {selectTask?.length === getAllAdminstratorState?.length && <TiTick className='activeIcon' />}
                  </label>
                </th>
                <th className='poppins-semibold'>
                  Name
                  <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('full_name')} />
                </th>
                <th className='poppins-semibold'>
                  Email
                  <RiArrowUpDownLine className='mx-1 UpDownArrow' onClick={() => sorting('email')} />
                </th>
                <th className='poppins-semibold'>Role</th>
                <th className='poppins-semibold'>Last Login</th>
                <th className='poppins-semibold'>Active/InActive</th>
                <th className='poppins-semibold'>Action</th>
              </tr>
            </thead>
            {loader ? (
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : filtered?.length > 0 ? (
              filtered?.map((row) => {
                return (
                  <>
                    <tbody>
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

                          {/* <input type='checkbox' name='' id='' /> */}
                        </td>
                        <td>
                          <div className='Emy_TableImg'>
                            <span className=' Emp_Img mx-2'>
                              <img src={row?.profile_pic !== '' && row?.profile_pic !== null ? row?.profile_pic : EMployeeImg} alt='image' />
                            </span>
                            <span className='name poppins-regular'>{row?.full_name}</span>
                            {/* {obj.employee} */}
                          </div>
                        </td>
                        <td className='poppins-regular'>{row?.email}</td>
                        <td className='poppins-regular'>{row?.role?.name}</td>
                        <td className='poppins-regular'>-</td>
                        <td className='poppins-regular'>
                          <label className='switch'>
                            <input type='checkbox' id={row?.id} checked={row.is_active ?? false} onChange={() => changeEmpStatusAPI(row?.is_active, row?.id)} />
                            <span className='slider round'></span>
                          </label>
                        </td>
                        <td className='poppins-regular'>
                          <div className='specialDiv'>
                            <MdOutlineModeEditOutline className='mx-3' style={{ fontSize: '23px', color: '#868689' }} onClick={(e) => handleClick(e, row?.id)} />
                            <MdDeleteOutline style={{ fontSize: '23px', color: '#868689' }} onClick={() => handleDelete(row.id)} />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
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
              <h4 style={{ color: 'black', fontSize: '15px' }}>Are you sure you want to delete this Administrator?</h4>
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
      {/* <div className='mr-3'>
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
      </div> */}
    </div>
  );
};

export default AdministratorsDashboard;
