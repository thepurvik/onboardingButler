import React, { useState } from 'react';
import { CustomCarousel } from '../../components/CustomCarousel';
import VideoContainer from '../../components/VideoContainer';
import VIDEO_1 from '../../assets/Video/video_onboarding.mp4';
import { RiVideoLine } from 'react-icons/ri';
import { HiPlusCircle } from 'react-icons/hi';
import { HiMinusCircle } from 'react-icons/hi';
import { FaCalendarAlt } from 'react-icons/fa';
import Calander_icon from '../../assets/images/Calendar.jpg';

import '../../assets/styles/Step_2.css';
import Card from '../../components/Card';
import Personal_ifno from '../../components/Personal_ifno';
import { lgImages } from '../../assets/Helper/StaticData';
import useCustomTheme from '../../hooks/useCustomTheme';
import { TiTick } from 'react-icons/ti';

const Step_2 = ({ children, levels_Task, selectTasks, selectedLevelTasks = [], selectedEmployee }) => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const [selectedTasks, setSelectedTasks] = useState([...selectedLevelTasks]);

  const theme = useCustomTheme();
  const handleSelections = (level, levelId, task, taskId) => {
    let tempArr = [...selectedLevelTasks];
    let levelIndex = tempArr.findIndex((obj) => obj.id === levelId);
    if (levelIndex === -1) {
      tempArr = [...tempArr, { ...level, task_comp: [task] }];
    } else {
      let levelObj = tempArr[levelIndex];
      let tasksArr = [...levelObj.task_comp];
      let taskIndex = tasksArr.findIndex((objt) => objt.id === taskId);
      if (taskIndex === -1) {
        tasksArr = [...tasksArr, task];
      } else {
        tasksArr.splice(taskIndex, 1);
        if (tasksArr.length === 0) {
          tempArr.splice(levelIndex, 1);
        }
      }
      if (tempArr[levelIndex]?.task_comp) {
        tempArr[levelIndex].task_comp = tasksArr;
      }
    }
    selectTasks(tempArr);
  };

  const isChecked = (taskId, levelId) => {
    if (selectedLevelTasks.length === 0) {
      return false;
    }
    let tempLevels = [...selectedLevelTasks];
    let tempLevelObj = tempLevels.find((objL) => objL.id === levelId);
    let tempTasks = tempLevelObj?.task_comp;
    if (!tempLevelObj) {
      return false;
    }

    let index = tempTasks.findIndex((obj) => obj.id === taskId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className='Step2_Body my-2'>
        <div className='row align-items-center m-0 Step2_Txt'>
          <RiVideoLine className='RiVideoLine' />
          <h5>Onboarding Explained Video</h5>
        </div>
        <CustomCarousel
          data={[
            theme.activeCornerStone.label == 'CONNECTION' ? (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Connection.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ) : theme.activeCornerStone?.label == 'CLARIFICATION' ? (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Clarification.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ) : theme.activeCornerStone?.label == 'CULTURE' ? (
              <VideoContainer
                data={
                  <div className='iframe-background'>
                    <video src='https://butler-media.fra1.digitaloceanspaces.com/intro/Explainer%20Culture.mp4' width='100%' height='100%' controls />
                  </div>
                }
              />
            ) : theme.activeCornerStone?.label == 'COMPLIANCE' ? (
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
      {children}

      <div className='row mb-2'></div>
      <div className='Step2_ChexBoxBody'>
        <div className='onboarding Step2_CheckBox d-flex m-0'>
          <FaCalendarAlt className='RiVideoLine' style={{ color: theme.activeCornerStone.color }} />
          <div>
            <h5 className='onboarding_tag poppins-bold'>I would like to make sure…</h5>
            <h6 className='poppins-regular'>Step 2 of 3: Open each main subject (+), study each task description and select one or more to perform. Press “Next”.</h6>
          </div>
        </div>
        <div className='mt-4'>
          {levels_Task.map((ltObj, lti) => (
            <div className='CheckBox_Body my-2' id={`accordion${lti}`} key={lti}>
              <div
                className='d-flex align-items-center CheckBox_MainTxt'
                data-toggle='collapse'
                data-target={`#collapseOne${lti}`}
                aria-expanded='true'
                aria-controls={`collapseOne${lti}`}
              >
                {`${lti}` === activeSubTab ? (
                  <HiMinusCircle onClick={() => setActiveSubTab(null)} className='mx-2 MainIcon' style={{ color: theme.activeCornerStone.color }} />
                ) : (
                  <HiPlusCircle onClick={() => setActiveSubTab(`${lti}`)} className='mx-2 MainIcon' style={{ color: theme.activeCornerStone.color }} />
                )}
                <p className='poppins-regular'>{ltObj.text}</p>
              </div>
              <div
                className={`Onbording_box multi-collapse mt-2 ${`${lti}` === activeSubTab ? 'collapse show' : 'collapse'}`}
                id={`collapseOne${lti}`}
                aria-labelledby={`collapseOne${lti}`}
                data-parent='#accordion'
              >
                {ltObj &&
                  ltObj.task_comp.length > 0 &&
                  ltObj.task_comp.map((tObj, ti) => (
                    <div className={`d-flex align-items-center task ${ti === 0 ? 'roundTop' : ''} ${ti === ltObj.task_comp.length - 1 ? 'roundBottom' : ''}  `}>
                      <label
                        className='checkboxLabel'
                        onClick={() => {
                          handleSelections(ltObj, ltObj.id, tObj, tObj.id);
                        }}
                        style={{ background: isChecked(tObj.id, ltObj.id) ? `${theme.activeCornerStone.color}` : '', border: `1px solid ${theme.activeCornerStone.color}` }}
                      >
                        {isChecked(tObj.id, ltObj.id) && <TiTick className='activeIcon' />}
                      </label>

                      <p>{tObj.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Step_2;
