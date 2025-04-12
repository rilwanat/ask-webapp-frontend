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


import WidgetForAsk from './user/WidgetForAsk';
import WidgetForEditAsk from './user/WidgetForEditAsk';

//
import axiosInstance from '../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../auth/authUtils'; // Import getCookie function
//


export default function AskPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails
 }) {
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }


    
      const [isLoading, setIsLoading] = useState(false);
      const [myActiveRequestsData, setMyActiveRequestsData] = useState(null);
      
    
           useEffect(() => {
            getActiveHelpRequests();
          }, [userDetails]);
          const getActiveHelpRequests = async () => {
        if (userDetails === null) { return; }
    
            setIsLoading(true);
        
        
            const requestData = {   
                email: userDetails.email_address, 
               };

            //    alert(JSON.stringify(userDetails), null, 2);
            // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_GET_MY_HELP_REQUEST);
            try {
              // API request to get doctors count
              const myActiveHelpRequestEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_GET_MY_HELP_REQUEST;
              // alert(adminBankCodesEndpoint);
              const myActiveHelpRequestResponse = await axiosInstance.post(myActiveHelpRequestEndpoint, requestData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              setIsLoading(false);

              
              // alert(JSON.stringify(myActiveHelpRequestResponse.data.requestData), null, 2);
              setMyActiveRequestsData(myActiveHelpRequestResponse.data.requestData);  // Update state with doctors count
          
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
    


    return (
        <div className="">
            <GuestHeader 
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

            
            {/* {myActiveRequestsData.id} */}

{
  myActiveRequestsData === null ? (
    <WidgetForAsk 
    userDetails={userDetails} 
    refreshUserDetails={refreshUserDetails} 
    getActiveHelpRequests={getActiveHelpRequests}
    />
  )
 
            : <WidgetForEditAsk 
            userDetails={userDetails} 
            refreshUserDetails={refreshUserDetails} 
            getActiveHelpRequests={getActiveHelpRequests}
            myActiveRequestsData={myActiveRequestsData}
            />
  
}
            



            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}
