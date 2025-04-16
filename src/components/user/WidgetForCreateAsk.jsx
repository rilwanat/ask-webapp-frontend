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

import ShareRequestNotificationModal from '../modals/ShareRequestNotificationModal';

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

import ReactCountryFlag from 'react-country-flag';
import countries from 'world-countries';

import RequestImageWidget from './RequestImageWidget';

const WidgetForCreateAsk = ({ userDetails, refreshUserDetails, getActiveHelpRequests, navigateTo, carouselRequestItems, handleHelpRequestsData }) => {
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

      const [matchingRequestItem, setMatchingRequestItem] = useState(null);
      const [allRequestItems, setAllRequestItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [helpDescription, setHelpDescription] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [helpImagePreview, setHelpImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setHelpImagePreview(URL.createObjectURL(file));
      setErrorMessage({ message: '' });
    }
  };

    const CreateHelpRequest  = async (e) => {
 
      
      // alert("userDetails: " + JSON.stringify(userDetails, null, 2));
      if (userDetails === null) {
        openNotificationModal(false, "ASK Help Request", `You are not logged in. Please register or login to send your help request.`); 
        
        return;
      }


    //    alert("here");

    if (helpDescription === "") {
      openNotificationModal(false, "ASK Help Request", `Enter a Help Request description`);
      
      return;
    }


         e.preventDefault();
         setErrorMessage({ message: '' });
       
         
       

         try {
     
           const formData = new FormData();
           formData.append('email', userDetails.email_address);
           formData.append('description', helpDescription);
        
           if (selectedFile !== null) {
            formData.append('image', selectedFile);
          } else {
            // alert("Please select an image to upload");
            openNotificationModal(false, "ASK Help Request", "Select an image to upload");
            
            return;
          }

          setIsLoading(true);

          //  alert("requestData: " + JSON.stringify(requestData, null, 2));
     
           const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_CREATE_HELP_REQUEST, formData, {
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
             

            //  setFullname('');
            setHelpDescription('');            
            setSelectedFile(null);
            setHelpImagePreview(null);

   
            const data = await handleHelpRequestsData();
            // alert(data.length.toString())


            // getActiveHelpRequests();

            
            // //get id of request then find in carouselRequestsItems
            // alert("carouselRequestItems: " + JSON.stringify(carouselRequestItems, null, 2));
            const requestItem = data.find(item => item.id === response.data.id);
            setMatchingRequestItem(requestItem);
            setAllRequestItems(data);
            // alert("requestItem "  + " ->" + response.data.id + ": " + JSON.stringify(requestItem, null, 2));


             openNotificationModal(true, "ASK Help Request", response.data.message);
             
             
              

     
             
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

           openNotificationModal(false, "ASK Help Request", errorMessage);
              

         } else if (error.response && error.response.data && error.response.data.errors) {
           const { errors } = error.response.data;
           const errorMessages = errors.map(error => error.msg);
           const errorMessage = errorMessages.join(', '); // Join all error messages
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "ASK Help Request", errorMessage);
              
         } else {
           setErrorMessage({ message: 'ASK Help Request failed. Please check your data and try again.' });

           openNotificationModal(false, "ASK Help Request", 'Please check your data and try again.');
              
         }
       }
       };






       const gotoPageShareNow = () => {
        // alert("here1");
        // navigateTo('/single-request', { selectedItem: carouselRequestItems[0], allItems: carouselRequestItems  });
        navigateTo('/single-request', { selectedItem: matchingRequestItem, allItems: allRequestItems  });
        // alert("here2");
    }






  return (
    <div className="w-full  ">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
        <div className="w-full p-4">



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
<div className="mx-auto w-full md:w-1/3">

<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.2, duration: 0.5 }}
className="text-2xl font-bold text-theme mb-2"
>
<div className='flex flex-col items-center justify-center mt-0 mb-2  w-full'>
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>New Help Request</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            {/* <label className='bg-red-200 text-xs w-full text-center mb-1 py-1 rounded-lg'>Strictly for adults above 18 years</label> */}
      
        </div>

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
        className="flex flex-col w-full h-full items-center justify-center mt-4"
    >
              
         
       

        <div className="m-2 w-full mb-10 bg-softTheme shadow-lg" style={{  }}>
                    <div className="mb-8">
                      <div className=" "/>
                      <div className=" mx-4 mt-4" >
                        <div className="justify-center">
                        

                        <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Email: <strong>{userDetails && userDetails.email_address}</strong></label>
                                {/* <input 
                                type='text'  name='email' inputMode="text" autoComplete='email'
                                // placeholder='Enter your Fullname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={userDetails && userDetails.email_address} readOnly={true}
                                style={{  }} 
                                /> */}
                             </div>


                          <div className='flex flex-col my-2 '>
                                        <label className="text-sm mb-1">Description:</label>
                                        <textarea id="helpDescription" name="description"
                                        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                        block w-full p-2.5" placeholder="Describe your Help Request here..."   style={{ height: '180px' }}
                                        value={helpDescription} 
                                        onChange={(e) => setHelpDescription(e.target.value)}
                                        ></textarea>
                                    </div>


                                    <div className='flex flex-col justify-center my-2'>

<div className='flex flex-col  mb-2'>
<label className="text-sm mb-1">Select an Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className='cursor-pointer border-1 p-2 rounded-lg'
      />
</div>

{helpImagePreview && (
        <img
          src={helpImagePreview}
          alt={`Slide Help Image Preview`}
          className="w-full h-40 object-cover rounded-md mt-1"
        />
      )}

      <div className='mt-4'>
  {/* {errorMessage.message && <p className="text-sm text-red-600">{errorMessage.message}</p>} */}
</div>


</div>

          
{/* <RequestImageWidget 
// uploadEndpoint={uploadEndpoint} onUploadSuccess={onUploadSuccess} onUploadError={onUploadError} 
isLoading={isLoading} setIsLoading={setIsLoading} imageSrc={imageSrc} setImageSrc={setImageSrc}
/> */}

                          <div className='my-2 text-sm text-center' style={{ color: '#c2572b' }}>{errorMessage.message}</div>

                          
                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          // onClick={(e) => {if (!isLoading) updateSelfieImage(e)}} 
                          onClick={(e) => {if (!isLoading) CreateHelpRequest(e)}}
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Create Request'}
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

      <ShareRequestNotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={
                () => {
                  closeNotificationModal();
                  getActiveHelpRequests();
                }
                
              }
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
              
              gotoPageShareNow={gotoPageShareNow}
            />
    </div>
  );
};

export default WidgetForCreateAsk;