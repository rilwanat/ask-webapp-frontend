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
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import NotificationModal from '../modals/NotificationModal';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//


const Contact = ({ }) => {
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

    

 const [errorMessage, setErrorMessage] = useState('');
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [contactName, setContactName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  
  const validateInputs = () => {
    const missingFields = [];

    // if (!contactName.trim()) missingFields.push('Contact Name');
    // if (!address.trim()) missingFields.push('Address');
    // if (!phoneNumber.trim()) missingFields.push('Phone Number');
    if (!email.trim()) missingFields.push('Email');
    if (!message.trim()) missingFields.push('Message');


    if (missingFields.length > 0) {
        // alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        openNotificationModal(false, "A.S.K Foundation", `Please fill in the following required fields: ${missingFields.join(', ')}`);
        setIsNotificationModalOpen(true);
        return false;
    }

    return true;
};

const isValidNumber = (number) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(number);
  };
const isValidateNigerianNumber = (ngPhoneNumber) => {
    const nigerianPhonePattern = /^\+234(70|80|81|90|91)\d{8}$/;
    return nigerianPhonePattern.test(ngPhoneNumber);
  };
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSendMessage = async () => {
  
    if (isMessageSending) {
      // alert("Please, wait message is sending");
      openNotificationModal(false, "A.S.K Foundation", "Please, wait message is sending");
          setIsNotificationModalOpen(true);
  
      return;
    }
    
    // if (!validateInputs() 
    //   // || !validateCheckboxes()
    // ) {
    //   // alert("Please, enter a valid inputs");
    //   // openNotificationModal(false, "A.S.K Foundation", "Please, enter a valid inputs");
    //   
    //     return;
    // }
  
  
  //   if (!isValidNumber(phoneNumber)) {
  //     // openNotificationModal(false, currentPageName + " Form Error", 'Invalid email address');
  //     // alert("Please, enter a valid phone number, numbers only.");
  //     openNotificationModal(false, "A.S.K Foundation", "Please, enter a valid phone number, numbers only.");
      
  //     return;
  // }
  
    if (!isValidEmail(email)) {
      // openNotificationModal(false, currentPageName + " Form Error", 'Invalid email address');
      // alert("Please, enter a valid email.");
      openNotificationModal(false, "A.S.K Foundation", "Please, enter a valid email.");
      
      return;
  }
  
  
  
    const formData = new FormData();
    formData.append('contact_name', contactName);
    formData.append('phone_number', phoneNumber);
    formData.append('email', email);    
    formData.append('address', address);
    formData.append('message', message);
  
  
    setIsMessageSending(true);
    
//     const formDataObj = {};
// formData.forEach((value, key) => {
//   formDataObj[key] = value;
// });
// alert("FormData as object:\n" + JSON.stringify(formDataObj, null, 2));
             try {
         
    
    
              //  alert("requestData: " + JSON.stringify(formData, null, 2));
         
               const response = await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_SEND_MAIL, formData, {
                 headers: {
                       'Content-Type': 'multipart/form-data',
                      //  'Content-Type': 'application/json',
                   },
               });
         
               setIsMessageSending(false);
              //  alert("requestData: " + JSON.stringify(response.data, null, 2));
         // return;
         
               if (response.data.status) {
                
                 // If login is successful
                 setErrorMessage({ message: '' });
                 
    
                // Reset form
                setContactName('');
                setAddress('');
                setPhoneNumber('');
                setEmail('');
                setMessage('');
    
       
    
                 openNotificationModal(true, "A.S.K Foundation", response.data.message);
                 
                 
                  
    
         
                 
               } else {
                 const errors = response.data.errors.map(error => error.msg);
                 setErrorMessage({ message: response.data.message, errors });
                 //alert("Failed1");
               }
             } catch (error) {
              setIsMessageSending(false);
     
              //  alert(error);
             
               if (error.response && error.response.data && error.response.data.message) {
               const errorMessage = error.response.data.message;
               setErrorMessage({ message: errorMessage });
    
               openNotificationModal(false, "A.S.K Foundation", errorMessage);
                  
    
             } else if (error.response && error.response.data && error.response.data.errors) {
               const { errors } = error.response.data;
               const errorMessages = errors.map(error => error.msg);
               const errorMessage = errorMessages.join(', '); // Join all error messages
               setErrorMessage({ message: errorMessage });
    
               openNotificationModal(false, "A.S.K Foundation", errorMessage);
                  
             } else {
               setErrorMessage({ message: 'A.S.K Foundation. Please check your data and try again.' });
    
               openNotificationModal(false, "A.S.K Foundation", 'Please check your data and try again.');
                  
             }
           }








  };

  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">





        <div className="px-0 md:px-4 lg:px-16 xl:px-24 2xl:px-80 py-2"
            
            
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
              className="text-2xl font-bold text-gray-800 mb-2"
              >
              {/* <div className='flex flex-col items-center justify-center mt-0 mb-2'>
              <p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Contact Us</p>
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
              Complete the form below and we will get back to you.
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
                      className="flex flex-col w-full h-full items-center justify-center mt-4"
                  >
                      {/*       
                      <div className='flex flex-col items-center justify-center mt-16 mb-2'>
                          <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>About Us</p>
                          <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
                      </div> 
                      */}
              
                      
                      
              <div className=' flex flex-col md:flex-row items-center justify-between mt-0'>
<div className='flex flex-col w-full md:w-1/3 justify-center items-center rounded-lg shadow-md m-2 p-4 bg-white min-h-[200px]   '>
<div className="mb-4" style={{ fontWeight: '600', fontSize: '16px' }}>Phone Number</div>
<LocalPhoneIcon className="mb-2" style={{ width: '40px', height: '40px', color: '#161c34' }}/>

<div className="px-8 text-center"  style={{fontSize: '16px',   }}>
<a className='cursor-pointer' onClick={() => {window.location.href = "tel:+2349122090051";}}>+234 912 2090 051</a>
<br/><a className='cursor-pointer' onClick={() => {window.location.href = "tel:+447864869571";}}>+44 786 4869 571</a>
<br/><a className='cursor-pointer' onClick={() => {window.location.href = "tel:+2349051047138";}}><WhatsAppIcon style={{cursor: "pointer", color: "#000000" }}/> +234 905 1047 138</a>
</div>
</div>
<div className='flex flex-col w-full md:w-1/3 justify-center items-center rounded-lg shadow-md m-2 p-4 bg-white min-h-[200px]   '>

<div className="mb-4" style={{ fontWeight: '600', fontSize: '16px' }}>Email Address</div>
<AttachEmailIcon className="mb-2" style={{ width: '40px', height: '40px', color: '#161c34' }}/>
<div className="px-8 text-center cursor-pointer"  style={{fontSize: '16px',   }} onClick={() => {window.location.href = "mailto:info@askfoundations.org";}}>
info@askfoundations.org
</div>
</div>
<div className='flex flex-col w-full md:w-1/3 justify-center items-center rounded-lg shadow-md m-2 p-4 bg-white min-h-[200px]   '>

<div className="mb-4" style={{ fontWeight: '600', fontSize: '16px' }}>Address</div>
<LocationOnIcon className="mb-2" style={{ width: '40px', height: '40px', color: '#161c34' }}/>
<div className="px-8 text-center"  style={{fontSize: '16px',   }}>
69 Avenue Road, Bexleyheath Kent DA7 4EQ, London.
</div>
</div>

</div>




                  </motion.div>
              </div>
              
              
              </div>
              </motion.div>



              <div className="flex flex-col justify-center items-center text-gray-200 text-center p-4">
        {/* <h2 className="text-3xl font-bold mb-2 z-90">{title}</h2> */}
        <div className='bg-theme mb-2 z-90' style={{ width: '80px', height: '4px' }}></div>
        {/* <p className="text-lg z-90">{subtitle}</p>         */}
      </div>




              <div className=" py-2 mt-0"


// style={{
//   backgroundImage: `url(${background})`, 
//   backgroundAttachment: 'fixed',
//   backgroundSize: 'contain',
//   backgroundPosition: 'center',
// }}
>






{/* <p className='flex justify-center mb-2' style={{fontSize: '16px', }}>Complete the form below and we will get back to you.</p> */}
<motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 mb-6"
              >
              <div className='mb-8 text-center' style={{fontSize: '16px',   }}>
              Complete the form below and we will get back to you.
              </div>
              </motion.div>


<div className='flex flex-col sm:flex-row relative  '>
<input
type='text'
placeholder='Name'
className='pl-4 border border-gray-300 rounded-sm py-2 px-2 w-full my-2 bg-white'
value={contactName}
onChange={(e) => setContactName(e.target.value)}
style={{  }}
/>
</div>


<div className='flex flex-col sm:flex-row relative'>
<input
type='text'
placeholder='Phone Number'
className='pl-4 border border-gray-300 rounded-sm py-2 px-2 w-full sm:mr-2   my-2 bg-white'
value={phoneNumber}
onChange={(e) => setPhoneNumber(e.target.value)}
style={{  }}
/> 
<input
type='text'
placeholder='Email*'
className='pl-4 border border-gray-300 rounded-sm py-2 px-2 w-full sm:ml-2   my-2 bg-white'
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{  }}
/>
</div>  

<div className='flex flex-col sm:flex-row relative  '>
<input
type='text'
placeholder='Address'
className='pl-4 border border-gray-300 rounded-sm py-2 px-2 w-full my-2 bg-white'
value={address}
onChange={(e) => setAddress(e.target.value)}
style={{  }}
/>
</div> 

<div className='flex flex-col sm:flex-row relative  '>
<textarea
type='text'
placeholder='Message*'
className='pl-4 border border-gray-300 rounded-sm py-2 px-2 w-full my-2 bg-white'
value={message}
onChange={(e) => setMessage(e.target.value)}
style={{  }}
rows="4"
/>
</div> 


<div className='flex flex-col sm:flex-row relative'>

<div 
onClick={() => { handleSendMessage() }}
style={{ borderWidth: '0px', width: '200px' }}
className='mt-4 text-white text-center rounded-sm px-4 py-2  text-sm cursor-pointer mb-20 bg-theme hover:text-softTheme'>
{isMessageSending ? 'Please wait..' : 'Send Message'} 
</div>
</div>

</div>



















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

export default Contact;