import React, { useContext, useEffect, useState } from 'react';
import { RiVideoLine } from 'react-icons/ri';
import { GiWorld } from 'react-icons/gi';
import { FaCalendarAlt } from 'react-icons/fa';
import VideoContainer from '../../components/VideoContainer';
import '../../assets/styles/Carousel.css';
import { CustomCarousel } from '../../components/CustomCarousel';
import { Colors } from '../../assets/Helper/constant';
import EMployeeImg from '../../assets/images/default.jpg';
import { IsAuthenticated } from '../../assets/Helper/utils';
import Popup from '../../components/Popup';
import useCustomTheme from '../../hooks/useCustomTheme';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getCornerStones } from '../../assets/API/Apis';
import useAuth from '../../hooks/useAuth';
import OBB from '../../assets/Video/OBB Onboarding Frontpage.mp4';
import CONNECTION from '../../assets/Video/Explainer Connection.mp4';
import CLARIFICATION from '../../assets/Video/Explainer Clarification.mp4';
import CULTURE from '../../assets/Video/Explainer Culture.mp4';
import COMPLIANCE from '../../assets/Video/Explainer Compliance.mp4';
import { useLocation } from 'react-router-dom';
import CONNECTION_ICON from '../../assets/images/Connection.png';
import CLARIFICATION_ICON from '../../assets/images/Clarification.png';
import CULTURE_ICON from '../../assets/images/Culture.png';
import COMPLIANCE_ICON from '../../assets/images/Compliance.png';

const Step_1 = ({ moveNext, setSelectedEmployee, setSelectedHierarchy, emData }) => {
  useDocumentTitle('OBB - Home');
  const theme = useCustomTheme();

  let Active_Selector = useLocation();
  const [activeTab, setActiveTab] = useState(theme.activeCornerStone || { id: '1', index: 1, label: 'CONNECTION', color: Colors.connection });
  const [active, setActive] = useState({ index: 1, label: '' });

  const [popUpOpen, setPopUpOpen] = useState(false);

  const domain = IsAuthenticated().user?.company?.name ? IsAuthenticated().user?.company?.name.toUpperCase() : IsAuthenticated().user?.company?.toUpperCase();

  const UserName = IsAuthenticated().user?.first_name.charAt(0).toUpperCase() + IsAuthenticated().user?.first_name.slice(1);

  const Auth = useAuth();
  const Profile = theme.cornerStone;
  const [tabActive, setTabActive] = useState(true);

  //COMPONENTS
  useEffect(() => {
    if (document.referrer === `${window.location.href}login` || document.referrer === `${window.location.href.split('.').slice(1, 3).join('')}register`) {
      setPopUpOpen(localStorage.getItem('NormalLoginfirstTime') || localStorage.getItem('firstTime'));
    } else {
      setPopUpOpen(localStorage.getItem('SsoLoginfirstTime'));
    }
  }, []);

  useEffect(() => {
    if (Active_Selector?.state?.ID) {
      emData?.onboarding_details?.map((obj, index) => {
        if (obj.employee.id == Active_Selector?.state?.ID) {
          setActive({ index: index + 1, label: obj?.employee?.full_name });
        }
      });
    }

    if (Active_Selector?.state?.cornerStone || Active_Selector?.state?.cornerStone == 0) {
      setActiveTab({
        id: Profile[Active_Selector?.state?.cornerStone].id,
        index: Profile[Active_Selector?.state?.cornerStone].id,
        label: Profile[Active_Selector?.state?.cornerStone].text,
        color: Profile[Active_Selector?.state?.cornerStone].color,
      });
    }
  }, [emData]);

  const Tab2 = () => {
    return (
      <>
        <div className='Connection_Body '>
          <div className='d-inline-block'>
            <div className='d-flex Connection_Text align-items-center m-0' style={{ background: activeTab.color }}>
              <div className='Connection-img-style'>
                <img src={CONNECTION_ICON} alt='culture-icon' />
              </div>
              {/* <GiWorld /> */}
              <h5 className='mx-2'>
                CONNECTION between {domain} and {active.label === '' ? emData?.onboarding_details[0]?.employee?.full_name || 'employee' : active.label}
              </h5>
            </div>
          </div>
        </div>
        {emData &&
          emData.onboarding_details.map((obj, index) => {
            return (
              <div className={`profile ${active.index === index + 1 ? 'backside' : ''}`} key={index} style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}>
                <div className='row align-items-center justify flex-wrap text_content m-0 ' onClick={() => setActive({ index: index + 1, label: obj.employee.full_name })}>
                  <img src={obj.employee.profile_pic || EMployeeImg} className='img-profile mx-2' alt='Item_Image' />

                  <div className={` ${active.index === index + 1 ? 'backside1' : ''}`}>
                    <h5 className='poppins-regular'>{obj.employee.full_name || '-'}</h5>
                    <p className='poppins-regular'>{obj.employee.email || '-'}</p>
                  </div>
                  <div className='ml-auto mr-2'>
                    {active.index === index + 1 && (
                      <button
                        className=' poppins-regular Initialize_Btn mr-3'
                        style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}
                        onClick={() => {
                          setActive({ index: index + 1, label: obj.employee.full_name });
                          setSelectedEmployee(obj);
                          setSelectedHierarchy({ id: activeTab.id, label: activeTab.label });
                          moveNext?.();
                        }}
                      >
                        Start Onboarding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const Tab3 = () => {
    return (
      <>
        <div className='Connection_Body '>
          <div className='d-inline-block'>
            <div className='d-flex Connection_Text align-items-center m-0' style={{ background: activeTab.color }}>
              <div className='Connection-img-style'>
                <img src={CLARIFICATION_ICON} alt='culture-icon' />
              </div>
              <h5 className='mx-2'>
                CLARIFICATION of job expectations and deliveries between {domain} and{' '}
                {active.label === '' ? emData?.onboarding_details[0]?.employee?.full_name || 'employee' : active.label}
              </h5>
            </div>
          </div>
        </div>
        {emData &&
          emData.onboarding_details.map((obj, index) => {
            return (
              <div className={`profile ${active.index === index + 1 ? 'backside' : ''}`} key={index} style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}>
                <div className='row align-items-center justify flex-wrap text_content m-0 ' onClick={() => setActive({ index: index + 1, label: obj.employee.full_name })}>
                  <img src={obj.employee.profile_pic || EMployeeImg} className='img-profile mx-2' alt='Item_Image' />
                  <div className={` ${active.index === index + 1 ? 'backside1' : ''}`}>
                    <h5 className='poppins-regular'>{obj.employee.full_name || '-'}</h5>
                    <p className='poppins-regular'>{obj.employee.email || '-'}</p>
                  </div>
                  <div className='ml-auto mr-2'>
                    {active.index === index + 1 && (
                      <button
                        className=' poppins-regular Initialize_Btn mr-3'
                        style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}
                        onClick={() => {
                          setActive({ index: index + 1, label: obj.employee.full_name });
                          setSelectedEmployee(obj);
                          setSelectedHierarchy({ id: activeTab.id, label: activeTab.label });
                          moveNext?.();
                        }}
                      >
                        Start Onboarding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const Tab4 = () => {
    return (
      <>
        <div className='Connection_Body '>
          <div className='d-inline-block'>
            <div className=' d-flex Connection_Text align-items-center m-0' style={{ background: activeTab.color }}>
              <div className='Connection-img-style'>
                <img src={CULTURE_ICON} alt='culture-icon' />
              </div>
              <h5 className='mx-2'>
                CULTURE understanding and navigating context {domain} and {active.label === '' ? emData?.onboarding_details[0]?.employee?.full_name || 'employee' : active.label}
              </h5>
            </div>
          </div>
        </div>
        {emData &&
          emData.onboarding_details.map((obj, index) => {
            return (
              <div className={`profile ${active.index === index + 1 ? 'backside' : ''}`} key={index} style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}>
                <div className='row align-items-center justify flex-wrap text_content m-0 ' onClick={() => setActive({ index: index + 1, label: obj.employee.full_name })}>
                  <img src={obj.employee.profile_pic || EMployeeImg} className='img-profile mx-2' alt='Item_Image' />
                  <div className={` ${active.index === index + 1 ? 'backside1' : ''}`}>
                    <h5 className='poppins-regular'>{obj.employee.full_name || '-'}</h5>
                    <p className='poppins-regular'>{obj.employee.email || '-'}</p>
                  </div>
                  <div className='ml-auto mr-2'>
                    {active.index === index + 1 && (
                      <button
                        className=' poppins-regular Initialize_Btn mr-3'
                        style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}
                        onClick={() => {
                          setActive({ index: index + 1, label: obj.employee.full_name });
                          setSelectedEmployee(obj);
                          setSelectedHierarchy({ id: activeTab.id, label: activeTab.label });
                          moveNext?.();
                        }}
                      >
                        Start Onboarding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const Tab5 = () => {
    return (
      <>
        <div className='Connection_Body '>
          <div className='d-inline-block'>
            <div className=' d-flex Connection_Text align-items-center m-0' style={{ background: activeTab.color }}>
              <div className='Connection-img-style'>
                <img src={COMPLIANCE_ICON} alt='culture-icon' />
              </div>
              <h5 className='mx-2'>
                COMPLIANCE and Administration delivery {domain} and {active.label === '' ? emData?.onboarding_details[0]?.employee?.full_name || 'employee' : active.label}
              </h5>
            </div>
          </div>
        </div>
        {emData &&
          emData.onboarding_details.map((obj, index) => {
            return (
              <div className={`profile ${active.index === index + 1 ? 'backside' : ''}`} key={index} style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}>
                <div className='row align-items-center justify flex-wrap text_content m-0 ' onClick={() => setActive({ index: index + 1, label: obj.employee.full_name })}>
                  <img src={obj.employee.profile_pic || EMployeeImg} className='img-profile mx-2' alt='Item_Image' />
                  <div className={` ${active.index === index + 1 ? 'backside1' : ''}`}>
                    <h5 className='poppins-regular'>{obj.employee.full_name || '-'}</h5>
                    <p className='poppins-regular'>{obj.employee.email || '-'}</p>
                  </div>
                  <div className='ml-auto mr-2'>
                    {active.index === index + 1 && (
                      <button
                        className=' poppins-regular Initialize_Btn mr-3'
                        style={{ borderColor: active.index === index + 1 ? activeTab.color : '' }}
                        onClick={() => {
                          setActive({ index: index + 1, label: obj.employee.full_name });
                          setSelectedEmployee(obj);
                          setSelectedHierarchy({ id: activeTab.id, label: activeTab.label });
                          moveNext?.();
                        }}
                      >
                        Start Onboarding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const SelectionTab = (profile, index) => {
    return activeTab ? (
      <div className='d-flex highlighting_tab'>
        <div className={activeTab.index === index ? 'highlight' : ''} style={{ background: activeTab.index === index ? activeTab.color : 'none' }}></div>
        <div
          className={activeTab.index === index ? 'tab_content' : 'tab_content1'}
          onClick={() => {
            // theme.dispatch({ type: 'CHANGE_COLOR', payload: profile.color });
            theme.dispatch({ type: 'SET_ACTIVE_CORNERSTONE', payload: { id: profile.id, index: profile.id, label: profile.text, color: profile.color } });
            setActiveTab({ id: profile.id, index: profile.id, label: profile.text, color: profile.color });
            setTabActive(false);
          }}
        >
          <p className={`${activeTab.index === index ? 'tab_content_txt mx-0' : 'tab_content1_txt mx-3'} p-2  poppins-regular`}>
            <span>{profile.text}&nbsp;</span>
            {profile.title}
          </p>
        </div>
      </div>
    ) : (
      ''
    );
  };

  const DetailsTab = () => {
    return (
      <>
        <div className=''>
          {activeTab.index === 1 && Tab2()}
          {activeTab.index === 2 && Tab3()}
          {activeTab.index === 3 && Tab4()}
          {activeTab.index === 4 && Tab5()}
        </div>
      </>
    );
  };
  return (
    <>
      <div className='content'>
        <div className='onboarding'>
          <RiVideoLine className='RiVideoLine' />
          <h5 className='poppins-bold'>Onboarding Explained Video</h5>
        </div>
        <CustomCarousel
          data={[
            activeTab.label == 'CONNECTION' ? (
              tabActive == true ? (
                <VideoContainer
                  data={
                    <div className='iframe-background'>
                      {/* <iframe
                        frameBorder='0'
                        width='100%'
                        height='100%'
                        src='https://butler-media.fra1.digitaloceanspaces.com/intro/OBB%20Onboarding%20Frontpage.mp4'
                        allowFullScreen='true'
                      ></iframe> */}
                      <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/OBB%20Onboarding%20Frontpage.mp4' width='100%' height='100%' controls />
                    </div>
                  }
                />
              ) : (
                <VideoContainer
                  data={
                    <div className='iframe-background'>
                      <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Connection.mp4' width='100%' height='100%' controls />
                    </div>
                  }
                />
              )
            ) : activeTab?.label == 'CLARIFICATION' ? (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Clarification.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ) : activeTab?.label == 'CULTURE' ? (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Culture.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ) : activeTab?.label == 'COMPLIANCE' ? (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Compliance.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ) : (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/OBB%20Onboarding%20Frontpage.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ),
          ]}
        />
      </div>
      <div className='content2 my-3'>
        <div className='onboarding'>
          <FaCalendarAlt className='RiVideoLine' style={{ color: activeTab.color }} />
          <div>
            <h5 className='onboarding_tag poppins-bold'>What would you like to work on today ?</h5>
            <h6 className=''>Step 1 of 3: Choose Cornerstone topic + choose employee to start your onboarding process.</h6>
          </div>
        </div>
        <div className='row Onboarding_Heading'>
          <div className='col-md-3 col-sm-12'>{Profile.map((profile, index) => SelectionTab(profile, index + 1))}</div>
          <div className='col-md-9 col-sm-12 p-0'>
            <div className='preference1'>{DetailsTab()}</div>
          </div>
        </div>
      </div>
      {popUpOpen && (
        <Popup
          title=' '
          confirmText='ok'
          closeText=' '
          onConfirm={() => {
            setPopUpOpen(false);
            localStorage.removeItem('firstTime', false);
            localStorage.removeItem('SsoLoginfirstTime', false);
            localStorage.removeItem('NormalLoginfirstTime', false);
          }}
          onClose={() => {
            setPopUpOpen(false);
            localStorage.removeItem('firstTime', false);
            localStorage.removeItem('SsoLoginfirstTime', false);
            localStorage.removeItem('NormalLoginfirstTime', false);
          }}
        >
          <p style={{ color: 'black' }}>Hi {UserName}, Welcome!</p>
        </Popup>
      )}
    </>
  );
};

export default Step_1;
