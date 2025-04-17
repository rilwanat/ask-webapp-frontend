import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import askLogo from '../../../assets/images/ask-logo.png';


import XIcon from '../../../assets/images/socials/x.png';
import FacebookIcon from '../../../assets/images/socials/facebook.png';
import InstagramIcon from '../../../assets/images/socials/instagram.png';
import YouTubeIcon from '../../../assets/images/socials/youtube.png';
import TelegramIcon from '../../../assets/images/socials/telegram.png';
import WhatsAppIcon from '../../../assets/images/socials/whatsapp.png';
import TikTokIcon from '../../../assets/images/socials/tiktok.png';


// import XIcon from '@mui/icons-material/X';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import TelegramIcon from '@mui/icons-material/Telegram';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';



import appstore from '../../../assets/icons/app-store.png';
import googleplay from '../../../assets/icons/google-play.png';

// import axios from 'axios';
// import axiosInstance from '../../../axiosConfig';

import NotificationModal from '../../modals/NotificationModal';

//
import axiosInstance from '../../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAdminAuthenticated } from '../../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../../auth/authUtils'; // Import getCookie function
//

function AdminFooter({ 
  // gotoPage
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


    useEffect(() => {}, []);



    return (
        <div className="flex flex-col bg-theme">
            <div className="flex justify-center h-auto px-8 sm:px-16 md:px-32 py-4 pb-2 items-center">
            <div
                className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme text-white"
                onClick={() => {
                  
                  
                  navigate('/manage-admins');
                }}
                >
                  <p 
                  className="text-sm" 
                  style={{ fontWeight: '600' }} 
                  >
                    Manage Admins
                  </p>
              </div>

              <div
                className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme text-red-500"
                onClick={() => {
                  
                  deleteCookie("admin");
                  window.location.href = '/';
                  // navigate('/');
                }}
                >
                  <p 
                  className="text-sm" 
                  style={{ fontWeight: '600' }} 
                  >
                    Logout
                  </p>
              </div>

            </div>


            


            <div className="mt-auto mb-10">
                <div className="bottom-0 w-full text-center">
                    <p className="text-xs py-2 text-white">
                        &copy; 2025 ASK Foundation. All rights reserved.
                    </p>
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
}

export default AdminFooter;
