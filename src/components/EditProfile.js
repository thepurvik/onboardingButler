import React, { useEffect, useState } from 'react';
import { GetProfile, Upload_Profile_Pic } from '../assets/API/Apis';
import { IsAuthenticated } from '../assets/Helper/utils';
import { Edit_Profile } from '../assets/API/Apis';
import '../assets/styles/EditProfile.css';
import { RiUploadCloudFill } from 'react-icons/ri';
import Default_PP from '../assets/images/default.jpg';
import Avt_Profile from '../assets/images/default.jpg';
import p2lg from '../assets/images/p2-lg.png';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Timezone } from '../assets/Helper/constant';
import { toast } from 'react-toastify';
import COUNTRYLIST from '../Country_Nationality_List.json';

const ValidationErrors = {
  empty: {
    username: 'UserName is Required',
    first_name: 'FirstName is Reauired',
    last_name: 'LastName is Required',
    // mobile: 'Number is Required',
    // country: 'Country is Required',
    // city: 'City is Required',
    // dob: 'Birth date is Required',
    // nationality: 'Nationality is Required',
  },
  invalid: {
    username: '',
    first_name: '',
    last_name: '',
    // mobile: '',
    // country: '',
    // city: '',
    // dob: '',
    // nationality: '',
  },
};

const EditProfile = () => {
  const { initialize } = useAuth();
  const [profilePicImage, setProfilePicImage] = useState({
    profile_pic: '',
    id: '',
  });

  const [imgStore, setImgStore] = useState(null);

  const [values, setValues] = useState({
    username: '',
    first_name: '',
    last_name: '',
    dob: '',
    mobile: '',
    country: '',
    gender: '',
    timezone: '',
    city: '',
    nationality: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    first_name: '',
    last_name: '',
    mobile: '',
    country: '',
    city: '',
    nationality: '',
  });

  const [editedValues, setEditedValues] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [isChange, setIsChange] = useState(false);

  const navigate = useNavigate();

  const { first_name, last_name, country, mobile, username, dob, gender, timezone, city, nationality } = values;

  const { profile_pic } = profilePicImage;

  const handleChange = (e) => {
    setIsChange(true);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
    setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
  };

  const UploadProfilePic = async (payload) => {
    await Upload_Profile_Pic(payload)
      .then((response) => {
        if (response) {
          if (response.data) {
            let user = JSON.parse(localStorage.getItem('user'));
            user.user.profile_pic = response?.data?.profile_pic;
            localStorage.setItem('user', JSON.stringify(user));
            initialize();
            setProfileImage(null);
            setProfilePicImage({ profile_pic: response?.data?.profile_pic });
          }
          toast.success(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const UploadProfileHandler = () => {
    if (profileImage) {
      let fd = new FormData();
      fd.append('image', imgStore == null ? profile_pic : imgStore);
      UploadProfilePic(fd);
    }
  };

  const handleImageSselecter = async (e) => {
    try {
      setImgStore(e.target.files[0]);
      await setProfileImage(URL.createObjectURL(e.target.files[0]));
      let reader = new FileReader();
      // reader.onload = (e) => {
      // };
      reader.readAsDataURL(e.target.files[0]);
      // toast.success('Profile Picture Updated Successfully!');
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    UploadProfileHandler();
  }, [profileImage]);

  const GetData = () => {
    GetProfile({ id: IsAuthenticated().user.id }).then((response) => {
      if (response) {
        setValues({
          username: response?.username,
          first_name: response?.first_name,
          last_name: response?.last_name,
          dob: response?.dob,
          mobile: response?.mobile,
          country: response?.country,
          gender: response?.gender.toLowerCase(),
          timezone: response?.timezone,
          city: response?.city,
          nationality: response?.nationality,
        });

        setProfilePicImage({
          profile_pic: response?.profile_pic,
          id: response?.id,
        });
      }
    });
  };

  const handleClick = async () => {
    const tempErrors = { ...errors };
    Object.keys(values).map(async (key) => {
      if (!values[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      } else {
        //error blank
        setErrors(tempErrors);
      }
    });

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }

    if (Object.entries(editedValues).length === 0) {
      return false;
    }
    // console.log('values', editedValues);
    await Edit_Profile(editedValues)
      .then((response) => {
        setValues(response);
        // window.location = '/';
        navigate('/');
        toast.success(response?.message);
      })
      .catch((error) => {
        console.log('error msg', error.response.message);
      });
  };
  return (
    <div className='container py-3'>
      <div className='profile_editdata p-2'>
        <div className='profile_img'>
          {/* <img src={image || Default_PP} alt='profile_pic' className='img-thumbnail profile_pic' /> */}
          <img src={profileImage ?? profilePicImage?.profile_pic ?? Avt_Profile} alt='profile_pic' className='img-thumbnail profile_pic' />
        </div>
        <div className='text-center my-2'>
          <label htmlFor='upload-profile'>
            <div className='Pencil_Type'>
              <a style={{ cursor: 'pointer' }} className='btn btn-sm my-2 '>
                <RiUploadCloudFill />
              </a>
            </div>
          </label>
          {/* <input type='file' id='upload-profile' name='upload-profile' style={{ visibility: 'none', opacity: 0, height: 0, width: 0 }} /> */}
          <input
            type='file'
            id='upload-profile'
            accept='image/*'
            name='profile_pic'
            onChange={(e) => handleImageSselecter(e)}
            style={{ visibility: 'none', opacity: 0, height: 0, width: 0 }}
          />
          {/* <input className='file-upload' type='file' accept='image/*' name='imageData' onChange={(e) => handleImageUploader(e)} /> */}
          {/* <button onClick={UploadProfileHandler} className='btn Btn_Upload' disabled={!profileImage}>
            upload pic
          </button> */}
        </div>
        <div className='my-4'>
          <h5 className='my-4 text-center poppins-semibold'>User Information</h5>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label' htmlFor='first_name'>
                    First Name* :
                  </label>
                  <br></br>
                  <input className='form-control ' name='first_name' type='text' id='first_name' placeholder='First name' value={first_name} onChange={handleChange} />
                  {errors.first_name && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label'>Last Name* :</label> <br></br>
                  <input className='form-control ' name='last_name' type='text' id='last_name' placeholder='Last name' value={last_name} onChange={handleChange} />
                  {errors.last_name && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-outline mb-2'>
                    <label className='form-label'>Username* :</label> <br></br>
                    <input className='form-control ' name='username' type='text' id='username' placeholder='Username' value={username} onChange={handleChange} disabled />
                    {errors.username && (
                      <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
                <div className='col-md-6 form-outline mb-2'>
                  <label className='form-label'>Mobile :</label> <br></br>
                  <input
                    className='form-control '
                    name='mobile'
                    type='text'
                    id='mobile'
                    placeholder='+91-xx-xx-xx-xx-xx '
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => {
                      if (e.target.value.length == 11 || isNaN(e.target.value)) {
                        return false;
                      } else {
                        handleChange(e);
                      }
                    }}
                  />
                  {/* {errors.mobile && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.mobile}
                    </p>
                  )} */}
                </div>
                <div className='col-md-6'>
                  <div className='row'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='row my-4'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label'>D.O.B :</label> <br></br>
                  <input className='form-control' name='dob' type='date' id='dob' placeholder='DOB' value={dob} onChange={handleChange} />
                  {/* {errors.dob && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.dob}
                    </p>
                  )} */}
                </div>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label'>Country :</label> <br></br>
                  {/* <input className='form-control ' name='country' type='text' id='country' placeholder='Country' value={country} onChange={handleChange} /> */}
                  <select className='form-control' name='country' value={country} onChange={handleChange}>
                    <option selected>Select your Country</option>
                    {COUNTRYLIST.map((row, i) => (
                      <option>{row?.en_short_name}</option>
                    ))}
                  </select>
                  {/* {errors.country && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.country}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
            <div className='col-md-3 p-0'>
              <div className='form-outline mb-2 mx-3'>
                <label className='form-label'>Gender</label>
                <select
                  className='select form-control '
                  name='gender'
                  value={gender}
                  onChange={(e) => {
                    if (e.target.value !== 'select') {
                      handleChange(e);
                    }
                  }}
                >
                  <option value='select' disabled hidden>
                    Select
                  </option>
                  <option value='others'>Other</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h5 className='my-4'>Address Book</h5>
          <div className='row my-4'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label'>Time Zone :</label> <br></br>
                  {/* <label className='form-label'>Timezone :</label> <br></br>
                  <input className='form-control ' name='timezone' type='text' id='timezone' placeholder='Timezone' value={timezone} onChange={handleChange} /> */}
                  <select className='form-control' name='timezone' value={timezone} onChange={handleChange}>
                    <option selected value='' disabled hidden>
                      Select Time Zone
                    </option>
                    {Timezone.map((row, i) => (
                      <option>{row.timezone}</option>
                    ))}
                  </select>
                </div>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label'>City :</label> <br></br>
                  <input className='form-control ' name='city' type='text' id='city' placeholder='City' value={city} onChange={handleChange} />
                  {/* {errors.city && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.city}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='row'>
                <div className='form-outline mb-2 col-md-6'>
                  <label className='form-label'>Nationality :</label> <br></br>
                  {/* <input className='form-control ' name='nationality' type='text' id='nationality' placeholder='Nationality' onChange={handleChange} value={nationality} /> */}
                  <select className='form-control' name='nationality' value={nationality} onChange={handleChange}>
                    <option selected disabled value='' hidden>
                      Select Nationality
                    </option>
                    {COUNTRYLIST.map((row, i) => (
                      <option>{row?.nationality}</option>
                    ))}
                  </select>
                  {/* {errors.nationality && (
                    <p className='text-danger' style={{ margin: '0px 9px', fontSize: '13px' }}>
                      {errors.nationality}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='profiles_data row justify-content-end align-items-center mx-3'>
          <button
            className={`btn  profiles_btn Save_btn mx-2 ${!isChange ? 'disabled' : ''}`}
            disabled={!isChange}
            // disabled={
            //   (values.city &&
            //     values.country &&
            //     values.dob &&
            //     values.first_name &&
            //     values.gender &&
            //     values.id &&
            //     values.image &&
            //     values.last_name &&
            //     values.mobile &&
            //     values.nationality &&
            //     values.timezone &&
            //     values.username) === ''
            // }
            onClick={() => {
              handleClick();
            }}
          >
            Save
          </button>
          <button className='btn  profiles_btn Cancel_btn' onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
