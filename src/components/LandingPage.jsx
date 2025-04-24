import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import askLogo from '../assets/images/ask-logo.png';
import contactUs from '../assets/images/contact-us.jpg';
import hero3 from '../assets/images/hero/hero3.jpg';

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
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails,
    handleHelpRequestsData,
    // navigateAndRefresh

}) {
    const navigate = useNavigate();
    
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    const navigateTo = (route, data) => {
        navigate(route, { state: data });
      };
      const navigateAndRefresh = async (updatedItem) => {
        const data = await handleHelpRequestsData();
        navigateTo('/single-request', { selectedItem: updatedItem, allItems: data }); // Pass the data, not the function
    }

    useEffect(() => { refreshUserDetails(); }, []); 
    
    

    return (
        <div className="">
            <GuestHeader isMobile={isMobile}
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
            userDetails={userDetails} refreshUserDetails={refreshUserDetails} 
            handleHelpRequestsData={handleHelpRequestsData}
            navigateAndRefresh={navigateAndRefresh}
            />

            <WidgetBeneficiaries 
            currentBeneficiarySlide={currentBeneficiarySlide} 
            carouselBeneficiaryItems={carouselBeneficiaryItems} 
            setCurrentBeneficiarySlide={setCurrentBeneficiarySlide} 
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
            />

            <WidgetSponsors 
            currentSponsorSlide={currentSponsorSlide} 
            carouselSponsorItems={carouselSponsorItems} 
            setCurrentSponsorSlide={setCurrentSponsorSlide} 
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
            />


            
            <WidgetVideo link={"https://www.youtube.com/watch?v=WDL5oNdAC1o"}/>


            {/* <LatestNews/> */}
            <Parallax 
                imageUrl={hero3}
                title={"Contact Us"}
                subtitle={"Click here to reach out to us"}
            />
            


            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
