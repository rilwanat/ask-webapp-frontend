import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import WidgetShare from '../widgets/WidgetShare';
import WidgetNominate from '../widgets/WidgetNominate';
import NominateNotificationModal from '../modals/NominateNotificationModal';

const WidgetHelpRequests = ({ 
  isMobile,
  currentRequestSlide, 
  carouselRequestItems, 
  setCurrentRequestSlide,
  userDetails, 
  refreshUserDetails,
  handleHelpRequestsData
}) => {
  const navigate = useNavigate();
  const [myCurrentIndex, setMyCurrentIndex] = useState(0);
  const myItemsPerPage = isMobile ? 1 : 4;
  const myTotalItems = carouselRequestItems.length;
  const [direction, setDirection] = useState(1);
  const [updatedItem, setUpdatedItem] = useState([]);
  const [scrollCarousel, setScrollCarousel] = useState(true);
  const carouselRef = useRef(null);

  // Notification modal state
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const openNotificationModal = (type, title, message) => {
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };


  const [isPaused, setIsPaused] = useState(false);
    // Memoize next function to prevent unnecessary recreations
    const next = useCallback(() => {
      setDirection(1);
      setMyCurrentIndex(prev => (prev + myItemsPerPage) % myTotalItems);
    }, [myItemsPerPage, myTotalItems]);
    const prev = useCallback(() => {
      setDirection(-1);
      setMyCurrentIndex(prev => (prev - myItemsPerPage + myTotalItems) % myTotalItems);
    }, [myItemsPerPage, myTotalItems]);
    
    useEffect(() => {
      if (isPaused || myTotalItems === 0) return;
    
      const interval = setInterval(() => {
        next();
      }, 7000);
    
      return () => clearInterval(interval);
    }, [isPaused, next, myTotalItems]); // Only depend on values that truly affect the effect



    //
    // Touch gesture handlers
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    
    // Check if swipe was significant enough
    if (touchStartX.current - touchEndX.current > 50) {
      next(); // Swipe left
    } else if (touchEndX.current - touchStartX.current > 50) {
      prev(); // Swipe right
    }
  };
    //

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };

  const navigateAndRefresh = async (updatedItem) => {
    const data = await handleHelpRequestsData();
    navigateTo('/single-request', { selectedItem: updatedItem, allItems: data });
  };

  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };

  // Infinite loop navigation
  // const next = () => {
  //   setDirection(1);
  //   setMyCurrentIndex(prev => (prev + myItemsPerPage) % myTotalItems);
  // };

  // const prev = () => {
  //   setDirection(-1);
  //   setMyCurrentIndex(prev => 
  //     (prev - myItemsPerPage + myTotalItems) % myTotalItems
  //   );
  // };

  // Get visible items with wrap-around support
  const getVisibleItems = () => {
    const endIndex = myCurrentIndex + myItemsPerPage;
    
    if (endIndex > myTotalItems) {
      const overflow = endIndex - myTotalItems;
      return [
        ...carouselRequestItems.slice(myCurrentIndex),
        ...carouselRequestItems.slice(0, overflow)
      ];
    }
    return carouselRequestItems.slice(myCurrentIndex, endIndex);
  };

  const visibleItems = getVisibleItems();

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="w-full mt-4 touch-pan-y">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full py-4"
        onMouseEnter={() => setIsPaused(true)}      // For desktop hover
        onMouseLeave={() => setIsPaused(false)}    // For desktop mouse out
        // onTouchStart={() => setIsPaused(true)}     // For mobile touch start
        // onTouchEnd={() => setIsPaused(false)}      // For mobile touch end
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full mx-auto p-4">
            <div className="flex flex-col items-center mb-4">
              <div className="flex justify-between w-full">
                <button
                  type="button"
                  onClick={prev}
                  className="p-2 bg-theme rounded-lg text-white hover:bg-green cursor-pointer"
                >
                  <KeyboardArrowLeftIcon />
                </button>
                <p className='mb-2 text-center' style={{ fontWeight: '700', fontSize: '24px' }}>Help Requests</p>
                <button
                  type="button"
                  onClick={next}
                  className="p-2 bg-theme rounded-lg text-white hover:bg-green cursor-pointer"
                >
                  <KeyboardArrowRightIcon />
                </button>
              </div>
              <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            </div>

            <div className="relative overflow-hidden w-full h-[520px]">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={myCurrentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5
                  }}
                  className="absolute top-0 left-0 right-0 flex gap-6 justify-center"
                >
                  {visibleItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex flex-col select-none items-center px-4 pt-4 pb-8 gap-2 
                      border border-softTheme hover:border-theme rounded-lg sm:w-[calc(33.333%-16px)] min-w-[240px]"
                    >
                      <div 
                        className="flex flex-col select-none items-center pt-4 px-4 gap-2 cursor-pointer"
                        onClick={() => {
                          navigateTo('/single-request', { 
                            selectedItem: item, 
                            allItems: carouselRequestItems  
                          });
                        }}
                      >
                        <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={import.meta.env.VITE_API_SERVER_URL + "../../../" + item.request_image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <p className="text-center font-bold my-2 line-clamp-2 break-words w-full">
                          {item.description}
                        </p>

                        <div className="text-2xl font-bold text-theme">
                          {item.nomination_count >= 1000 
                            ? `${(item.nomination_count / 1000).toFixed(1)}K` 
                            : item.nomination_count}
                        </div>

                        <div className="flex flex-col items-center gap-2 w-full">
                        <button className="flex items-center bg-orange-500 rounded-lg px-6 py-2 text-white font-semibold  cursor-pointer">
                Nominate
                <span className="ml-2">✓</span>
              </button>
                        </div>
                      </div>
                      <WidgetShare helpToken={item.help_token}/>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            {/* <div className="flex justify-center -mt-4 gap-2 overflow-x-auto py-2 w-full max-w-[100vw]">
              <div className="flex gap-3 px-4">
                {Array.from({ length: Math.ceil(myTotalItems / myItemsPerPage) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > myCurrentIndex/myItemsPerPage ? 1 : -1);
                      setMyCurrentIndex(i * myItemsPerPage);
                    }}
                    className={`flex-shrink-0 w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      Math.floor(myCurrentIndex/myItemsPerPage) === i 
                        ? 'bg-blue-600 scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <NominateNotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={closeNotificationModal}
        notificationType={notificationType}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
        gotoPage={gotoPage}
        updatedItem={updatedItem}
        navigateAndRefresh={navigateAndRefresh}
      />
    </div>
  );
};

export default WidgetHelpRequests;