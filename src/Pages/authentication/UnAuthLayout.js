import React, { Fragment } from 'react';
import '../../assets/styles/Navbar.css';
import { VscSearch } from 'react-icons/vsc';
import OBB_Red_Logo_White from '../../assets/images/OBB_Red_Logo_White.png';

const UnAuthLayout = ({ children }) => {
  const NavData = {
    UnAuth: [
      { Link: '/', Label: 'Home' },
      { Link: '#', Label: 'Product' },
      { Link: '#', Label: 'Prices' },
      { Link: '#', Label: 'Cases' },
      { Link: '#', Label: 'Get Started' },
      { Link: '#', Label: 'Swedish' },
    ],
  };

  const UnAuthNavBar = () => {
    const NavTab = (data, i) => {
      const pathName = window.location.pathname;
      const active = pathName === data.Link;
      return (
        <li className={`nav-item ${active ? 'active' : ''} `} key={i}>
          {/* <a className='nav-link poppins-extrabold' href={data.Link}>
            {data.Label}
          </a> */}
        </li>
      );
    };

    return (
      <div className='container-fluid Navbar2-fluid p-0'>
        <div className='container '>
          <nav className='navbar navbar-expand-lg navbar-light Navbar2_Main align-items-center'>
            <div className='col-lg-6 col-12 d-flex align-items-center justify-content-between '>
              <div className='OnboardingLogo'>
                <img src={OBB_Red_Logo_White} className='UnAuth_Logo' />
              </div>
              <div>
                <button
                  className='navbar-toggler'
                  type='button'
                  data-toggle='collapse'
                  data-target='#navbarNav2'
                  aria-controls='navbarNav2'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
              </div>
            </div>
            <div className='col-lg-6 col-12 row '>
              <div className='collapse navbar-collapse justify-content-end navbar_body' id='navbarNav2'>
                <ul className='navbar-nav'>
                  {NavData.UnAuth.map((obj, i) => (
                    <Fragment key={i}>{NavTab(obj, i)}</Fragment>
                  ))}
                </ul>

                {/* <VscSearch className='Searcg_Icon' /> */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  };
  return (
    <>
      {UnAuthNavBar()}
      {children}
    </>
  );
};

export default UnAuthLayout;
