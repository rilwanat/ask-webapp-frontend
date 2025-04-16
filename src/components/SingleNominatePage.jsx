import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';


import HeaderParallax from './widgets/HeaderParallax';

//
import axiosInstance from '../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../auth/authUtils'; // Import getCookie function
//


import Loading from './widgets/Loading';
import MiniLoading from './widgets/MiniLoading';


import UserHeader from './navbar/user-navbar/UserHeader';
import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';

import WidgetShare from './widgets/WidgetShare';
import WidgetNominate from './widgets/WidgetNominate';


import NotificationModal from './modals/NotificationModal';

export default function SingleNominatePage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails
}) {
    const navigate = useNavigate();
    const { helpToken } = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    
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



    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchHelpRequest();
    }, [helpToken]);

    const fetchHelpRequest = async () => {
        // if ()

        try {
    
            const requestData = {   
                helpToken: helpToken
            };
      
            const endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_READ_SINGLE_HELP_REQUEST;
            // alert(endpoint);
            const response = await axiosInstance.post(endpoint, requestData, {
              headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                },
            });
      
            setIsLoading(false);
            // alert(JSON.stringify(response.data, null, 2));
      // return;
      
            if (response.data.status) {
              // If successful
              setErrorMessage({ message: '' });              
      
            //   alert(JSON.stringify(response.data.requestData, null, 2));
              setItem(response.data.requestData);
      
            } else {
              const errors = response.data.errors.map(error => error.msg);
              setErrorMessage({ message: response.data.message, errors });
              //alert("Failed1");
            }
          } catch (error) {
            setIsLoading(false);
  
            // alert(error);
          
            if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            setErrorMessage({ message: errorMessage });
          } else if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessages = errors.map(error => error.msg);
            const errorMessage = errorMessages.join(', '); // Join all error messages
            setErrorMessage({ message: errorMessage });
          } else {
            setErrorMessage({ message: `Oops!! Request failed. That's an invalid help token.` });
          }
        }
    };

    const gotoPage = (pageName) => {
        navigate("/" + pageName);
    }
    const navigateTo = (route, data) => {
        navigate(route, { state: data });
      };
    

    

    

    return (
        <div className="touch-pan-y">
            {
                isAuthenticated() ? 
            <UserHeader isMobile={isMobile}
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems} 
                gotoPage={gotoPage} 
                showMarqees={false} 
            /> 
            :            
            <GuestHeader isMobile={isMobile}
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems} 
                gotoPage={gotoPage} 
                showMarqees={false} 
            />
        }

            <HeaderParallax 
                title={"A.S.K Nomination"}
                subtitle={""}
            />


{
    isLoading ? (
        <div className="flex flex-col justify-center items-center my-32 "><MiniLoading /></div>
    ) 
    : 
    errorMessage.message ? (
        <div className="flex flex-col justify-center items-center  text-red-500 text-center my-32">

            <CancelIcon className='text-red-500' style={{ width: '64px', height: '64px' }}/>
            <h1 className="mt-2 font-bold ">
            {errorMessage.message}
                            </h1></div>
    ) : 
    !item ? (
        <div className="flex flex-col justify-center items-center  my-32">
            <CancelIcon className='text-red-500' style={{ width: '64px', height: '64px' }}/>
            <h1 className="text-2xl font-bold text-gray-800">                
            Help request not found
                            </h1>

                            <div 
              onClick={() => { 
                navigateTo('/single-request', { selectedItem: carouselRequestItems[0], allItems: carouselRequestItems  });
            }}
              style={{ borderWidth: '0px', width: '200px' }}
              className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
              Okay
            </div>
            </div>
    ) : (
        <div className="flex flex-col items-center p-4 touch-pan-y">
                <div className="w-full max-w-3xl mt-4 mb-4">
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
                                You are viewing {item.fullname_for_comparison}'s help request
                            </h1>
                            <p className="text-gray-600 my-2">
                                {item.description || "No Description Available"}
                            </p>
                        </div>

                        <motion.div
                            className="w-full flex justify-center"
                        >
                            <img 
                                src={import.meta.env.VITE_API_SERVER_URL + "../../../" + item.request_image}
                                alt={item.title} 
                                className="rounded-lg object-cover"
                                style={{ 
                                    width: '190px',
                                    height: '190px',
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
                            <motion.button>
                                <WidgetNominate 
                                helpToken={helpToken} userDetails={userDetails} 
                                refreshUserDetails={refreshUserDetails} 
                                //itemName={item.fullname_for_comparison} 
                                openNotificationModal={openNotificationModal}
                                />
                            </motion.button>
                            <motion.button>
                                <WidgetShare helpToken={helpToken}/>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
    )
}




        
<NotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
            /> 

            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}