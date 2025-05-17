import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation  } from 'react-router-dom';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import askLogo from '../assets/images/ask-logo.png';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import Contact from './widgets/Contact';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


import WidgetForEmailVerification from './user/WidgetForEmailVerification';
import WidgetForKyc from './user/WidgetForKyc';


import WidgetForCreateAsk from './user/WidgetForCreateAsk';
import WidgetForEditAsk from './user/WidgetForEditAsk';
import WidgetForLoginAsk from './user/WidgetForLoginAsk';

//
import axiosInstance from '../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../auth/authUtils'; // Import getCookie function
//

import Loading from './widgets/Loading';
import MiniLoading from './widgets/MiniLoading';

import NotificationModal from './modals/NotificationModal';



export default function AskPage({ 
  isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails,
    handleHelpRequestsData
 }) {
    const navigate = useNavigate();
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




    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    const navigateTo = (route, data) => {
      navigate(route, { state: data });
    };

    
      const [isLoading, setIsLoading] = useState(false);
      const [myActiveRequestsData, setMyActiveRequestsData] = useState(null);

      const [checkIfUserCanAsk, setCheckIfUserCanAsk] = useState(null);
      const currentPageName = "iAsk";
      
    
           useEffect(() => {
            getCheckIfUserCanAsk();
            getActiveHelpRequests();
          }, [userDetails]);
          const getActiveHelpRequests = async () => {
        if (userDetails === null) { return; }
    
            setIsLoading(true);
        
        
            const requestData = {   
                email: userDetails.email_address, 
               };

            //    alert(JSON.stringify(userDetails), null, 2);
            try {
              // API request to get  count
              const myActiveHelpRequestEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_GET_MY_HELP_REQUEST;
              // alert(adminBankCodesEndpoint);
              const myActiveHelpRequestResponse = await axiosInstance.post(myActiveHelpRequestEndpoint, requestData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              setIsLoading(false);

              
              // alert(JSON.stringify(myActiveHelpRequestResponse.data.requestData), null, 2);
              setMyActiveRequestsData(myActiveHelpRequestResponse.data.requestData);  // Update state with  count
          
              // openNotificationModal(true, currentPageName, "");
               // Update state with beneficiaries count
            //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
        
        
        
        
        
              // Once all data is fetched, set loading to false
              
          
            } catch (error) {
              setIsLoading(false);
              
              // alert(error);
              // Handle errors
              if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                openNotificationModal(false, currentPageName + " Error", errorMessage);
              } else {
                openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
              }
            }
          };
    
useEffect(() => {
      // setShowLevel1KYC(false);
      refreshUserDetails();
    }, []);




    const getCheckIfUserCanAsk = async () => {
      
      if (userDetails === null) { return; }
      // alert("D2");

          setIsLoading(true);
      
      
          const requestData = {   
              email: userDetails.email_address, 
             };

            //  alert(JSON.stringify(userDetails), null, 2);
          try {
            // API request to get  count
            const checkIfUserCanRequestEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_CHECK_IF_USER_CAN_ASK;
            // alert(adminBankCodesEndpoint);
            const checkIfUserCanRequestResponse = await axiosInstance.post(checkIfUserCanRequestEndpoint, requestData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            setIsLoading(false);

            setCheckIfUserCanAsk(checkIfUserCanRequestResponse.data);
            if (checkIfUserCanRequestResponse.data.status) {
              
            // alert(JSON.stringify(checkIfUserCanRequestResponse.data), null, 2);
              // Update state with  count
        
            // openNotificationModal(true, currentPageName, checkIfUserCanRequestResponse.data.message);
             // Update state with beneficiaries count
          //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
      
      
      
      
      
            // Once all data is fetched, set loading to false
                            } else {
              
                              // navigate("/");
                              openNotificationModal(false, currentPageName, checkIfUserCanRequestResponse.data.message);
                              

                            }
            
            
        
          } catch (error) {
            setIsLoading(false);
            
            // alert(error);
            // Handle errors
            if (error.response && error.response.data) {
              const errorMessage = error.response.data.message;
              openNotificationModal(false, currentPageName + " Error", errorMessage);
            } else {
              openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
            }
          }
        };

    return (
        <div className="">
            <GuestHeader isMobile={isMobile}
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            {/* <Hero/> */}
            <HeaderParallax 
                // imageUrl={askLogo}
                title={"i Ask"}
                subtitle={""}
            />

            
            
{
  isAuthenticated() ? (
    <>
      {
      userDetails && (userDetails.email_verified === null || userDetails.email_verified === "" || userDetails.email_verified === "No") ? (
        <WidgetForEmailVerification 
          userDetails={userDetails} 
          refreshUserDetails={refreshUserDetails} 
        />
      ) : userDetails && (userDetails.kyc_status !== "APPROVED" || userDetails.kyc_status === "" || userDetails.kyc_status === null) ? (
        <div className="-mt-16">
          <WidgetForKyc  
            userDetails={userDetails} 
            refreshUserDetails={refreshUserDetails} 
          />
        </div>
      ) : (
        <>
          {!isLoading ? (


userDetails && (userDetails.kyc_status === 'PENDING' || userDetails.is_cheat === 'Yes') ?
            

<div className="w-full ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">


          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC is pending approval</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <p className='text-center'>Please wait for the approval process to complete.</p>
            {
              userDetails.is_cheat === 'Yes' ? <p className='text-center text-red-500'>Your account has been flagged for cheating.</p> : <></>
            }
            
        </div> 


        </div>
        </div>
        </div> :

(
            
  myActiveRequestsData === null ? (
    
    // checkIfUserCanAsk && checkIfUserCanAsk.status ? 
    (
        <WidgetForCreateAsk  
      userDetails={userDetails} 
      refreshUserDetails={refreshUserDetails} 
      getActiveHelpRequests={getActiveHelpRequests}
      navigateTo={navigateTo}
      carouselRequestItems={carouselRequestItems}
      handleHelpRequestsData={handleHelpRequestsData}
      
    />
      ) 
      // : <div className='flex flex-col items-center justify-center my-8   w-full'>
      // <p className='text-center text-red-500 font-bold'>Your account has been flagged. Please contact support.</p>
      
  // </div> 
    
    
  ) : (
    // checkIfUserCanAsk && checkIfUserCanAsk.status ? 
    (
    <WidgetForEditAsk  
      userDetails={userDetails} 
      refreshUserDetails={refreshUserDetails} 
      getActiveHelpRequests={getActiveHelpRequests}
      myActiveRequestsData={myActiveRequestsData}
      handleHelpRequestsData={handleHelpRequestsData}
      
      />
    ) 
//     : <div className='flex flex-col items-center justify-center my-8   w-full'>
//     <p className='text-center text-red-500 font-bold'>Your account has been flagged. Please contact support.</p>
    
// </div> 
  )
)
          )

           : (
            <Loading />
          )}
        </>
      )}
    </>
  ) : (
    <WidgetForLoginAsk  
      userDetails={userDetails} 
      refreshUserDetails={refreshUserDetails} 
      getActiveHelpRequests={getActiveHelpRequests}
      myActiveRequestsData={myActiveRequestsData}
    />
  )
}


{/* {myActiveRequestsData === null ? "1": "2"} */}
<NotificationModal
                          isOpen={isNotificationModalOpen}
                          onRequestClose={closeNotificationModal}
                          notificationType={notificationType}
                          notificationTitle={notificationTitle}
                          notificationMessage={notificationMessage}
                          gotoPage={gotoPage}
                        />


            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
