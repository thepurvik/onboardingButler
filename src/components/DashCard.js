import React, { useEffect, useState } from 'react';
import EMployeeImg from '../assets/images/default.jpg';
import '../assets/styles/DashboardCss/DashCard.css';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Message_Icon } from '../assets/icons/Message_Icon';
import { Internet_Icon } from '../assets/icons/Internet_Icon';
import { Call_Icon } from '../assets/icons/Call_Icon';
import { Get_All_Emp, Upload_Emp_Profile_Pic } from '../assets/API/Apis';
import { RiUploadCloudFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashCard = ({ DashCard_Data }) => {
  const [allEmpData, setAllEmpData] = useState();
  const { state } = useLocation();

  const [profilePicImage, setProfilePicImage] = useState({
    profile_pic: '',
    id: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  const [imgStore, setImgStore] = useState(null);
  const [profileImageData, setProfileImageData] = useState(DashCard_Data?.profile_pic);

  const Get_api_dashCard = () => {
    Get_All_Emp()
      .then((response) => {
        setAllEmpData(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    Get_api_dashCard();
  }, []);

  const UploadProfilePic = async (id, payload) => {
    await Upload_Emp_Profile_Pic(id, payload)
      .then((response) => {
        if (response) {
          if (response.data) {
            setProfileImage(null);
            console.log(response.data.profile_pic, '123456');
            setProfileImageData(response.data.profile_pic);
          }
          toast.success(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleImageSselecter = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
      UploadProfilePic(state.id, formData);
    }
  };

  return (
    <div className='w-100 d-flex align-items-stretch p-0'>
      <div className='profile_card_dash w-100 p-3 my-3'>
        <div className='dashcard-img'>
          <img src={profileImageData} alt='profile_img' />
        </div>
        <div className='text-center my-2 upload-profile'>
          {DashCard_Data?.status == 'aaaa' && (
            <label htmlFor='upload-profile'>
              <div className='upload-emp-profile'>
                <a style={{ cursor: 'pointer' }} className='btn btn-sm my-2 '>
                  <RiUploadCloudFill />
                </a>
              </div>
            </label>
          )}
          <input
            type='file'
            id='upload-profile'
            accept='image/*'
            name='profile_pic'
            style={{ visibility: 'none', opacity: 0, height: 0, width: 0 }}
            onChange={(e) => handleImageSselecter(e)}
          />
        </div>
        <h5 className='py-2 Card_txt'>{DashCard_Data?.full_name}</h5>
        <div className='dropdown pb-2'>
          {/* <button className='btn btn-outline-success drop-btn' type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            ACTIVE <MdKeyboardArrowDown id='dropdownMenu2' data-toggle='dropdown' />
          </button>
          <div className='dropdown-menu p-1 my-2 drop_menu' aria-labelledby='dropdownMenu2'>
            <button className='dropdown-item activ_color  my-1' type='button'>
              Active
            </button>
            <button className='dropdown-item leave_color  my-1' type='button'>
              InActive
            </button>
          </div> */}

          {/* <select className='drop-btn' value={DashCard_Data.is_active ? 'Active' : 'InActive'} onChange>
            <option value='Active'>Active</option>
            <option value='InActive'>InActive</option>
          </select> */}
          <div className={`btn  ${DashCard_Data.is_active ? 'btn_active' : 'btn_active_inactive'}`}>
            <span>{DashCard_Data.is_active ? 'Active' : 'InActive'}</span>
          </div>
        </div>
        <p className='finance_manager mb-2'>{DashCard_Data?.jobtitle}</p>
        <div style={{ BorderBottom: '5px solid green' }}></div>
        <div className='d-flex align-items-center mb-2 Dash_Card_Txt'>
          <Message_Icon />
          <p className='mx-2'>{DashCard_Data?.email}</p>
        </div>
        <div className='d-flex align-items-center mb-2 Dash_Card_Txt'>
          <Call_Icon />
          <p className='mx-2'>{DashCard_Data?.mobile}</p>
        </div>
        <div className='d-flex align-items-center mb-2 Dash_Card_Txt'>
          <Internet_Icon />
          <p className='mx-2'>{DashCard_Data?.timezone}</p>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
