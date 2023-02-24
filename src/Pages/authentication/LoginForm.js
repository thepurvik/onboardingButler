import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import mslogo from '../../assets/images/microsoft_logo.png';
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import '../../assets/styles/Register.css';
import useCustomTheme from '../../hooks/useCustomTheme';
import { getCornerStones } from '../../assets/API/Apis';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();
  const { login, loginMicrosoftWithHeader } = useAuth();
  const [flag, setFlag] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { dispatch } = useCustomTheme();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { email, password } = values;

  useEffect(async () => {
    localStorage.setItem('isLoginSSO', true);
    var parameter = window.location.search;
    var email = '';
    var password = '';
    if (parameter != '') {
      setFlag(false);
      parameter = parameter?.replace('?', '');
      parameter = parameter?.split('&');
      if (parameter[0] != '') {
        email = parameter[0]?.split('=')[1];
      }
      if (parameter[1] != '') {
        if (parameter[1]?.split('=')[0] == 'password') {
          password = parameter[1]?.split('=')[1];
        } else {
          await loginMicrosoftWithHeader({ email }, window.location.hostname?.split('.')?.[0])
            .then((response) => {
              if (response) {
                toast.success('Login Successfull');
                localStorage.setItem('SsoLoginfirstTime', true);

                if (response?.data?.user_type) {
                  if (response?.data?.user_type === 1) {
                    window.location = '/dashlayout';
                  } else {
                    window.location = '/';
                  }
                }
              } else if (response?.message) {
                toast.error(response.message);
              } else {
                toast(response.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });

          // setTimeout(() => {
          //   window.location = '/poc/';
          // }, 1000);
        }
      }
      if (parameter[2] != '') {
        if (parameter[2]?.split('=')[0] == 'user_type') {
          await loginMicrosoftWithHeader(
            { email, user_type: parameter[2]?.split('=')[1], first_name: 'abcd', last_name: 'xyz', country: 'denmark', language: 'denish' },
            window.location.hostname?.split('.')?.[0]
          )
            .then((response) => {
              if (response?.data) {
                // toast.success('Login Successfull');
                localStorage.setItem('firstTime2', true);
                localStorage.setItem('SsoLoginfirstTime', true);
                if (response?.data?.user_type === 1) {
                  window.location = '/dashlayout';
                } else {
                  window.location = '/';
                }
              } else if (response?.message) {
                toast.error(response.message);
              } else {
                toast(response.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });

          // toast.success('login Successfull');
          // localStorage.setItem('firstTime2', true);
          // localStorage.setItem('SsoLoginfirstTime', true);

          // setTimeout(() => {
          //   window.location = '/poc/';
          // }, 1000);
        }
      }

      // for normal login auto flow.................................................................................................................

      if (email != '' && password != '') {
        const response = await login({
          email,
          password,
          first_time: true,
        })
          .then((response) => {
            if (response?.data) {
              toast.success('Login Successfull');
              // localStorage.setItem('firstTime', true);
              localStorage.setItem('firstTime2', true);
              localStorage.setItem('NormalLoginfirstTime', true);
              if (response?.data?.user_type === 1) {
                window.location = '/dashlayout';
              } else {
                window.location = '/';
              }
            } else if (response?.message) {
              toast.error(response.message);
            } else {
              toast(response.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  const handelLoginWithPopup = async (e) => {
    await loginWithRedirect();
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setEmailError('');
    setPasswordError('');
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!email) {
      setEmailError('Email Required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid Email');
    }

    if (!password) {
      setPasswordError('Password Required');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Invalid Password');
    } else {
      setValues({
        email: '',
        password: '',
      });

      const response = await login(values);

      if (response?.data) {
        toast.success('Login Successfull');
        localStorage.setItem('firstTime', true);
        if (response?.data?.user_type === 1) {
          window.location = '/dashlayout';
        } else {
          window.location = '/';
        }
        // setTimeout(() => {
        //   window.location = '/poc/';
        // }, 1000);
      } else if (response?.message) {
        toast.error(response.message);
      } else {
        toast(response.message);
      }
    }
  };
  return (
    <>
      {flag ? (
        <div className='registerCont'>
          <div className='container'>
            <div>
              <div className=''>
                <div className='form-action p-4'>
                  <h2 className='text-center font-weight-bold mb-3 login_page'>Sign In to Your Account</h2>
                  <form className='from_lable'>
                    <div className='form-outline mb-2'>
                      <label className='form-label'>Email*</label>
                      <input className='form-control login_control form-control-md' value={email} name='email' onChange={handleChange} type='text' id='email' placeholder='Email' />
                      {emailError && (
                        <p className='text-danger' style={{ fontSize: '13px' }}>
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className='form-outline mb-3'>
                      <label className='form-label'>Password*</label>
                      <div className='input-group mb-3 register_control'>
                        <input
                          type={showPwd ? 'text' : 'password'}
                          className='form-control login_control form-control-md'
                          value={password}
                          name='password'
                          onChange={handleChange}
                          id='password'
                          placeholder='Password'
                        />
                        <div className='input-group-append' id='btnShowPwd'>
                          <button className='btn' onClick={() => setShowPwd(!showPwd)} type='button'>
                            {!showPwd ? <BsEyeFill /> : <BsFillEyeSlashFill />}
                          </button>
                        </div>
                      </div>
                      {passwordError && (
                        <p className='text-danger' style={{ fontSize: '13px' }}>
                          {passwordError}
                        </p>
                      )}
                    </div>
                    <Link to='/forgetpassword' className='text-danger text-decoration-none'>
                      Forgot Your Password?
                    </Link>

                    <div className='d-flex justify-content-center '>
                      <button className='btn btn-block btn-md btnColor login_btn' onClick={handleClick}>
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className='d-flex align-items-center justify-content-center  my-2'>
                    <div className='w-25'>
                      <hr className='bg-dark' />
                    </div>
                    <span className='mx-4'>OR</span>
                    <div className='w-25'>
                      <hr className='bg-dark' />
                    </div>
                  </div>
                  <button className='btn btn-block btn-white microsoft_btn' onClick={handelLoginWithPopup}>
                    <img src={mslogo} width='28px' height='28px' alt='microsoft' className='mx-2' />
                    Sign In with Microsoft Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginForm;
