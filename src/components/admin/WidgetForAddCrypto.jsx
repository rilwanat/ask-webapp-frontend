import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/images/ask-logo.png';

import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';

import PsychologyIcon from '@mui/icons-material/Psychology';


import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ElderlyIcon from '@mui/icons-material/Elderly';

import NotificationModal from '../modals/NotificationModal';

//
import axiosAdminInstance from '../../auth/axiosAdminConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

const WidgetForAddCrypto = ({ userDetails, refreshUserDetails }) => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };


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


  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
      
      const [cryptoNetwork, setCryptoNetwork] = useState('');      
      const [cryptoAddress, setCryptoAddress] = useState('');    


      const [selectedFile, setSelectedFile] = useState(null);
      const [preview, setPreview] = useState(null);
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        if (file) {
          const objectUrl = URL.createObjectURL(file);
          setPreview(objectUrl);
        }
      };








      // Function to validate Fullname as two words separated by space with no numbers or special characters
      const isValidName = (name) => {
        const namePattern = /^[a-zA-Z0-9.]+(?:\s[a-zA-Z0-9.]+)*$/;
        return namePattern.test(name.trim());
      };

      const isValidCryptoAddress = (name) => {
        const namePattern = /^[a-zA-Z0-9._]+(?:\s[a-zA-Z0-9._]+)*$/;
        return namePattern.test(name.trim());
      };
      
      
  


    const AddCrypto  = async (e) => {
 
      //  alert(cryptoNetwork);


       // Validate Fullname before proceeding
  if (!isValidName(cryptoNetwork)) {
    // alert('Invalid Fullname');
    openNotificationModal(false, "A.S.K Crypto", `Invalid Crypto Network`);
    
    return;
}



       // Validate Fullname before proceeding
       if (!isValidCryptoAddress(cryptoAddress)) {
        // alert('Invalid Fullname');
        openNotificationModal(false, "A.S.K Crypto", `Invalid Crypto Address`);
        
        return;
    }

 


 
         e.preventDefault();
         setErrorMessage({ message: '' });
       
       

         
         
         try {
     
          const formData = new FormData();
          formData.append('cryptoNetwork', cryptoNetwork.trim());
          formData.append('cryptoAddress', cryptoAddress.trim());
       
          if (selectedFile !== null) {
           formData.append('image', selectedFile);
         } else {
           // alert("Please select an image to upload");
           openNotificationModal(false, "A.S.K Add Crypto", "Select a crypto image to upload");
           
           return;
         }


         
         setIsLoading(true);
     
           const response = await axiosAdminInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_ADMIN_ADD_CRYPTO, formData, {
             headers: {
                   'Content-Type': 'multipart/form-data',
                  //  'Content-Type': 'application/json',
               },
           });
     
           setIsLoading(false);
          //  alert("kyc: " + JSON.stringify(response.data, null, 2));
     // return;
     
           if (response.data.status) {
            
            


             // If login is successful
             setErrorMessage({ message: '' });
             

  
             setCryptoNetwork('');
             setCryptoAddress('');

             setSelectedFile(null);
             setPreview(null);
             
            //  alert("Your kyc is pending approval. You will be notified once it is approved.");
             openNotificationModal(true, "A.S.K Add Crypto", response.data.message);
              
     

              

             
           } else {
             const errors = response.data.errors.map(error => error.msg);
             setErrorMessage({ message: response.data.message, errors });
             //alert("Failed1");
           }
         } catch (error) {
           setIsLoading(false);
 
          //  alert(error);
         
           if (error.response && error.response.data && error.response.data.message) {
           const errorMessage = error.response.data.message;
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "A.S.K Add Crypto", errorMessage);
              

         } else if (error.response && error.response.data && error.response.data.errors) {
           const { errors } = error.response.data;
           const errorMessages = errors.map(error => error.msg);
           const errorMessage = errorMessages.join(', '); // Join all error messages
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "A.S.K Add Crypto", errorMessage);
              
         } else {
           setErrorMessage({ message: 'A.S.K Add Crypto failed. Please check your data and try again.' });

           openNotificationModal(false, "A.S.K Add Crypto failed", 'A.S.K Add Crypto failed. Please check your data and try again.');
              
         }
       }
       };

  return (
    <div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
        <div className="w-full ">



          <div className=""
            
            
            // style={{
            //   backgroundImage: `url(${background})`, 
            //   backgroundAttachment: 'fixed',
            //   backgroundSize: 'contain',
            //   backgroundPosition: 'center',
            // }}
            >

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.5 }}
className=" flex items-center justify-center "
>
<div className="mx-auto">

<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.2, duration: 0.5 }}
className="text-2xl font-bold text-theme mb-2"
>
{/* <div className='flex flex-col items-center justify-center mt-0 mb-2'>
<p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>About A.S.K Foundation</p>
<div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
</div> */}

</motion.h1>

{/* <motion.div
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.4, duration: 0.5 }}
className="text-lg text-gray-600 mb-6"
>
<div className='mb-8 text-center' style={{fontSize: '16px',   }}>
A community-based charity initiative
</div>
</motion.div> */}










<div className="mb-12"
    // style={{
    // backgroundImage: `url(${background})`, 
    // backgroundAttachment: 'fixed',
    // backgroundSize: 'contain',
    // backgroundPosition: 'center',
    // }}
>
    <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and below
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }} // Smooth animation
        className="flex flex-col w-full h-full items-center justify-center "
    >
              
        <div className='flex flex-col items-center justify-center mt-0 mb-2  w-full text-softTheme'>
            <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Manage Crypto</p>
            <div className='bg-softTheme mb-2' style={{ width: '80px', height: '2px' }}></div>
        </div> 
       

        <div className="m-2 w-full mb-10 bg-softTheme shadow-lg" style={{  }}>
                    <div className="mb-8">
                      <div className=" "/>
                      <div className=" mx-4 mt-4" >
                        <div className="justify-center">
                        

                        {/* <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Email:</label>
                                <input 
                                type='text'  name='email' inputMode="text" autoComplete='email'
                                // placeholder='Enter your Fullname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={sponsorName} 
                                onChange={(e) => setSponsorName(e.target.value)}
                                style={{  }} 
                                />
                             </div> */}

                        <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Network:</label>
                                <input 
                                type='text'  name='crypto-network' inputMode="text" autoComplete='crypto-network'
                                placeholder='Enter crypto network' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={cryptoNetwork}
                                onChange={(e) => setCryptoNetwork(e.target.value)}
                                style={{  }} 
                                />
                             </div>

                             <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Address:</label>
                                <input 
                                type='text'  name='crypto-address' inputMode="text" autoComplete='crypto-address'
                                placeholder='Enter crypto address' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={cryptoAddress}
                                onChange={(e) => setCryptoAddress(e.target.value)}
                                style={{  }} 
                                />
                             </div>



                             <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>QR Image:</label>
                             <div className='flex flex-col gap-6  p-4 w-full bg-white items-center justify-center border rounded-lg shadow-lg'>
  
                             <div className="flex flex-col gap-2 items-center w-full">
      {/* <label className="font-semibold">Sponsor 1</label> */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      )}
    </div>
    
  
</div>
</div>


                             

                          <div className='my-2 text-sm' style={{ color: '#c2572b' }}>{errorMessage.message}</div>

                          
                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          onClick={(e) => {if (!isLoading) AddCrypto(e)}} 
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Add Crypto'}
                            </div>
                          </div>



                          

                        </div>                                    
                      </div>
                    </div>
                  </div>




    </motion.div>
</div>





</div>
</motion.div>



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

export default WidgetForAddCrypto;