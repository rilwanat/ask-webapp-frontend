import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

import askLogo from '../assets/images/ask-logo.png';
import contactUs from '../assets/images/contact-us.jpg';

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



export default function LandingPage() {
    const navigate = useNavigate();
    
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth <= 500);
    //     };

    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);


    return (
        <div className="">
            <AskHeader gotoPage={gotoPage} showMarqees={true} />

            
            <Hero/>

            <WidgetAboutForHome/>

            <WidgetHelpRequests/>

            <WidgetBeneficiaries/>

            <WidgetSponsors/>

            <WidgetVideo />


            {/* <LatestNews/> */}
            <Parallax 
                imageUrl={contactUs}
                title={"Contact Us"}
                subtitle={"Click here to reach out to us"}
            />
            


            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
