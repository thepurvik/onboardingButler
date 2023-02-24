import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cookies_Bar = () => {
  const navigate = useNavigate();
  return (
    // <div className='container-fluid py-4'>
    <div className='Cookies_Body'>
      <input id='cookieButton' name='cookieButton' type='checkbox' className='mx-3' />
      <div id='cookieBar'>
        <div className='container d-flex align-items-center Cookies'>
          <h6 className='mr-5 m-0'>
            A cookie consent banner is a cookie notification in the form of a banner or pop-up that explicitly asks for users’ opt-in consent before deploying cookies. .
          </h6>
          <div>
            <label for='cookieButton' className='btn' onClick={() => navigate('/')}>
              Accept
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies_Bar;
