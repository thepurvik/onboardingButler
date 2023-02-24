import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../assets/styles/Register.css';
import { Icn_lock } from '../../assets/icons/Icn_lock';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import COUNTRYLIST from '../../Country_Nationality_List.json';

const ValidationErrors = {
  empty: {
    company: 'Company Required',
    country: 'Select one option',
    tnc: 'You must accept our Terms & Conditions',
  },
  invalid: {
    company: '',
    country: '',
    tnc: '',
  },
};

const Callback = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginMicrosoft } = useAuth();
  const [verified, setVerified] = useState(false);
  const [url, setUrl] = useState(null);

  const [values, setValues] = useState({
    user_type: '2',
    company: '',
    country: '',
    language: 'English',
  });

  const [errors, setErrors] = useState({
    user_type: '',
    company: '',
    country: '',
  });

  const { company, country, language } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const tempErrors = { ...errors };
    Object.keys(values).map((key) => {
      if (!values[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      }
    });
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }
    let payload = {
      ...values,
      email: user?.email,
      first_name: user?.given_name,
      last_name: user?.family_name,
    };
    const response = await loginMicrosoft(payload);

    // const response = await register(values);
    if (response?.status == 200) {
      let url = response?.data?.data?.company?.domains[0]?.domain;
      setVerified(true);
      setUrl(`${url}/`);
      // navigate(`${url}/poc`);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleClick = () => {
    window.open(
      'https://' + url + '/login',
      '_blank' // <- This is what makes it open in a new window.
    );
  };

  const SuccessPopup = () => (
    <div className='registerCont d-flex align-content-center'>
      <div className='popup p-4'>
        <h1 className='text-center'>Account created!</h1>
        <p className='text-center'>You can now log in to your new account using the address</p>
        <button className='btn btn-success m-auto d-flex justify-content-center' onClick={handleClick}>
          {url}
        </button>
      </div>
    </div>
  );

  return verified ? (
    SuccessPopup()
  ) : (
    <div className='container'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-12 col-md-6'>
          <div className='form-action p-4 my-5'>
            <h2 className='text-center poppins-semibold mb-3 ac_text'>Create Your Account</h2>
            <form className='form_datas'>
              <div className='form-outline mb-2'>
                <label className='form-label poppins-regular'>Company*</label>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text ' id='basic-addon1'>
                      <Icn_lock />
                    </span>
                  </div>
                  <input type='text' className='form-control register_control' name='company' value={company} placeholder='https://' onChange={handleChange} />
                </div>
                {errors.company && (
                  <p className='text-danger' style={{ margin: '-15px 9px', fontSize: '13px' }}>
                    {errors.company}
                  </p>
                )}
              </div>
              <div className=' form-outline mb-2'>
                <label className='form-label poppins-regular'>Domain</label>
                <input
                  className='form-control register_control form-control-md'
                  name='domain'
                  type='domain'
                  id='domain'
                  placeholder='onboarding.dk'
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='row'>
                <div className='col-md-6 mb-2'>
                  <div className='form-outline mb-2'>
                    <label className='form-label poppins-regular'>Country</label>
                    <select
                      className='select form-control register_control'
                      name='country'
                      value={country}
                      onChange={(e) => {
                        if (e.target.value !== 'select') {
                          handleChange(e);
                        }
                      }}
                    >
                      <option selected>Select your Country</option>
                      {COUNTRYLIST.map((row, i) => (
                        <option>{row?.en_short_name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.country && (
                    <p className='text-danger' style={{ margin: '-9px 11px', fontSize: '14px' }}>
                      {errors.country}
                    </p>
                  )}
                </div>
                <div className='col-md-6 mb-2'>
                  <div className='form-outline mb-2'>
                    <label className='form-label poppins-regular'>Language</label>
                    <select className='select form-control register_control' name='language' value={language} onChange={handleChange}>
                      <option value='English'>English</option>
                      <option value='Hindi'>Hindi</option>
                      <option value='Swedish'>Swedish </option>
                      <option value='Urdu'>Urdu</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='d-flex justify-content-center mt-3'>
                <button className='btn btn-block btn-md btncolor poppins-regular' onClick={handleRegister}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  // );
};

export default Callback;
