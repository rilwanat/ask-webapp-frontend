import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/images/ask-logo.png';

import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';

import PsychologyIcon from '@mui/icons-material/Psychology';


import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ElderlyIcon from '@mui/icons-material/Elderly';

import NotificationModal from '../modals/NotificationModal';

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

const WidgetForEmailVerification = ({ userDetails, refreshUserDetails }) => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };


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


  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
      const [verificationCode, setVerificationCode] = useState('');
      

      // Function to validate Fullname as two words separated by space with no numbers or special characters
const isValidFullname = (fullname) => {
    const fullnamePattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    return fullnamePattern.test(fullname);
  };
  
  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Function to validate Nigerian phone number format with +234
  const isValidateNigerianNumber = (ngPhoneNumber) => {
    const nigerianPhonePattern = /^\+234(70|80|81|90|91)\d{8}$/;
    return nigerianPhonePattern.test(ngPhoneNumber);
  };
  // Function to validate if input contains exactly 11 digits
const is11DigitNumber = (input) => {
    return /^\d{11}$/.test(input);
  };
  
  // Function to validate if input contains between 10-15 digits
  const isNumericWithLength = (input, min = 10, max = 15) => {
    const pattern = new RegExp(`^\\d{${min},${max}}$`);
    return pattern.test(input);
  };



  const resendVerificationCode = async (e) => {

    e.preventDefault();
    setErrorMessage({ message: '' });
  
    setIsLoading(true);
    
    try {

      const requestData = {   
       email: userDetails.email_address
      };

     //  alert("resendVerificationCode: " + JSON.stringify(requestData, null, 2));

     // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_RESEND_VERFICATION_CODE);
      const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_RESEND_VERFICATION_CODE, requestData, {
        headers: {
              // 'Content-Type': 'multipart/form-data',
              'Content-Type': 'application/json',
          },
      });

      setIsLoading(false);
     //  alert("resendVerificationCode: " + JSON.stringify(response.data, null, 2));
// return;

      if (response.data.status) {
       
       


        // If login is successful
        setErrorMessage({ message: '' });
        

        setVerificationCode('');


       //  alert("Your kyc is pending approval. You will be notified once it is approved.");
        openNotificationModal(true, "ASK: Resend Email Verification", response.data.message);
        //  setIsNotificationModalOpen(true);


         

        
      } else {
        const errors = response.data.errors.map(error => error.msg);
        setErrorMessage({ message: response.data.message, errors });
        //alert("Failed1");
      }
    } catch (error) {
      setIsLoading(false);

     //  alert(error);
    
      if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      setErrorMessage({ message: errorMessage });

      openNotificationModal(false, "ASK: Resend Email Verification", errorMessage);
        //  setIsNotificationModalOpen(true);
    } else if (error.response && error.response.data && error.response.data.errors) {
      const { errors } = error.response.data;
      const errorMessages = errors.map(error => error.msg);
      const errorMessage = errorMessages.join(', '); // Join all error messages
      setErrorMessage({ message: errorMessage });

      openNotificationModal(false, "ASK: Resend Email Verification", errorMessage);
        //  setIsNotificationModalOpen(true);
    } else {
      setErrorMessage({ message: 'ASK: Resend Email Verification. Please check your data and try again.' });

      openNotificationModal(false, "ASK: Resend Email Verification", 'Please check your data and try again.');
        //  setIsNotificationModalOpen(true);
    }
  }
  }

    const CheckUserVerification  = async (e) => {
 
    
 
 
         e.preventDefault();
         setErrorMessage({ message: '' });

  //        // Basic input validation
  //   if (!verificationCode || verificationCode.length < 4) {
  //     setErrorMessage({ message: 'Please enter a valid verification code' });
  //     setIsLoading(false);
  //     return;
  // }
       
         setIsLoading(true);
       

         
         
         try {
     
           const requestData = {   
            email: userDetails.email_address,  
            verificationCode: verificationCode.trim()
           };

          //  alert("requestData: " + JSON.stringify(requestData, null, 2));
     
          // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_VERIFY_EMAIL_CODE);
           const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_VERIFY_EMAIL_CODE, requestData, {
             headers: {
                   // 'Content-Type': 'multipart/form-data',
                   'Content-Type': 'application/json',
               },
           });
     
           setIsLoading(false);
          //  alert("verify: " + JSON.stringify(response.data, null, 2));
     // return;
     
           if (response.data.status) {
            
            


             // If login is successful
             setErrorMessage({ message: '' });
             

             setVerificationCode('');

             setCookie('ask-user-details', JSON.stringify(response.data.userData));
             refreshUserDetails();

     
            //  alert("Your kyc is pending approval. You will be notified once it is approved.");
             openNotificationModal(true, "ASK Email Verification", response.data.message);
              
     

              

             
           } else {
             const errors = response.data.errors.map(error => error.msg);
             setErrorMessage({ message: response.data.message, errors });
             //alert("Failed1");
           }
         } catch (error) {
           setIsLoading(false);
 
          //  alert(error);
         
           if (error.response && error.response.data && error.response.data.message) {
           const errorMessage = error.response.data.message;
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "ASK Email Verification", errorMessage);
              
         } else if (error.response && error.response.data && error.response.data.errors) {
           const { errors } = error.response.data;
           const errorMessages = errors.map(error => error.msg);
           const errorMessage = errorMessages.join(', '); // Join all error messages
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "ASK Email Verification", errorMessage);
              
         } else {
           setErrorMessage({ message: 'ASK Email Verification. Please check your data and try again.' });

           openNotificationModal(false, "ASK Email Verification", 'ASK Email Verification. Please check your data and try again.');
              
         }
       }
       };

  return (
    <div className="w-full mt-24 sm:mt-20 ">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
        <div className="w-full p-4">



          <div className=""
            
            
            // style={{
            //   backgroundImage: `url(${background})`, 
            //   backgroundAttachment: 'fixed',
            //   backgroundSize: 'contain',
            //   backgroundPosition: 'center',
            // }}
            >

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.5 }}
className=" flex items-center justify-center "
>
<div className="mx-auto w-full md:w-1/3">

<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.2, duration: 0.5 }}
className="text-2xl font-bold text-theme mb-2"
>
<div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center ' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Complete Level 1 Verification (Email)</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
        </div> 

</motion.h1>

{/* <motion.div
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.4, duration: 0.5 }}
className="text-lg text-gray-600 mb-6"
>
<div className='mb-8 text-center' style={{fontSize: '16px',   }}>
A community-based charity initiative
</div>
</motion.div> */}










<div className="mb-12"
    // style={{
    // backgroundImage: `url(${background})`, 
    // backgroundAttachment: 'fixed',
    // backgroundSize: 'contain',
    // backgroundPosition: 'center',
    // }}
>
    <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and below
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }} // Smooth animation
        className="flex flex-col w-full h-full items-center justify-center mt-4"
    >
              
        
       

        <div className="m-2 w-full mb-10 bg-green-200 shadow-lg" style={{  }}>
                    <div className="mb-8">
                      <div className=" "/>
                      <div className=" mx-4 mt-4" >
                        <div className="justify-center">
                        

                        <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Email:</label>
                                <input 
                                type='text'  name='email' inputMode="text" autoComplete='email'
                                // placeholder='Enter your Fullname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={userDetails && userDetails.email_address} readOnly={true}
                                style={{  }} 
                                />
                             </div>

                        <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Verification Code:</label>
                             <div className="relative w-full">
                             <input 
                                type='text'  name='verification-code' inputMode="text" autoComplete='verification-code'
                                maxLength={10}
                                placeholder='Enter Verification Code' 
                                className='border border-gray-300 rounded-sm py-2 pl-2 pr-16 w-full bg-white'
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                style={{  }} 
                                />
                                {(
                                  <button
                                  type="button"
                                  onClick={(e) => {
                                    resendVerificationCode(e);
                                    }}
                                    className="absolute top-1/2 -translate-y-1/2 right-3 text-sm 
                                    text-green-500 hover:text-theme cursor-pointer bg-stone-200 px-2 py-1 rounded-sm"
                                    >
                                      resend
                                      </button>
                                  )}
                             </div>
                                
                             </div>



                             

                          <div className='my-2 text-sm' style={{ color: '#c2572b' }}>{errorMessage.message}</div>

                          
                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          onClick={(e) => {if (!isLoading) CheckUserVerification(e)}} 
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Update'}
                            </div>
                          </div>



                          

                        </div>                                    
                      </div>
                    </div>
                  </div>




    </motion.div>
</div>





</div>
</motion.div>



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
    </div>
  );
};

export default WidgetForEmailVerification;