import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';

import WidgetShare from '../widgets/WidgetShare';
import WidgetNominate from '../widgets/WidgetNominate';

import NominateNotificationModal from '../modals/NominateNotificationModal';

const WidgetHelpRequests = ({ 
  currentRequestSlide, carouselRequestItems, setCurrentRequestSlide, 
  userDetails, refreshUserDetails, 
  handleHelpRequestsData
 }) => {
  const navigate = useNavigate();

  const [updatedItem, setUpdatedItem] = useState([]);


  //notification modal
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
  //notification modal

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };
      const navigateAndRefresh = async (updatedItem) => {
        const data = await handleHelpRequestsData();
        navigateTo('/single-request', { selectedItem: updatedItem, allItems: data }); // Pass the data, not the function
    }

    

  const gotoPage = (pageName) => {
    navigate("/" + pageName);
}



const [scrollCarousel, setScrollCarousel] = useState(true);

  // Custom carousel configuration to prevent scroll interference
  const carouselConfig = {
    stopAutoPlayOnHover: true,
    showIndicators: false,
    showArrows: true,
    showStatus: false,
    showThumbs: false,
    infiniteLoop: true,
    autoPlay: scrollCarousel ? true : false,
    swipeable: true,
    emulateTouch: true,
    swipeScrollTolerance: 5, // Makes vertical scrolling easier
    preventMovementUntilSwipeScrollTolerance: true,
    verticalSwipe: 'natural', // Allows natural vertical scrolling
    stopOnHover: true, // Prevents hover behavior from interfering with scroll
    interval: 5000,
    selectedItem: currentRequestSlide,
    onChange: (index) => setCurrentRequestSlide(index),
    className: "rounded-lg overflow-hidden w-full"
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
                  <div className='flex flex-col select-none'>
<div 
                    key={item.id} 
                    className="flex flex-col items-center h-full cursor-pointer"
                    
                    onClick={() => {
                      // e.stopPropagation();
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
{/* {import.meta.env.VITE_API_SERVER_URL + "../../../" + item.request_image} */}
                    <div className="flex-1 overflow-hidden">
                      <img 
                        className="rounded-lg w-full h-full object-cover"
                        src={import.meta.env.VITE_API_SERVER_URL + "../../../" + item.request_image}
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
                        {item.nomination_count >= 1000 ? (item.nomination_count / 1000).toFixed(1) + 'K' : item.nomination_count}
                      </h3>
                    </div>

                    </div>

                    <div className='flex flex-col items-center'>
                      <WidgetNominate 
                      helpToken={item.help_token} userDetails={userDetails} 
                      refreshUserDetails={refreshUserDetails}                       
                      openNotificationModal={openNotificationModal}
                      handleHelpRequestsData={handleHelpRequestsData}
                      navigateAndRefresh={navigateAndRefresh}
                      setScrollCarousel={setScrollCarousel}

                      setUpdatedItem={setUpdatedItem}
                      />
                      <WidgetShare helpToken={item.help_token}/>
                    </div>
                  
                  </div>
                  
                ))}
              </Carousel>
            </div>
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