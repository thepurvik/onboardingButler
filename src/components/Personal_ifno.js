import React, { useState } from 'react';
import '../assets/styles/Step_3.css';
import { IoNewspaperSharp } from 'react-icons/io5';
import { FaShoppingBag } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';
import { Labels } from '../assets/Helper/constant';
import SampleResume from '../assets/files/sample.pdf';

const Personal_ifno = ({ dataOptions = {}, ...props }) => {
  const [activeTab, setActiveTab] = useState(1);

  const ProfileContainer = (data = {}) => {
    return (
      <>
        <div className='col-md-6'>
          {Object.keys(data)
            .slice(1, 5)
            .map(
              (key, i) =>
                key !== 'profile_pic' && (
                  <div className=' d-flex justify-content-between text-left' key={i}>
                    <div className='col-md-6 p-0 Label_txt'>{Labels[key]}</div>
                    <div className='col-md-6 p-0 Details_txt '>{data[key]}</div>
                  </div>
                )
            )}
        </div>
        <div className='col-md-6'>
          {Object.keys(data)
            .slice(5, 8)
            .map(
              (key, i) =>
                key !== 'image' && (
                  <div className=' d-flex justify-content-between text-left' key={i}>
                    <div className='col-md-6 p-0 Label_txt'>{Labels[key]}</div>
                    <div className='col-md-6 p-0 Details_txt '>{data[key]}</div>
                  </div>
                )
            )}
        </div>
      </>
    );
  };
  const onBoardingContainer = (data = {}) => {
    return (
      <>
        <div className='col-md-6'>
          {Object.keys(data)
            .slice(1, 6)
            .map((key, i) => (
              <div className=' d-flex justify-content-between text-left' key={i}>
                <div className='col-md-6 p-0 Label_txt'>{Labels[key]}</div>
                {key !== 'resume' && <div className='col-md-5 p-0 Details_txt '>{data[key]}</div>}
                {key === 'resume' && (
                  <div className='col-md-6 p-0 Details_txt text-truncate'>
                    <span style={{ cursor: 'pointer' }} onClick={() => window.open(SampleResume)}>
                      {SampleResume}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className='col-md-6'>
          {Object.keys(data)
            .slice(6, 11)
            .map((key, i) => (
              <div className=' d-flex justify-content-between text-left' key={i}>
                <div className='col-md-6  p-0 Label_txt'>{Labels[key]}</div>
                {key !== 'resume' && <div className='col-md-5 p-0 Details_txt '>{data[key]}</div>}
                {key === 'resume' && (
                  <div className='col-md-6 p-0 Details_txt text-truncate'>
                    <span style={{ cursor: 'pointer', marginLeft: '30px' }} onClick={() => window.open('https://butler-media.fra1.digitaloceanspaces.com/document.pdf')}>
                      <MdFileUpload style={{ fontSize: '20px' }} />
                      click here
                      {/* {SampleResume.split('/')[SampleResume.split('/').length - 1]} */}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    // <div className='col-md-12 col-12 w-100 d-flex align-items-stretch'>
    <div className='col-md-9 col-sm-9 col-12 w-100 d-flex align-items-stretch mWidth100'>
      <div className='info_card w-100'>
        <div className='d-flex  info_card_btn'>
          <div className={`${activeTab === 1 ? 'profile_btn' : 'blog_btn'} d-flex align-items-center justify-content-center mr-3`} onClick={() => setActiveTab(1)}>
            <IoNewspaperSharp className={`${activeTab === 1 ? 'md_font' : 'Io_font'} mx-2`} />
            <h5>Personal Info</h5>
          </div>
          <div className={`${activeTab === 2 ? 'profile_btn' : 'blog_btn'} d-flex align-items-center justify-content-center`} onClick={() => setActiveTab(2)}>
            <FaShoppingBag className={`${activeTab === 2 ? 'md_font' : 'Io_font'} mx-2`} />
            <h5>Onboarding Detail</h5>
          </div>
        </div>

        <div className='row personal_info mt-4 p-2'>
          {activeTab === 1 && ProfileContainer(dataOptions?.employee)}

          {activeTab === 2 && onBoardingContainer(dataOptions)}
        </div>
      </div>
    </div>
  );
};

export default Personal_ifno;
