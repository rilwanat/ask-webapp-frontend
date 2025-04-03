import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import background from '../../assets/images/ask-logo.png';
import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share'; 

import NotificationModal from '../modals/NotificationModal';

const DonateWidget = ({  }) => {
  const navigate = useNavigate();
  // const [currentRequestSlide, setCurrentRequestSlide] = useState(0);
  // const [zoomedItemId, setZoomedItemId] = useState(null);

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

  // Sample carousel data
  const numbers = [
    1_000, 5_000, 10_000, 20_000, 50_000, 
    100_000, 250_000, 500_000, 1_000_000,
    10_000_000
  ];

  const showSelectedPriceToPay = (price) => {
    openNotificationModal(true, "Donate Now", `You are about to donate ${'₦' + price}`);
        setIsNotificationModalOpen(true);
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col  items-center justify-between">


          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className=" flex items-center justify-center w-full"
              >
              <div className="mx-auto  w-full">
              
              {/* <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800 mb-2"
              >
              <div className='flex flex-col items-center justify-center mb-2'>
              <p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Donate Now</p>
              <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
              </div>
              
              
              </motion.h1> */}



              {/* Responsive Divs */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 w-full">
                  {/* Left Div */}
                  <div className="w-full md:w-1/2 p-4  rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Donate Now</h2>
                    <p className=" text-gray-600" style={{ fontSize: '18px',  }}>Kindly support us with your kind donations to help us share the pie of kindness to the vulnerable in the society. Together, we can make the world a better place.</p>
                  </div>

                  {/* Right Div */}
                  <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
                    {/* <h2 className="text-lg font-semibold mb-2 text-softTheme">Right Section</h2> */}
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                    {numbers.map((num, index) => (
                    <div key={index} 
                    onClick={() => { showSelectedPriceToPay(num.toLocaleString());}}
                    className="cursor-pointer px-4 py-2 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange">
                    {'₦' + num.toLocaleString()}
                    </div>
                    ))}
                    </div>
                  </div>
                </div>



              
              </div>
              </motion.div>







          </div>
        </div>
      </div>

      <NotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
            />


    </div>
  );
};

export default DonateWidget;