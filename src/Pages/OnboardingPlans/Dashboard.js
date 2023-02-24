import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { NavLink } from 'react-router-dom';
import { IsAuthenticated } from '../../assets/Helper/utils';
import photos from '../../assets/images/Hiring_Manager.jpg';
import photos1 from '../../assets/images/Human_Resources.jpg';
import '../../assets/styles/Sample.css';
import Popup from '../../components/Popup';

const Dashboard = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);

  const UserName = IsAuthenticated().user?.first_name.charAt(0).toUpperCase() + IsAuthenticated().user?.first_name.slice(1);
  const state = {
    series: [
      // {
      //   name: 'Not selected ',
      //   data: [7, 3, 2, 13],
      //   fillColors: '#393C4A',
      // },
      // {
      //   name: 'Activated',
      //   data: [9, 21, 4, 17],
      //   fillColors: '#393C4A',
      // },
      // {
      //   name: 'In Progress',
      //   data: [18, 12, 8, 8],
      //   colors: '#CC3E2F',
      // },
      // {
      //   name: 'Completed',
      //   data: [12, 1, 3, 2],
      //   colors: '#90AFC5',
      // },
      {
        data: [7, 18, 4, 6],
      },
    ],
    options: {
      chart: {
        id: 'bar',
        // events: {
        //   click: function (chart, w, e) {
        //     console.log(chart, w, e);
        //   },
        // },
      },
      colors: ['yellow', 'red', 'blue', 'grey'],
      plotOptions: {
        bar: {
          columnWidth: '70%',
          distributed: true,
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#393C4A', '#336B87', '#CC3E2F', '#90AFC5'],
      legend: {
        show: true,
        style: {
          fontSize: '44px',
        },
      },
      xaxis: {
        categories: [['Not Selected'], ['Activated'], ['In Progress'], ['Completed']],
        labels: {
          style: {
            colors: ['#3E4954', '#3E4954', '#3E4954', '#3E4954'],
            fontSize: '14px',
          },
        },
      },
    },
  };

  // Dashboard 2

  const Data = {
    options: {
      chart: {
        id: 'apex-chart',
      },
      xaxis: {
        categories: ['Connection', 'Clarification', 'Cultural', 'Compliance'],
        labels: {
          style: {
            fontSize: '14px',
          },
        },
      },
      colors: ['#393C4A', '#336B87', '#CC3E2F', '#90AFC5'],

      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '90%',
        },
        style: {
          margin: 10,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        colors: ['transparent'],
      },

      legend: {
        show: true,
        style: {
          fontSize: '44px',
        },
      },
    },
    series: [
      {
        name: 'Not selected ',
        data: [7, 3, 2, 13],
        fillColors: '#393C4A',
      },
      {
        name: 'Activated',
        data: [9, 21, 4, 17],
        fillColors: '#393C4A',
      },
      {
        name: 'In Progress',
        data: [18, 12, 8, 8],
        colors: '#CC3E2F',
      },
      {
        name: 'Completed',
        data: [12, 1, 3, 2],
        colors: '#90AFC5',
      },
    ],
  };

  // Dashboard 3
  const state1 = {
    series: [
      {
        data: [10, 4, 18, 13],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e);
          },
        },
      },
      colors: ['yellow', 'red', 'blue', 'grey'],
      plotOptions: {
        bar: {
          columnWidth: '70%',
          distributed: true,
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#393C4A', '#336B87', '#CC3E2F', '#90AFC5'],
      legend: {
        show: true,
        style: {
          fontSize: '44px',
        },
      },
      xaxis: {
        categories: [['Not Selected'], ['Activated'], ['In Progress'], ['Completed']],
        labels: {
          style: {
            colors: ['#3E4954', '#3E4954', '#3E4954', '#3E4954'],
            fontSize: '14px',
          },
        },
      },
    },
  };

  // Dashboard 4

  const Data1 = {
    options: {
      chart: {
        id: 'apex-chart',
      },
      xaxis: {
        categories: ['Connection', 'Clarification', 'Cultural', 'Compliance'],
        labels: {
          style: {
            fontSize: '14px',
          },
        },
      },
      colors: ['#393C4A', '#336B87', '#CC3E2F', '#90AFC5'],

      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '85%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        style: {
          fontSize: '44px',
        },
      },
      stroke: {
        width: 3,
        colors: ['transparent'],
      },
    },
    series: [
      {
        name: 'Not selected ',
        data: [2, 5, 3, 14],
        fillColors: '#393C4A',
      },
      {
        name: 'Activated',
        data: [8, 7, 12, 1],
        fillColors: '#393C4A',
      },
      {
        name: 'In Progress',
        data: [3, 16, 2, 6],
        colors: '#CC3E2F',
      },
      {
        name: 'Completed',
        data: [22, 8, 7, 9],
        colors: '#90AFC5',
      },
    ],
  };

  useEffect(() => {
    // console.log('USER DETAILS:', Auth);
    if (document.referrer === `${window.location.href}login` || document.referrer === `${window.location.href.split('.').slice(1, 3).join('')}register`) {
      setPopUpOpen(localStorage.getItem('NormalLoginfirstTime') || localStorage.getItem('firstTime'));
    } else {
      setPopUpOpen(localStorage.getItem('SsoLoginfirstTime'));
    }
  }, []);

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 Hiring'>
            <div className='row m-0 py-4 align-items-center'>
              <img src={photos} className='mx-3 hicolor' />
              <h6 className='m-0 poppins-semibold'>Hiring Manager, Operations </h6>
            </div>
            <div id='chart'>
              <ReactApexChart options={state.options} series={state.series} type='bar' height={350} />
            </div>
          </div>
          <div className='col-md-6 Hiring'>
            <div className='row m-0 py-4 align-items-center'>
              <img src={photos} className='mx-3 hicolor' />
              <h6 className='m-0 poppins-semibold'>Hiring Manager, Within One Onboarding </h6>
            </div>
            <div id='chart'>
              <ReactApexChart options={Data.options} series={Data.series} type='bar' height={350} />
            </div>
          </div>
          <div className='col-md-6 Hiring'>
            <div className='row m-0 py-4 align-items-center'>
              <img src={photos1} className='mx-3 hicolor' />
              <h6 className='m-0 poppins-semibold'>Human Resources ,Operations </h6>
            </div>
            <div id='chart'>
              <ReactApexChart options={state1.options} series={state1.series} type='bar' height={350} />
            </div>
          </div>
          <div className='col-md-6 Hiring'>
            <div className='row m-0 py-4 align-items-center'>
              <img src={photos1} className='mx-3 hicolor' />
              <h6 className='m-0 poppins-semibold'>Human Resources, Within One Onboarding</h6>
            </div>
            <div id='chart'>
              <ReactApexChart options={Data1.options} series={Data1.series} type='bar' height={350} />
            </div>
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

export default Dashboard;
