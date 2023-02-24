import axios from 'axios';
import React, { useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URLS } from '../assets/Helper/constant';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const company = window.location.hostname?.split('.')?.[0];

  const handleClick = () => {
    let payload = {
      email: email,
    };

    axios
      .post(`${API_BASE_URLS.baseUrl_V1}/accounts/forgetpassword_mail`, payload, {
        headers: {
          company: company || '',
        },
      })
      .then(function (response) {
        toast.success(response.data.message);
      })
      .catch(function (error) {
        toast.error('Invalid Email');
      });
    setEmail('');
  };

  return (
    <div>
      <div className='registerCont'>
        <div className='container'>
          <div>
            <div className=''>
              <div className='form-action p-4'>
                <h2 className='text-center font-weight-bold mb-3 login_page'>Forgot Password?</h2>
                <form className='from_lable'>
                  <div className='form-outline mb-2'>
                    <label className='form-label'>Email*</label>
                    <input
                      className='form-control login_control form-control-md'
                      value={email}
                      name='email'
                      type='email'
                      placeholder='Enter Your Email'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-block btn-md btnColor login_btn' disabled={!email} onClick={() => handleClick()}>
                      Send Mail
                    </button>
                  </div>
                  <div className='mt-2'>
                    <Link to='/login' className=' btn text-decoration-none d-flex align-items-center' style={{ color: '#000000b3' }}>
                      <MdOutlineArrowBackIosNew className='mr-1' /> Back to login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
