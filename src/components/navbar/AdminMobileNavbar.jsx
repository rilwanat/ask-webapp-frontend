import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import AskFooter from './AskFooter';


import styles from './AdminMobileNavbar.module.css';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { navData } from './AdminNavData';

import askLogo from '../../assets/images/ask-logo.png';


import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// import { getCookie, deleteCookie } from '../../../authUtils'; // Import getCookie function
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Logout } from '@mui/icons-material';
//



const SlideInMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 1000; /* Ensure the menu is on top of other content */
  overflow-x: hidden;
`;
const MenuContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};






const SlideInAccount = styled(motion.div)`
  position: fixed;
  top: 0rem;
  right: 0;
  width: calc(100% - 2rem);
  height: 70vh;
  /*background-color: rgba(0, 0, 0, 0.5);  Semi-transparent background */
  z-index: 1000; /* Ensure the menu is on top of other content */
  overflow-x: hidden;

  @media (min-width: 960px) {
    width: 40%;
  }
`;
const AccountContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #F0F3FF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const AccountContentInner = styled.div`
  height: 100%; /* Ensure the inner content fills the container */
  max-height: 100%; /* Limit the height to the container's height */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
`;
const accountItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};
//


export default function AdminMobileNavbar({ isLive, parsedAdminData, gotoPage }) {

  const navigate = useNavigate();
  
  const [isMenuOpen, setMenuOpen] = useState(false);

  const MenuNavData = navData.filter(item => item.id >= 1 && item.id <= 11);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };


  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };
  



  return (
    <div className="bg-white shadow-lg px-4" style={{ height: '80px' }}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="block h-10 w-auto max-w-none"
            src={askLogo}
            alt="Logo"
            // onClick={toggleMenu}
            // onClick={() => {navigate(isLive ? process.env.REACT_APP_API_SERVER_LIVE_URL : '/');}}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="flex items-center " style={{ height: '80px' }}>
          <div className="md:flex justify-end" style={{}}>
            <div className="text-right">
              {/* <p className='text-sm '>{storedAdminDetails && storedAdminDetails.Email}</p> */}
              {/* { parsedAdminData && <p className='text-sm font-bold text-white'>{ parsedAdminData.fullname }</p> } */}
              {/* <p className="text-sm font-bold text-white">{'rbapps'}</p> */}
              {/* <p className="text-sm ">{'ScrApp Ventures'}</p> */}
             
             
              
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{  marginRight: 2 }} 
              onClick={toggleMenu}
            >
              <div style={{ width: '20px', height: '24px' }} className='relative z-20'>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#055D4F', marginTop: '4px', marginBottom: '6px' }}></div>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#055D4F', marginBottom: '6px' }}></div>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#055D4F' }}></div>
              </div>
            </IconButton>
          


            </div>
          </div>

          {/* <div
            className="bg-eDoctorLightBlue flex items-center justify-center"
            style={{ height: '40px', width: '40px', borderRadius: '4px' }}
            // onClick={() => { toggleAccount(); }}
          >
            <PersonIcon className="text-white cursor-pointer" />
          </div> */}

          {/* <div className='' style={{height: "20px" }} >
            <ArrowDropDownIcon style={{fontSize: '20px' }} className=" mb-2 text-white cursor-pointer" />
          </div> */}
        </div>
      </div>

  

      {/* Mobile menu */}
{/* Slide-in menu */}
<SlideInMenu
    initial={{ x: '-100%' }}
    animate={{ x: isMenuOpen ? 0 : '-100%' }}
    transition={{ duration: 0.4 }}
    className=''
  >
    <MenuContent className=''>
      <div className=''>
        <div className='flex justify-between items-center px-8  bg-theme shadow-lg'>
          <img
            className="block h-12 w-auto my-4"
            src={askLogo}
            alt="Logo"
            onClick={() => {
              navigate('/');
          }}
            style={{ cursor: 'pointer' }}
          />
          <ArrowLeftIcon className='text-white' onClick={toggleMenu} style={{ cursor: 'pointer' }}/>
        </div>
        {/* <hr /> */}
        {/* Apply variants to each menu item */}
        <div className='pb-2'>
        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          onClick={() => {
            navigate('/');
        }}
        >
          Home
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          onClick={() => {gotoPage('about-us');}}
        >
          About
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          // onClick={() => {gotoPage('requests');}}
        >
          Requests
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          // onClick={() => {gotoPage('gallery');}}
        >
          Gallery
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          // onClick={() => {gotoPage('gallery');}}
        >
          Sponsor
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          // onClick={() => {gotoPage('gallery');}}
        >
          Beneficiary
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          onClick={() => {gotoPage('contact-us');}}
        >
          Contact
        </motion.span>
        </div>
        

      </div>
    {/* Fixed div at the bottom */}
    <div className="fixed bottom-0 left-0 w-full py-4">
      
<div className='mx-8'>
<hr className='my-2'/>

<div className='flex justify-between items-center'>
  <a
    className="text-gray-900 text-sm font-bold cursor-pointer block my-2"
    onClick={() => { }}
  >
    ACCOUNT
  </a>
  <AccountCircleOutlinedIcon onClick={toggleMenu} style={{ cursor: 'pointer' }}/>
</div>




              

</div>


{/* <AskFooter /> */}


</div>

</MenuContent>
  </SlideInMenu>
    </div>
  );
}
