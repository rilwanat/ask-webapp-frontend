import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';
import HeaderParallax from './widgets/HeaderParallax';

export default function SingleBeneficiaryPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItem, allItems } = location.state || {};

    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, []);

    const gotoPage = (pageName) => {
        navigate("/" + pageName);
    }

    // Custom carousel configuration to prevent scroll interference
    const carouselConfig = {
        showIndicators: false,
        showArrows: true,
        showStatus: false,
        showThumbs: false,
        infiniteLoop: false,
        autoPlay: false,
        swipeable: true,
        emulateTouch: true,
        swipeScrollTolerance: 5,
        preventMovementUntilSwipeScrollTolerance: true,
        verticalSwipe: 'natural',
        stopOnHover: false
    };

    return (
        <div className="touch-pan-y">
            <AskHeader 
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems} 
                gotoPage={gotoPage} 
                showMarqees={false} 
            />

            <HeaderParallax 
                title={"A.S.K Beneficiary"}
                subtitle={""}
            />

            <div className="w-full mt-4 touch-pan-y">
                <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
                    <div className="w-full py-4">
                        {/* Grid View */}
                        <div className="w-full py-4 flex justify-center">
                            <div 
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 touch-pan-y"
                                style={{ touchAction: 'pan-y' }}
                            >
                                {carouselBeneficiaryItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="border border-gray-300 shadow-md p-2 rounded-lg cursor-pointer"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => navigate('/single-beneficiary', { state: { selectedItem: item, allItems: carouselBeneficiaryItems }})}
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={`Item ${item.id}`} 
                                            className="w-full object-cover rounded-md"
                                            style={{
                                                height: '190px',
                                                width: '190px',
                                            }}
                                            loading="lazy"
                                        />
                                        <div className="flex flex-col items-center mb-2 mt-auto">
                                            <div className='flex text-sm rounded-lg items-center justify-center w-70 mt-2'>
                                                <p className="text-theme">{item.name}</p>
                                            </div>
                                            <div className='flex text-sm rounded-lg items-center justify-center w-70 mt-0'>
                                                <p className="text-theme">{item.price}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Carousel View (Alternative) */}
                        {selectedItem && (
                            <div className="w-full max-w-3xl mx-auto mt-8 touch-pan-y">
                                <Carousel {...carouselConfig}>
                                    {allItems?.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="flex flex-col items-center p-4 touch-pan-y"
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="rounded-lg w-full h-64 object-cover"
                                                loading="lazy"
                                            />
                                            <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-theme font-bold my-1">
                                                {item.price} • {item.date}
                                            </p>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}