import React from 'react';
import { RiPhoneLine } from 'react-icons/ri';
import { HiOutlineMailOpen } from 'react-icons/hi';
import '../assets/styles/Contact.css';
const Contact = () => {
  return (
    <div className='container my-5'>
      <div className='row py-5'>
        <div className='col-md-6 mt-4'>
          <h1 className='font-weight-bold'>
            We Believe That <br></br> Onboarding Of Employees In General Can Be <br></br> Improved
          </h1>
          <p>
            We develop OnboardingButler to be able to process and and enrich data about the entire hiring process so advanced and to such to high level of service that the
            information become really useful for both managers and employees in their daily work to make onboarding processes as good as possible.
          </p>
          <div className='row my-4'>
            <div className='col-md-6'>
              <div className='d-flex align-items-center font-icons'>
                <div className='font'>
                  <RiPhoneLine />
                </div>
                <div className='font_txt'>
                  <p>Phone</p>
                  <h6 className='font-weight-bold'>+45404329668</h6>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='d-flex align-items-center font-icons'>
                <div className='font'>
                  <HiOutlineMailOpen />
                </div>
                <div className='font_txt'>
                  <p>Email</p>
                  <h6 className='font-weight-bold'>info@boardingButler.com</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <form>
            <div>
              <fieldset className='form-group'>
                <label id='fieldTitle'>Message</label>
                <textarea rows='10' className='form-control' placeholder='Message' ng-model='myTextarea' required></textarea>
              </fieldset>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-outline'>
                  <label className='form-label'>Name</label>
                  <input className='form-control form-control-md p-4' type='text' id='name' placeholder='Name' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-outline'>
                  <label className='form-label'>Email</label>
                  <input className='form-control form-control-md p-4' type='text' id='name' placeholder='Email' />
                </div>
              </div>
            </div>
            <div className='form-outline mb-2'>
              <label className='form-label'>Subject</label>
              <input className='form-control form-control-md p-4' type='text' id='subject' placeholder='Subject' />
            </div>
            <div>
              <button className='btn btn-md btncolor'>Yes Please</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
