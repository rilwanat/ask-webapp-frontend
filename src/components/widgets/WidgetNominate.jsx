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

    

  const handleNominate = () => {

    // alert("Nominate: " + "isAuthenticated: " + isAuthenticated());
    // alert("Nominate: " + JSON.stringify(userDetails, null, 2));


    if (isAuthenticated()) {
      //user is authenticated


      if (userDetails.email_verified == "Yes") {
        //user email_verified
        

        if (userDetails.is_cheat == "No") {
          //user is NOT cheat
          openNotificationModal(true, "Nominate: authenticated emailVerified isNOTCheat", "user is Authenticated, email is Verified, user is NOT Cheat");

          
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

  return (
    <div className='flex flex-col bg-orange rounded-lg p-2 px-8 justify-center items-center my-1 w-50 text-white cursor-pointer' 
    onClick={() => {
      handleNominate();
    }}>
      <div className='flex items-center'>
        <div className='text-white' style={{ fontWeight: '600', marginTop: '-1px' }}>Nominate:</div>
        <CheckIcon className='ml-2' />
      </div>

      
    </div>
  );
}

export default WidgetNominate;