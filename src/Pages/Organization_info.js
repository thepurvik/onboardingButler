import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Get_Divison_By_Id, Update_Division_Data } from '../assets/API/Apis';
import { Active } from '../assets/icons/Active';
import { InActive } from '../assets/icons/InActive';
import '../assets/styles/DashboardCss/contact_info.css';
import COUNTRYLIST from '../Country_Nationality_List.json';

const ValidationErrors = {
  empty: {
    division_name: 'Organization Name is Required',
  },
  invalid: {
    division_name: '',
  },
};

const Organization_info = () => {
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();

  const [values, setValues] = useState({
    division_name: '',
    country: '',
    zone: '',
  });
  const { division_name, country, zone } = values;

  const [errors, setErrors] = useState({
    division_name: '',
  });

  const { state } = useLocation();
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const Get_All_Division_By_id = () => {
    Get_Divison_By_Id({ id: state?.id }).then((response) => {
      if (response) {
        setValues({
          division_name: response.data.division_name,
          country: response.data.country,
          zone: response.data.zone,
        });
      }
    });
  };

  useEffect(() => {
    Get_All_Division_By_id();
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
    Update_Division_Data({ id: state?.id, ...values })
      .then(() => {
        setValues(values);
        toast.success('Organization updated successfully');
        Navigate(`/organization`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className='contact_backcolor m-3'>
      <div className='contact_information'>
        <h6 className='mx-3 my-3 poppins-semibold'>Organization information</h6>
        <div className='row m-3'>
          {/* <div className='col-md-3 col-sm-12 p-0'>
            <DashCard />
          </div> */}
          <div className='col-md-8 col-sm-12 p-0 mx-2'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='col-md-12 EditTables_Body p-0'>
                  <table className='w-100 '>
                    <tr>
                      <td>
                        <label className='poppins-regular'>Organization name*</label>
                        <input type='text' name='division_name' value={division_name} className='form-control' placeholder='Enter Organization Name' onChange={handleChange} />
                      </td>
                    </tr>
                    {errors.division_name && (
                      <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                        {errors.division_name}
                      </p>
                    )}
                    <tr>
                      <td>
                        <label className='poppins-regular'>Country </label>
                        <select className='form-control' value={country} name='country' onChange={handleChange}>
                          <option selected>Select Country</option>
                          {COUNTRYLIST.map((row, i) => (
                            <option>{row?.en_short_name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='poppins-regular'>Zone*</label>
                        <select className='form-control' value={zone} name='zone' onChange={handleChange}>
                          <option>north</option>
                          <option>west</option>
                          <option>east</option>
                          <option>south</option>
                        </select>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row align-items-center justify-content-between my-3'>
              <div className='d-flex align-items-center '>
                <h5 className='poppins-regular my-4 mx-2'>Active</h5>
                <a onClick={() => setShow(!show)}>{!show ? <Active /> : <InActive />}</a>
              </div>
              <div className='d-flex align-items-center '>
                <button className='save_btn poppins-semibold' onClick={handleClick}>
                  Save
                </button>
                <button className='cancel_btn poppins-semibold' onClick={() => Navigate('/organization')}>
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
export default Organization_info;
