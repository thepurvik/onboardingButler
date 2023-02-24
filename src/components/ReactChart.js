import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate, useParams } from 'react-router-dom';

const ReactChart = ({ selectedEmployee }) => {
  const navigate = useNavigate();
  let newData = [];
  const getGraphData = (graphData) => {
    let statusData = '';
    graphData?.connection?.connection?.map((obj, index) => {
      console.log(obj, 'obj');
      // if (obj.status == '3') {
      //   statusData = '✔️';
      // } else {
      //   statusData = '';
      // }
      if (obj.status == '3') {
        statusData = 'Completed';
      } else if (obj.status == '2') {
        statusData = 'In Progress';
      } else {
        statusData = 'Not Started';
      }
      // else if (obj.status == '2') {
      //   statusData = '🚧';
      // } else {
      //   statusData = '⛔';
      // }
      if (obj.start_date !== null) {
        let newObj = {
          x: obj.title,
          y: [new Date(obj.start_date).getTime(), new Date(obj.due_date).getTime()],
          fillColor: '#393c4a',
          status: statusData,
          id: obj.id,
        };
        newData.push(newObj);
      }
    });
    graphData?.clarification?.clarification?.map((obj, index) => {
      if (obj.status == '3') {
        statusData = 'Completed';
      } else if (obj.status == '2') {
        statusData = 'In Progress';
      } else {
        statusData = 'Not Started';
      }
      if (obj.start_date !== null) {
        let newObj = {
          x: obj.title,
          y: [new Date(obj.start_date).getTime(), new Date(obj.due_date).getTime()],
          fillColor: '#336b87',
          status: statusData,
          id: obj.id,
        };
        newData.push(newObj);
      }
    });
    graphData?.culture?.culture?.map((obj, index) => {
      if (obj.status == '3') {
        statusData = 'Completed';
      } else if (obj.status == '2') {
        statusData = 'In Progress';
      } else {
        statusData = 'Not Started';
      }
      if (obj.start_date !== null) {
        let newObj = {
          x: obj.title,
          y: [new Date(obj.start_date).getTime(), new Date(obj.due_date).getTime()],
          fillColor: '#cc3e2f',
          status: statusData,
          id: obj.id,
        };
        newData.push(newObj);
      }
    });
    graphData?.compliance?.compliance?.map((obj, index) => {
      if (obj.status == '3') {
        statusData = 'Completed';
      } else if (obj.status == '2') {
        statusData = 'In Progress';
      } else {
        statusData = 'Not Started';
      }
      if (obj.start_date !== null) {
        let newObj = {
          x: obj.title,
          y: [new Date(obj.start_date).getTime(), new Date(obj.due_date).getTime()],
          fillColor: '#90afc5',
          status: statusData,
          id: obj.id,
        };
        newData.push(newObj);
      }
    });
    return newData;
  };

  const getBarHeight = (newData) => {
    var newBarData = '0%';
    if (newData.length == 1) {
      newBarData = '12%';
    } else if (newData.length > 1 && newData.length <= 5) {
      newBarData = '30%';
    } else if (newData.length >= 6 && newData.length <= 15) {
      newBarData = '50%';
    } else if (newData.length >= 16 && newData.length <= 25) {
      newBarData = '62%';
    } else if (newData.length >= 26 && newData.length <= 35) {
      newBarData = '72%';
    } else if (newData.length >= 36 && newData.length <= 50) {
      newBarData = '85%';
    } else {
      newBarData = '100%';
    }
    return newBarData;
  };

  const getMinWeek = (minData) => {
    const d = new Date(minData);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();

    Date.prototype.getWeek = function () {
      var dt = new Date(year, 0, 1);
      return Math.ceil(((this - dt) / 86400000 + dt.getDay() + 1) / 7);
    };

    var myDate = new Date(year, month, date);
    console.log(myDate.getWeek());
    return myDate?.getWeek();
  };

  const state = {
    series: [
      {
        data: getGraphData(selectedEmployee),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'rangeBar',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 10,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: [],
          },
        },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.series[config.seriesIndex].data[config.dataPointIndex].id);
            if (config?.w?.config?.series[config.seriesIndex]?.data[config.dataPointIndex]?.id) {
              navigate('/tasks', { state: config?.w?.config?.series[config.seriesIndex]?.data[config.dataPointIndex]?.id });
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          barHeight: getBarHeight(newData),
          borderRadius: 4,
          borderRadiusApplication: 'around',
          rangeBarOverlap: false,
          rangeBarGroupRows: false,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          var label = opts.w.globals.initialSeries[0].data[opts.dataPointIndex].status;
          return label;
        },
        // borderWidth: 0,
        style: {
          fontSize: '10px',
          colors: ['transparent'],
          textOutline: 0,
        },
        background: {
          enabled: true,
          borderWidth: 0,
          // foreColor: '#ffffff',
          // borderRadius: 10,
          // opacity: 1,
        },
      },
      xaxis: {
        type: 'datetime',
        min: new Date(selectedEmployee?.onboarding_startdate).getTime(),
        max: new Date(selectedEmployee?.onboarding_enddate).getTime(),
        // decimalInFloat: 0,
        // position: 'top',
        labels: {
          show: true,
          style: {
            color: '#000000',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: 600,
          },
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ['#fff'],
          opacity: 1,
          border: 0,
        },
        show: false,
      },

      noData: {
        text: 'No data found',
        align: 'center',
        verticalAlign: 'middle',
        style: {
          color: '#000000',
          fontSize: '20px',
          fontFamily: 'Poppins-bold',
        },
      },
    },
  };

  return (
    <div className='react-chart'>
      <ReactApexChart options={state.options} series={state.series} type='rangeBar' height={350} />
    </div>
  );
};

export default ReactChart;
