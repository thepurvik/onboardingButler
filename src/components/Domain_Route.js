import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Domain_Validation } from '../assets/API/Apis';
import { IsAuthenticated } from '../assets/Helper/utils';
import { Footer_Logo } from '../assets/icons/Footer_Logo';
import { FiAlertTriangle } from 'react-icons/fi';

const Domain_Route = () => {
  const [varified, setVerified] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const DomainValidation = () => {
    Domain_Validation()
      .then((response) => {
        setVerified(1);
        setErrorMsg(null);
      })
      .catch((error) => {
        setErrorMsg(error.message || 'Server Error');
        setVerified(2);
      });
  };

  const domain = window.location.hostname.split('.')[0];

  useEffect(() => {
    DomainValidation();
  }, []);

  return (
    <div>
      {varified === 0 && ''}
      {varified === 1 && <Outlet />}
      {varified === 2 && (
        <>
          <div className='text-center py-4 Donain_Logo'>
            <Footer_Logo />
          </div>
          <div className='container Domain_Route'>
            <div className='d-flex'>
              <div className='Domain_Icon'>
                <FiAlertTriangle />
              </div>
              <h2>
                The account <span>{domain}</span> does not found.Please make sure the URL is correct or contact our support if the problem persist.
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Domain_Route;
