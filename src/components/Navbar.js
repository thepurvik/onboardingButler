import React, { useContext, useEffect } from 'react';
import '../assets/styles/Navbar.css';
import { GoCreditCard } from 'react-icons/go';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoLogOutOutline } from 'react-icons/io5';
import { AiFillBell, AiOutlineSearch, AiFillQuestionCircle } from 'react-icons/ai';
import { GrLanguage } from 'react-icons/gr';
import { MdKeyboardArrowDown } from 'react-icons/md';
// import Default_img from '../assets/images/default.jpg';
import Nav_profile_pic from '../assets/images/default.jpg';
import OBB_Red_Logo_White from '../assets/images/OBB_Red_Logo_White.png';
// import { LogoOnboarding } from '../assets/icons/LogoOnboarding';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { GoogleID } from '../App';

const NavData = {
  Auth: [
    { Link: '/', Label: 'Home' },
    { Link: '/tasks', Label: 'Tasks' },
    { Link: '/onboarding_plans', Label: 'Pathfinder' },
    // { Link: '/dashboard', Label: 'Dashboard' },
    // { Link: '/nudging', Label: 'Nudging' },
    // { Link: '/reflections', Label: 'My Reflections' },
  ],
};

const NavTab = (data, i) => {
  const pathName = window.location.pathname;
  const active = pathName === data.Link;

  const handlerClick = () => {
    window.location.reload();
  };
  return (
    <li activeClassName='active' key={i} id='TopScroll' onClick={data.Label === 'Home' ? handlerClick : ''}>
      <NavLink className='nav-link poppins-extrabold' to={data.Link}>
        {data.Label}
      </NavLink>
    </li>
  );
};

const AuthNavBar = (user) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    // window.location = '/login';
    navigate('/login');
  };

  const Google_ID = useContext(GoogleID);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('google-navbar-body');
  }, []);

  return (
    <div className='container-fluid Navbar3-fluid p-0'>
      <div className='container p-0'>
        <nav className='navbar navbar-expand-xl navbar-dark justify-content-between'>
          <div className='w-100 d-flex align-items-center justify-content-between'>
            <div className='outer-logo OnboardingLogo'>
              <img src={OBB_Red_Logo_White} />
            </div>
            <div>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav3'
                aria-controls='navbarNav3'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
            </div>
          </div>
          <div className='col-lg-12 p-0'>
            <div className='row align-items-center'>
              <div className='collapse navbar-collapse justify-content-between navbar_body' id='navbarNav3'>
                <div className='row'>
                  <div className='OnboardingLogo inner-logo p-0' onClick={() => navigate('/')}>
                    <img src={OBB_Red_Logo_White} />
                  </div>
                </div>
                <div className='row Navbar_grid'>
                  <ul className='navbar-nav'>{NavData.Auth.map((obj, i) => NavTab(obj, i))}</ul>
                </div>
                <div className='row Nav-Icon align-items-center ' id='navbarNav3'>
                  <a href='#' className='nav-link'>
                    <AiOutlineSearch />
                  </a>
                  <a href='#' className='nav-link'>
                    <AiFillBell />
                  </a>
                  <a href='#' className='nav-link'>
                    <AiFillQuestionCircle />
                  </a>
                  {/* <img src={p2sm} className='img-fluid mx-2' alt='Profile_icon' id='dropdownMenuButton' data-toggle='dropdown' /> */}
                  <div className='navbar_pic'>
                    <img src={user?.profile_pic || Nav_profile_pic} className='img-fluid mx-2' alt='Profile_icon' />
                  </div>
                  <a href='#' className='dropdown nav-link '>
                    <MdKeyboardArrowDown id='dropdownMenuButton' data-toggle='dropdown' />
                    <div className='dropdown-menu bg-dark Log_DropDown' aria-labelledby='dropdownMenuButton'>
                      <Link className='dropdown-item' to='/edit_profile'>
                        <GoCreditCard style={{ fontSize: '25px', marginRight: '35px' }} />
                        Edit Profile
                      </Link>
                      <Link className='dropdown-item' to='/changepassword'>
                        <RiLockPasswordLine style={{ fontSize: '25px', marginRight: '36px' }} />
                        Change Password
                      </Link>
                      <div className='dropdown-item google-dropdown d-flex align-items-center' id={Google_ID}>
                        <GrLanguage style={{ fontSize: '25px', marginRight: '36px' }} />
                      </div>
                      <a className='dropdown-item' href='#' onClick={logout}>
                        <IoLogOutOutline style={{ fontSize: '25px', marginRight: '36px' }} />
                        Logout
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div>
      <AuthNavBar {...user} />
    </div>
  );
};

export default Navbar;
