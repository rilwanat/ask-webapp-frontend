import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import askLogo from '../../../assets/images/ask-logo.png';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
//
import axiosInstance from '../../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../../auth/authUtils'; // Import getCookie function
//


import { ClipLoader } from 'react-spinners'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import DonateAndAsk from '../../widgets/WidgetDonateAndAsk';
import AccountOptions from '../../widgets/AccountOptions';

import { GoogleLogin, googleLogout } from '@react-oauth/google';


export default function GuestHeaderHead({ carouselRequestItems, carouselBeneficiaryItems, carouselSponsorItems }) {
    const navigate = useNavigate();
    

    const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);




   const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleAccount = () => {
      setIsAccountOpen(!isAccountOpen);
    };


    const navigateTo = (route, data) => {
        navigate(route, { state: data });
      };

    

    const gotoUserProfile = () => {
        navigate('/user-dashboard');
      }


    return (
        <div className="fixed top-0 left-0 w-full z-5000   flex flex-col h-auto px-4 sm:px-16 md:px-32 py-4 pb-4 bg-theme shadow-lg">
            

            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mr-8">
                    <img
                        // className="block h-24 w-auto max-w-none"
                        className="absolute top-4 block h-24 w-auto max-w-none"
                        src={askLogo}
                        alt="Logo"
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className='text-center w-full text-white'>
                    <div className="flex items-center z-50" style={{ height: "40px" }}>
                    
                        <div
                            className="cursor-pointer ml-24 px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Home
                            </p>
                        </div>

                        {isAuthenticated() ?
         <div
         className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
         onClick={() => {
             navigate('/user-dashboard');
         }}
     >
         <p
             className="text-sm cursor-pointer"
             style={{ fontWeight: '600' }}
         >
             My Dashboard
         </p>
     </div>
 : <></>} 

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                navigate('/about-us');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                About
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                const randomIndex = Math.floor(Math.random() * carouselRequestItems.length);
                                navigateTo('/single-request', { selectedItem: carouselRequestItems[randomIndex], allItems: carouselRequestItems  });
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Requests
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                const randomIndex = Math.floor(Math.random() * carouselBeneficiaryItems.length);
                                navigateTo('/single-beneficiary', { selectedItem: carouselBeneficiaryItems[randomIndex], allItems: carouselBeneficiaryItems  });
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Beneficiaries
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                navigateTo('/single-sponsor', { selectedItem: carouselSponsorItems[0], allItems: carouselSponsorItems  });
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Benefactors
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                navigateTo('/media', { selectedItem: carouselSponsorItems[0], allItems: carouselSponsorItems  });
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Media
                            </p>
                        </div>



                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme"
                            onClick={() => {
                                navigate('/contact-us');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Contact
                            </p>
                        </div>


                        {isAuthenticated() ?
         <div
                                     className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-white hover:text-theme text-red-500"
                                     onClick={() => {
                                        
                                        googleLogout();
                                        
                                         deleteCookie("user");
                                         window.location.href = '/';
                                        //  navigate('/');
                                     }}
                                 >
                                     <p
                                         className="text-sm cursor-pointer"
                                         style={{ fontWeight: '600' }}
                                     >
                                         Logout
                                     </p>
                                 </div>
 : <></>} 
 

                        

                    </div>
                </div>

                {/* <div className="flex items-center" style={{  }}>
                    <img
                        className="block h-12 w-auto max-w-none"
                        src={scrappLogo}
                        alt="Logo"
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div> */}

                {/* <div className="flex items-center bg-blue-800">
                    <>
                        <div className="flex items-center" style={{ height: "40px" }}>
                            <div className='hidden flex-col mr-4 md:flex items-end'>
                                <p className='text-sm font-bold text-black'>{'rbapps'}</p>
                                <p className='text-sm text-black'>{'User'}</p>
                            </div>

                            <div
                                // onClick={() => { navigate('/'); }}
                                style={{ width: '176px', borderWidth: '1px' }}
                                className="text-center shadow-lg border-eDoctorBlue bg-eDoctorWhite rounded-lg px-4 py-2 text-eDoctorBlue text-sm cursor-pointer mx-1"
                            >
                                Download Our App
                            </div>

                            <div
                                // onClick={() => { handleRegister() }}
                                style={{ width: '128px', borderWidth: '1px' }}
                                className="text-center border-eDoctorBlue rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1"
                            >
                                Register
                            </div>
                        </div>
                    </>
                </div> */}



<DonateAndAsk />
                

{/* <div className='bg-white z-1000'> */}
{!isAuthenticated() ?
         <IconButton aria-label="shopping cart" sx={{ color: '#ffffff' }}
        onClick={() => {
          //navigateToSignIn();
          toggleAccount();
        }}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
 : <IconButton aria-label="shopping cart" sx={{ color: '#ffffff' }}
 onClick={() => {
    // alert("logged in: userweb des");
    
  gotoUserProfile();
 }}
 >
   <AccountCircleOutlinedIcon />
 </IconButton>} 
 {/* </div> */}



            </div>







<AccountOptions 
toggleAccount={toggleAccount} 
isAccountOpen={isAccountOpen}
setIsAccountOpen={setIsAccountOpen}
/>






        </div>
    );
}
