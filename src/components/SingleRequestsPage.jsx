import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';
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
        stopOnHover: false,
        className: "touch-pan-y", // Added to prevent scroll interference
    };

    return (
        <div className="touch-pan-y"> {/* Main container with touch action */}
            <AskHeader 
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
                                        You are viewing {item.name}'s help request
                                    </h1>
                                    <p className="text-gray-600 my-2">
                                        {item.description || "No Description Available"}
                                    </p>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex justify-center"
                                >
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="rounded-lg object-cover"
                                        style={{ 
                                            width: '400px',
                                            height: '400px',
                                            maxWidth: '100%' // Ensure responsiveness
                                        }}
                                        loading="lazy"
                                    />
                                </motion.div>

                                <div className="flex p-4 mt-auto items-center justify-center">
                                    <h3 className="text-3xl font-bold text-theme">
                                        {item.score >= 1000 ? (item.score / 1000).toFixed(1) + 'K' : item.score}
                                    </h3>
                                    <FavoriteIcon 
                                        className='ml-2' 
                                        style={{ width: '28px', height: '28px' }}
                                    />
                                </div>

                                <div className='flex flex-col items-center touch-pan-y'>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
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

            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}