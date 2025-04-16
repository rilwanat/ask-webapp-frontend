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
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

import ReactCountryFlag from 'react-country-flag';
import countries from 'world-countries';

import SelfieWidget from './SelfieWidget';

const WidgetForKyc = ({ userDetails, refreshUserDetails }) => {
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


  // Filter and sort countries with dial codes
  const filteredCountries = countries
    .filter(c => c.idd && c.idd.root)
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialCode, setDialCode] = useState('+234');
  useEffect(() => {
  const selectedCountry = filteredCountries.find(c => c.cca2 === countryCode);
  if (selectedCountry) {
    const newDialCode = selectedCountry.idd.root + (selectedCountry.idd.suffixes?.[0] || '');
    
    // Get just the number part (without any previous dial code)
    const numberPart = phoneNumber.replace(/^\+\d+/, '').replace(/\D/g, '');
    
    setDialCode(newDialCode);
    setPhoneNumber(newDialCode + numberPart);
  }
  }, [countryCode]);
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    
    // If user tries to delete the dial code, prevent it
    if (inputValue.length < dialCode.length) {
      setPhoneNumber(dialCode);
      return;
    }
    
    // Only allow changes after the dial code
    if (inputValue.startsWith(dialCode)) {
      const numberPart = inputValue.slice(dialCode.length).replace(/\D/g, '');
      setPhoneNumber(dialCode + numberPart);
    }
    };
  // Filter and sort countries with dial codes




      // const [fullname, setFullname] = useState('');
      // const [phoneNumber, setPhoneNumber] = useState('');
      const [accountNumber, setAccountNumber] = useState('');      
      const [bankName, setBankName] = useState('');      
      const [bankCode, setBankCode] = useState('');      
      const [gender, setGender] = useState('');      
      const [residence, setResidence] = useState('');  

      const [imageSrc, setImageSrc] = useState(null);


      
      const [bankCodesData, setBankCodesData] = useState([]);
      const [inputValue, setInputValue] = useState('');
      const [filteredBanks, setFilteredBanks] = useState([]);
      const [selectedBank, setSelectedBank] = useState(null);
      const handleBankCodeChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        const matches = bankCodesData.filter((bank) =>
          bank.bank_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBanks(matches);
      };    
      const handleBankCodeSelect = (bank) => {
        setBankName(bank.bank_name);
        setInputValue(bank.bank_name);
        setSelectedBank(bank); setBankCode(bank.bank_code);
        setFilteredBanks([]);
      };



      

      // Function to validate Fullname as two words separated by space with no numbers or special characters
const isValidFullname = (fullname) => {
    const fullnamePattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    return fullnamePattern.test(fullname);
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

    // Function to validate Nigerian phone number format with +234
    const isValidWorldNumber = (worldPhoneNumber) => {
      return worldPhoneNumber.length != dialCode.length;
    };
  

// Convert data URL to blob
const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};


      const updateSelfieImage = async () => {
        // alert("1");

        if (!imageSrc) {
          openNotificationModal(false, "Update Selfie Image", "Take a selfie to upload");
          
          return;
        }
        // alert("2");

        if (isLoading) {
            // alert("please wait..");
            openNotificationModal(false, "Update Selfie Image", "Please wait...");
            
            return;
        }
        // alert("3");
        const imageBlob = dataURLtoBlob(imageSrc);
        const formData = new FormData();
        formData.append('email', userDetails.email_address);
        formData.append('image', imageBlob, userDetails.id + '-selfie.jpg');
         

          
        setIsLoading(true);

        try {
            
            var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_UPDATE_SELFIE_IMAGE;
      //  alert(endpoint);
    //    return;
   
    const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      setIsLoading(false);
                // alert(JSON.stringify(response.data, null, 2));


                if (response.data.status) {
                  setErrorMessage({ message: '' });
                  
                  openNotificationModal(true, "Update Selfie Image", response.data.message);
                  
                    

                } else {
                    // alert("error: " + response.data.message);
                    openNotificationModal(false, "Update Selfie Image", response.data.message);
                    
                }
        } catch (error) {
          setIsLoading(false);
            // alert("error: " + error);
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            openNotificationModal(false, "Update Selfie", errorMessage);
            
        }
    };

    const UpdateUserKyc  = async (e) => {
 
    //    alert("here");

// Validate Phonenumber before proceeding
if (!(isValidWorldNumber(phoneNumber))) {
    // alert('Enter a valid phone number');
    openNotificationModal(false, "ASK KYC", `Enter a valid phone number`);
    
    return;
}

// Validate Account number before proceeding
if (!isNumericWithLength(accountNumber)) {
    // alert('Invalid Account number');
    openNotificationModal(false, "ASK KYC", `Invalid Account number`);
            
    return;
}


// alert( bankName + " " + gender + " " + residence );

if ((bankName === "Select") || (bankName === "")) {
  openNotificationModal(false, "ASK KYC", `Select your Bank`);
  
  return;
}
if ((gender === "Select") || (gender === "")) {
  openNotificationModal(false, "ASK KYC", `Select your Gender`);
  
  return;
}
if ((residence === "Select") || (residence === "")) {
  openNotificationModal(false, "ASK KYC", `Select your Residence`);
  
  return;
}

 
if (!imageSrc) {
  openNotificationModal(false, "Update Selfie Image", "Take a selfie to upload");
  
  return;
}
 
         e.preventDefault();
         setErrorMessage({ message: '' });
       
         setIsLoading(true);
       

         

         try {
     
           const requestData = {   
            email: userDetails.email_address,  
            // fullname: fullname,  
            phoneNumber: phoneNumber,
            accountNumber: accountNumber,
            // accountName: fullname,
            bankName: bankName,
            bankCode: bankCode,
            gender: gender,
            residence: residence
           };
          //  alert("requestData: " + JSON.stringify(requestData, null, 2));
     
           const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_UPDATE_KYC, requestData, {
             headers: {
                   // 'Content-Type': 'multipart/form-data',
                   'Content-Type': 'application/json',
               },
           });
     
           setIsLoading(false);
          //  alert("kyc: " + JSON.stringify(response.data, null, 2));
     // return;
     
           if (response.data.status) {
            
            


             // If login is successful
             setErrorMessage({ message: 'Uploading image please wait..' });
             

            //  setFullname('');
             setPhoneNumber('');
             setAccountNumber('');      
             setBankName('');      
             setBankCode('');      
             setGender('');      
             setResidence(''); 

             
             
             updateSelfieImage();


             
             setCookie('ask-user-details', JSON.stringify(response.data.userData));
             refreshUserDetails();

             navigateTo('/');


            //  return;     
            // //  alert("Your kyc is pending approval. You will be notified once it is approved.");
            //  openNotificationModal(true, "ASK KYC", `Your kyc is pending approval. You will be notified once it is approved.`);
            //   setIsNotificationModalOpen(true);
     

              

             
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

           openNotificationModal(false, "ASK KYC", errorMessage);
              

         } else if (error.response && error.response.data && error.response.data.errors) {
           const { errors } = error.response.data;
           const errorMessages = errors.map(error => error.msg);
           const errorMessage = errorMessages.join(', '); // Join all error messages
           setErrorMessage({ message: errorMessage });

           openNotificationModal(false, "ASK KYC", errorMessage);
              
         } else {
           setErrorMessage({ message: 'Kyc failed. Please check your data and try again.' });

           openNotificationModal(false, "ASK KYC", 'Kyc failed. Please check your data and try again.');
              
         }
       }
       };









       useEffect(() => {
        handleBankCodesData();
      }, []);
      const handleBankCodesData = async () => {
    
        setIsLoading(true);
    
    
        // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_READ_BANK_CODES);
        try {
          // API request to get  count
          const adminBankCodesEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_READ_BANK_CODES;
          // alert(adminBankCodesEndpoint);
          const adminBankCodesResponse = await axiosInstance.get(adminBankCodesEndpoint, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setBankCodesData(adminBankCodesResponse.data.data);  // Update state with  count
      
          // openNotificationModal(true, currentPageName, "");
          // alert(JSON.stringify(adminBankCodesResponse.data.data), null, 2);  // Update state with beneficiaries count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsLoading(false);
      
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
    <div className="w-full mt-24 sm:mt-20 ">
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
            <p className='mb-2 text-center' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Complete Level 2 Verification (KYC)</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
            <label className='bg-red-200 text-xs w-full text-center mb-1 py-1 rounded-lg'>Strictly for adults above 18 years</label>
      
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
              
        
       

        <div className="m-2 w-full mb-10 bg-amber-200 shadow-lg" style={{  }}>
                    <div className="mb-8">
                      <div className=" "/>
                      <div className=" mx-4 mt-4" >
                        <div className="justify-center">
                        

                        <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Email:</label>
                                <input 
                                type='text'  name='email' inputMode="text" autoComplete='email'
                                // placeholder='Enter your Fullname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={userDetails && userDetails.email_address} readOnly={true}
                                style={{  }} 
                                />
                             </div>

                        {/* <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Fullname:</label>
                                <input 
                                type='text'  name='fullname' inputMode="text" autoComplete='full-name'
                                placeholder='Enter your Fullname' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                style={{  }} 
                                />
                             </div> */}


                             <div className='flex flex-col my-2'>
      <label className='text-xs mb-1'>Phone Number</label>
      <div className="flex">
        <div className="relative w-2/3 sm:w-1/3 mr-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="appearance-none border border-gray-300 rounded-sm py-2 pl-2 pr-2 w-full bg-white"
          >
            {filteredCountries.map(country => (
              <option key={country.cca2} value={country.cca2}>
                {country.flag} {' '}
                {country.name.common}
                {/* ({country.idd.root}{country.idd.suffixes?.[0]}) */}
              </option>
            ))}
          </select>
          {/* <div className="absolute right-2 top-2 pointer-events-none">
            <ReactCountryFlag 
              countryCode={countryCode} 
              svg 
              style={{ width: '20px', height: '20px' }}
            />
          </div> */}
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={dialCode + "123456789"}
          className="border border-gray-300 rounded-sm py-2 px-2 w-full bg-white" 
          onKeyDown={(e) => {
            // Prevent deleting the dial code with backspace/delete
            if (e.key === 'Backspace' || e.key === 'Delete') {
              if (e.target.selectionStart <= dialCode.length) {
                e.preventDefault();
              }
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text/plain');
            const numbersOnly = pastedText.replace(/\D/g, '');
            setPhoneNumber(dialCode + numbersOnly);
          }}
        />
      </div>
    </div>


                             <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Account Number: (10 digits)</label>
                                <input 
                                type='text'  name='account_number' inputMode="text" autoComplete='account-number'
                                placeholder='Enter your Account Number' 
                                className='border border-gray-300 rounded-sm py-2 px-2 w-full bg-white'
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                maxLength={10}
                                style={{  }} 
                                />
                             </div>

                             <div className='flex flex-col my-2'>
  <label className='text-xs mb-1'>Bank Name:</label>
  <div className="relative w-full">
    <input
      type="text"
      className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-theme focus:border-theme block w-full p-2 pl-4 pr-10"
      value={inputValue}
      onChange={handleBankCodeChange}
      placeholder={isLoading ? "Loading banks..." : "Select bank"}
      disabled={isLoading}
      readOnly={!!selectedBank}
    />

    {selectedBank && (
      <button
        type="button"
        onClick={() => {
          setSelectedBank(null);
          setInputValue('');
        }}
        className="absolute top-1/2 -translate-y-1/2 right-3 text-sm text-red-500 hover:text-red-700 cursor-pointer"
      >
        ✕
      </button>
    )}

    {filteredBanks.length > 0 && !selectedBank && (
      <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-48 overflow-auto">
        {filteredBanks.map((bank) => (
          <li
            key={bank.id}
            onClick={() => handleBankCodeSelect(bank)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {bank.bank_name}
          </li>
        ))}
      </ul>
    )}
  </div>
  {/* {selectedBank && (
          <p className="text-xs mt-2 m text-gray-600">
            Selected Bank Code: <strong>{selectedBank.bank_code}</strong>
          </p>
        )} */}
</div>


                             <div className='flex flex-col my-2 '>
                             <label className='text-xs mb-1'>Gender:</label>
                                <select
        id="select_gender"
        name="select_gender"
        value={gender}
        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-theme focus:border-theme block w-full p-2 pl-4 pr-8 appearance-none"
        onChange={(e) => setGender(e.target.value )}
      >
<option value="Select">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  </select>
                             </div>

                             <div className='flex flex-col my-2 '>
                                <label className='text-xs mb-1'>State of Residence:</label>
                                <select
        id="select_residence"
        name="select_residence"
        value={residence}
        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-theme focus:border-theme block w-full p-2 pl-4 pr-8 appearance-none"
        onChange={(e) => setResidence(e.target.value )}
      >
<option value="Select">Select Residence</option>
                        <option value="Non Nigerian">Non Nigerian</option>
                        <option value="Abia">Abia</option>
												<option value="Adamawa">Adamawa</option>
												<option value="Akwa Ibom">Akwa Ibom</option>
												<option value="Anambra">Anambra</option>
												<option value="Bauchi">Bauchi</option>
												<option value="Bayelsa">Bayelsa</option>
												<option value="Benue">Benue</option>
												<option value="Borno">Borno</option>
												<option value="Cross River">Cross River</option>
												<option value="Delta">Delta</option>
												<option value="Ebonyi">Ebonyi</option>
												<option value="Edo">Edo</option>
												<option value="Ekiti">Ekiti</option>
												<option value="Enugu">Enugu</option>
												<option value="FCT">Federal Capital Territory</option>
												<option value="Gombe">Gombe</option>
												<option value="Imo">Imo</option>
												<option value="Jigawa">Jigawa</option>
												<option value="Kaduna">Kaduna</option>
												<option value="Kano">Kano</option>
												<option value="Katsina">Katsina</option>
												<option value="Kebbi">Kebbi</option>
												<option value="Kogi">Kogi</option>
												<option value="Kwara">Kwara</option>
												<option value="Lagos">Lagos</option>
												<option value="Nasarawa">Nasarawa</option>
												<option value="Niger">Niger</option>
												<option value="Ogun">Ogun</option>
												<option value="Ondo">Ondo</option>
												<option value="Osun">Osun</option>
												<option value="Oyo">Oyo</option>
												<option value="Plateau">Plateau</option>
												<option value="Rivers">Rivers</option>
												<option value="Sokoto">Sokoto</option>
												<option value="Taraba">Taraba</option>
												<option value="Yobe">Yobe</option>
												<option value="Zamfara">Zamfara</option>
  </select>
                             </div>

                             
<SelfieWidget 
// uploadEndpoint={uploadEndpoint} onUploadSuccess={onUploadSuccess} onUploadError={onUploadError} 
isLoading={isLoading} setIsLoading={setIsLoading} imageSrc={imageSrc} setImageSrc={setImageSrc}
/>
{/* <p>{imageSrc}</p> */}
                             

                          <div className='my-2 text-sm text-center' style={{ color: '#c2572b' }}>{errorMessage.message}</div>

                          
                          <div className='flex justify-between items-center flex-col md:flex-row '>
                            
                          <div  
                          // onClick={(e) => {if (!isLoading) updateSelfieImage(e)}} 
                          onClick={(e) => {if (!isLoading) UpdateUserKyc(e)}}
                          style={{ borderWidth: '0px', width: '100%' }} 
                          className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
                            {isLoading ? 'Please wait..' : 'Verify KYC'}
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

export default WidgetForKyc;