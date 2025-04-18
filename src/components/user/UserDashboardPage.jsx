import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import UserHeader from '../navbar/user-navbar/UserHeader';
// import AskHeader from '../navbar/AskHeader';
// import AskFooter from '../navbar/AskFooter';

import askLogo from '../../assets/images/ask-logo.png';
import contactUs from '../../assets/images/contact-us.jpg';
import hero3 from '../../assets/images/hero/hero3.jpg';

import { motion } from 'framer-motion';

import Parallax from '../widgets/Parallax';

import Hero from '../widgets/Hero';
import WidgetAboutForHome from '../widgets/WidgetAboutForHome';
import WidgetHelpRequests from '../widgets/WidgetHelpRequests';
import WidgetBeneficiaries from '../widgets/WidgetBeneficiaries';
import WidgetSponsors from '../widgets/WidgetSponsors';
import WidgetVideo from '../widgets/WidgetVideo';

// import Services from './widgets/Services';
import WidgetForKyc from './WidgetForKyc';
import WidgetForEmailVerification from './WidgetForEmailVerification';
import WidgetForDNQ from './WidgetForDNQ';

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

import BoostNotificationModal from '../modals/BoostNotificationModal';
import InfoIcon from '@mui/icons-material/Info';

export default function UserDashboardPage({ 
  isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails

}) {
    const navigate = useNavigate();
    
    const [showLevel1KYC, setShowLevel1KYC] = useState(false);
    const [showLevel2KYC, setShowLevel2KYC] = useState(false);
    // const [showBoostInfo, setShowBoostInfo] = useState(false);
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



    
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    
    useEffect(() => {
      setShowLevel1KYC(false);
      refreshUserDetails();
    }, []);



    return (
        <div className="">
            <UserHeader isMobile={isMobile}
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            

{
  showLevel2KYC  ? 
  
  <>
  <WidgetForKyc 
        userDetails={userDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
      </>
  : 
  
  <>
  {
              showLevel1KYC && (userDetails && (userDetails.email_verified === "No" || userDetails.email_verified === "" || userDetails.email_verified === null)) ? 
              <WidgetForEmailVerification 
              userDetails={userDetails} 
              refreshUserDetails={refreshUserDetails} 
            />

              :

              <div className='flex flex-col items-center mt-24 sm:mt-24'>
              {
                  <div className="flex flex-col items-center bg-white p-4 rounded-lg  ">
                      <h1 className="text-2xl font-bold text-center mt-0 mb-2">
                        Welcome {
                        userDetails && 
                        userDetails.fullname?.split(" ")[0]?.charAt(0).toUpperCase() + 
                        userDetails.fullname?.split(" ")[0]?.slice(1).toLowerCase()} !
                      </h1>
                      <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
                      {/* <p className="mt-2 text-center">Here you can manage your profile and view your KYC status.</p> */}
                  </div>
              }
    
              
  
              {/* {userDetails && userDetails.kyc_status === 'APPROVED' && userDetails.email_verified === "Yes" && ( */}
  
          <div className="flex flex-col justify-center items-center ">
          {/* <p>{userDetails.profile_picture}</p> */}
                              <img
                                  className="block h-24 w-24 max-w-none rounded-full object-cover p-0.5 border-2 border-theme"
                                  // className="absolute top-4 block h-24 w-auto max-w-none"
                                  src={userDetails && import.meta.env.VITE_API_SERVER_URL + userDetails.profile_picture}
                                  alt="Profile Image"
                                  onClick={() => {
                                      // navigate('/');
                                  }}
                                  style={{ cursor: 'pointer' }}
                              />
                              {/* <p className='mt-2'>Name</p> */}
                              {/* <p className='mt-2'>{userDetails && userDetails.fullname}</p> */}
                              
                              {/* <p className='mt-2'>Phone Number</p> */}
                              <p className='mt-2'>{userDetails && userDetails.phone_number}</p>
                              
                              {/* <p className='mt-2'>Email</p> */}
                              <p className='mt-2'>{userDetails && userDetails.email_address}</p>

                              {userDetails && (userDetails.kyc_status === '' || userDetails.kyc_status === null) && (
                              <WidgetForDNQ 
        userDetails={userDetails} 
        openNotificationModal={openNotificationModal} 
        gotoPage={gotoPage}
        />
      )}


{userDetails && userDetails.kyc_status === 'APPROVED' && (
        <div className="w-full  ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">

          <div className='flex flex-col items-center justify-center mt-0 mb-4  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC has been approved</p>
            {/* <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div> */}
            <p className='text-center'>You can now access all features.</p>
        </div> 

        </div>
        </div>

        <WidgetForDNQ 
        userDetails={userDetails} 
        openNotificationModal={openNotificationModal} 
        gotoPage={gotoPage}
        />




        </div>
)}

{userDetails && userDetails.kyc_status === 'PENDING' && (
        <div className="w-full ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">


          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC is pending approval</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <p className='text-center'>Please wait for the approval process to complete.</p>
        </div> 


        </div>
        </div>
        </div>
)}

{userDetails && userDetails.kyc_status === 'REJECTED' && (
        <div className="w-full  ">
        <div className="flex flex-col items-center h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">

          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC has been rejected</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <p className='text-center'>Please contact <a className='cursor-pointer text-red-500' onClick={() => {window.location.href = "mailto:info@askfoundations.org";}}>
            support</a> for more information.</p>
        </div> 

        </div>

        <div className='flex flex-col sm:flex-row relative'>
    
    <div 
    onClick={() => { setShowLevel2KYC(true) }}
    style={{ borderWidth: '0px', width: '300px' }}
    className='mt-4 text-white text-center rounded-sm px-4 py-2  text-sm cursor-pointer mb-20 bg-theme hover:text-softTheme'>
    {'Complete Level 2 Verification'} 
    </div>
    </div>
        </div>
        </div>
)}

                          </div>
  {/* )} */}
  
  {
  userDetails && (userDetails.email_verified === "No" || userDetails.email_verified === "" || userDetails.email_verified === null) ? 
  <>
  <div className='flex flex-col sm:flex-row relative'>
  
  <div 
  onClick={() => { setShowLevel1KYC(true) }}
  style={{ borderWidth: '0px', width: '300px' }}
  className='mt-4 text-white text-center rounded-sm px-4 py-2  text-sm cursor-pointer mb-20 bg-theme hover:text-softTheme'>
  {'Complete Level 1 Verification'} 
  </div>
  </div>
  </> 
  : <>
  {
    
    userDetails && userDetails.kyc_status === null ? (
  
    <>
    <div className='flex flex-col sm:flex-row relative'>
    
    <div 
    onClick={() => { setShowLevel2KYC(true) }}
    style={{ borderWidth: '0px', width: '300px' }}
    className='mt-4 text-white text-center rounded-sm px-4 py-2  text-sm cursor-pointer mb-20 bg-theme hover:text-softTheme'>
    {'Complete Level 2 Verification'} 
    </div>
    </div>
    </> 
    
  ) : <></>
  }


  </>
  }
  </div>
            }
  </>
}
            









<>
{/* 
            {
  userDetails && (
    (userDetails.email_verified === "No" || userDetails.email_verified === "" || userDetails.email_verified === null) ? (
      <WidgetForEmailVerification 
        userDetails={userDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
    ) : 
     userDetails.kyc_status === null ? (
      <WidgetForKyc 
        userDetails={userDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
    ) : <>
        {userDetails.kyc_status === 'PENDING' && (
        <div className="w-full mt-24 sm:mt-20 ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">


          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC is pending approval</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <p className='text-center'>Please wait for the approval process to complete.</p>
        </div> 


        </div>
        </div>
        </div>
    )}
    {userDetails.kyc_status === 'APPROVED' && (
        <div className="w-full mt-24 sm:mt-20 ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">

          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC has been approved</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <p className='text-center'>You can now access all features.</p>
        </div> 

        </div>
        </div>
        </div>
    )}
    {userDetails.kyc_status === 'REJECTED' && (
        <div className="w-full mt-24 sm:mt-20 ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4">

          <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Your KYC has been rejected</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <p className='text-center'>Please contact support for more information.</p>
        </div> 

        </div>
        </div>
        </div>
    )}


    </>
  )
} */}





    
</>
            
            


            {/* <AskFooter gotoPage={gotoPage} /> */}


                  <BoostNotificationModal
                          isOpen={isNotificationModalOpen}
                          onRequestClose={
                            () => {
                              closeNotificationModal();
                              // gotoPage("donate");
                            }}
                          notificationType={notificationType}
                          notificationTitle={notificationTitle}
                          notificationMessage={notificationMessage}
                          gotoPage={gotoPage}
                        />
        </div>
    );
}
