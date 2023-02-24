import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getCornerStones } from '../assets/API/Apis';
import useCustomTheme from '../hooks/useCustomTheme';
import Navbar from './Navbar';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { IsAuthenticated } from '../assets/Helper/utils';

const Layout = () => {
  const [show, setShow] = useState(true);
  const { dispatch } = useCustomTheme();
  if (window.location.pathname.includes('/loginsso')) {
    window.location.href = '/';
  }

  useEffect(() => {
    getCornerStones().then((res) => {
      dispatch({ type: 'SET_CORNERSTONE', payload: res.data });
      dispatch({ type: 'SET_ACTIVE_CORNERSTONE', payload: { ...res.data[0], index: 1 } });
    });
  }, []);

  // const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   // Button is displayed after scrolling for 500 pixels
  //   const toggleVisibility = () => {
  //     if (window.pageYOffset > 500) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener('scroll', toggleVisibility);

  //   return () => window.removeEventListener('scroll', toggleVisibility);
  // }, []);

  let mybutton = document.getElementById('scroll-to-top');
  window.onscroll = () => {
    scrollFunction();
  };
  const scrollFunction = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  };

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <div className='Chat_Icon Chat_Btn' onClick={() => window.scrollBy(0, 0)}>
        <a onClick={() => setShow(!show)} type='button'>
          {!show ? (
            <BsFillArrowUpCircleFill onClick={() => window.scrollBy(0, -window.innerHeight)} />
          ) : (
            <BsFillArrowDownCircleFill onClick={() => window.scrollBy(0, window.innerHeight)} />
          )}
        </a>
      </div> */}

      {/* {isVisible && ( */}
      <div className='Chat_Icon Chat_Btn' id='scroll-to-top' onClick={scrollToTop}>
        <a type='button'>
          <BsFillArrowUpCircleFill />
        </a>
      </div>
      {/* )} */}
    </>
  );
};

export default Layout;
