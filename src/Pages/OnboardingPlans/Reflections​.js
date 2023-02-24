import React, { useEffect, useState } from 'react';
import { FaHandsHelping } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import VideoContainer from '../../components/VideoContainer';
import '../../assets/styles/Carousel.css';
import { CustomCarousel } from '../../components/CustomCarousel';
import VIDEO_1 from '../../assets/Video/video_onboarding.mp4';
import { getCompetenceQue, postCompetenceQue, Tab_Content } from '../../assets/API/Apis';
import Calander_icon from '../../assets/images/Calendar.jpg';
import { COMPETENCE_QNA_DATA, PERSONAL_DATA } from '../../assets/Helper/StaticData';
import Popup from '../../components/Popup';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Reflections = () => {
  useDocumentTitle('OBB-Reflections');
  const [data, setData] = useState({
    questions: [],
    options: [],
  });
  const [error, setError] = useState(null);
  const [values, setValues] = useState([]);
  const [competenceTab, setCompetenceTab] = useState(1);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const isChecked = (qId, oId) => {
    const qIndex = values.findIndex((obj) => obj.ques_Id === qId);
    if (qIndex === -1) {
      return false;
    }

    const optionIndex = values[qIndex].op_id === oId;

    if (qIndex !== -1 && optionIndex) {
      return true;
    }
    return false;
  };

  const handleClick = (qId, optId) => {
    let tempArray = [...values];
    let tempIndex = tempArray.findIndex((obj) => obj.ques_Id === qId);
    let tempObj = {};
    if (tempIndex === -1) {
      tempObj = {
        ...tempObj,
        ques_Id: qId,
        op_id: optId,
      };
      tempArray = [...tempArray, tempObj];
    } else {
      tempObj = { ...values[tempIndex] };
      if (tempObj.op_id === optId) {
        tempObj.op_id = '';
      } else {
        tempObj = {
          ...tempObj,
          ques_Id: qId,
          op_id: optId,
        };
      }
      tempArray[tempIndex] = tempObj;
    }
    setValues(tempArray);
  };

  const handlePost = async () => {
    // if (error) {
    //   return;
    // }
    // try {
    await postCompetenceQue({ result: values })
      .then((response) => {
        setValues(response?.data?.result);
        // debugger;
        // window.location = '/poc/tasks';
        toast.success(response?.message);
      })
      .catch((err) => {
        // debugger;
        setPopUpOpen(true);
        setError(err.message || 'Server Error');
        console.log(err.message);
      });

  };

  const preload = () => {
    getCompetenceQue()
      .then((response) => {
        const { questions, options } = response;
        setData({ ...data, questions: questions, options: options });

        setError(null);
      })
      .catch((err) => {
        setPopUpOpen(true);
        setError(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const DefaultContent = () => {
    return (
      <div className='Table_Body'>
        <table border='2' style={{ width: '100%', textAlign: 'center' }} className='table table-bordered '>
          <tr>
            <th></th>
            {COMPETENCE_QNA_DATA?.options?.map((obj, i) => (
              <th className='poppins-regular' key={i}>
                {obj.option_text}
              </th>
            ))}
          </tr>
          {COMPETENCE_QNA_DATA?.questions?.map((objQ, idQ) => (
            <tr key={idQ}>
              <td className='poppins-regular'>{objQ.quentions_text} </td>
              {COMPETENCE_QNA_DATA?.options?.map((objO, idO) => (
                <td key={idO}>
                  <label className='Rounded_CheckBox'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      onClick={() => {
                        handleClick(objQ.id, objO.id);
                      }}
                      id='policyInput'
                      name='policyCheckmark'
                      checked={isChecked(objQ.id, objO.id)}
                    />
                    <span className='checkmark'></span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </table>

        <div className=' d-flex justify-content-end align-items-center '>
          <button className='btn Save_source' onClick={handlePost}>
            Save My Score
          </button>
        </div>
      </div>
    );
  };

  const CompetenceContent = () => {
    return (
      <div className='Table_Body'>
        <table border='2' style={{ width: '100%', textAlign: 'center' }} className='table table-bordered '>
          <tr>
            <th></th>
            {data?.options?.map((obj, i) => (
              <th className='poppins-regular' key={i}>
                {obj.option_text}
              </th>
            ))}
          </tr>
          {data?.questions?.map((objQ, idQ) => (
            <tr key={idQ}>
              <td className='poppins-regular'>{objQ.quentions_text} </td>
              {data?.options?.map((objO, idO) => (
                <td key={idO}>
                  <label className='Rounded_CheckBox'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      onClick={() => {
                        handleClick(objQ.id, objO.id);
                      }}
                      id='policyInput'
                      name='policyCheckmark'
                      checked={isChecked(objQ.id, objO.id)}
                    />
                    <span className='checkmark'></span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </table>

        <div className=' d-flex justify-content-end align-items-center '>
          <button className='btn Save_source' onClick={handlePost}>
            Save My Score
          </button>
        </div>
      </div>
    );
  };

  const Tab1 = () => {
    return (
      <>
        <div className='container p-0 mt-5' style={{ height: '90vh' }}>
          <div className=' row Myself_body '>
            <div className={`${competenceTab === 1 ? 'Preference_Body' : 'Preference_Body1'} d-flex  align-items-center `} onClick={() => setCompetenceTab(1)}>
              <CgProfile className='Preference_Icon' />
              <h5>My self my preference</h5>
            </div>
            <div className={`${competenceTab === 1 ? 'Competence_Body' : 'Competence_Body1'} d-flex  align-items-center`} onClick={() => setCompetenceTab(2)}>
              <div className='Competence_Icon'>
                <FaHandsHelping />
              </div>
              <h5>My onboarding competence</h5>
            </div>
          </div>
          {error ? DefaultContent() : CompetenceContent()}
        </div>
      </>
    );
  };
  return (
    <>
      {Tab1()}
      {popUpOpen && (
        <Popup
          variant='error'
          title='Error'
          onClose={() => setPopUpOpen(false)}
          onBlur={() => setPopUpOpen(false)}
          onConfirm={() => setPopUpOpen(false)}
          confirmText='ok'
          closeText='close'
          initialWidth='30%'
        >
          <div style={{ minHeight: 100 }}>
            <p>Server Error</p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Reflections;
