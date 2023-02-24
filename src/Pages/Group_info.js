import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Get_Group_By_Id, Update_Group_Data } from '../assets/API/Apis';
import { Active } from '../assets/icons/Active';
import { InActive } from '../assets/icons/InActive';
import '../assets/styles/DashboardCss/contact_info.css';
import DashCard from '../components/DashCard';

const ValidationErrors = {
  empty: {
    name: 'Group Name is Required',
    description: 'Description is Required',
  },
  invalid: {
    name: '',
    description: '',
  },
};

const Group_info = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });
  const { name, description } = values;
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const Get_All_Group_By_id = () => {
    Get_Group_By_Id({ id: state?.id }).then((response) => {
      if (response) {
        setValues({
          name: response.data.name,
          description: response.data.description,
        });
      }
    });
  };

  useEffect(() => {
    Get_All_Group_By_id();
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

    Update_Group_Data({ id: state?.id, ...values })
      .then(() => {
        setValues(values);
        toast.success('Groups updated successfully');
        Navigate(`/group`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className='contact_backcolor m-3'>
      <div className='contact_information'>
        <h6 className='mx-3 my-3 poppins-semibold'>Groups information</h6>
        <div className='row m-3'>
          {/* <div className='col-md-3 col-sm-12 p-0'>
            <DashCard />
          </div> */}
          <div className='col-md-8 col-sm-12 p-0 mx-2'>
            <div className='row'>
              <div className='col-md-8'>
                <div className='col-md-12 EditTables_Body'>
                  <table className='w-100 '>
                    <tr>
                      <td>
                        <label className='poppins-regular'>Group name*</label>
                        <input type='text' name='name' value={name} className='form-control' placeholder='Enter Group Name' onChange={(e) => handleChange(e)} />
                      </td>
                    </tr>
                    {errors.name && (
                      <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                        {errors.name}
                      </p>
                    )}
                    <tr>
                      <td>
                        <label className='poppins-regular'>Description</label>
                        <textarea
                          type='text'
                          name='description'
                          value={description}
                          rows={10}
                          className='form-control'
                          placeholder='Enter Description'
                          onChange={(e) => handleChange(e)}
                        />
                      </td>
                    </tr>
                    {errors.description && (
                      <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                        {errors.description}
                      </p>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row align-items-center justify-content-between my-3'>
              <div className='d-flex align-items-center mx-3'>
                <h5 className='poppins-regular my-4 mx-2'>Active</h5>
                <a onClick={() => setShow(!show)}>{!show ? <Active /> : <InActive />}</a>
              </div>
              <div className='d-flex align-items-center'>
                <button className='save_btn poppins-semibold' onClick={handleClick}>
                  Save
                </button>
                <button className='cancel_btn poppins-semibold' onClick={() => Navigate('/group')}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Group_info;
