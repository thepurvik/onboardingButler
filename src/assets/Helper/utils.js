import axios from 'axios';
import { CUSTOMKEYS } from './constant';

export const IsAuthenticated = () => {
  let user = localStorage.getItem(CUSTOMKEYS.USER);
  if (!!user) {
    user = JSON.parse(user);
  }
  return user;
};

export const logout = () => {
  localStorage.clear();
  localStorage.removeItem(CUSTOMKEYS.USER);
  window.location.reload();
};

export const isValidToken = () => {};

export const setSession = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common.Authorization;
};
export const validName = (value) => {
  const nameRegex = /^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/;
  return nameRegex.test(value);
};

export const validateEmail = (value) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
};
export const validatePwd = (value) => {
  const pwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return pwdRegex.test(value);
};

export const formatDate = (date) => {
  let d = new Date(date);
  let day = d.getDay();
  let month = d.getMonth();
  let year = d.getFullYear();

  day = day > 9 ? day : `0${day}`;
  month = month > 9 ? month : `0${month}`;

  return `${day}/${month}/${year}`;
};
