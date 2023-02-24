import axios from 'axios';
import { API_BASE_URLS } from '../Helper/constant';
import { IsAuthenticated } from '../Helper/utils';

const getHeaders = () => {
  const company = window.location.hostname?.split('.')?.[0];

  const Auth = IsAuthenticated()?.user?.access;
  let header = {
    company: company || '',
    Authorization: Auth ? `Bearer ${Auth}` : '',
  };
  return header;
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URLS.baseUrl_V1,
  timeout: 20000,
  headers: getHeaders(),
});

// export const axiosInstance2 = axios.create({
//   baseURL: API_BASE_URLS.baseUrl_V1,
//   timeout: 20000,
//   headers: {
//     company: 'obb',
//     Authorization: IsAuthenticated()?.user?.access ? `Bearer ${IsAuthenticated()?.user?.access}` : '',
//   },
// });

// new axios Instances for uploading picture......
export const axiosInstanceforPic = axios.create({
  baseURL: API_BASE_URLS.baseUrl_V1,
  timeout: 20000,
  headers: {
    company: window.location.hostname?.split('.')?.[0] || '',
    Authorization: IsAuthenticated()?.user?.access ? `Bearer ${IsAuthenticated()?.user?.access}` : '',
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
