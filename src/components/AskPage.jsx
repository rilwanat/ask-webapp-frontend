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


export default function AskPage({ 
  isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails,
    handleHelpRequestsData
 }) {
    const navigate = useNavigate();

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
      
    
           useEffect(() => {
            getActiveHelpRequests();
          }, [userDetails]);
          const getActiveHelpRequests = async () => {
        // if (userDetails === null) { return; }
    
            setIsLoading(true);
        
        
            const requestData = {   
                email: userDetails.email_address, 
               };

            //    alert(JSON.stringify(userDetails), null, 2);
            // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_GET_MY_HELP_REQUEST);
            try {
              // API request to get  count
              const myActiveHelpRequestEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_GET_MY_HELP_REQUEST;
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
    
useEffect(() => {
      // setShowLevel1KYC(false);
      refreshUserDetails();
    }, [isLoading]);

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
      {userDetails && (userDetails.email_verified === null || userDetails.email_verified === "" || userDetails.email_verified === "No") ? (
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
            myActiveRequestsData === null ? (
              <WidgetForCreateAsk  
                userDetails={userDetails} 
                refreshUserDetails={refreshUserDetails} 
                getActiveHelpRequests={getActiveHelpRequests}
                navigateTo={navigateTo}
                carouselRequestItems={carouselRequestItems}
                handleHelpRequestsData={handleHelpRequestsData}
              />
            ) : (
              <WidgetForEditAsk  
                userDetails={userDetails} 
                refreshUserDetails={refreshUserDetails} 
                getActiveHelpRequests={getActiveHelpRequests}
                myActiveRequestsData={myActiveRequestsData}
              />
            )
          ) : (
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


            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
