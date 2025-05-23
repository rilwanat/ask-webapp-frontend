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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';



import appstore from '../../../assets/icons/app-store.png';
import googleplay from '../../../assets/icons/google-play.png';

//
import axiosInstance from '../../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../../auth/authUtils'; // Import getCookie function
//

import NotificationModal from '../../modals/NotificationModal';

function GuestFooter({ gotoPage }) {

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



    const [email, setEmail] = useState("");
    const [isSubsLoading, setIsSubsLoading] = useState(false);
    const handleSubscribeToNewsletter = async () => {  
        
      if (isSubsLoading) {
        // alert('Please wait');
        openNotificationModal(false, "A.S.K Subscribe To Newsletter", "Please wait..");
        
        return;
      }

      // Validate email before proceeding
      if (!isValidEmail(email)) {
        // alert('Please enter a valid email address');
        openNotificationModal(false, "A.S.K Subscribe To Newsletter", "Please enter a valid email address");
        
        return;
      }



      setIsSubsLoading(true);
      try {
  
        const requestData = {
          email: email,
      };
      
      // alert(JSON.stringify(requestData));
      // var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_SUBSCRIBE_TO_NEWSLETTER;
      //  alert(endpoint);
      //  setIsSubsLoading(false);
      //  return;
      const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_SUBSCRIBE_TO_NEWSLETTER, requestData, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      
      
      setIsSubsLoading(false);
        // alert(JSON.stringify(response.data, null, 2));
  
        if (response.data.status) {
          setEmail("");

          // alert("dashboard-products " + JSON.stringify(response.data.itemsData, null, 2));
          // alert("" + response.data.message);
          openNotificationModal(true, "A.S.K Subscribe To Newsletter", response.data.message);
          

          // Store the retrieved data in state variables
  
          // setProductsData(response.data.itemsData);
        } else {
          // alert("error1: " + response.data.message);
          openNotificationModal(false, "A.S.K Subscribe To Newsletter", response.data.message);
          
        }
  
      } catch (error) {
        setIsSubsLoading(false);

        // alert(error);
      
        if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        // setErrorMessage({ message: errorMessage });

        openNotificationModal(false, "A.S.K Subscribe To Newsletter", errorMessage);
          //  setIsNotificationModalOpen(true);

      } else if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;
        const errorMessages = errors.map(error => error.msg);
        const errorMessage = errorMessages.join(', '); // Join all error messages
        // setErrorMessage({ message: errorMessage });

        openNotificationModal(false, "A.S.K Subscribe To Newsletter", errorMessage);
          //  setIsNotificationModalOpen(true);
      } else {
        // setErrorMessage({ message: 'A.S.K Subscribe To Newsletter failed. Please check your data and try again.' });

        openNotificationModal(false, "A.S.K Subscribe To Newsletter", 'Please check your data and try again.');
          //  setIsNotificationModalOpen(true);
      }
    }
    };

    useEffect(() => {}, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };



    return (
        <div className="flex flex-col bg-theme">
            <div className="flex flex-col h-auto px-8 sm:px-16 md:px-32 py-4 pb-2">
                <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col md:items-start md:w-2/4 my-4 md:h-40">
                        <div className="flex items-center mb-2">
                            <img
                                className="block h-16 w-auto max-w-none"
                                src={askLogo}
                                alt="Logo"
                                onClick={() => {
                                    gotoPage('');
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <div className='flex flex-col'>  
                            <p className='text-white mb-2' style={{  }}>Ashabi Shobande Kokumo Foundation</p>
                            <div className='flex my-1' ><PhoneIcon className='mr-2' style={{ color: "#ffffff" }}/><p className="text-white text-sm" style={{  }}><a onClick={() => {window.location.href = "tel:+2349122090051";}}>+234 912 2090 051</a>, <a onClick={() => {window.location.href = "tel:+447864869571";}}>+44 786 4869 571</a></p></div>
                            <div className='flex my-1' onClick={() => {window.location.href = "mailto:info@askfoundations.org";}}><EmailIcon className='mr-2' style={{ color: "#ffffff" }}/><p className="text-white text-sm" style={{  }}>info@askfoundations.org</p></div>
                            <div className='flex my-1'><PlaceIcon className='mr-2' style={{ color: "#ffffff" }}/><p className="text-white text-sm" style={{  }}>69 Avenue Road, Bexleyheath Kent DA7 4EQ, London.</p></div>
                        </div>
 
                    </div>

                    {/* <div className="flex flex-col md:items-start md:w-1/3  my-4 md:h-40">
                        <p className='text-white mb-2' style={{ color: '', fontSize: '20px' }}>Company Info</p>
                        <p className='text-white mb-1' style={{ color: '', fontSize: '12px' }}>About Us</p>
                        <p className='text-white mb-1' style={{ color: '', fontSize: '12px' }}>Terms & Conditions</p>
                        <p className='text-white mb-1' style={{ color: '', fontSize: '12px' }}>Contact Us</p>
                    </div> */}

                    <div className="flex flex-col md:w-2/4 mt-4 md:h-40 w-full">
                        <div className="flex flex-col items-start mb-4">
                            <p
                                className="text-white mb-2"
                                style={{ color: '', fontSize: '20px' }}
                            >
                                Subscribe to our Newsletter
                            </p>
                            {/* <p
                                className="text-white"
                                style={{ color: '', fontSize: '12px' }}
                            >
                                
                            </p> */}
                        </div>
                        <div className="flex flex-col sm:flex-row relative ">
                            <input
                                type="text"
                                placeholder="Your Email"
                                className="pl-4 border border-gray-300 rounded-lg py-1 px-2 text-center text-white"
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                            />
                            <div
                                onClick={() => { handleSubscribeToNewsletter() }}
                                style={{ borderWidth: '1px' }}
                                className="text-center mt-4 sm:mt-0 sm:ml-2 border-white rounded-lg px-4 py-2 text-white text-sm cursor-pointer"
                            >
                                Subscribe
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start  py-2 my-2">
                            <img
                                onClick={() => {
                                    // alert('googleplay');
                                    openNotificationModal(null, "", "Mobile App coming soon");
                                }}
                                className="mr-4 cursor-pointer border-black border-4"
                                src={googleplay}
                                alt=""
                                style={{
                                    width: '128px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            <img
                                onClick={() => {
                                    // alert('appStore');
                                    openNotificationModal(null, "", "Mobile App coming soon");
                                }}
                                className="mr-4 cursor-pointer border-black border-4"
                                src={appstore}
                                alt=""
                                style={{
                                    width: '128px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center sm:justify-end items-center  text-center  mt-2 '>
                    <span className="text-white text-sm cursor-pointer block my-2 mr-8" 
                    onClick={() => { gotoPage("terms-and-conditions"); }}>
                        Terms and Conditions
                    </span>
                    <span className="text-white text-sm cursor-pointer block my-2" 
                    onClick={() => { gotoPage("privacy-policy"); }}>
                        Privacy Policy
                    </span>
                </div>


            </div>


            


            <div className="mt-auto mb-14">
                <div className="bottom-0 w-full text-center">
                    <p className="text-xs py-2 text-white">
                        &copy; 2025 A.S.K Foundation. All rights reserved.
                    </p>
                </div>
            </div>


            <div className="flex flex-col items-center justify-center mb-0 py-2  bg-theme   fixed bottom-0  w-full z-5000">
              
            <p className="font-bold text-xs mb-1 text-white ">
                        Follow Us:
                    </p>

                        <div className="relative z-20">
              <ul className="flex">
                <li className='mr-4'>
                  <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target='_blank'>
                    <img src={WhatsAppIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://t.me/askfoundations" target='_blank'>
                    <img src={TelegramIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.facebook.com/askfoundationpage" target='_blank'>
                    <img src={FacebookIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.twitter.com/askfoundations" target='_blank'>
                    <img src={XIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.instagram.com/askfoundations" target='_blank'>
                    <img src={InstagramIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.tiktok.com/@askfoundations" target='_blank'>
                    <FontAwesomeIcon icon={faTiktok} className='' style={{cursor: "pointer", color: "#ffffff", width:'20px', height:'20px', marginTop: '4px' }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.youtube.com/@Askfoundations" target='_blank'>
                    <img src={YouTubeIcon} style={{cursor: "pointer", color: "#ffffff", width:'24px', height:'24px' }}/>
                  </a>
                </li>

              </ul>
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

export default GuestFooter;
