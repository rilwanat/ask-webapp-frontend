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

const WidgetForAddSponsor = ({ userDetails, refreshUserDetails }) => {
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
  
      const [sponsorName, setSponsorName] = useState('');      
      const [sponsorType, setSponsorType] = useState('');    

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
      const isValidSponsorName = (name) => {
        const namePattern = /^[a-zA-Z.]+(?:\s[a-zA-Z.]+)*$/;
        return namePattern.test(name.trim());
      };
      
  
  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Function to validate Nigerian phone number format with +234
  const isValidateNigerianNumber = (ngPhoneNumber) => {
    const nigerianPhonePattern = /^\+234(70|80|81|90|91)\d{8}$/;
    return nigerianPhonePattern.test(ngPhoneNumber);
  };
  // Function to validate if input contains exactly 11 digits
const is11DigitNumber = (input) => {
    return /^\d{11}$/.test(input);
  };
  
  // Function to validate if input contains between 10-15 digits
  const isNumericWithLength = (input, min = 10, max = 15) => {
    const pattern = new RegExp(`^\\d{${min},${max}}$`);
    return pattern.test(input);
  };




    const AddSponsor  = async (e) => {
 
      //  alert(sponsorName);


       // Validate Fullname before proceeding
  if (!isValidSponsorName(sponsorName)) {
    // alert('Invalid Fullname');
    openNotificationModal(false, "ASK Add Sponsor", "Invalid Sponsor Name. Only alphabetic characters and single spaces between words are allowed.");
    
    return;
}



if ((sponsorType === "Select") || (sponsorType === "")) {
  openNotificationModal(false, "ASK Add Sponsor", `Select Sponsor Type`);
  
  return;
}

 

// alert("Sponsor");
//            return;


 
         e.preventDefault();
         setErrorMessage({ message: '' });
       
         
       

         
         
         try {
     

           const formData = new FormData();
           formData.append('sponsorName', sponsorName.trim());
           formData.append('sponsorType', sponsorType.trim());
        
           if (selectedFile !== null) {
            formData.append('image', selectedFile);
          } else {
            // alert("Please select an image to upload");
            openNotificationModal(false, "ASK Add Sponsor", "Select a sponsor image to upload");
            
            return;
          }


          setIsLoading(true);
          //  alert("AddSponsor: " + JSON.stringify(requestData, null, 2));

     
           const response = await axiosAdminInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_ADD_SPONSOR, formData, {
             headers: {
                   'Content-Type': 'multipart/form-data',
                  //  'Content-Type': 'application/json',
               },
           });
     
           setIsLoading(false);
          //  alert("AddSponsor: " + JSON.stringify(response.data, null, 2));
     // return;
     
           if (response.data.status) {
            
            


             // If login is successful
             setErrorMessage({ message: '' });
             
             setSponsorName('');            
             setSponsorType('');

             setSelectedFile(null);
             setPreview(null);
             
            //  alert("Your kyc is pending approval. You will be notified once it is approved.");
             openNotificationModal(true, "ASK Add Sponsor", response.data.message);
              
     

              

             
           } else {
             const errors = response.data.errors.map(error => error.msg);
             setErrorMessage({ message: response.data.message, errors });
             //alert("Failed1");
           }
         } catch (error) {
           setIsLoading(false);
 
           alert(error);
         
           if (error.response && error.response.data && error.response.data.message) {
           const errorMessage = error.response.data.message;
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "ASK Add Sponsor", errorMessage);
              

         } else if (error.response && error.response.data && error.response.data.errors) {
           const { errors } = error.response.data;
           const errorMessages = errors.map(error => error.msg);
           const errorMessage = errorMessages.join(', '); // Join all error messages
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "ASK Add Sponsor", errorMessage);
              
         } else {
           setErrorMessage({ message: 'ASK Add Sponsor failed. Please check your data and try again.' });

           openNotificationModal(false, "ASK Add Sponsor", 'ASK Add Sponsor failed. Please check your data and try again.');
              
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
            <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Add Sponsor</p>
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
                             <label className='text-xs mb-1'>Sponsor Name:</label>
                                <input 
                                type='text'  name='sponsor-name' inputMode="text" autoComplete='sponsor-name'
                                placeholder='Enter Sponsor name' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={sponsorName}
                                onChange={(e) => setSponsorName(e.target.value)}
                                style={{  }} 
                                />
                             </div>



                             <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Sponsor Type:</label>
                             <select
        id="select_bankname"
        name="select_bankname"
        value={sponsorType}
        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-theme focus:border-theme block w-full p-2 pl-4 pr-8 appearance-none"
        onChange={(e) => setSponsorType(e.target.value)}
      >
<option value="Select">Select Type</option>
  <option value="Sponsor">Sponsor</option>
  <option value="Donor">Donor</option>
  <option value="Partner">Partner</option>
  </select>
                             </div>



                             <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Sponsor Image:</label>
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
                          onClick={(e) => {if (!isLoading) AddSponsor(e)}} 
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Add Sponsor'}
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

export default WidgetForAddSponsor;