import React, { useEffect, useState } from 'react';
import '../assets/styles/DashboardCss/Sidebar.css';
import { DashIcon } from '../assets/icons/DashIcon';
import { EmpIcon } from '../assets/icons/EmpIcon';
import { OnbIcon } from '../assets/icons/OnbIcon';
import { AdmiIcon } from '../assets/icons/AdmiIcon';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogoOnboarding } from '../assets/icons/LogoOnboarding';
import OBB_Red_Logo_White from '../assets/images/OBB_Red_Logo_White.png';
import { Role_Icon } from '../assets/icons/Role_Icon';
import { Division_Icon } from '../assets/icons/Division_Icon';
import { Groups_Icon } from '../assets/icons/Groups_Icon';

const Profile = [
  { id: 1, label: 'Employee', link: '/employeedashboard', icon: <EmpIcon /> },
  { id: 2, label: 'Administrators', link: '/administratorsdashboard', icon: <AdmiIcon /> },
  { id: 3, label: 'Onboarding Plans', link: '/onboardingdashboard', icon: <OnbIcon /> },
];

const Profile1 = [
  { id: 1, label: 'Role', link: '/role', icon: <Role_Icon /> },
  { id: 2, label: 'Organization ', link: '/organization', icon: <Division_Icon /> },
  { id: 3, label: 'Groups', link: '/group', icon: <Groups_Icon /> },
];

const Sidebar = () => {
  const location = useLocation();
  let tabactive = null;
  let tabactive2 = null;
  const navigate = useNavigate();

  //active tab
  // let tabactive = null;
  if (location.pathname === '/onboardingdashboard' || location.pathname.includes('/onboardingplan_table')) {
    tabactive = 3;
  } else if (location.pathname === '/administratorsdashboard' || location.pathname.includes('/administator_info')) {
    tabactive = 2;
  } else if (location.pathname === '/employeedashboard' || location.pathname.includes('/contact_info')) {
    tabactive = 1;
  }

  if (location.pathname === '/role' || location.pathname.includes('/role_info')) {
    tabactive2 = 1;
  } else if (location.pathname === '/organization' || location.pathname.includes('/organization_info')) {
    tabactive2 = 2;
  } else if (location.pathname === '/group' || location.pathname.includes('/group_info')) {
    tabactive2 = 3;
  }

  const [active, setActive] = useState({ index: tabactive });
  const [active1, setActive1] = useState({ index: tabactive2 });
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div
        className='Dash_Logo'
        style={{ marginTop: '20px' }}
        onClick={() => {
          setActive({ index: null });
          setActive1({ index: null });
          handleClick();
        }}
      >
        <img src={OBB_Red_Logo_White} />
      </div>
      <div className='my-2 mx-3 Management_Text'>
        <p className='poppins-regular'>Management</p>
      </div>
      <hr className='HR_BORDER' />
      <div className='p-0 Employee_Icon'>
        <NavLink
          to={'/'}
          className='text-white text-decoration-none '
          onClick={() => {
            setActive({ index: null });
            setActive1({ index: null });
          }}
        >
          <div className={`d-flex align-items-center Employee_Text ${active.index === null && active1.index === null ? 'sidemenuColor' : ''}`}>
            <DashIcon />
            <h6 className='m-0 text-white px-2 poppins-medium'>Dashboard</h6>
          </div>
        </NavLink>
      </div>
      <div className='UserManagement_Body'>
        <div className='my-2 mx-3 UserManagement_Text'>
          <p>User Management</p>
        </div>
        <hr className='HR_BORDER' />
        {Profile.map((emp, index) => (
          <div className='UserManagment_Icon' key={index}>
            <NavLink
              to={emp.link}
              className='text-white text-decoration-none'
              onClick={() => {
                setActive({ index: index + 1 });
                setActive1({ index: null });
              }}
            >
              <div className={`d-flex align-items-center ${active.index == index + 1 ? 'sidemenuColor' : ''}`}>
                {emp.icon}
                <h6 className='m-0 mx-2 poppins-medium'>{emp.label}</h6>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <div className='UserManagement_Body'>
        <div className='my-2 mx-3 UserManagement_Text'>
          <p>OU/OG Management</p>
        </div>
        <hr className='HR_BORDER' />
        {Profile1.map((emp, index) => (
          <div className='UserManagment_Icon' key={index}>
            <NavLink
              to={emp.link}
              className='text-white text-decoration-none'
              onClick={() => {
                setActive1({ index: index + 1 });
                setActive({ index: null });
              }}
            >
              <div className={`d-flex align-items-center ${active1.index == index + 1 ? 'sidemenuColor' : ''}`}>
                {emp.icon}
                <h6 className='m-0 mx-2 poppins-medium'>{emp.label}</h6>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
