import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IsAuthenticated } from '../../assets/Helper/utils';

const AuthGaurd = ({ children }) => {
  return <>{IsAuthenticated() ? children : <Navigate replace to='/login' />}</>;
};

export default AuthGaurd;
