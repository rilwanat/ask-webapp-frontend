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



import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share'; 

import FavoriteIcon from '@mui/icons-material/Favorite';


export default function SingleRequestsPage({ 
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
                title={"A.S.K Requests"}
                subtitle={""}
            />

            {/* <Contact/> */}

            <div className="flex flex-col items-center p-4">
                
                <div className="w-full max-w-3xl mt-4">
                    <Carousel 
                        showIndicators={false}
                        showArrows={true}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={false}
                        autoPlay={false} // 👈 Disabled auto-slide
                        swipeable={true} // 👈 Enables manual swiping
                        emulateTouch={true} // ✅ Fix swipe gestures on mobile
                        // useKeyboardArrows={true} // ✅ Allow left/right keyboard navigation
                        // dynamicHeight={true} // 👈 Adjusts height based on content
                    >
                        {allItems?.map((item) => (
                            <div key={item.id} className="flex flex-col items-center justify-center w-full" 
                            style={{
                                // width: '400px',   
                            }}
                            >


<div 
style={{
    // width: '400px',   
}}
>
<h1 className="text-2xl font-bold text-gray-800">You are viewing {item.name}'s help request</h1>
                <p className="text-gray-600 my-2">{item.description || "No Description Available"}</p>

</div>





                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="rounded-lg w-full h-64 object-cover"
                                    style={{ 
                                        // maxHeight: '70vh', // Adjust this as needed
                      // width: 'auto',
                      width: '400px',       // or any fixed square size like 200px, 400px
                      height: '400px',
                                    }} // Adjusted styles for better responsiveness
                                />
                                {/* <h3 className="text-lg font-semibold text-gray-800 mt-2">{item.title}</h3> */}
                                {/* <p className="text-gray-600">{item.description}</p> */}
                                {/* <p className="text-theme font-bold my-1">Score: {item.score}</p> */}

                                <div className="flex p-4 mt-auto items-center">
                                    <h3 className="text-3xl font-bold text-theme">{(item.score >= 1000 ? (item.score / 1000).toFixed(1) + 'K' : item.score)}</h3>
                                    {/* <p className="text-theme mt-2">{item.description}</p> */}

                                    <FavoriteIcon className='ml-2' style={{ width: '28px', height: '28px' }}/>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-orange text-white p-2 my-1'>Nominate <CheckIcon className='ml-2' /></div>
                                    <div className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-theme text-white p-2 my-1'>Share <ShareIcon className='ml-2' /></div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>


            {/* <LatestNews/> */}



            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
