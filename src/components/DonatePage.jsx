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

import WidgetVideo from './widgets/WidgetVideo';
import DonateWidget from './widgets/DonateWidget';


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


//
import axiosInstance from '../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../auth/authUtils'; // Import getCookie function
//


export default function DonatePage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails
 }) {
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    

    


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
                title={"Donate"}
                subtitle={""}
            />

            {/* <Contact/> */}
            
            <DonateWidget userDetails={userDetails}/>


            {/* <LatestNews/> */}
            <WidgetVideo link={"https://www.youtube.com/watch?v=TA_T5S-5ssY"}/>


            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
