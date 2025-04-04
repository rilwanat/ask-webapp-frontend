import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

import askLogo from '../assets/images/ask-logo.png';
import contactUs from '../assets/images/contact-us.jpg';
import hero1 from '../assets/images/hero/hero1.jpg';

import { motion } from 'framer-motion';

import Parallax from './widgets/Parallax';

import Hero from './widgets/Hero';
import WidgetAboutForHome from './widgets/WidgetAboutForHome';
import WidgetHelpRequests from './widgets/WidgetHelpRequests';
import WidgetBeneficiaries from './widgets/WidgetBeneficiaries';
import WidgetSponsors from './widgets/WidgetSponsors';
import WidgetVideo from './widgets/WidgetVideo';

// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



export default function LandingPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,

}) {
    const navigate = useNavigate();
    
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    
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

            
            <Hero/>

            <WidgetAboutForHome/>

            <WidgetHelpRequests 
            currentRequestSlide={currentRequestSlide} 
            carouselRequestItems={carouselRequestItems} 
            setCurrentRequestSlide={setCurrentRequestSlide}
            />

            <WidgetBeneficiaries 
            currentBeneficiarySlide={currentBeneficiarySlide} 
            carouselBeneficiaryItems={carouselBeneficiaryItems} 
            setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            />

            <WidgetSponsors 
            currentSponsorSlide={currentSponsorSlide} 
            carouselSponsorItems={carouselSponsorItems} 
            setCurrentSponsorSlide={setCurrentSponsorSlide}
            />


            
            <WidgetVideo link={"https://www.youtube.com/watch?v=WDL5oNdAC1o"}/>


            {/* <LatestNews/> */}
            <Parallax 
                imageUrl={hero1}
                title={"Contact Us"}
                subtitle={"Click here to reach out to us"}
            />
            


            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
