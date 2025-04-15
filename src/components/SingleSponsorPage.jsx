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

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function SingleSponsorPage({ 
  isMobile,
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
            <GuestHeader isMobile={isMobile}
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            <HeaderParallax 
                // imageUrl={askLogo}
                title={"A.S.K Sponsors"}
                subtitle={""}
            />


<div className="w-full mt-4 touch-pan-y">
    <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
        <div className="w-full py-4">


<div className="w-full py-4 flex justify-center ">
      <div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 touch-pan-y"
      >
        {carouselSponsorItems.map((item) => (
          <div key={item.id} className="
          border border-gray-300 shadow-md
           p-2 rounded-lg cursor-pointer ">
            <div className="flex justify-center">
            <img 
            src={item.type == 'Donor' ? sponsor2 : sponsor}
            style={{
              height: '200px',
              width: '200px',
          }}
            alt={`Item ${item.id}`} className="w-full h-40 object-cover rounded-md mt-1" />
              </div>

<div className="flex flex-col items-center  mb-2 mt-auto">
                  {/* <h3 className="text-2xl font-bold text-theme">{item.score}</h3> */}
                  <div className='flex text-sm  rounded-lg items-center justify-center w-full  mt-2'><p className="text-theme">{'' + item.name}</p> </div>
                  <div className='flex text-sm  rounded-lg items-center justify-center w-full  mt-0'><p className="text-theme">{'' + item.type}</p></div>
                </div>


          </div>
        ))}
      </div>
    </div>
            

        </div>
    </div>

</div>



            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
