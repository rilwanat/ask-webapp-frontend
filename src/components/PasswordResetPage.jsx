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



import NotificationModal from './modals/NotificationModal';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordResetPage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails
}) {
    const navigate = useNavigate();
    const { passwordResetToken } = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');



    const isValidPassword = (password) => {
        return password.length >= 8;
      };
      
      const passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
      };

          const [resetPassword, setResetPassword] = useState('');
          const [resetConfirmPassword, setResetConfirmPassword] = useState('');
 const [passwordVisible, setPasswordVisible] = useState(false);

    
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
    }, [passwordResetToken]);

    const fetchHelpRequest = async () => {
        // if ()

        try {
    
            const requestData = {   
                passwordResetToken: passwordResetToken
            };
      
            const endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_READ_PASSWORD_RESET;
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
      
            //   alert(JSON.stringify(response.data.passwordResetData, null, 2));
              setItem(response.data.passwordResetData);
      
            } else {
              const errors = response.data.errors.map(error => error.msg);
              setErrorMessage({ message: response.data.message, errors });
              alert("Failed1: Non existent");
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
            setErrorMessage({ message: `Oops!! Request failed. That's an invalid reset token.` });
          }
        }
    };

    const gotoPage = (pageName) => {
        navigate("/" + pageName);
    }

    

    const handleResetPassword = async (e) => {
        
        
        e.preventDefault();
        setErrorMessage({ message: '' });
        // alert("");
    

        
    
        if (
            resetPassword === '' || resetConfirmPassword === ''
        ) {
        //   setErrorMessage({ message: 'Password Reset Failed: Please enter valid credentials' });
          openNotificationModal(true, "Reset Password", 'Password Reset Failed: Please enter valid credentials' );
          // setRegistrationStatus("Failed");
          setIsLoading(false);
        
          //alert("");
          return;
        }


        
      if (!isValidPassword(resetPassword)) {
        // setErrorMessage({ message: 'Password must be at least 8 characters.' });
        openNotificationModal(true, "Reset Password", 'Password must be at least 8 characters.' );
        return;
      }

      if (!passwordsMatch(resetPassword, resetConfirmPassword)) {
        // setErrorMessage({ message: 'Passwords must match.' });
        openNotificationModal(true, "Reset Password", 'Passwords must match.' );
        return;
      }



    
        // alert("reset: " +  item.email_address + " " + resetPassword + " " + resetConfirmPassword);
        // alert("");
        setIsLoading(true);

        try {
          const requestData = {   
            email: item.email_address,  
            newPassword: resetPassword,
            confirmPassword: resetConfirmPassword,
          };
    
          // alert(JSON.stringify(requestData, null, 2));
        
          const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_RESET_PASSWORD, requestData, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
    
            },
          });
        
          setIsLoading(false);
          // alert(JSON.stringify(response.data, null, 2));
            // return;
        
          if (response.data.status) {
    
            
    
            // If registration is successful
            setErrorMessage({ message: '' });
    


            
            setResetPassword(''); 
            setResetConfirmPassword('');
            // navigate('/');
    
            // alert(response.data.message + "\n\n Please check your mail for a link to reset your password");
            // gotoPage("");
            openNotificationModal(true, "Reset Password", response.data.message);
            // navigate('/');
            // window.location.reload();
            

            // toggleAccountForSignIn();
          } else {
            // If there are errors in the response
            const errors = response.data.errors.map(error => error.msg);
            const errorMessage = errors.join(', ');
            setErrorMessage({ message: errorMessage });
            // alert("Registration Failed");
    
            openNotificationModal(false, "Reset Password Error", "Reset Password Failed");
          }
        } catch (error) {
          setIsLoading(false);
        
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            setErrorMessage({ message: errorMessage });
          } else if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessages = errors.map(error => error.msg);
            const errorMessage = errorMessages.join(', '); // Join all error messages
            setErrorMessage({ message: errorMessage });
          } else {
            setErrorMessage({ message: 'Reset Password failed. Please check your credentials and try again.' });
          }
        }
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
            Password reset not found
                            </h1>
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
                                Hello, {item.email_address}, 
                            </h1>
                            <p className="text-gray-600 my-2">
                            Reset your password below:
                            </p>
                        </div>



                        {/* <div className='flex flex-col items-center touch-pan-y '> */}
                            <motion.button>
                                
                                <div className='flex flex-col sm:flex-row  mt-2'>
                                                             <div className='flex flex-col sm:flex-row relative sm:w-1/2 w-full'>
                                                                <input 
                                                                type={passwordVisible ? 'text' : 'password'} name='user_password' inputMode="text" autoComplete='given-name'
                                                                placeholder='New Password' 
                                                                className='border border-gray-300 rounded-sm py-2 px-2 w-full md:mr-2 mt-0 bg-white'
                                                                value={resetPassword}
                                                                onChange={(e) => setResetPassword(e.target.value)}
                                                                style={{  }} 
                                                                />
                                                                                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 mt-1 mr-2">
                                                                    <div tabIndex="-1" onClick={() => setPasswordVisible(!passwordVisible)}>
                                                                        {passwordVisible ? <VisibilityOff className='p-1'/> : <Visibility className='p-1'/>}
                                                                    </div>
                                                              </div>
                                                              </div>
                                                                
                                                              <div className='flex flex-col sm:flex-row relative sm:w-1/2 w-full '>
                                                                <input 
                                                                type={passwordVisible ? 'text' : 'password'}  name='user_confitm_password' inputMode="text" autoComplete='given-name'
                                                                placeholder='Confirm Password' 
                                                                className='border border-gray-300 rounded-sm py-2 px-2 w-full md:ml-2 mt-2 md:mt-0 bg-white'
                                                                value={resetConfirmPassword}
                                                                onChange={(e) => setResetConfirmPassword(e.target.value)}
                                                                style={{  }} 
                                                                />
                                                                                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 mt-1 mr-2">
                                                                    <div tabIndex="-1" onClick={() => setPasswordVisible(!passwordVisible)}>
                                                                        {passwordVisible ? <VisibilityOff className='p-1'/> : <Visibility className='p-1'/>}
                                                                    </div>
                                                                </div>
                                                              </div>
                                                             </div>



                                                             <div className='my-2 text-sm' style={{ color: '#c2572b' }}>{errorMessage.message}</div>

                          
                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          onClick={(e) => {if (!isLoading) handleResetPassword(e)}} 
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Reset Password'}
                            </div>
                          </div>
                                
                            </motion.button>
                        {/* </div> */}
                    </motion.div>
                </div>
            </div>
    )
}




        
<NotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={
                // closeNotificationModal
                () => {
                  window.location.href = '/';
                }
              }
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
            /> 

            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}