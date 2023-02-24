import React from 'react';
import profile from '../assets/images/Ellipse.jpg';
import '../assets/styles/Step_3.css';
import { MdKeyboardArrowDown } from 'react-icons/md';
const Card = ({ empData, emData }) => {
  return (
    <div className='col-md-3 w-100 d-flex align-items-stretch'>
      <div className='profile_card w-100 p-3'>
        <img src={empData?.profileImg || profile} alt='profile_img' />
        <h5 className='py-2 Card_txt'>{empData?.fullName}</h5>
        <div className='dropdown pb-2'>
          <button className='btn btn-outline-success drop-btn' type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            {/* ACTIVE */}
            {emData?.onboarding_details[0]?.status == '1'
              ? 'Not Started'
              : emData?.onboarding_details[0]?.status == '2'
              ? 'In Progress'
              : emData?.onboarding_details[0]?.status == '3'
              ? 'Completed'
              : null}
            {/* <MdKeyboardArrowDown id='dropdownMenu2' data-toggle='dropdown' /> */}
          </button>
          {/* <div className='dropdown-menu p-1 my-2 drop_menu' aria-labelledby='dropdownMenu2'>
            <button className='dropdown-item bord_color my-1' type='button'>
              ONBOARDING
            </button>
            <button className='dropdown-item prob_color  my-1' type='button'>
              PROBATIONARY
            </button>
            <button className='dropdown-item activ_color  my-1' type='button'>
              ACTIVE
            </button>
            <button className='dropdown-item leave_color  my-1' type='button'>
              ON LEAVE
            </button>
          </div> */}
        </div>
        <p className='finance_manager'>{empData?.jobTitle}</p>
      </div>
    </div>
  );
};

export default Card;
