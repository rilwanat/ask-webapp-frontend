import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const WidgetBeneficiaries = ({ 
  isMobile,
  currentBeneficiarySlide, 
  carouselBeneficiaryItems, 
  setCurrentBeneficiarySlide 
}) => {
  const navigate = useNavigate();
  const [myCurrentIndex, setMyCurrentIndex] = useState(0);
  const myItemsPerPage = isMobile ? 1 : 5;
  const myTotalItems = carouselBeneficiaryItems.length;
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const carouselRef = useRef(null);


  const [isPaused, setIsPaused] = useState(false);
  // Memoize next function to prevent unnecessary recreations
  const next = useCallback(() => {
    // alert(myItemsPerPage);
    setDirection(1);
    setMyCurrentIndex(prev => (prev + 1) % myTotalItems);
  }, [myItemsPerPage, myTotalItems]);
  const prev = useCallback(() => {
    setDirection(-1);
    setMyCurrentIndex(prev => (prev - 1 + myTotalItems) % myTotalItems);
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
        ...carouselBeneficiaryItems.slice(myCurrentIndex),
        ...carouselBeneficiaryItems.slice(0, overflow)
      ];
    }
    return carouselBeneficiaryItems.slice(myCurrentIndex, endIndex);
  };

  const visibleItems = getVisibleItems();

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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
    <div className="w-full -mt-8 touch-pan-y">
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
          <div className="relative w-full mx-auto p-4 rounded-lg">
            <div className="flex flex-col items-center mb-4 ">
              <div className="flex justify-between w-full ">
                <button
                  type="button"
                  onClick={prev}
                  className="p-2 bg-theme rounded-lg text-white hover:bg-green cursor-pointer"
                >
                  <KeyboardArrowLeftIcon />
                </button>
                <p className='mb-2 text-center' style={{ fontWeight: '700', fontSize: '24px' }}>Beneficiaries</p>
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

            <div className="relative overflow-hidden w-full h-[460px] ">
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
                  className="absolute top-0 left-0 right-0 flex gap-6 justify-center cursor-pointer"
                  drag="x" // Enable horizontal dragging
    dragConstraints={{ left: 0, right: 0 }} // Constrain drag to prevent visual glitches
    onDragEnd={(e, { offset, velocity }) => {
      // Swipe detection threshold
      const swipe = Math.abs(offset.x) * velocity.x;
      
      if (swipe < -10000) {
        next(); // Swipe left
      } else if (swipe > 10000) {
        prev(); // Swipe right
      }
    }}
                >
                  {visibleItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`flex flex-col select-none items-center p-4 gap-2 
                        border rounded-lg  cursor-pointer ${
                        item.status === 'approved' ? 'border-green' : 
                        item.status === 'pending' ? 'border-orange' : ''
                      }`}
                    >
                      <div 
                        className="flex flex-col select-none items-center p-4 gap-2 cursor-pointer"
                        onClick={() => {
                          navigateTo('/single-beneficiary', { 
                            selectedItem: item, 
                            allItems: carouselBeneficiaryItems  
                          });
                        }}
                      >
                        <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={import.meta.env.VITE_API_SERVER_URL + "../../../../" + item.user.profile_picture}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>


                        

                        <div className="flex flex-col items-center gap-2 w-full">
                          <div className="pt-2 mt-auto text-center">
                            <p className="text-theme font-bold mt-1">{'₦' + formatAmount(item.amount)}</p>
                            <p className="text-theme mt-1">{item.date}</p>
                          </div>

                          <div className="flex flex-col items-center mt-auto">
                            <div className='flex p-2 rounded-lg items-center justify-center w-50 bg-softTheme mt-2'>
                              <p className="text-theme">{item.remark}</p>
                            </div>
                            <div className={`flex p-2 rounded-lg items-center justify-center w-50 ${
                              item.status === 'approved' ? 'bg-green' : 
                              item.status === 'pending' ? 'bg-orange' : ''
                            } mt-2`}>
                              <p className="text-white mr-2">
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </p>
                              {item.status === 'approved' ? (
                                <span className="ml-2 text-white">✓</span>
                              ) : (
                                <PendingActionsIcon className='text-white' />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            {/* <div className="flex justify-center mt-6 gap-2 overflow-x-auto py-2 w-full max-w-[100vw]">
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
                        ? 'bg-theme scale-110' 
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
    </div>
  );
};

export default WidgetBeneficiaries;