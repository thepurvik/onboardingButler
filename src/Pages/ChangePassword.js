import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Change_Password } from '../assets/API/Apis';
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [values, setValues] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });
  const navigate = useNavigate();

  const [formErorr, setformErorr] = useState({});
  const { old_password, password, confirm_password } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let flag = true;
    setformErorr({});

    if (!values.old_password) {
      setformErorr((prev) => {
        return {
          ...prev,
          old_password: 'Old password required',
        };
      });
      flag = false;
    }
    if (!values.password) {
      setformErorr((prev) => {
        return {
          ...prev,
          password: 'Password required',
        };
      });
      flag = false;
    }
    if (!values.confirm_password) {
      setformErorr((prev) => {
        return {
          ...prev,
          confirm_password: 'Password required',
        };
      });
      flag = false;
    } else if (values.password && values.confirm_password && values.password !== values.confirm_password) {
      setformErorr((prev) => {
        return {
          ...prev,
          confirm_password: "password doesn't match",
        };
      });
      flag = false;
    }
    if (flag) {
      Change_Password(values)
        .then((response) => {
          if (response?.status === 200) {
            toast.success('change password succesfully');
            navigate('/');
          }
        })
        .catch(function (error) {
          // alert(error);
          setformErorr((prev) => {
            return {
              ...prev,
              old_password: 'Old password is incorrect',
            };
          });
          flag = false;
        });
    }
  };

  return (
    <div className=' Change_Head'>
      <div className='Change_Body p-2'>
        <div className='Change_Input'>
          <form onSubmit={formSubmitHandler}>
            <div className='text-center' style={{ fontWeight: 'bold' }}>
              <h4 className='m-0'>Change Password</h4>
            </div>
            <div className='col-md-11 m-auto'>
              <div className='form-outline mb-2'>
                <label className='form-label'>Old Password*</label>
                <div className='input-group'>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    id='old_password'
                    name='old_password'
                    values={old_password}
                    placeholder='Old Password'
                    onChange={handleChange}
                    className='form-control'
                    maxLength={10}
                  />
                  <div className='input-group-append Change_Pwd'>
                    <button className='btn' onClick={() => setShowPwd(!showPwd)} type='button'>
                      {!showPwd ? <BsEyeFill /> : <BsFillEyeSlashFill />}
                    </button>
                  </div>
                </div>
                <span className='text-danger'>{formErorr.old_password}</span>
              </div>
              <div className='form-outline mb-2'>
                <label className='form-label'> New Password*</label>
                <div className='input-group'>
                  <input
                    type={showPwd1 ? 'text' : 'password'}
                    id='password'
                    name='password'
                    values={password}
                    placeholder='New Password'
                    onChange={handleChange}
                    className='form-control'
                    maxLength={10}
                  />
                  <div className='input-group-append Change_Pwd'>
                    <button className='btn' onClick={() => setShowPwd1(!showPwd1)} type='button'>
                      {!showPwd1 ? <BsEyeFill /> : <BsFillEyeSlashFill />}
                    </button>
                  </div>
                </div>
                <span className='text-danger'>{formErorr.password}</span>
              </div>
              <div className='form-outline mb-2'>
                <label className='form-label'>Confirm Password*</label>
                <div className='input-group'>
                  <input
                    type={showPwd2 ? 'text' : 'password'}
                    id='confirm_password'
                    name='confirm_password'
                    values={confirm_password}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    className='form-control'
                    maxLength={10}
                  />
                  <div className='input-group-append Change_Pwd'>
                    <button className='btn' onClick={() => setShowPwd2(!showPwd2)} type='button'>
                      {!showPwd2 ? <BsEyeFill /> : <BsFillEyeSlashFill />}
                    </button>
                  </div>
                </div>
                <span className='text-danger'>{formErorr.confirm_password}</span>
              </div>
              <div className='row justify-content-end mt-2 Change_Btn'>
                <button className='btn mx-3 Save_btn'>Save Password</button>
                <button className='btn Cancel_btn' onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
