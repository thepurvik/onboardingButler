import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function LoginSSO() {
  const { user } = useAuth0();
  const { loginMicrosoftWithHeader } = useAuth();

  useEffect(async () => {
    if (user?.email) await handleLoginSso();
  }, [user]);

  const handleLoginSso = async () => {
    let payload = {
      user_type: '2',
      country: 'Denmark',
      language: 'English',
      email: user?.email,
      first_name: user?.given_name,
      last_name: user?.family_name,
    };

    let headerValue = window.location.hostname?.split('.')?.[0];
    const response = await loginMicrosoftWithHeader(payload, headerValue);

    if (response?.status == 200) {
      let userData = {
        user: response?.data?.data,
      };
      localStorage.setItem('loginType', 2);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', response?.data?.data?.access);
      toast.success('Login Successfully');
      if (response?.data?.data?.user_type) {
        if (response?.data?.user_type === '1') {
          window.location = '/';
        } else {
          window.location = '/';
        }
      }
    } else {
      toast.error('Please Login With Your Email Id and Password.');
    }
  };

  return <div></div>;
}
