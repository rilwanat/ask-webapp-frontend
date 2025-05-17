import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation  } from 'react-router-dom';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import askLogo from '../assets/images/ask-logo.png';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import Contact from './widgets/Contact';
import AccountOptions from './widgets/AccountOptions';
// import LatestNews from './widgets/LatestNews';

import WidgetVideo from './widgets/WidgetVideo';
import DonateWidget from './widgets/DonateWidget';


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//
import axiosInstance from '../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../auth/authUtils'; // Import getCookie function
//

import styled from '@emotion/styled';

import { useGoogleLogin, GoogleLogin, googleLogout } from '@react-oauth/google';
import AppleSignin from 'react-apple-signin-auth';

import { ClipLoader } from 'react-spinners'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import NotificationModal from './modals/NotificationModal';

import googleIcon from './../assets/icons/google-icon.png';
import appleIcon from './../assets/icons/apple-icon.png';




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





export default function LoginPage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails
 }) {
    const navigate = useNavigate();
  //notification modal
      const [notificationType, setNotificationType] = useState(false);
      const [notificationTitle, setNotificationTitle] = useState("");
      const [notificationMessage, setNotificationMessage] = useState("");
      const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
      const openNotificationModal = (type, title, message) => {
        setNotificationType(type);
        setNotificationTitle(title);
        setNotificationMessage(message);
    
        setIsNotificationModalOpen(true);
      };
      const closeNotificationModal = () => {
        setIsNotificationModalOpen(false);
      };
      //notification modal

    const [menuWidthSignin, setMenuWidthSignin] = useState(0);
    const [menuWidthRegister, setMenuWidthRegister] = useState(0);

    
    const [isHoverCreateAccount, setIsHoverCreateAccount] = useState(false);
    const handleHoverCreateAccount = () => { setIsHoverCreateAccount(true); };
    const handleLeaveCreateAccount = () => { setIsHoverCreateAccount(false); };
    
    const [isHoverSignIn, setIsHoverSignIn] = useState(false);
    const handleHoverSignIn = () => { setIsHoverSignIn(true); };
    const handleLeaveSignIn = () => { setIsHoverSignIn(false); };

    // const [isAccountOpen, setIsAccountOpen] = useState(false);
    // const toggleAccount = () => {
    //   setIsAccountOpen(!isAccountOpen);
    // };
  
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const toggleAccountForSignUp = () => {
      setRegistrationPassword('');
      setRegistrationConfirmPassword('');

      setErrorMessage({ message: '' });
      setIsSignUpOpen(!isSignUpOpen);
    }  
  
    const toggleAccountForSignIn = () => {
      setLoginPassword('');

      setErrorMessage({ message: '' });
      setIsSignUpOpen(false);
    }
  
  
    const [isToggleProfileMenuOpen, setIsToggleProfileMenuOpen] = useState(false);
    const toggleProfileMenu = () => {
      setIsToggleProfileMenuOpen(!isToggleProfileMenuOpen);
    };
  
  
    const gotoUserProfile = () => {
      navigate('/user-dashboard');
    }




    const isValidNumber = (number) => {
      const numberPattern = /^\d+$/;
      return numberPattern.test(number);
    };
  const isValidateNigerianNumber = (ngPhoneNumber) => {
      const nigerianPhonePattern = /^\+234(70|80|81|90|91)\d{8}$/;
      return nigerianPhonePattern.test(ngPhoneNumber);
    };
  const isValidEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
      return password.length >= 8;
    };
    
    const passwordsMatch = (password, confirmPassword) => {
      return password === confirmPassword;
    };

    const [isLoading, setIsLoading] = useState(false);

    const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
    const [isGoogleSignUpLoading, setIsGoogleSignUpLoading] = useState(false);
    
    const [isAppleLoginLoading, setIsAppleLoginLoading] = useState(false);
    const [isAppleSignUpLoading, setIsAppleSignUpLoading] = useState(false);

     
     


    const [loginEmailAddress, setLoginEmailAddress] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    // const [registrationStatus, setRegistrationStatus] = useState('');
  
    const [passwordVisible, setPasswordVisible] = useState(false);

    const loginUser = async (e) => {

      // // alert("here");
      // if (loginEmailAddress == 'adm' && loginPassword == 'adm'
      //   ) {
      //     // alert("here");
      //     navigate('/admin-home');
      //     return;
      //   }


        if (!isValidEmail(loginEmailAddress)) {
          // openNotificationModal(false, currentPageName + " Form Error", 'Invalid email address');
          // alert("Please, enter a valid email.");
          // openNotificationModal(false, "A.S.K Foundation", "Please, enter a valid email.");
          

          setErrorMessage({ message: 'Please, enter a valid email.' });
          return;
      }




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
      
        // alert("login user: " + loginEmailAddress + " " + loginPassword);
        try {
    
          const requestData = {   
            email: loginEmailAddress.trim().toLowerCase(),  
            password: loginPassword.trim()
          };
    
          const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_LOGIN, requestData, {
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
      
            setCookie('ask-user-token', token, expirationDays);
            setCookie('ask-user-details', JSON.stringify(response.data.userData));

            // refreshUserDetails();
    
    //toggleAccount();
            // alert("Login Successful: " + response.data.message);
            openNotificationModal(true, "Login", response.data.message);
            

            if (response.data.userData.email_verified !== "Yes") {
              // navigate('/user-dashboard');
              window.location.href = '/user-dashboard';
            } else {
              // navigate('/');
              window.location.href = '/';
            }
            
            // gotoUserProfile();
          } else {
            const errors = response.data.errors.map(error => error.msg);
            setErrorMessage({ message: response.data.message, errors });
            //alert("Failed1");
          }
        } catch (error) {
          setIsLoading(false);

          // alert(error);
        
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
    
      // const [registrationFirstname, setRegistrationFirstname] = useState('');
      // const [registrationLastname, setRegistrationLastname] = useState('');
      const [registrationEmailAddress, setRegistrationEmailAddress] = useState('');
      const [registrationPassword, setRegistrationPassword] = useState('');
      const [registrationConfirmPassword, setRegistrationConfirmPassword] = useState('');
    
      const registerUser = async (e) => {
        
        
        e.preventDefault();
        setErrorMessage({ message: '' });
        //alert("");
    
        
    
        if (registrationEmailAddress === 'Enter your email' || registrationEmailAddress === '' 
        || 
        registrationPassword === '' || registrationConfirmPassword === ''
        ) {
          setErrorMessage({ message: 'Registration Failed: Please enter valid credentials' });
          // setRegistrationStatus("Failed");
          setIsLoading(false);
        
          //alert("");
          return;
        }


        
      if (!isValidPassword(registrationPassword)) {
        setErrorMessage({ message: 'Password must be at least 8 characters.' });
        return;
      }

      if (!passwordsMatch(registrationPassword, registrationConfirmPassword)) {
        setErrorMessage({ message: 'Passwords must match.' });
        return;
      }



    
        //alert("login user: " + emailAddress + " " + firstname + " " + lastname);
        setIsLoading(true);

        try {
          const requestData = {   
            email: registrationEmailAddress.trim(),  
            password: registrationPassword.trim(),
            confirmPassword: registrationConfirmPassword.trim()
          };
    
          // alert(JSON.stringify(requestData, null, 2));
        
          const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_REGISTER, requestData, {
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
    
            // //handleEmailAddress(emailAddress);
            
            // // navigate('/confirm-email/' + emailAddress);
            // //navigate('/confirm-email');
    
            // setLoginEmailAddress(registrationEmailAddress);
            // setLoginPassword('');
    
            // setRegistrationFirstname('');
            // setRegistrationLastname('');
            setRegistrationEmailAddress('');
            setRegistrationPassword(''); 
            setRegistrationConfirmPassword('');
            
    
            //toggleAccount();
            // alert(response.data.message + "\n\n Please check your mail for a link to reset your password");
            
            openNotificationModal(true, "Registration", response.data.message + "\n\n Please check your mail for a verification code.");
            

            // toggleAccountForSignIn();
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

      


      const handleForgotPassword = async (e) => {

        // // alert("here");
        // if (loginEmailAddress == 'adm' && loginPassword == 'adm'
        //   ) {
        //     // alert("here");
        //     navigate('/admin-home');
        //     return;
        //   }
  
  
          if (!isValidEmail(loginEmailAddress)) {
            // openNotificationModal(false, currentPageName + " Form Error", 'Invalid email address');
            // alert("Please, enter a valid email.");
            // openNotificationModal(false, "A.S.K Foundation", "Please, enter a valid email.");
            
  
            setErrorMessage({ message: 'Please, enter a valid email.' });
            return;
        }
  
  
  
  
          e.preventDefault();
          setErrorMessage({ message: '' });
        
          setIsLoading(true);
        
          // setLoginEmailAddress();
          // setLoginPassword();
        
          if (loginEmailAddress === 'Enter your email' || loginEmailAddress === '' 
          ) {
            setErrorMessage({ message: 'Password Reset Failed: Please enter a valid email' });
            // setRegistrationStatus("Failed");
            setIsLoading(false);
            return;
          }
        
          // alert("login user: " + loginEmailAddress + " " + loginPassword);
          try {
      
            const requestData = {   
              email: loginEmailAddress,
              baseName: `${window.location.origin}/`
            };
      
            const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_FORGOT_PASSWORD, requestData, {
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
      
      
      
      
              //toggleAccount();

              // alert("Login Successful: " + response.data.message);
              openNotificationModal(true, "A.S.K Password Reset", response.data.message);
              
              
            } else {
              const errors = response.data.errors.map(error => error.msg);
              setErrorMessage({ message: response.data.message, errors });
              //alert("Failed1");
            }
          } catch (error) {
            setIsLoading(false);
  
            // alert(error);
          
            if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            setErrorMessage({ message: errorMessage });
          } else if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessages = errors.map(error => error.msg);
            const errorMessage = errorMessages.join(', '); // Join all error messages
            setErrorMessage({ message: errorMessage });
          } else {
            setErrorMessage({ message: 'A.S.K Password Reset failed. Please check your credentials and try again.' });
          }
        }
        };





        //
        const loginUserGoogleApple = async (email) => {
   
    
    
            // e.preventDefault();
            setErrorMessage({ message: '' });
          
            setIsLoading(true);
          
          
            // alert("login user: " + loginEmailAddress + " " + loginPassword);
            try {
        
              const requestData = {   
                email: email
              };
        
              const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_LOGIN_GOOGLE_APPLE, requestData, {
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
          
                setCookie('ask-user-token', token, expirationDays);
                setCookie('ask-user-details', JSON.stringify(response.data.userData));
    
                // refreshUserDetails();
        
        //toggleAccount();
                // alert("Login Successful: " + response.data.message);
                openNotificationModal(true, "Login", response.data.message);
                
    
                if (response.data.userData.email_verified !== "Yes") {
                  // navigate('/user-dashboard');
                  window.location.href = '/user-dashboard';
                } else {
                  // navigate('/');
                  window.location.href = '/';
                }
                
                // gotoUserProfile();
              } else {
                const errors = response.data.errors.map(error => error.msg);
                setErrorMessage({ message: response.data.message, errors });
                //alert("Failed1");
              }
            } catch (error) {
              setIsLoading(false);
    
              // alert(error);
            
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

          const registerUserGoogleApple = async (email) => {
        
        
            
            setErrorMessage({ message: '' });
            //alert("");
        
            
    
    
    
        
            //alert("login user: " + emailAddress + " " + firstname + " " + lastname);
            setIsLoading(true);
    
            try {
              const requestData = {   
                email: email
                // password: registrationPassword.trim(),
                // confirmPassword: registrationConfirmPassword.trim()
              };
        
              // alert(JSON.stringify(requestData, null, 2));
            
              const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_REGISTER_GOOGLE_APPLE, requestData, {
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
        
                // //handleEmailAddress(emailAddress);
                
                // // navigate('/confirm-email/' + emailAddress);
                // //navigate('/confirm-email');
        
                // setLoginEmailAddress(registrationEmailAddress);
                // setLoginPassword('');
        
                // setRegistrationFirstname('');
                // setRegistrationLastname('');
                // setRegistrationEmailAddress('');
                // setRegistrationPassword(''); 
                // setRegistrationConfirmPassword('');
                
        
                //toggleAccount();
                // alert(response.data.message + "\n\n Please check your mail for a link to reset your password");
                
                openNotificationModal(true, "Registration", response.data.message + "\n\n Please check your mail for a verification code.");
                
    
                // toggleAccountForSignIn();
              } else {
                
                // If there are errors in the response
                const errors = response.data.errors.map(error => error.msg);
                const errorMessage = errors.join(', ');
                setErrorMessage({ message: errorMessage });
                // alert("Registration Failed");
        
                alert(errorMessage);
                
                openNotificationModal(false, "Registration Error", "Registration Failed");
              }
            } catch (error) {
              setIsLoading(false);

              // alert(error);
            
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

          
          const registerUserWithGoogle = useGoogleLogin({
            onSuccess: (credentialResponse) => {
              const decodedCredential = jwtDecode(credentialResponse.credential);
              registerUserGoogleApple(decodedCredential.email); // your logic
            },
            onError: () => {
              console.log('Google Signup Failed');
            },
            prompt: 'select_account',
            useOneTap: false,
          });

        const loginUserApple = async (e) => {
          e.preventDefault();
          if (isAppleLoginLoading) return false;
          setIsAppleLoginLoading(true);
          setIsAppleLoginLoading(false);
        
        
        };
        //





    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    

    const isAccountOpen = true;

    


    return (
        <div className="">
            <GuestHeader isMobile={isMobile}
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            {/* <Hero/> */}
            <HeaderParallax 
                // imageUrl={askLogo}
                title={"Login"}
                subtitle={""}
            />


<div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">





        <div className="px-0 md:px-4 lg:px-16 xl:px-24 2xl:px-80 py-2">






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
                          {/* <ArrowRightAltIcon 
                          //   onClick={toggleAccount} 
                            className="block h-8 w-auto my-4 mr-4"
                            style={{ cursor: 'pointer', width: isHoverCreateAccount ? '32px' : '44px', transition: 'width 0.3s ease' }} 
                            onMouseEnter={handleHoverCreateAccount}
                            onMouseLeave={handleLeaveCreateAccount}
                          /> */}
                        </div>
      
                        <hr style={{ borderColor: '#888888' }} className='ml-4'/>
      
                        <div className="m-2 mb-10" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                          <div className="mb-8">
                            <div className=" "/>
                            <div className=" mx-4 mt-4" >
                              <div className="justify-center">
                              
                                  {/* <div className='flex flex-col sm:flex-row relative my-2 '>
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
                                   </div> */}
      
                                   <div className='flex flex-col sm:flex-row relative my-2 '>
                                      <input 
                                      type='email'  name='user_email' inputMode="text" autoComplete='given-name'
                                      placeholder='Enter your Email' 
                                      className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                      value={registrationEmailAddress}
                                      onChange={(e) => setRegistrationEmailAddress(e.target.value)}
                                      style={{  }} 
                                      />
                                   </div>
      
                                  <div className='flex flex-col sm:flex-row  mt-2'>
                                   <div className='flex flex-col sm:flex-row relative sm:w-1/2 w-full'>
                                      <input 
                                      type={passwordVisible ? 'text' : 'password'} name='user_password' inputMode="text" autoComplete='given-name'
                                      placeholder='Enter a Password' 
                                      className='border border-gray-300 rounded-sm py-2 px-2 w-full md:mr-2 mt-0 bg-white'
                                      value={registrationPassword}
                                      onChange={(e) => setRegistrationPassword(e.target.value)}
                                      style={{  }} 
                                      />
                                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 mt-1 mr-2">
                                          <div tabIndex="-1" onClick={() => setPasswordVisible(!passwordVisible)}>
                                              {passwordVisible ? <VisibilityOff className='p-1'/> : <Visibility className='p-1'/>}
                                          </div>
                                    </div>
                                    </div>
                                      
                                    <div className='flex flex-col sm:flex-row relative sm:w-1/2 w-full '>
                                      <input 
                                      type={passwordVisible ? 'text' : 'password'}  name='user_confitm_password' inputMode="text" autoComplete='given-name'
                                      placeholder='Enter Confirm Password' 
                                      className='border border-gray-300 rounded-sm py-2 px-2 w-full md:ml-2 mt-2 md:mt-0 bg-white'
                                      value={registrationConfirmPassword}
                                      onChange={(e) => setRegistrationConfirmPassword(e.target.value)}
                                      style={{  }} 
                                      />
                                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 mt-1 mr-2">
                                          <div tabIndex="-1" onClick={() => setPasswordVisible(!passwordVisible)}>
                                              {passwordVisible ? <VisibilityOff className='p-1'/> : <Visibility className='p-1'/>}
                                          </div>
                                      </div>
                                    </div>
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
      
      
                                <div className='flex justify-between items-center flex-col md:flex-row '>
                                  
                                {/* <div  
                                onClick={() => {if (!isGoogleSignUpLoading) registerUserWithGoogle()}} 
                                style={{ borderWidth: '0px', width: '100%' }} 
                                className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer md:mr-2 bg-theme text-white  hover:text-softTheme'>
                                  <div className='flex items-center '>
                                  <img src={googleIcon}  className='w-5 h-5 mr-2 mt-0.5'/>
                                  {isGoogleSignUpLoading ? 'Please wait..' : 'Register with Google'}
                                </div>
                                </div> */}
                                <div  
                                // onClick={(e) => {if (!isGoogleLoginLoading) loginUserGoogle(e)}} 
                                style={{ borderWidth: '0px', width: '100%' }} //px-4 py-2  bg-theme
                                className='flex mt-4 text-center justify-center  rounded-sm 
                                
                                text-sm cursor-pointer md:mr-2  text-white  hover:text-softTheme'>
                                  <div className='flex items-center '>
                                  {/* <img src={googleIcon}  className='w-5 h-5 mr-2 mt-0.5'/>
                                  {isGoogleSignUpLoading ? 'Please wait..' : 'Register with Google'} */}
       <GoogleLogin 
                                onSuccess={(credentialResponse) => {
                                  // console.log(credentialResponse);
                                  const decodedCredential = jwtDecode(credentialResponse.credential);
                                  // console.log(decodedCredential.email);
                                  registerUserGoogleApple(decodedCredential.email);
      
                                }} 
                                onError={() => {
      
                                }}
                                useOneTap={false} // optional: disable One Tap auto login
                                prompt="select_account"
        />
                                  </div>
                                  </div>
      
                                  {/* <div  
                                // onClick={(e) => {if (!isAppleSignUpLoading) registerUser(e)}} 
                                style={{ borderWidth: '0px', width: '100%' }} 
                                className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer md:ml-2 bg-theme text-white  hover:text-softTheme'>
                                  <div className='flex items-center '>
                                  <img src={appleIcon}  className='w-5 h-5 mr-2 mt-0.5'/>
                                  {isAppleSignUpLoading ? 'Please wait..' : 'Register with Apple'}
                                  </div>
                                </div> */}
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
                          {/* <ArrowRightAltIcon 
                          //   onClick={toggleAccount} 
                            className="block h-8 w-auto my-4 mr-4"
                            style={{ cursor: 'pointer', width: isHoverSignIn ? '32px' : '44px', transition: 'width 0.3s ease' }} 
                            onMouseEnter={handleHoverSignIn}
                            onMouseLeave={handleLeaveSignIn}
                          /> */}
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
                                      className='border border-gray-300 rounded-sm py-2 px-2 w-full mb-0 bg-white'
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
      
                                {/* Remember Me & Forgot Password Section */}
              <div className='flex justify-between items-center my-3 text-sm'>
                <label className='flex items-center cursor-pointer'>
                  <input type='checkbox' className='mr-2' 
                  // onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  Remember Me
                </label>
                <span 
                  className='text-theme cursor-pointer hover:underline' 
                  onClick={(e) => {if (!isLoading) handleForgotPassword(e)}}
                >
                  Forgot Password?
                </span>
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
      
                                <div className='flex justify-between items-center flex-col md:flex-row '>
                                  
      
                                  
                                <div  
                                // onClick={(e) => {if (!isGoogleLoginLoading) loginUserGoogle(e)}} 
                                style={{ borderWidth: '0px', width: '100%' }} //px-4 py-2  bg-theme
                                className='flex mt-4 text-center justify-center  rounded-sm 
                                
                                text-sm cursor-pointer md:mr-2  text-white  hover:text-softTheme'>
                                  <div className='flex items-center '>
                                  {/* <img src={googleIcon}  className='w-5 h-5 mr-2 mt-0.5'/>
                                  {isGoogleLoginLoading ? 'Please wait..' : 'Login with Google'} */}
       <GoogleLogin 
                                onSuccess={(credentialResponse) => {
                                  // console.log(credentialResponse);
                                  const decodedCredential = jwtDecode(credentialResponse.credential);
                                  // console.log(decodedCredential.email);
                                  loginUserGoogleApple(decodedCredential.email);
      
                                }} 
                                onError={() => {
      
                                }}
                                useOneTap={false} // optional: disable One Tap auto login
                                prompt="select_account"
        />
                                  </div>
                                  </div>
      
                                  
                                  {/* <div  
                                onClick={(e) => {if (!isAppleLoginLoading) loginUserApple(e)}} 
                                style={{ borderWidth: '0px', width: '100%' }} 
                                className='flex mt-4 text-center justify-center rounded-sm px-4 py-2  text-sm cursor-pointer md:ml-2 bg-theme text-white  hover:text-softTheme'>
                                  <div className='flex items-center'>
                                  <img src={appleIcon} className='w-5 h-5 mr-2 mt-0.5' />
                                  {isAppleLoginLoading ? 'Please wait..' : 'Login with Apple'}
      <AppleSignin
        authOptions={{
          clientId: import.meta.env.REACT_APP_APPLE_SERVICE_ID,
          scope: 'email',
          redirectURI: window.location.origin + '/auth/apple/callback',
          state: crypto.randomUUID(), // Secure random state
          usePopup: true
        }}
        onSuccess={(response) => {
          const decoded = jwtDecode(response.authorization.id_token);
          loginUserGoogleApple(
            decoded.email || `user_${decoded.sub.slice(0, 8)}@apple.com`
          );
        }}
        onError={() => {
          // Match your Google error handling
        }}
        render={(props) => (
          <div 
            onClick={props.onClick}
            className="flex items-center justify-center ..." 
          >
            <img src={appleIcon} className="w-5 h-5 mr-2" />
            Sign in with Apple
          </div>
        )}
      />
                                  </div>
                                </div> */}
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






        </div>
        </div>
        </div>
        </div>



            




                  <NotificationModal
                          isOpen={isNotificationModalOpen}
                          onRequestClose={closeNotificationModal}
                          notificationType={notificationType}
                          notificationTitle={notificationTitle}
                          notificationMessage={notificationMessage}
                        />



            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
