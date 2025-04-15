import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/ask-logo.png';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import XIcon from '../../assets/images/socials/x.png';
import FacebookIcon from '../../assets/images/socials/facebook.png';
import InstagramIcon from '../../assets/images/socials/instagram.png';
import YouTubeIcon from '../../assets/images/socials/youtube.png';
import TelegramIcon from '../../assets/images/socials/telegram.png';
import WhatsAppIcon from '../../assets/images/socials/whatsapp.png';
import TikTokIcon from '../../assets/images/socials/tiktok.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import CheckIcon from '@mui/icons-material/Check';


//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

const WidgetNominate = ({ 
  helpToken, userDetails, 
  refreshUserDetails, 
  //itemName,
  
  openNotificationModal

 }) => {

    const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');

// alert(helpToken);
  const handleNominate = (e) => {

    // alert("Nominate: " + "isAuthenticated: " + isAuthenticated());
    // alert("Nominate: " + JSON.stringify(userDetails, null, 2));


    if (isAuthenticated()) {
      //user is authenticated


      if (userDetails.email_verified == "Yes") {
        //user email_verified
        

        if (userDetails.is_cheat == "No") {
          //user is NOT cheat
          // openNotificationModal(true, "Nominate: authenticated emailVerified isNOTCheat", "user is Authenticated, email is Verified, user is NOT Cheat");

          //hit endpoint to nominate

          // make further checks
          // log nominations
          createNomination(e);

          
        } else {
          openNotificationModal(false, "Nominate: isCheat", "isCheat");
        }

      } else {
        openNotificationModal(false, "Nominate: emailNOTVerified", "emailNOTVerified");
      }
    
    } else {
      openNotificationModal(false, "Nominate: NOT authenticated", "Please login to nominate");

    }
  }

        const createNomination = async (e) => {


          if (isLoading) {
            openNotificationModal(true, "Nomination", "Processing, please wait");
            return;
          }


          
          e.preventDefault();
          setErrorMessage({ message: '' });
          // alert("");
      
          
      
  
  
      
          //alert("login user: " + emailAddress + " " + firstname + " " + lastname);
          setIsLoading(true);
  
          try {
            const requestData = {   
              email: userDetails.email_address,  
              helpToken: helpToken
            };
      
            // alert(JSON.stringify(requestData, null, 2));
          
            const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_CREATE_NOMINATION, requestData, {
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
      
              
              openNotificationModal(true, "Nomination", response.data.message);
              
  
            } else {
              // If there are errors in the response
              const errors = response.data.errors.map(error => error.msg);
              const errorMessage = errors.join(', ');
              setErrorMessage({ message: errorMessage });
              // alert("Registration Failed");
      
              openNotificationModal(false, "Nomination Error", "Nomination Failed");
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
              setErrorMessage({ message: 'Nomination failed. Please check your credentials and try again.' });
            }
          }
        };

  return (
    <div className='flex flex-col bg-orange rounded-lg p-2 px-8 justify-center items-center my-1 w-50 text-white cursor-pointer' 
    onClick={(e) => {
      handleNominate(e);
    }}>
      <div className='flex items-center'>
        <div className='text-white' style={{ fontWeight: '600', marginTop: '-1px' }}>
        {isLoading ? 'Please wait..' : 'Nominate:'}
        </div>
        <CheckIcon className='ml-2' />
      </div>

      
    </div>
  );
}

export default WidgetNominate;