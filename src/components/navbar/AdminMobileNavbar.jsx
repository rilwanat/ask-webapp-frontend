import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import AskFooter from './AskFooter';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

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

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//


import { ClipLoader } from 'react-spinners'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import DonateAndAsk from '../widgets/WidgetDonateAndAsk';
import AccountOptions from '../widgets/AccountOptions';

import MenuIcon from '@mui/icons-material/Menu';


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







export default function AdminMobileNavbar({ carouselRequestItems, carouselBeneficiaryItems, carouselSponsorItems, gotoPage }) {

  const navigate = useNavigate();
  
  const MenuNavData = navData.filter(item => item.id >= 1 && item.id <= 11);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };



  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };


  
     

  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  
  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };


  return (
    <div className="fixed top-0 left-0 w-full z-5000    flex flex-col bg-theme shadow-lg px-4" style={{ height: '80px' }}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="block h-28 w-auto max-w-none z-100"
            src={askLogo}
            alt="Logo"
            // onClick={toggleMenu}
            // onClick={() => {navigate(isLive ? process.env.REACT_APP_API_SERVER_LIVE_URL : '/');}}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="flex items-center " style={{ height: '80px' }}>

        {/* <DonateAndAsk /> */}


          <div className="md:flex justify-end" style={{}}>
            <div className="text-right">
              {/* <p className='text-sm '>{storedAdminDetails && storedAdminDetails.Email}</p> */}
              {/* { parsedAdminData && <p className='text-sm font-bold text-white'>{ parsedAdminData.fullname }</p> } */}
              {/* <p className="text-sm font-bold text-white">{'rbapps'}</p> */}
              {/* <p className="text-sm ">{'ScrApp Ventures'}</p> */}
             
             
              
              <div
                            className="flex items-center cursor-pointer px-2 py-1 rounded-md mr-4  bg-softTheme hover:bg-theme hover:text-white"
                            onClick={toggleMenu}
                            style={{ height: '40px', borderRadius: '4px' }}
                        >
                            <MenuIcon className=''/>
                            {/* <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Menu
                            </p> */}
                        </div>
            {/* <IconButton
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
            </IconButton> */}
          


            </div>
          </div>

          <div
            className="bg-theme border-1 border-softTheme flex items-center justify-center"
            style={{ height: '40px', width: '40px', borderRadius: '4px' }}
            onClick={() => { toggleAccount(); }}
          >
            <PersonIcon className="text-white cursor-pointer" />
          </div>
          
          
          {/* {!isAuthenticated() ?
         <IconButton aria-label="shopping cart" sx={{ color: '#161c34' }}
        onClick={() => {
          //navigateToSignIn();
          toggleAccount();
        }}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
 : <IconButton aria-label="shopping cart" sx={{ color: '#161c34' }}
 onClick={() => {
  // toggleProfileMenu();
  gotoUserProfile();
 }}
 >
   <AccountCircleOutlinedIcon />
 </IconButton>}  */}

 

          {/* <div className='' style={{height: "20px" }} >
            <ArrowDropDownIcon style={{fontSize: '20px' }} className=" mb-2 text-white cursor-pointer" />
          </div> */}
        </div>
      </div>

<div className="fixed top-17 left-35 w-full z-100">
<DonateAndAsk />
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
          onClick={() => {navigateTo('/single-request', { selectedItem: carouselRequestItems[0], allItems: carouselRequestItems  });}}
        >
          Requests
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          onClick={() => {navigateTo('/single-beneficiary', { selectedItem: carouselBeneficiaryItems[0], allItems: carouselBeneficiaryItems  });}}
        >
          Beneficiary
        </motion.span>

        <motion.span
          variants={menuItemVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          className="text-sm  text-theme cursor-pointer block my-4 mx-8  px-2 py-2 rounded-md hover:bg-theme hover:text-white"
          style={{ fontWeight: '600' }}
          onClick={() => {navigateTo('/single-sponsor', { selectedItem: carouselSponsorItems[0], allItems: carouselSponsorItems  });}}
        >
          Sponsor
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






  <AccountOptions 
  toggleAccount={toggleAccount} 
  isAccountOpen={isAccountOpen}
  setIsAccountOpen={setIsAccountOpen}
  />




  
    </div>
  );
}
