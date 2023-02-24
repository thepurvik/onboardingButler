import React, { useEffect, useState } from 'react';
import '../../assets/styles/DashboardCss/EmployeeDashboard.css';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { Additions_Icon } from '../../assets/icons/Additions_Icon';
import EMployeeImg from '../../assets/images/p1-sm.png';
import { useNavigate } from 'react-router-dom';
import { InActive } from '../../assets/icons/InActive';
import { Active } from '../../assets/icons/Active';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { createRole, Get_Role } from '../../assets/API/Apis';
import { axiosInstance } from '../../assets/API/axiosInstances';
import Loader from '../../components/Loader';
import { TiTick } from 'react-icons/ti';
import { toast } from 'react-toastify';

const initialData = {
  name: '',
  reports_to: '',
  lead_role: '',
  share_data: false,
  description: null,
  level: '',
  role: 'manager',
  // up_line: '',
  // description: '',
  // createdAt: '',
  // updatedAt: '',
};

const Role = () => {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [roleData, setRoleData] = useState('');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectTask, setSelectTask] = useState([]);
  const [search, setSearch] = useState();

  const [values, setValues] = useState({
    name: '',
    reports_to: '',
    lead_role: '',
    share_data: '',
    description: null,
    level: '',
    role: 'manager',
    // up_line: '',
    // createdAt: '',
    // updatedAt: '',
  });

  const { name, reports_to, lead_role, role, share_data, level, up_line, description, createdAt, updatedAt } = values;

  const Get_All_Role = () => {
    setLoading(true);
    Get_Role()
      .then((response) => {
        setRoleData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, 'error');
        setLoading(false);
      });
  };

  const Get_Role_Data = () => {
    Get_Role()
      .then((response) => {
        setRoles(response?.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  useEffect(() => {
    Get_All_Role();
    Get_Role_Data();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    Navigate(`/role_info/${id}/`, { state: { id: id } });
  };

  const handleDelate = async (id) => {
    try {
      await axiosInstance.delete(`/dashboard/structure/role/${id}/`);
      toast.success('Role deleted successfully');
      // window.location.reload();
      Get_All_Role();
      Get_Role_Data();
    } catch (error) {
      toast.error("Admin role can't be deleted.");
      console.log('error', error);
    }
  };
  const addIconHandler = () => {
    setValues({ ...initialData });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClick = async (e) => {
    e.preventDefault();
    try {
      await createRole(values).then((response) => {
        toast.success('Role created successfully.');
        // window.location.reload();
        Get_All_Role();
        Get_Role_Data();
      });
    } catch (error) {
      console.log(error, 'data not found');
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
  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  const filtered = !search ? roleData : roleData.filter((person) => person?.name?.toLowerCase().includes(search.toLowerCase()));
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
            <input type='text' className='form-control Input_type' placeholder='Search' aria-label='Search' aria-describedby='addon-wrapping' onChange={handlesearch} />
          </div>
        </div>
        <div className='d-flex align-items-center Default_Body'>
          <div
            className='Default_Icon'
            data-toggle='modal'
            data-target='#exampleModalCenter'
            // onClick={() => {
            //   Navigate('/create_obb_plan');
            // }}
            title='create'
            onClick={addIconHandler}
          >
            <Additions_Icon />
          </div>
        </div>
      </div>
      {/* Addition Model Start*/}
      <div
        className='modal fade Role_Modal'
        id='exampleModalCenter'
        tabindex='-1'
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
                Add Role Information
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='col-md-12 EditTables_Body'>
                    <table className='w-100 '>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Role name*</label>
                          <input type='text' name='name' value={name} className='form-control' placeholder='Enter Role Name' onChange={handleChange} />
                        </td>
                      </tr>

                      {/* <tr>
                        <td>
                          <label className='poppins-regular'>Report to</label>
                          <input type='text' name='reports_to' value={reports_to} className='form-control' placeholder='Marketing Specialist' onChange={handleChange} />
                        </td>
                      </tr> */}
                      <tr>
                        <td>
                          <label className='poppins-regular'>Report to*</label>
                          <select className='form-control' name='reports_to' onChange={handleChange}>
                            <option selected disabled hidden>
                              Select Report to
                            </option>
                            {roles?.map((row) => (
                              <option value={row?.name}>{row?.name}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Level*</label>
                          <select className='form-control' name='level' onChange={handleChange}>
                            <option selected value='' disabled hidden>
                              Select level
                            </option>
                            <option value='above'>Above</option>
                            <option value='below'>Below</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Description</label>
                          <input type='text' name='description' value={description} className='form-control' placeholder='Enter Description' onChange={handleChange} />
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
                          <label className='poppins-regular'>Roles*</label>
                          <select className='form-control' name='role' onChange={handleChange}>
                            <option selected disabled hidden>
                              Select Reporting Roles
                            </option>
                            {roles?.map((row) => (
                              <option value={row?.name}>{row?.name}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {/* <tr>
                        <td>
                          <label className='poppins-regular'>lead role </label>
                          <input type='text' name='lead_role' value={lead_role} className='form-control' placeholder='Line Manager' onChange={handleChange} />
                        </td>
                      </tr> */}
                      <tr>
                        <td>
                          <label className='poppins-regular'>Lead role*</label>
                          <select className='form-control' name='lead_role' onChange={handleChange}>
                            <option selected disabled hidden>
                              Select lead Role
                            </option>
                            {roles?.map((row) => (
                              <option value={row?.name}>{row?.name}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className='poppins-regular'>Share data*</label>
                          <select className='form-control' name='share_data' value={share_data} onChange={handleChange}>
                            <option selected value='' disabled hidden>
                              Yes
                            </option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                          </select>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn Btn_Close' data-dismiss='modal' disabled={(name && reports_to && lead_role && role && level) === ''} onClick={handleModalClick}>
                Save
              </button>
              <button type='button' className='btn Btn_Save' data-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Addition Model End*/}
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
                    className={`checkboxLabel ${selectTask?.length === roleData?.length ? 'active' : ''}`}
                    onClick={() => {
                      setSelectTask(selectTask?.length !== roleData?.length ? roleData?.reduce((prev, next) => [...prev, next.id], []) : []);
                    }}
                  >
                    {selectTask?.length === roleData?.length && <TiTick className='activeIcon' />}
                  </label>
                </th>
                <th className='poppins-semibold'>Role Name</th>
                <th className='poppins-semibold'>Description </th>
                <th className='poppins-semibold'>Report to</th>
                <th className='poppins-semibold'>Date</th>
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
              filtered?.map((row, i) => (
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
                    </td>
                    <td>
                      <div className='Emy_TableImg'>
                        <span className='name poppins-regular'>{row?.name}</span>
                      </div>
                    </td>
                    <td className='poppins-regular'>{row?.description}</td>
                    <td className='poppins-regular'>{row?.reports_to?.name}</td>
                    {/* <td className='poppins-regular'>{row?.reports_to == null ? '-' : row?.reports_to}</td> */}
                    <td className='poppins-regular'>{row?.createdAt}</td>
                    <td className='poppins-regular' onClick={() => setShow(!show)}>
                      {/* {!show ? <Active /> : <InActive />} */}
                      <MdOutlineModeEditOutline className='mx-3' style={{ fontSize: '23px', color: '#868689' }} onClick={(e) => handleClick(e, row?.id)} />
                      <MdDeleteOutline style={{ fontSize: '23px', color: '#868689' }} onClick={() => handleDelate(row.id)} />
                    </td>
                  </tr>
                </tbody>
              ))
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

      {/* pagination  */}
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

export default Role;
