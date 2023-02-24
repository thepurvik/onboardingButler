import React from 'react';
import { Logo_Icon } from '../assets/icons/Logo_Icon';
import '../assets/styles/Footer.css';
import { BsInstagram } from 'react-icons/bs';
import { FiFacebook } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { TiSocialDribbble } from 'react-icons/ti';

const Footer = () => {
  return (
    <div>
      <div className='container-fluid Footer_body'>
        <div className='container m-auto'>
          <div className='row '>
            <div className='col-lg-4 col-md-4 col-12 '>
              <div className=' my-3 Footer_txt '>
                <div className='row'>
                  <div className=' Icon_Logo mx-3'>
                    <Logo_Icon />
                    <a className='navbar-brand' href='#'>
                      Logo
                    </a>
                  </div>
                </div>
                <div className='my-3'>
                  <p>
                    Phone hours:Monday to Thursday from kl.
                    <br /> 09:00 to 16:00 Friday from kl.09:00 to 16:00
                  </p>
                </div>
              </div>
            </div>
            <div className='col-lg-8 col-md-8 col-12'>
              <div className='d-flex Footer_Media'>
                <div className='col-lg-5 my-3 Footer_Contact'>
                  <h3>Contact</h3>
                  <p className='my-4'>Solabjit 45,DK-3460 Bikerod,Denmark +4540439668 info@onboardingbutler.com</p>
                  <h6>info@gmail.com</h6>
                </div>
                <div className='col-lg-3 my-3 Footer_links'>
                  <h3>Links</h3>
                  <div>
                    <a href='#'>Home</a>
                    <a href='#'>What We Do</a>
                    <a href='#'>Research</a>
                    <a href='#'>About Us</a>
                  </div>
                </div>
                <div className='col-lg-4 my-3 Social_Icon'>
                  <h3>Socials</h3>
                  <div>
                    <a href='https://www.instagram.com/' target='_blank' className='Footer_Icon'>
                      <BsInstagram />
                    </a>
                    <a href='https://www.facebook.com/' target='_blank' className='Footer_Icon'>
                      <FiFacebook />
                    </a>
                    <a href='https://twitter.com/login' target='_blank' className='Footer_Icon'>
                      <FiTwitter />
                    </a>
                    <a href='https://dribbble.com/' target='_blank' className='Footer_Icon'>
                      <TiSocialDribbble />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
