import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { MdAttachEmail } from 'react-icons/md';
import HrPhoto from '../assets/images/Hr Recuirment.jpg';
import '../assets/styles/Boarding.css';
const Boarding = () => {
  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-6 '>
          <h1 className='font-weight-bold'>
            Shall We Talk Together <br></br> About Where The Case May <br></br> Lie With You?
          </h1>
          <p>
            OnboadingButler collects,analyzes and exhibits large amounts of many types of data about a company's onboadinr practices, with the aim of creating reflection and
            conversations between managers and employees in and around specific onboarding processes in completely new ways.
          </p>
          <div className='row align-items-center my-4'>
            <div className='col-md-8 form-outline'>
              <input type='email' className='form-control form-control-md p-4' placeholder='Your Email' />
            </div>
            <div className='col-md-4'>
              <button className='btn btn-md btn-sm btncolor '>Get Now</button>
            </div>
          </div>
        </div>
        <div className='col-md-6 m-auto'>
          <div className='volume'>
            <FiPhoneCall className='volume-img' />
          </div>
          <div>
            <img src={HrPhoto} className='rounded img' width='240px' height='350px' />
          </div>
          <div className='audio'>
            <MdAttachEmail className='audio-img' />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Boarding;
