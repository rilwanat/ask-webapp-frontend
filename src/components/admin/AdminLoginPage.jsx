import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// import AskAdminHeader from '../navbar/AskAdminHeader';
// import AskHeader from '../navbar/AskHeader';
// import AskFooter from '../navbar/AskFooter';

import askLogo from '../../assets/images/ask-logo.png';
// import contactUs from '../../assets/images/contact-us.jpg';
// import hero3 from '../../assets/images/hero/hero3.jpg';

import { motion } from 'framer-motion';

// import Parallax from '../widgets/Parallax';

// import Hero from '../widgets/Hero';
// import WidgetAboutForHome from '../widgets/WidgetAboutForHome';
// import WidgetHelpRequests from '../widgets/WidgetHelpRequests';
// import WidgetBeneficiaries from '../widgets/WidgetBeneficiaries';
// import WidgetSponsors from '../widgets/WidgetSponsors';
// import WidgetVideo from '../widgets/WidgetVideo';

// // import Services from './widgets/Services';
// import WidgetForKyc from './WidgetForKyc';
import WidgetForAdminLogin from './WidgetForAdminLogin';

//
import axiosAdminInstance from '../../auth/axiosAdminConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

export default function AdminLoginPage({ 
  isMobile,
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

    
    



    const currentPageName = "Admin Login";//requestData.userFullname;




    return (
        <div className="bg-theme h-full">
            {/* <AskAdminHeader 
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} /> */}

            
<div className='flex flex-col items-center px-0 sm:px-16 md:px-24 h-full'>

<div className=' p-4 rounded-lg w-full mt-24'> 
      <div className="p-4 bg-theme rounded-lg w-full" style={{  }}>





                      <div className='mx-0  '>
                        <div className=''>

                        











                        <div className='flex w-full '>
                        <div className="w-full " >
                                    
                                    <div className=''>
                                    <div className='' style={{ width: '100%'  }}>
                                        <div className="">
                                            {/* <h1 className="">#</h1> */}
                                            <div className=" " style={{  }}>
                                                

                                            <div className="flex flex-col overflow-x-auto">
  <div className="">
    <div className="inline-block min-w-full  ">
      <div className="overflow-x-auto">



<div className="flex justify-center items-center">
                    <img
                        // className="block h-24 w-auto max-w-none"
                        className="absolute top-8 block h-24 w-auto max-w-none"
                        src={askLogo}
                        alt="Logo"
                        onClick={() => {
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div>




      <WidgetForAdminLogin 
        // adminDetails={adminDetails} 
        // refreshUserDetails={refreshUserDetails} 
      />








    </div> </div> </div> </div>
















                                            </div>
                                        </div>
                                    </div>

                                    </div>




                                </div>
                            
                        </div>
                        

                       </div>
                    </div>






            
                        
                    </div>
                    </div>




                    </div>
{/* 
<AskFooter gotoPage={gotoPage} /> */}




            
            {/* {
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <h1 className="text-2xl font-bold">Welcome to your Profile Dashboard</h1>
                    <p className="mt-2">Here you can manage your profile and view your KYC status.</p>
                </div>
            } */}
            <>
            {/* {adminDetails && adminDetails.kyc_status} */}


            {/* {
  adminDetails && (
    adminDetails.email_verified === "No" ? (
      <WidgetForEmailVerification 
        adminDetails={adminDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
    ) : adminDetails.kyc_status === null ? (
      <WidgetForKyc 
        adminDetails={adminDetails} 
        refreshUserDetails={refreshUserDetails} 
      />
    ) : null
  )
} */}

    
</>
            
            


            {/* <AdminFooter 
            // gotoPage={gotoPage} 
            /> */}
        </div>
    );
}
