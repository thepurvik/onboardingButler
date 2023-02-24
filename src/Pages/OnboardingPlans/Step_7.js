import React from 'react';
import connection from '../../assets/images/connection.jpg';
import '../../assets/styles/Step_7.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Not Selected',
    value: 2000,
  },
  {
    name: 'Activated',
    value: 5000,
  },
  {
    name: 'In Progress',
    value: 4000,
  },
  {
    name: 'Completed',
    value: 5000,
  },
];
const Step_7 = () => {
  return (
    <div className='container'>
      <div className='row '>
        <div className='col-md-6 dashboard'>
          <div className='row m-0 py-2 align-items-center '>
            <img src={connection} className='mx-3' />
            <h6 className='m-0'>Hiring Manager, Operations </h6>
          </div>
          <div className='row align-items-center'>
            <div className='row mx-2 '>
              <div className='box'></div>
              <h6 className='mx-2'>Not selected</h6>
            </div>
            <div className='row mx-2 '>
              <div className='box'></div>
              <h6 className='mx-2'>Not selected</h6>
            </div>
            <div className='row mx-2 '>
              <div className='box'></div>
              <h6 className='mx-2'>Not selected</h6>
            </div>
            <div className='row mx-2 '>
              <div className='box'></div>
              <h6 className='mx-2'>Not selected</h6>
            </div>
          </div>
          <div>
            <ResponsiveContainer width='80%' aspect={2}>
              <BarChart
                width={300}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <XAxis dataKey='name' />
                <YAxis domain={[0, 'dataMax+2']} tickCount={8} />
                <Bar dataKey='value' fill='#8884d8' radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='col-md-6'></div>
      </div>
    </div>
  );
};

export default Step_7;
