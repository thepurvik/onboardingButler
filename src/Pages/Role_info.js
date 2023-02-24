import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Get_Role, Get_Role_By_Id, updateRole } from '../assets/API/Apis';
import { Active } from '../assets/icons/Active';
import { InActive } from '../assets/icons/InActive';
import '../assets/styles/DashboardCss/contact_info.css';
import DashCard from '../components/DashCard';

const ValidationErrors = {
  empty: {
    name: 'Name is Required',
  },
  invalid: {
    name: '',
  },
};

const Role_info = () => {
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  const [roles, setRoles] = useState([]);

  const [values, setValues] = useState({
    name: '',
    description: '',
    share_data: false,
    createdAt: '',
    updatedAt: '',
    reports_to: '',
    lead_role: '',
    up_line: '',
  });
  const { name, description, share_data, createdAt, updatedAt, reports_to, lead_role, up_line } = values;
  const Navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const Get_All_Role_By_id = () => {
    Get_Role_By_Id({ id: state?.id }).then((response) => {
      if (response) {
        const { name, reports_to, lead_role, share_data, description } = response.data;
        setValues({
          name: name,
          reports_to: reports_to?.name,
          lead_role: lead_role?.name,
          share_data: share_data,
          description: description,
        });
      }
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
    Get_All_Role_By_id();
    Get_Role_Data();
  }, []);

  const handleClick = () => {
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

    updateRole({ id: state.id, ...values })
      .then((response) => {
        // setValues(values);
        toast.success(response.message);
        Navigate(`/role`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className='contact_backcolor m-3'>
      <div className='contact_information'>
        <h6 className='mx-3 my-3 poppins-semibold'>Role information</h6>
        <div className='row m-3'>
          {/* <div className='col-md-3 col-sm-12 p-0'>
            <DashCard />
          </div> */}
          <div className='col-md-8 col-sm-12 p-0 mx-2'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='col-md-12 EditTables_Body'>
                  <table className='w-100 '>
                    <tr>
                      <td>
                        <label className='poppins-regular'>Role name*</label>
                        <input type='text' name='name' value={name} className='form-control' placeholder='Enter Role' onChange={(e) => handleChange(e)} />
                      </td>
                    </tr>
                    {errors.name && (
                      <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                        {errors.name}
                      </p>
                    )}
                    {/* <tr>
                      <td>
                        <label className='poppins-regular'>Report to*</label>
                        <input type='text' name='reports_to' value={reports_to} className='form-control' placeholder='Enter Report' onChange={handleChange} />
                      </td>
                    </tr> */}
                    <tr>
                      <td>
                        <label className='poppins-regular'>Report to</label>
                        <select className='form-control' name='reports_to' onChange={handleChange}>
                          <option selected disabled hidden value=''>
                            {reports_to ? reports_to :'Select Report to'}
                          </option>
                          {roles?.map((row) => (
                            <option value={row?.name}>{row?.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='poppins-regular'>Level</label>
                        <select className='form-control' name='level' onChange={handleChange}>
                          <option selected value='' disabled hidden>
                            above
                          </option>
                          <option>above</option>
                          <option>below</option>
                        </select>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <label className='poppins-regular'>Role</label>
                        <input type='text' name='role' value='' className='form-control' placeholder='Full time' onChange={handleChange} />
                      </td>
                    </tr> */}
                    <tr>
                      <td>
                        <label className='poppins-regular'>Description</label>
                        <textarea type='text' name='description' value={description} className='form-control' placeholder='Enter Description' onChange={handleChange} />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-md-12 EditTables_Body'>
                  <table className='w-100 '>
                    {/* <tr>
                      <td>
                        <label className='poppins-regular'>Reporting roles</label>
                        <input type='text' name='last_name' value='' className='form-control' placeholder='Line Manager' onChange={handleChange} />
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td>
                        <label className='poppins-regular'>Lead role*</label>
                        <input type='text' name='lead_role' value={lead_role} className='form-control' placeholder='Enter Lead Role' onChange={handleChange} />
                      </td>
                    </tr> */}
                    <tr>
                      <td>
                        <label className='poppins-regular'>Lead role</label>
                        <select className='form-control' name='lead_role' onChange={handleChange}>
                          <option selected disabled hidden value=''>
                            {lead_role ? lead_role : 'Select Lead Role'}
                          </option>
                          {roles?.map((row) => (
                            <option value={row?.name}>{row?.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='poppins-regular'>Share data</label>
                        <select className='form-control' name='share_data' onChange={handleChange}>
                          <option selected value={share_data} disabled hidden>
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
        </div>
        <div className='d-flex justify-content-end'>
          <div className='d-flex align-items-center mx-3 my-3'>
            <button className='save_btn poppins-semibold' onClick={handleClick}>
              Save
            </button>
            <button className='cancel_btn poppins-semibold' onClick={() => Navigate('/role')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Role_info;
