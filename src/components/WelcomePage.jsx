import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation  } from 'react-router-dom';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import askLogo from '../assets/images/ask-logo.png';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import Contact from './widgets/Contact';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


import WidgetForEmailVerification from './user/WidgetForEmailVerification';
import WidgetForKyc from './user/WidgetForKyc';


import WidgetForCreateAsk from './user/WidgetForCreateAsk';
import WidgetForEditAsk from './user/WidgetForEditAsk';
import WidgetForLoginAsk from './user/WidgetForLoginAsk';

//
import axiosInstance from '../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../auth/authUtils'; // Import getCookie function
//

import Loading from './widgets/Loading';
import MiniLoading from './widgets/MiniLoading';

import NotificationModal from './modals/NotificationModal';


import XIcon from '../assets/images/socials/x.png';
import FacebookIcon from '../assets/images/socials/facebook.png';
import InstagramIcon from '../assets/images/socials/instagram.png';
import YouTubeIcon from '../assets/images/socials/youtube.png';
import TelegramIcon from '../assets/images/socials/telegram.png';
import WhatsAppIcon from '../assets/images/socials/whatsapp.png';
import TikTokIcon from '../assets/images/socials/tiktok.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import WidgetVideo from './widgets/WidgetVideo';


export default function WelcomePage({ 
  isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails,
    handleHelpRequestsData
 }) {
    const navigate = useNavigate();
    




    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }
    

    
      const currentPageName = "Welcome";
      
      
      

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
                title={"Welcome"}
                subtitle={""}
            />

<div className="w-full ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">


          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>You are welcome to ASK Foundation.</p>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '400', fontSize: '16px' }}>You are strongly encouraged to follow our <strong>WhatsApp channel now</strong> and our other social media pages to maximize your experience with us. </p>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '400', fontSize: '16px' }}>Feel free to watch our VIDEO GUIDES below. </p>
            
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            
                        <div className="flex justify-center mb-0 py-2 mt-4  rounded-xl px-8 z-5000">
                                    <div className="relative z-20">
                          <ul className="flex">
                            <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target='_blank'>
                                <img src={WhatsAppIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                              </a>
                            </li>
                            <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://t.me/askfoundations" target='_blank'>
                                <img src={TelegramIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                              </a>
                            </li>
                            <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://www.facebook.com/askfoundationpage" target='_blank'>
                                <img src={FacebookIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                              </a>
                            </li>
                            <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://www.twitter.com/askfoundations" target='_blank'>
                                <img src={XIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                              </a>
                            </li>
                            <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://www.instagram.com/askfoundations" target='_blank'>
                                <img src={InstagramIcon} style={{cursor: "pointer", color: "#ffffff", width:'28px', height:'28px' }}/>
                              </a>
                            </li>
                            {/* <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://www.tiktok.com/@askfoundations" target='_blank'>
                                <FontAwesomeIcon icon={faTiktok} className='' style={{cursor: "pointer", color: "#ffffff", width:'20px', height:'20px', marginTop: '4px' }}/>
                              </a>
                            </li>
                            <li className='mr-4 border-2 border-theme rounded-full bg-theme'>
                              <a href="https://www.youtube.com/@Askfoundations" target='_blank'>
                                <img src={YouTubeIcon} style={{cursor: "pointer", color: "#ffffff", width:'24px', height:'24px', marginTop: '2px' }}/>
                              </a>
                            </li> */}
            
                          </ul>
                        </div>
                                    </div>


            
        </div> 

        

        {/* <WidgetVideo link={"https://youtube.com/playlist?list=PLih08HDQf-eTuUzkhsenCvv8d1MnfA9bX&si=6mt66s1flBMi7rfX"}/> */}
        {/* <WidgetVideo link={"https://www.youtube.com/embed/videoseries?list=PLih08HDQf-eTuUzkhsenCvv8d1MnfA9bX"}/> */}
        <div className="w-full flex justify-center">
      <iframe
        width="1000"
        height="560"
        src="https://www.youtube.com/embed/videoseries?list=PLih08HDQf-eTuUzkhsenCvv8d1MnfA9bX"
        title="YouTube Playlist"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

        <div className='flex justify-center items-center flex-col md:flex-row '>
                            
                          <div  
                          // onClick={(e) => {if (!isLoading) updateSelfieImage(e)}} 
                          onClick={(e) => {navigate("/");}}
                          style={{ borderWidth: '0px', width: '200px' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {'Return to Home Page'}
                            </div>
                          </div>



        </div>
        </div>
        </div>

            
 

            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
