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
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
 }) {
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    //
    const [userDetails, setUserDetails] = useState(null);
        const refreshUserDetails = async () => {
            // setIsLoading(true);
            // setError(null);
            
            try {
                // Option 1: If you only need to refresh from cookies
                const storedUserDetails = getCookie('ask-user-details');
                const parsedDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
                setUserDetails(parsedDetails);
            } catch (err) {
                // setError('Failed to refresh user details');
                alert('Refresh error:', err);
            } finally {
                // setIsLoading(false);
            }
        };
    
        // Initial load
        useEffect(() => {
            refreshUserDetails();
        }, []);
    //

    


    return (
        <div className="">
            <GuestHeader 
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
