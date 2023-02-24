import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { BsFillPlusCircleFill, BsFillDashCircleFill } from 'react-icons/bs';
import '../../assets/styles/Step_6.css';

const data = [
  {
    id: 1,
    name: 'BEFORE 1 DAY',
  },
  {
    id: 2,
    name: '1 DAY',
  },
  {
    id: 3,
    name: '1 Week',
  },
  {
    id: 4,
    name: '1 Month',
  },
  {
    id: 5,
    name: '3 Month',
  },
  {
    id: 6,
    name: '6 Month',
  },
  {
    id: 7,
    name: '9 Month',
  },
  {
    id: 8,
    name: '12 Month',
  },
];
const Step_6 = () => {
  const [active, setActive] = useState('index');
  return (
    <div className='process_step container '>
      <div className='Process_step_Body '>
        <div className='row align-items-center process_step_txt'>
          <BsFillPlusCircleFill className='mx-3 ricolor step6_main' data-toggle='collapse' data-target='#collapseOne' aria-expanded='false' aria-controls='collapseOne' />
          <BsFillDashCircleFill className='mx-3 ricolor step6_main1' data-toggle='collapse' data-target='#collapseOne' aria-expanded='false' aria-controls='collapseOne' />
          <h6 className='m-0 poppins-regular'>VIEW TIMELINE</h6>
        </div>
        <div id='collapseOne' className='collapse multi-collapse collapse show'>
          <div className='wizard mt-4'>
            <div className='wizard-inner'>
              {/* <div className='connecting-line'></div> */}
              <ul className='nav nav-tabs' role='tablist'>
                {data.map((steps, index) => (
                  <li key={index} role='presentation' className={`${index === 2 && 'active'}`}>
                    <a href='#step1' data-toggle='tab' aria-controls='step1' role='tab' aria-expanded='true'>
                      <span className='round-tab'>{index + 1}</span>
                      <i className='poppins-regular'>{steps.name}</i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=''>
            <div className={`d-flex m-0 py-2 align-items-center p-3 ${active === 'index' ? 'backside' : 'toggle_border'}`}>
              <AiOutlinePlus className='ai_plus' data-toggle='collapse' data-target='#collapseTwo' onClick={() => setActive('index')} />
              <AiOutlineMinus className='ai_minus' data-toggle='collapse' data-target='#collapseTwo' onClick={() => setActive('')} />
              <p className='mx-3 text_font poppins-regular'>
                Make sure to revisit job description and expectations with my employee, so that I can add more detail and understanding.
              </p>
            </div>
            <div id='collapseTwo' className='collapse multi-collapse collapse show'>
              <div className='d-flex m-0 py-2 align-items-center view_timelines p-3 mt-3'>
                <BsDot />
                <p className='poppins-regular'>Schedule meeting, setup agenda and prepare content</p>
              </div>
              <div className='d-flex m-0 py-2 align-items-center view_timelines p-3 mt-3'>
                <BsDot />
                <p className='poppins-regular'>Reach out to employee for specific questions realated to job description and understanding</p>
              </div>
              <div className='d-flex m-0 py-2 align-items-center view_timelines p-3 mt-3'>
                <BsDot />
                <p className='poppins-regular'>Set up follow-up meeting in 2 months</p>
              </div>
            </div>
            <div className='d-flex m-0 py-2 align-items-center view_timelines p-3 mt-3'>
              <AiOutlinePlus />
              <p className='mx-3 text_font poppins-regular'>Take time to explain to my employee how the job contributes to the divisions and organizations strateigic agenda</p>
            </div>
          </div>
        </div>
      </div>
      <div className='process_step_part py-2 mt-3'>
        <div className='row m-0 py-2 align-items-center'>
          <BsFillPlusCircleFill className='mx-3 ricolor' />
          <h6 className='m-0 poppins-regular'>VIEW TASKS</h6>
        </div>
      </div>
      <div className='process_step_part py-2 mt-3'>
        <div className='row m-0 py-2 align-items-center'>
          <BsFillPlusCircleFill className='mx-3 ricolor' />
          <h6 className='m-0 poppins-regular'>CONNECTION</h6>
        </div>
      </div>
      <div className='process_step_part py-2 mt-3'>
        <div className='row m-0 py-2 align-items-center'>
          <BsFillPlusCircleFill className='mx-3 ricolor' />
          <h6 className='m-0 poppins-regular'>CLARIFICATION</h6>
        </div>
      </div>
      <div className='process_step_part py-2 mt-3'>
        <div className='row m-0 py-2 align-items-center'>
          <BsFillPlusCircleFill className='mx-3 ricolor' />
          <h6 className='m-0 poppins-regular'>CULTURE </h6>
        </div>
      </div>
      <div className='process_step_part py-2 mt-3'>
        <div className='row m-0 py-2 align-items-center'>
          <BsFillPlusCircleFill className='mx-3 ricolor' />
          <h6 className='m-0 poppins-regular'>COMPLIANCE</h6>
        </div>
      </div>
    </div>
  );
};

export default Step_6;
