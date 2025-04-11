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

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

export default function UserDashboardPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,

}) {
    const navigate = useNavigate();
    
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    //const storedUserDetails = getCookie('ask-user-details');
    //const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    const [userDetails, setUserDetails] = useState(null);
    const refreshUserDetails = async () => {
        // setIsLoading(true);
        // setError(null);
        
        try {
            // Option 1: If you only need to refresh from cookies
            const storedUserDetails = getCookie('ask-user-details');
            const parsedDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
            setUserDetails(parsedDetails);
        } catch (err) {
            // setError('Failed to refresh user details');
            alert('Refresh error:', err);
        } finally {
            // setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        refreshUserDetails();
    }, []);



    return (
        <div className="">
            <UserHeader 
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            
            {/* {
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <h1 className="text-2xl font-bold">Welcome to your Profile Dashboard</h1>
                    <p className="mt-2">Here you can manage your profile and view your KYC status.</p>
                </div>
            } */}
            <>
            {/* {userDetails && userDetails.kyc_status} */}


            {
  userDetails && (
    userDetails.email_verified === "No" ? (
      <WidgetForEmailVerification 
        userDetails={userDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
    ) : userDetails.kyc_status === null ? (
      <WidgetForKyc 
        userDetails={userDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
    ) : <>
        {userDetails && userDetails.kyc_status === 'PENDING' && (
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
    {userDetails && userDetails.kyc_status === 'APPROVED' && (
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
    {userDetails && userDetails.kyc_status === 'REJECTED' && (
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

{userDetails && userDetails.kyc_status === 'APPROVED' && userDetails.email_verified === "Yes" && (
        <div className="flex flex-col justify-center items-center  mt-32 sm:mt-32">
        {/* <p>{userDetails.profile_picture}</p> */}
                            <img
                                className="block h-24 w-24 max-w-none rounded-full object-cover p-0.5 border-2 border-theme"
                                // className="absolute top-4 block h-24 w-auto max-w-none"
                                src={userDetails && import.meta.env.VITE_API_SERVER_URL + userDetails.profile_picture}
                                alt="Logo"
                                onClick={() => {
                                    // navigate('/');
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                            <p className='mt-2'>{userDetails && userDetails.fullname}</p>
                        </div>
    )}
    </>
  )
}





    
</>
            
            


            {/* <AskFooter gotoPage={gotoPage} /> */}
        </div>
    );
}
