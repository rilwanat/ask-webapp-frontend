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

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//


import { ClipLoader } from 'react-spinners'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



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
  height: 80vh;
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
  
  const MenuNavData = navData.filter(item => item.id >= 1 && item.id <= 11);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };



  
     

  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [menuWidthSignin, setMenuWidthSignin] = useState(0);
  const [menuWidthRegister, setMenuWidthRegister] = useState(0);

  
  const [isHoverCreateAccount, setIsHoverCreateAccount] = useState(false);
  const handleHoverCreateAccount = () => { setIsHoverCreateAccount(true); };
  const handleLeaveCreateAccount = () => { setIsHoverCreateAccount(false); };
  
  const [isHoverSignIn, setIsHoverSignIn] = useState(false);
  const handleHoverSignIn = () => { setIsHoverSignIn(true); };
  const handleLeaveSignIn = () => { setIsHoverSignIn(false); };

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const toggleAccountForSignUp = () => {
    setErrorMessage({ message: '' });
    setIsSignUpOpen(!isSignUpOpen);
  }  

  const toggleAccountForSignIn = () => {
    setErrorMessage({ message: '' });
    setIsSignUpOpen(false);
  }


  const [isToggleProfileMenuOpen, setIsToggleProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => {
    setIsToggleProfileMenuOpen(!isToggleProfileMenuOpen);
  };


  const gotoUserProfile = () => {
    navigate('/profile-dashboard');
  }

  const [loginEmailAddress, setLoginEmailAddress] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [registrationStatus, setRegistrationStatus] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginUser = async (e) => {
      return;


      e.preventDefault();
      setErrorMessage({ message: '' });
    
      setIsLoading(true);
    
      // setLoginEmailAddress();
      // setLoginPassword();
    
      if (loginEmailAddress === 'Enter your email' || loginEmailAddress === '' 
      || 
      loginPassword === 'Enter your password' || loginPassword === ''
      ) {
        setErrorMessage({ message: 'Login Failed: Please enter valid credentials' });
        // setRegistrationStatus("Failed");
        setIsLoading(false);
        return;
      }
    
      //alert("login user: " + loginEmailAddress + " " + loginPassword);
      try {
  
        const requestData = {   
          email: loginEmailAddress,  
          password: loginPassword
        };
  
  
        const response = await axios.post(process.env.REACT_APP_API_SERVER_URL + process.env.REACT_APP_USER_LOGIN, requestData, {
          headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
            },
        });
  
        setIsLoading(false);
        // alert("login: " + JSON.stringify(response.data, null, 2));
  // return;
  
        if (response.data.status) {
          // If login is successful
          setErrorMessage({ message: '' });
          
          setLoginEmailAddress('');
          setLoginPassword('');
  
  
  
  
          const token = response.data.token;
          const decodedToken = jwtDecode(token);
          // alert(JSON.stringify(decodedToken), null, 2);
            
          const expirationDays = (decodedToken.exp - decodedToken.iat) / (24 * 60 * 60);
          // alert(expirationDays * (24 * 60 * 60)); //seconds
    
          setCookie('valorhijab-user-token', token, expirationDays);
          setCookie('valorhijab-userDetails', JSON.stringify(response.data.userData));
  
          
  
  
  
          // alert("Login Successful: " + response.data.message);
          openNotificationModal(true, "Login", response.data.message);
          
          gotoUserProfile();
        } else {
          const errors = response.data.errors.map(error => error.msg);
          setErrorMessage({ message: response.data.message, errors });
          //alert("Failed1");
        }
      } catch (error) {
        setIsLoading(false);
      
        if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
      } else if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;
        const errorMessages = errors.map(error => error.msg);
        const errorMessage = errorMessages.join(', '); // Join all error messages
        setErrorMessage({ message: errorMessage });
      } else {
        setErrorMessage({ message: 'Login failed. Please check your credentials and try again.' });
      }
    }
    };
  
    const [registrationFirstname, setRegistrationFirstname] = useState('');
    const [registrationLastname, setRegistrationLastname] = useState('');
    const [registrationEmailAddress, setRegistrationEmailAddress] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [registrationConfirmPassword, setRegistrationConfirmPassword] = useState('');
  
    const registerUser = async (e) => {
      return;


      
      e.preventDefault();
      setErrorMessage({ message: '' });
      //alert("");
  
      setIsLoading(true);
  
      if (registrationEmailAddress === 'Enter your email' || registrationEmailAddress === '' 
      || 
      registrationFirstname === 'Enter your Firstname' || registrationFirstname === ''
      || 
      registrationLastname === 'Enter your Lastname' || registrationLastname === ''
      ) {
        setErrorMessage({ message: 'Registration Failed: Please enter valid credentials' });
        // setRegistrationStatus("Failed");
        setIsLoading(false);
      
        //alert("");
        return;
      }
  
      //alert("login user: " + emailAddress + " " + firstname + " " + lastname);
  
      try {
        const requestData = {   
          firstname: registrationFirstname,  
          lastname: registrationLastname,  
          email: registrationEmailAddress,  
          password: "password"
        };
  
        // alert(JSON.stringify(requestData, null, 2));
      
        const response = await axios.post(process.env.REACT_APP_API_SERVER_URL + '/response/vh-register-user.php', requestData, {
          headers: {
              // 'Content-Type': 'multipart/form-data',
              'Content-Type': 'application/json',
  
          },
        });
      
        setIsLoading(false);
        // alert(JSON.stringify(response.data, null, 2));
          // return;
      
        if (response.data.status) {
  
          
  
          // If registration is successful
          setErrorMessage({ message: '' });
  
          //handleEmailAddress(emailAddress);
          
          // navigate('/confirm-email/' + emailAddress);
          //navigate('/confirm-email');
  
          setLoginEmailAddress(registrationEmailAddress);
          setLoginPassword('');
  
          setRegistrationFirstname('');
          setRegistrationLastname('');
          setRegistrationEmailAddress('');
  
          
  
          // alert(response.data.message + "\n\n Please check your mail for a link to reset your password");
          
          openNotificationModal(true, "Registration", response.data.message + "\n\n Please check your mail for a link to reset your password");
          
          toggleAccountForSignIn();
        } else {
          // If there are errors in the response
          const errors = response.data.errors.map(error => error.msg);
          const errorMessage = errors.join(', ');
          setErrorMessage({ message: errorMessage });
          // alert("Registration Failed");
  
          openNotificationModal(false, "Registration Error", "Registration Failed");
        }
      } catch (error) {
        setIsLoading(false);
      
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          setErrorMessage({ message: errorMessage });
        } else if (error.response && error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
          const errorMessages = errors.map(error => error.msg);
          const errorMessage = errorMessages.join(', '); // Join all error messages
          setErrorMessage({ message: errorMessage });
        } else {
          setErrorMessage({ message: 'Registration failed. Please check your credentials and try again.' });
        }
      }
    };

  



  return (
    <div className="bg-white shadow-lg px-4" style={{ height: '80px' }}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="block h-12 w-auto max-w-none "
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

          <div
            className="bg-theme flex items-center justify-center"
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







  {/* {isAccountOpen && ( */}
<SlideInAccount 
  initial={{ x: '100%' }}
  animate={{ x: isAccountOpen ? 0 : '100%' }}
  transition={{ duration: 0.2 }} 
  // exit={{ x: '100%', transition: { type: 'spring', damping: 15, stiffness: 20 } }} // Define exit animation with spring
  // variants={accountItemVariants}
>
  <AccountContent>
    <AccountContentInner>
      <div className='fixed top-0 bg-theme h-8 w-full z-50'></div>

      <div className='mx-2 h-full'>      
        <motion.span
          variants={accountItemVariants}
          initial="hidden"
          animate={isAccountOpen ? "visible" : "hidden"}
          className="text-gray-900 text-sm cursor-pointer block "
          onClick={() => { }}
        >
          <div style={{ maxHeight: '100%', overflowY: 'hidden' }} >
            
            <div className='grid grid-cols-12 gap-4 my-8' style={{ height: '70vh' }}>

              {isSignUpOpen ? 
                <div className='col-span-12 px-2 h-full' style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  <div className='flex justify-between items-center ml-4'>
                    <motion.span
                      variants={accountItemVariants}
                      initial="hidden"
                      animate={isAccountOpen ? "visible" : "hidden"}
                      className="text-theme text-sm font-bold cursor-pointer block my-4"
                    >
                      Create An Account
                    </motion.span>
                    <ArrowRightAltIcon 
                      onClick={toggleAccount} 
                      className="block h-8 w-auto my-4 mr-4"
                      style={{ cursor: 'pointer', width: isHoverCreateAccount ? '32px' : '44px', transition: 'width 0.3s ease' }} 
                      onMouseEnter={handleHoverCreateAccount}
                      onMouseLeave={handleLeaveCreateAccount}
                    />
                  </div>

                  <hr style={{ borderColor: '#888888' }} className='ml-4'/>

                  <div className="m-2 mb-10" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="mb-8">
                      <div className=" "/>
                      <div className=" mx-4 mt-4" >
                        <div className="justify-center">
                        
                            <div className='flex flex-col sm:flex-row relative my-2 '>
                                <input 
                                type='text' name='user_firstname' inputMode="text" autoComplete='given-name'
                                placeholder='Enter your Firstname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full mr-1 bg-white'
                                value={registrationFirstname}
                                onChange={(e) => setRegistrationFirstname(e.target.value)}
                                style={{  }} 
                                />
                                
                                <input 
                                type='text'  name='user_lastname' inputMode="text" autoComplete='given-name'
                                placeholder='Enter your Lastname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full md:ml-2 mt-4 md:mt-0 bg-white'
                                value={registrationLastname}
                                onChange={(e) => setRegistrationLastname(e.target.value)}
                                style={{  }} 
                                />
                             </div>

                             <div className='flex flex-col sm:flex-row relative  '>
                                <input 
                                type='email'  name='user_email' inputMode="text" autoComplete='given-name'
                                placeholder='Enter your Email' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full my-2 bg-white'
                                value={registrationEmailAddress}
                                onChange={(e) => setRegistrationEmailAddress(e.target.value)}
                                style={{  }} 
                                />
                             </div>

                             <div className='flex flex-col sm:flex-row relative my-2 '>
                                <input 
                                type='text' name='user_password' inputMode="text" autoComplete='given-name'
                                placeholder='Enter a Password' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full mr-1 bg-white'
                                value={registrationPassword}
                                onChange={(e) => setRegistrationPassword(e.target.value)}
                                style={{  }} 
                                />
                                
                                <input 
                                type='text'  name='user_lastname' inputMode="text" autoComplete='given-name'
                                placeholder='Enter Confirm Passowrd' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full md:ml-2 mt-4 md:mt-0 bg-white'
                                value={registrationConfirmPassword}
                                onChange={(e) => setRegistrationConfirmPassword(e.target.value)}
                                style={{  }} 
                                />
                             </div>
                             

                          <div className='my-2 text-sm' style={{ color: '#c2572b' }}>{errorMessage.message}</div>

                          
                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          onClick={(e) => {if (!isLoading) registerUser(e)}} 
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Register'}
                            </div>
                          </div>

                          <div className='mt-4'>
                            <div className='mt-4 flex justify-center'>                                          
                              <div className="mt-2 text-sm  text-theme py-2"
                              onClick={() => toggleAccountForSignIn()}>
                                <p>Already have an account? <strong>Log in here</strong></p>
                              </div>
                            </div>
                          </div>
                          

                        </div>                                    
                      </div>
                    </div>
                  </div>
                </div> 
                : 
                <div className='col-span-12 px-2 h-full' style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  <div className='flex justify-between items-center ml-4'>
                    <motion.span
                      variants={accountItemVariants}
                      initial="hidden"
                      animate={isAccountOpen ? "visible" : "hidden"}
                      className="text-gray-900 text-sm font-bold cursor-pointer block my-4"
                    >
                      Sign In
                    </motion.span>
                    <ArrowRightAltIcon 
                      onClick={toggleAccount} 
                      className="block h-8 w-auto my-4 mr-4"
                      style={{ cursor: 'pointer', width: isHoverSignIn ? '32px' : '44px', transition: 'width 0.3s ease' }} 
                      onMouseEnter={handleHoverSignIn}
                      onMouseLeave={handleLeaveSignIn}
                    />
                  </div>

                  <hr style={{ borderColor: '#888888' }} className='ml-4'/>

                  <div className="m-2 mb-10" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <div className="mb-8">
                      <div className=" "/>
                      <div className=" mx-4 mt-4">
                        <div className="justify-center">
                          
                          <div className='flex flex-col sm:flex-row relative my-2 '>
                                <input 
                                type='text' name='user_email' inputMode="text" autoComplete='given-name'
                                placeholder='Enter your Email' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full  bg-white'
                                value={loginEmailAddress}
                                onChange={(e) => setLoginEmailAddress(e.target.value)}
                                style={{  }} 
                                />
                             </div>

                             <div className='flex flex-col sm:flex-row relative  '>
                                <input 
                                type={passwordVisible ? 'text' : 'password'} name='user_password' inputMode="text" autoComplete='given-name'
                                placeholder='Enter your Password' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full my-2 bg-white'
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                style={{  }} 
                                />
                                
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 mt-1 mr-2">
                                    <div tabIndex="-1" onClick={() => setPasswordVisible(!passwordVisible)}>
                                        {passwordVisible ? <VisibilityOff className='p-1'/> : <Visibility className='p-1'/>}
                                    </div>
                              </div>
                             </div>

                             <div className='flex flex-col sm:flex-row relative my-2 invisible'>
                                <input 
                                type='text' name='' inputMode="text" autoComplete='given-name'
                                placeholder='' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full  bg-white'                                
                                style={{  }} 
                                />
                             </div>

                          

                          <div className='my-2 text-sm' style={{ color: '#c2572b' }}>{errorMessage.message}</div>


                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          onClick={(e) => {if (!isLoading) loginUser(e)}} 
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Login'}
                            </div>
                          </div>

                          <div className='mt-4'>
                            <div className='mt-4 flex justify-center'>                                            
                              <div className="mt-2 text-sm  text-theme py-2"
                              onClick={() => toggleAccountForSignUp()}>
                                <p>Don't have an account? <strong>Register here</strong></p>
                              </div>
                            </div>
                          </div>


                        </div>                                    
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </motion.span>
      </div>
    </AccountContentInner>
  </AccountContent>
</SlideInAccount>
{/* )} */}
  
    </div>
  );
}
