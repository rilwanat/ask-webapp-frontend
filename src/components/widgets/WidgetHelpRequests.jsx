import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';

const WidgetHelpRequests = ({ currentRequestSlide, carouselRequestItems, setCurrentRequestSlide }) => {
  const navigate = useNavigate();

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };

  // Custom carousel configuration to prevent scroll interference
  const carouselConfig = {
    showIndicators: false,
    showArrows: false,
    showStatus: false,
    showThumbs: false,
    infiniteLoop: true,
    interval: 5000,
    selectedItem: currentRequestSlide,
    onChange: (index) => setCurrentRequestSlide(index),
    className: "rounded-lg overflow-hidden w-full",
    swipeScrollTolerance: 5, // Makes vertical scrolling easier
    preventMovementUntilSwipeScrollTolerance: true,
    verticalSwipe: 'natural', // Allows natural vertical scrolling
    stopOnHover: false // Prevents hover behavior from interfering with scroll
  };

  return (
    <div className="w-full mt-4 touch-pan-y"> {/* Added touch-pan-y for better scroll */}
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="mx-auto">
                <motion.h1
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  <div className='flex flex-col items-center justify-center mb-2'>
                    <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Help Requests</p>
                    <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
                  </div>
                </motion.h1>
              </div>
            </motion.div>

            <div className="w-full touch-pan-y" style={{ touchAction: 'pan-y' }}> {/* Wrapper with touch action */}
              <Carousel {...carouselConfig}>
                {carouselRequestItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col items-center h-full cursor-pointer"
                    onClick={() => {
                      navigateTo('/single-request', { 
                        selectedItem: item, 
                        allItems: carouselRequestItems  
                      });
                    }}
                  >
                    <div className='flex ' style={{ width: '200px' }}>
  <p 
    className="text-center text-theme font-bold my-2"
    style={{
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      wordBreak: 'break-word'
    }}
  >
    {item.description}
  </p>
</div>

                    <div className="flex-1 overflow-hidden">
                      <img 
                        className="rounded-lg w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '200px',
                          height: '200px',
                          margin: '0 auto',
                          display: 'block'
                        }}
                      />
                    </div>

                    <div className="flex flex-col items-center p-4 mt-auto">
                      <h3 className="text-2xl font-bold text-theme">
                        {item.score >= 1000 ? (item.score / 1000).toFixed(1) + 'K' : item.score}
                      </h3>
                    </div>

                    <div className='flex flex-col items-center'>
                      <div className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-orange text-white p-2 my-1'>
                        Nominate <CheckIcon className='ml-2' />
                      </div>
                      <div className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-theme text-white p-2 my-1'>
                        Share <ShareIcon className='ml-2' />
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetHelpRequests;