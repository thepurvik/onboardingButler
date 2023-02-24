import React, { useContext, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { GoCreditCard } from 'react-icons/go';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoLogOutOutline } from 'react-icons/io5';
import { AiFillBell, AiFillQuestionCircle } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Profile_icon from '../../assets/images/Avt_Profile.jpg';
import { EmpIcon } from '../../assets/icons/EmpIcon';
import { IsAuthenticated } from '../../assets/Helper/utils';
import useAuth from '../../hooks/useAuth';
import { DashIcon } from '../../assets/icons/DashIcon';
import { Role_Icon } from '../../assets/icons/Role_Icon';
import { Division_Icon } from '../../assets/icons/Division_Icon';
import { Groups_Icon } from '../../assets/icons/Groups_Icon';
import { OnbIcon } from '../../assets/icons/OnbIcon';
import { AdmiIcon } from '../../assets/icons/AdmiIcon';
import { GoogleID } from '../../App';
import { GrLanguage } from 'react-icons/gr';

const DashLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const emp = 'Employee';
  const dashboard = 'Dashboard';
  const admin = 'Administrators';
  const plan = 'OnBoarding Plans';
  const Role = 'Role';
  const Division = 'Organization';
  const Groups = 'Groups';
  const EditProfile = 'Edit Profile';
  const ChangePassword = 'Change Password';

  // if (location.pathname === '/' || location.pathname === '/') {
  //   return <Navigate replace to='/' />;
  // }

  const Google_ID = useContext(GoogleID);
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('google-dashlayout-body');
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = '/login';
  };

  return (
    <div className='row m-0'>
      <div className='col-lg-2 col-md-3 col-sm-12  EmployeeBody align-items-stretch p-0'>
        <Sidebar />
      </div>
      <div className='col-lg-10 col-md-9 col-sm-12 align-items-stretch p-0'>
        <div>
          <div className='row m-0 p-3 justify-content-between Emp_Body'>
            <div className='d-flex align-items-center Emp_Nav'>
              <div className='Emp_Icon'>
                {/* <EmpIcon /> */}
                {location.pathname === '/' && <DashIcon />}
                {(location.pathname === '/employeedashboard' || location.pathname.includes('/contact_info')) && <EmpIcon />}
                {(location.pathname === '/administratorsdashboard' || location.pathname.includes('/administator_info')) && <AdmiIcon />}
                {(location.pathname === '/onboardingdashboard' || location.pathname.includes('/onboardingplan_table')) && <OnbIcon />}
                {(location.pathname === '/role' || location.pathname.includes('/role_info')) && <Role_Icon />}
                {(location.pathname === '/organization' || location.pathname.includes('/organization_info')) && <Division_Icon />}
                {(location.pathname === '/group' || location.pathname.includes('/group_info')) && <Groups_Icon />}
                {location.pathname === '/edit_profile' && <GoCreditCard />}
                {location.pathname === '/changepassword' && <RiLockPasswordLine />}
              </div>
              <h6 className='m-0 px-2 poppins-semibold'>
                {/* {location.pathname === '/' && `${emp}`} */}
                {location.pathname === '/' && `${dashboard}`}
                {(location.pathname === '/employeedashboard' || location.pathname.includes('/contact_info')) && `${emp}`}
                {(location.pathname === '/administratorsdashboard' || location.pathname.includes('/administator_info')) && `${admin}`}
                {(location.pathname === '/onboardingdashboard' || location.pathname.includes('/onboardingplan_table')) && `${plan}`}
                {(location.pathname === '/role' || location.pathname.includes('/role_info')) && `${Role}`}
                {(location.pathname === '/organization' || location.pathname.includes('/organization_info')) && `${Division}`}
                {(location.pathname === '/group' || location.pathname.includes('/group_info')) && `${Groups}`}
                {location.pathname === '/edit_profile' && `${EditProfile}`}
                {location.pathname === '/changepassword' && `${ChangePassword}`}
              </h6>
            </div>
            <div className='row Nav-Icon align-items-center m-0 Emp_Txt' id='navbarNav3'>
              {/* <a href='#' className='nav-link'>
                <AiFillBell style={{ color: '#868689' }} />
              </a> */}
              {/* <a href='#' className='nav-link p-0'>
                <AiFillQuestionCircle className='' style={{ color: '#868689' }} />
              </a> */}
              <a href='#' className='dropdown nav-link p-0'>
                <img src={user?.profile_pic || Profile_icon} className='img-fluid mx-2' alt='Profile_icon' />
                <MdKeyboardArrowDown className='text-dark' id='dropdownMenuButton' data-toggle='dropdown' />
                <div className='dropdown-menu bg-dark Dash_Dropdown' aria-labelledby='dropdownMenuButton'>
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
                  <Link className='dropdown-item' to='#' onClick={logout}>
                    <IoLogOutOutline style={{ fontSize: '25px', marginRight: '36px' }} />
                    Logout
                  </Link>
                </div>
              </a>
            </div>
          </div>
        </div>
        <hr className='m-0' />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
