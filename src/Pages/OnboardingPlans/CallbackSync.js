import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../assets/API/axiosInstances';
import { API_BASE_URLS } from '../../assets/Helper/constant';

const CallbackSync = () => {
  const navigate = useNavigate();
  var parameter = window.location.search.split('code=')[1].split('&')[0];

  const company = window.location.hostname?.split('.')?.[0];

  const data = window.localStorage.getItem('selectedTaskId');
  const get_Sync = () => {
    const payload = {
      code: parameter,
      company,
    };
    axios
      .post(`${API_BASE_URLS.baseUrl_V1}/accounts/callback`, payload)
      .then((response) => {
        if (response.data.data.token.access_token) {
          console.log(JSON.parse(data), response.data.data.token.access_token, 'response.data.token.access_token');
          axiosInstance
            .post(`${API_BASE_URLS.baseUrl_V1}/accounts/task/export`, {
              t_id: JSON.parse(data),
              access_token: response.data.data.token.access_token,
            })
            .then((response) => {
              localStorage.setItem('selectedTaskId', []);
              navigate('/tasks');
              toast.success("Task synced successfully");
            })
            .catch((error) => {
              localStorage.setItem('selectedTaskId', []);
              navigate('/tasks');
              toast.error("Something went wrong,please try again.");
              console.log(error);
            });
        }
      })
      .catch((error) => {
        localStorage.setItem('selectedTaskId', []);
        navigate('/tasks');
        toast.error('error');
        console.log(error);
      });
  };

  // const access_token1 = window.localStorage.getItem('access_token');


  // const Export_Api = () => {
  //   const payload = {
  //     t_id: window.JSON.parse(data),
  //     access_token: access_token1,
  //   };
  //   axiosInstance
  //     .post(`${API_BASE_URLS.baseUrl_V1}/accounts/task/export`, payload)
  //     .then((response) => {
  //       console.log('res', response);
  //       navigate('/onboarding_plans');
  //       toast.success('Succesfully Task Sync');
  //     })
  //     .catch((error) => console.log(error));
  // };
  useEffect(() => {
    get_Sync();
    // Export_Api();
  }, []);

  return <div></div>;
};

export default CallbackSync;
