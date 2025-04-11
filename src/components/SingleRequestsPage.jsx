import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import HeaderParallax from './widgets/HeaderParallax';
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
    const { selectedItem, allItems } = location.state || {};
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 

          // Find the index of the selected item when component mounts
          if (selectedItem && allItems) {
            const index = allItems.findIndex(item => item.id === selectedItem.id);
            if (index !== -1) {
                setSelectedIndex(index);
            }
        }
    }, [selectedItem, allItems]);

    const gotoPage = (pageName) => {
        navigate("/" + pageName);
    }

    const handleChange = (index) => {
        setSelectedIndex(index);
    };

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
        stopOnHover: false,
        className: "touch-pan-y", // Added to prevent scroll interference
        selectedItem: selectedIndex, // Start with the selected item
        onChange: handleChange, // Update selected index when carousel changes
    };

    return (
        <div className="touch-pan-y"> {/* Main container with touch action */}
            <GuestHeader 
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems} 
                gotoPage={gotoPage} 
                showMarqees={false} 
            />

            <HeaderParallax 
                title={"A.S.K Requests"}
                subtitle={""}
            />

            <div className="flex flex-col items-center p-4 touch-pan-y">
                <div className="w-full max-w-3xl mt-4">
                    <Carousel {...carouselConfig}>
                        {allItems?.map((item) => (
                            <motion.div 
                                key={item.id} 
                                className="flex flex-col items-center justify-center w-full touch-pan-y"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full text-center">
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        You are viewing {item.user.fullname}'s help request
                                    </h1>
                                    <p className="text-gray-600 my-2">
                                        {item.description || "No Description Available"}
                                    </p>
                                </div>

                                <motion.div
                                    // whileHover={{ scale: 1.02 }}
                                    // whileTap={{ scale: 0.98 }}
                                    className="w-full flex justify-center"
                                >
                                    <img 
                                        // src={item.image} 
                                        src={import.meta.env.VITE_API_SERVER_URL + "../../../" + item.request_image}
                                        alt={item.title} 
                                        className="rounded-lg object-cover"
                                        style={{ 
                                            width: '190px',
                                            height: '190px',
                                            // maxWidth: '100%' // Ensure responsiveness
                                        }}
                                        loading="lazy"
                                    />
                                </motion.div>

                                <div className="flex p-4 mt-auto items-center justify-center">
                                    <h3 className="text-3xl font-bold text-theme">
                                        {item.nomination_count >= 1000 ? (item.nomination_count / 1000).toFixed(1) + 'K' : item.nomination_count}
                                    </h3>
                                    <FavoriteIcon 
                                        className='ml-2' 
                                        style={{ width: '28px', height: '28px', marginTop: '2px' }}
                                    />
                                </div>

                                <div className='flex flex-col items-center touch-pan-y'>
                                    <motion.button
                                        // whileHover={{ scale: 1.05 }}
                                        // whileTap={{ scale: 0.95 }}
                                        className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-orange text-white p-2 my-1'
                                    >
                                        Nominate <CheckIcon className='ml-2' />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-theme text-white p-2 my-1'
                                    >
                                        Share <ShareIcon className='ml-2' />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </Carousel>
                </div>
            </div>

            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}