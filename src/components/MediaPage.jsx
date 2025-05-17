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

// import sponsor from '../assets/images/sponsors/sponsor.jpg';
// import sponsor2 from '../assets/images/sponsors/sponsor2.jpg';

import WidgetTestimonies from './widgets/WidgetTestimonies';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function MediaPage({ 
  isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
        userDetails, refreshUserDetails,
    handleHelpRequestsData,
 }) {
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 16;
    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = carouselSponsorItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(carouselSponsorItems.length / itemsPerPage);



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

            
            <HeaderParallax 
                // imageUrl={askLogo}
                title={"A.S.K Media"}
                subtitle={""}
            />

            <div className="w-full -mt-8 touch-pan-y">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full py-4">
          <div className="relative w-full mx-auto p-4 rounded-lg">
            <div className="flex flex-col items-center mb-4 ">
              <div className="flex justify-between w-full ">

              </div>
              </div>
              </div>
              </div>
              </div>
              </div>

<WidgetTestimonies 
            currentSponsorSlide={currentSponsorSlide} 
            carouselSponsorItems={carouselSponsorItems} 
            setCurrentSponsorSlide={setCurrentSponsorSlide} 
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
            />



            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
