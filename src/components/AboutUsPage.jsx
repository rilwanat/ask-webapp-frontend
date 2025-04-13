import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import askLogo from '../assets/images/ask-logo.png';
import contactUs from '../assets/images/contact-us.jpg';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import WidgetAboutForAbout from './widgets/WidgetAboutForAbout';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



export default function AboutUsPage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
}) {
    const navigate = useNavigate();

    
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
                // imageUrl={contactUs}
                title={"About A.S.K Foundation"}
                subtitle={"A community-based charity initiative"}
            />

            <WidgetAboutForAbout/>


            {/* <LatestNews/> */}



            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
