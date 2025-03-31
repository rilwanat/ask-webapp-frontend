import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

import askLogo from '../assets/images/ask-logo.png';
import contactUs from '../assets/images/contact-us.jpg';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import WidgetAboutForAbout from './widgets/WidgetAboutForAbout';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



export default function AboutUsPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
}) {
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="">
            <AskHeader 
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



            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
