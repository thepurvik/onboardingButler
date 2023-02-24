import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';
import Personal_ifno from '../../components/Personal_ifno';
import Step_1 from './Step_1';
import Step_2 from './Step_2';
import Step_3 from './Step_3';
import '../../assets/styles/Carousel.css';
import '../../assets/styles/Step_2.css';
import '../../assets/styles/Step_3.css';
import { PERSONAL_DATA } from '../../assets/Helper/StaticData';
import { getLevelsAndTask, get_All_Employee_Details, SaveLevel } from '../../assets/API/Apis';
import { useNavigate } from 'react-router-dom';
import useCustomTheme from '../../hooks/useCustomTheme';
import { toast } from 'react-toastify';

const IndexTab = 1;
const EndTab = 3;

const OnboardingPlansCreation = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(PERSONAL_DATA[0]);
  const [levels_Task, setLevels_Tasks] = useState([]);
  const [selectedLevels_Task, setSelectedLevels_Tasks] = useState([]);
  const [selectedHierarchy, setSelectedHierarchy] = useState({ id: 1, label: 'CONNECTION' });
  const [emData, setEmData] = useState(null);

  const theme = useCustomTheme();

  useMemo(async () => {
    await getLevelsAndTask(selectedHierarchy.id).then((response) => {
      if (response) setLevels_Tasks(response);
    });
  }, [selectedHierarchy]);

  const Emplo_Data = async () => {
    await get_All_Employee_Details().then((response) => {
      if (response) {
        if (response.data && response.data[0]) {
          setEmData(response.data[0]);
        }
      }
    });
  };

  useEffect(() => {
    Emplo_Data();
  }, []);

  const handleSaveTask = () => {
    // let payload = {
    //   [selectedHierarchy.label.toLowerCase()]: selectedLevels_Task,
    //   // cornerstone: selectedHierarchy.label,
    // };

    // SaveLevel(selectedEmployee.id, payload).then((response) => {
    //   console.log('selectedEmployee', response);
    //   // window.location = '/poc/tasks';
    // });
    navigate(`/tasks/`);
  };

  return (
    <>
      <div className='container py-4'>
        {step === 1 && (
          <Step_1
            setSelectedEmployee={setSelectedEmployee}
            setSelectedHierarchy={setSelectedHierarchy}
            emData={emData}
            moveNext={() => {
              setStep(step + 1);
            }}
          />
        )}
        {step === 2 && (
          <Step_2 levels_Task={levels_Task} selectTasks={setSelectedLevels_Tasks} selectedLevelTasks={selectedLevels_Task} selectedEmployee={selectedEmployee}>
            <div className='row Home-card'>
              <Card
                empData={{
                  fullName: selectedEmployee.employee.full_name,
                  jobTitle: selectedEmployee.jobtitle,
                  profileImg: selectedEmployee.employee.profile_pic,
                }}
                emData={emData}
              />
              <Personal_ifno dataOptions={selectedEmployee} />
            </div>
          </Step_2>
        )}
        {step === 3 && (
          <Step_3
            selectedLevelTasks={selectedLevels_Task}
            selectedEmployee={selectedEmployee}
            selectedHierarchy={selectedHierarchy}
            empData={{
              fullName: selectedEmployee.employee.full_name,
              jobTitle: selectedEmployee.jobtitle,
              profileImg: selectedEmployee.employee.profile_pic,
            }}
          >
            <div className='row Home-card'>
              <Card
                empData={{
                  fullName: selectedEmployee.employee.full_name,
                  jobTitle: selectedEmployee.jobtitle,
                  profileImg: selectedEmployee.employee.profile_pic,
                }}
                emData={emData}
              />
              <Personal_ifno dataOptions={selectedEmployee} />
            </div>
          </Step_3>
        )}

        <div className='row justify-content-end align-items-center Btn_PreNext py-3'>
          {step !== IndexTab && (
            <button
              className='btn mx-3'
              onClick={() => {
                step > IndexTab && setStep(step - 1);
                setSelectedLevels_Tasks([]);
              }}
            >
              Previous
            </button>
          )}
          {step === 3 && (
            <button
              className='btn'
              onClick={() => {
                // ADD Save Functionality
                // setStep(step + 1);
                handleSaveTask();
              }}
              style={{ backgroundColor: theme.activeCornerStone.color }}
            >
              Save
            </button>
          )}
          {step !== EndTab && step !== 1 && step !== 3 && (
            <button
              className='btn'
              onClick={() => {
                if (!(step === 2 && selectedLevels_Task.length === 0)) {
                  step < EndTab && setStep(step + 1);
                } else if (step === 2 && selectedLevels_Task.length === 0) {
                  toast.error('Please select atleast one options.');
                }
              }}
              style={{ backgroundColor: theme.activeCornerStone.color }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPlansCreation;
