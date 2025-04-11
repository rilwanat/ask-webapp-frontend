import React, { useState, useEffect } from 'react';
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


//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, getCookie, deleteCookie } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
//

import Loading from './Loading';
import MiniLoading from './MiniLoading';

const DonateWidget = ({  }) => {
  const navigate = useNavigate();
  // const [currentRequestSlide, setCurrentRequestSlide] = useState(0);
  // const [zoomedItemId, setZoomedItemId] = useState(null);

  const [isDataloading, setIsDataLoading] = useState(true);
  const [donationsData, setDonationsData] = useState([]);
  const currentPageName = "Donations";

  const [donateType, setDonateType] = useState("naira");

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

  const showSelectedPriceToPay = (price, symbol) => {
    openNotificationModal(true, "Donate Now", `You are about to donate ${symbol + price}`);
        setIsNotificationModalOpen(true);
  };


  
      useEffect(() => {
        handleDonationsData();
      }, []);
      const handleDonationsData = async () => {
    
        setIsDataLoading(true);
    
    
        try {
          const donationsRequestsEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_READ_DONATIONS;
          // alert(beneficiariesRequestsEndpoint);
          const donationsRequestsResponse = await axiosInstance.get(donationsRequestsEndpoint, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setDonationsData(donationsRequestsResponse.data.data);  // Update state with doctors count
      
      
          // openNotificationModal(true, currentPageName, "");
          // alert(JSON.stringify(donationsRequestsResponse.data.data), null, 2);  // Update state with appointments count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsDataLoading(false);
      
        } catch (error) {
          setIsDataLoading(false);
          
          alert(error);
          // Handle errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            openNotificationModal(false, currentPageName + " Error", errorMessage);
          } else {
            openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
          }
        }
      };


// Initialize as empty array if data is not yet loaded
const filteredDonations = Array.isArray(donationsData) 
? donationsData.filter(item => item.type === donateType)
: [];


        // Get currency symbol based on type
  const getCurrencySymbol = (type) => {
    switch(type) {
      case 'naira': return '₦';
      case 'dollar': return '$';
      case 'crypto': return 'Ξ'; // Ethereum symbol, or use '#' if you prefer
      default: return '₦';
    }
  };




  return (
    <div className="w-full mt-4">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col  items-center justify-between">


{
                    isDataloading ? <Loading />
                    : 
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
                  <div className='flex mt-4 justify-center'>
                    <div className={`mx-2 px-4 py-1 rounded-lg  cursor-pointer border-2 border-theme
                      ${donateType === 'naira' ? 'bg-theme text-softTheme' : 'bg-white text-theme'}
                      `} onClick={() => {setDonateType('naira');}}>Naira</div>
                    <div className={`mx-2 px-4 py-1 rounded-lg cursor-pointer  border-2 border-theme
                      ${donateType === 'dollar' ? 'bg-theme text-softTheme' : 'bg-white text-theme'}`} onClick={() => {setDonateType('dollar');}}>Dollar</div>
                    <div className={`mx-2 px-4 py-1 rounded-lg cursor-pointer  border-2 border-theme
                      ${donateType === 'crypto' ? 'bg-theme text-softTheme' : 'bg-white text-theme'}`} onClick={() => {setDonateType('crypto');}}>Crypto</div>
                  </div>
                  </div>

                  {/* Right Div */}
                  {donateType === "naira" && (
    <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {filteredDonations.map((item) => (
          <div key={item.id} 
            onClick={() => showSelectedPriceToPay(item.price, getCurrencySymbol(item.type))}
            className="cursor-pointer px-4 py-2 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange">
            {getCurrencySymbol(item.type)}{parseInt(item.price).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  )}

{donateType === "dollar" && (
    <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {filteredDonations.map((item) => (
          <div key={item.id} 
            onClick={() => showSelectedPriceToPay(item.price, getCurrencySymbol(item.type))}
            className="cursor-pointer px-4 py-2 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange">
            {getCurrencySymbol(item.type)}{parseInt(item.price).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  )}

{donateType === "crypto" && (
    <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {filteredDonations.map((item) => (
          <div key={item.id} 
            onClick={() => showSelectedPriceToPay(item.price, getCurrencySymbol(item.type))}
            className="cursor-pointer px-4 py-2 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange">
            {getCurrencySymbol(item.type)}{parseInt(item.price).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  )}
                </div>



              
              </div>
              </motion.div>
}






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