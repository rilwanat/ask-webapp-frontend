import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';



const WidgetBeneficiaries = ({ currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide }) => {
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
    autoPlay: true,
    interval: 5000,
    selectedItem: currentBeneficiarySlide,
    onChange: (index) => setCurrentBeneficiarySlide(index),
    className: "rounded-lg overflow-hidden w-full",
    swipeScrollTolerance: 5, // Makes vertical scrolling easier
    preventMovementUntilSwipeScrollTolerance: true,
    verticalSwipe: 'natural', // Allows natural vertical scrolling
    stopOnHover: false // Prevents hover behavior from interfering with scroll
  };

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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
                  <div className='flex flex-col items-center justify-center mt-0 mb-2'>
                    <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Beneficiaries Gallery</p>
                    <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
                  </div>
                </motion.h1>
              </div>
            </motion.div>

            <div className="w-full touch-pan-y" style={{ touchAction: 'pan-y' }}> {/* Wrapper with touch action */}
              <Carousel {...carouselConfig}>
                {carouselBeneficiaryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col h-full cursor-pointer"
                    onClick={() => {
                      navigateTo('/single-beneficiary', { 
                        selectedItem: item, 
                        allItems: carouselBeneficiaryItems  
                      });
                    }}
                  >
                    <div className="flex-1 overflow-hidden">
                    {/* {import.meta.env.VITE_API_SERVER_URL + "../../../../" + item.user.profile_picture} */}
                      <img 
                        className="rounded-lg w-full h-full object-cover"
                        src={import.meta.env.VITE_API_SERVER_URL + "../../../../" + item.user.profile_picture}
                        alt={item.title}
                        style={{
                          width: '200px',
                          height: '200px',
                          margin: '0 auto',
                          display: 'block'
                        }}
                      />
                    </div>

                    <div className="pt-4 mt-auto">
                      <h3 className="text-2xl font-bold text-theme">{item.name}</h3>
                      <p className="text-theme font-bold mt-1">{'₦' + formatAmount(item.amount)}</p>
                      <p className="text-theme mt-1">{item.date}</p>
                    </div>

                    <div className="flex flex-col items-center mt-auto">
                      <div className='flex p-2 rounded-lg items-center justify-center w-50 bg-softTheme mt-2'>
                        <p className="text-theme">{'remark: ' + item.remark}</p>
                      </div>
                      <div className={`flex p-2 rounded-lg items-center justify-center w-50 ${item.status === 'approved' ? 'bg-green' : 'bg-softTheme'} mt-2`}>
                        <p className="text-theme mr-2">{'status: ' + item.status}</p>
                        {
                          item.status === 'approved' ? 
                          <CheckCircleIcon style={{ color: '#ffffff' }}/> 
                          : 
                          <PendingActionsIcon />
                        }
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

export default WidgetBeneficiaries;