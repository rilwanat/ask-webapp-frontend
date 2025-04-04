import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation  } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

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



    return (
        <div className="">
            <AskHeader 
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
            
            <DonateWidget />


            {/* <LatestNews/> */}
            <WidgetVideo link={"https://www.youtube.com/watch?v=TA_T5S-5ssY"}/>


            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
