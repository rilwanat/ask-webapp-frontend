import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminHeader from '../navbar/admin-navbar/AdminHeader';
import AdminFooter from '../navbar/admin-navbar/AdminFooter';

import askLogo from '../../assets/images/ask-logo.png';
import contactUs from '../../assets/images/contact-us.jpg';
import hero1 from '../../assets/images/hero/hero1.jpg';

import { motion } from 'framer-motion';

import Parallax from '../widgets/Parallax';

import Hero from '../widgets/Hero';
import WidgetAboutForHome from '../widgets/WidgetAboutForHome';
import WidgetHelpRequests from '../widgets/WidgetHelpRequests';
import WidgetBeneficiaries from '../widgets/WidgetBeneficiaries';
import WidgetSponsors from '../widgets/WidgetSponsors';
import WidgetVideo from '../widgets/WidgetVideo';

// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';

//
import axiosAdminInstance from '../../auth/axiosAdminConfig'; // Ensure the correct relative path
import { setCookie, getCookie, deleteCookie } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
//

import NotificationModal from '../modals/NotificationModal';


export default function GeneralSettingsPage({ 
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




    const [selectedFiles, setSelectedFiles] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [message, setMessage] = useState("");
  const [clickedButton, setClickedButton] = useState("");

  const handleFileChange = (index, file) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setPreviews(updatedPreviews);
  };

  
  
  useEffect(() => { 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }, []);
    

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [generalSettings, setGeneralSettings] = useState([]);
  const [gs, setGs] = useState({
          naira: 1,
          dollar: 1,
          exchange: 1
  
      });
      useEffect(() => {
        handleData();
      }, []);
      useEffect(() => {
        if (generalSettings?.generalSettingsData?.[0]) {
          const settingsData = generalSettings.generalSettingsData[0];
          setGs({
            naira: parseFloat(settingsData.DNQ[0]?.rate) || 0,
            dollar: parseFloat(settingsData.DNQ[1]?.rate) || 0,
            exchange: parseFloat(settingsData.Dollar_Exchange?.rate) || 0
          });
        }
      }, [generalSettings]);
      const handleData = async () => {
    
        setIsDataLoading(true);
    
    
        try {
          // API request to get  count
          // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_DASHBOARD_STATISTICS);
          const adminGeneralSettingsEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_GENERAL_SETTINGS;
          // alert(adminDashboardStatisticsEndpoint);
          const adminGeneralSettingsResponse = await axiosAdminInstance.get(adminGeneralSettingsEndpoint, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          setGeneralSettings(adminGeneralSettingsResponse.data);  // Update state with  count
      
      
          // openNotificationModal(true, currentPageName, "");
          // alert(JSON.stringify(adminGeneralSettingsResponse.data), null, 2);  // Update state with appointments count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsDataLoading(false);
      
        } catch (error) {
          setIsDataLoading(false);
          
          alert(error);
          // Handle errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            // openNotificationModal(false, currentPageName + " Error", errorMessage);
          } else {
            // openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
          }
        }
      };


      const handleSingleUpload = async (index, item) => {
        // alert("1");
        if (isDataLoading) {
          alert('Please wait');
          return;
        }
    
    
        const file = selectedFiles[index];
        if (!file) {
          setMessage('Please select a file for ' + item);
          return;
        }
        setMessage('');
        // alert("2");
        
        const formData = new FormData();
        formData.append('image', file, `slide${index + 1}.png`);
      
        const endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_UPDATE_SLIDER_IMAGE;
      
        try {
          setIsDataLoading(true);
          const response = await axiosAdminInstance.post(endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          // setMessage(`Slide ${index + 1} uploaded successfully.`);
          // alert(JSON.stringify(response.data.message), null, 2);
    
          setIsDataLoading(false);
          openNotificationModal(true, "Update Slide", response.data.message + "#");
        } catch (error) {
          setIsDataLoading(false);
    
          // alert(error);
          // console.error(`Error uploading slide${index + 1}:`, error);
          // setMessage(`Slide ${index + 1} failed to upload.`);
          openNotificationModal(false, "Update Slide", response.data.message + "#");
        }
      };

      const updateDNQ = async (user) => {


        // alert(user.userIsCheat);

        if (isDataLoading) {
          return;
        }
        
        
        
              setIsDataLoading(true);
        
        
        
            
        
        
            
            try {
        
              const requestData = {
                dnqNaira: gs.naira.toString().trim(),
                dnqDollar: gs.dollar.toString().trim()
                // kycStatus: user.userKycStatus,
            };
            // alert(JSON.stringify(requestData), null, 2);
            // setIsDataLoading(false);
            // return;
        
        
        
        
                
                var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_UPDATE_DNQ;
          //  alert(endpoint);
        //    return;
        
          const response = await axiosAdminInstance.post(endpoint, requestData, {
                      headers: {
                        "Content-Type": "application/json",
                        //Authorization: `Bearer ${token}`,
                      },
                    });
        
                    setIsDataLoading(false);
                    // alert(JSON.stringify(response.data, null, 2));
                    if (response.data.status) {
                        // alert("update-product " + JSON.stringify(response.data, null, 2));
                        openNotificationModal(true, "Update DNQ", response.data.message + "#");
                        
        
        
                        // navigateActiveTab(1);
                        // navigate('/manage-users');
        
                    } else {
                        // alert("error: " + response.data.message);
                        openNotificationModal(false, "Update DNQ", response.data.message + "#");
                        
                    }
            } catch (error) {
              setIsDataLoading(false);
                // alert("error: " + error);
                openNotificationModal(false, "Update DNQ", error + "#");
                
            }
        };

        
        const updateExhangeRate = async (user) => {


          // alert(user.userIsCheat);
  
          if (isDataLoading) {
            return;
          }
          
          
          
                setIsDataLoading(true);
          
          
          
              
          
          
              
              try {
          
                const requestData = {
                  rate: gs.exchange.toString().trim()
                  // kycStatus: user.userKycStatus,
              };
              // alert(JSON.stringify(requestData), null, 2);
              // setIsDataLoading(false);
              // return;
          
          
          
          
                  
                  var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_UPDATE_EXCHANGE_RATE;
            //  alert(endpoint);
          //    return;
          
            const response = await axiosAdminInstance.post(endpoint, requestData, {
                        headers: {
                          "Content-Type": "application/json",
                          //Authorization: `Bearer ${token}`,
                        },
                      });
          
                      setIsDataLoading(false);
                      // alert(JSON.stringify(response.data, null, 2));
                      if (response.data.status) {
                          // alert("update-product " + JSON.stringify(response.data, null, 2));
                          openNotificationModal(true, "Update Exhange Rate", response.data.message + "#");
                          
          
          
                          // navigateActiveTab(1);
                          // navigate('/manage-users');
          
                      } else {
                          // alert("error: " + response.data.message);
                          openNotificationModal(false, "Update Exhange Rate", response.data.message + "#");
                          
                      }
              } catch (error) {
                setIsDataLoading(false);
                  // alert("error: " + error);
                  openNotificationModal(false, "Update Exhange Rate", error + "#");
                  
              }
          };


    return (
        <div className="bg-theme h-full">

            <AdminHeader isMobile={isMobile}
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            
{/* Hero Upload Section */}
<div className='flex flex-col justify-center items-center px-0 sm:px-16 md:px-24 mt-4'>



<div className=' p-4 rounded-lg w-full mt-24'> 
<div className="flex flex-col  px-4  rounded-lg w-full" style={{  }}>



<div className='flex flex-col sm:flex-row gap-6  p-4 w-full bg-white items-center justify-center border rounded-lg shadow-lg'>
  {[0, 1, 2].map((index) => (
    <div key={index} className="flex flex-col gap-2 items-start w-full sm:w-1/3">
      <label className="font-semibold">Slide {index + 1}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(index, e.target.files[0])}
        // className='cursor-pointer'
      />
      {previews[index] && (
        <img
          src={previews[index]}
          alt={`Slide ${index + 1}`}
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      )}
      <button
        className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
        onClick={() => {
          setClickedButton("slide");
          handleSingleUpload(index, "Slide " + (index + 1));
        }}
        
      >
        {isDataLoading ? 'Please wait...' : `Upload Slide ${index + 1}`}
      </button>
    </div>
  ))}
  
</div>

<div className='mt-4'>
  {message && clickedButton == 'slide' && <p className="text-sm text-red-600">{message}</p>}
</div>


  </div>
  </div>



  </div>









{/* Sponsors Section */}
{/* <div className='flex flex-col justify-center items-center px-0 sm:px-16 md:px-24'>

<div className=' px-8 rounded-lg w-full mt-0'> 
<div className='flex flex-col  gap-6 mt-0 p-4 w-full bg-white items-center justify-center border rounded-lg shadow-lg'>
<div className="font-semibold">Sponsors Section</div>
<button
        className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
        // onClick={() => handleSingleUpload(index)}
      >
        Upload Sponsor
      </button>
  
</div>
</div>



  </div> */}





{/* Youtube video Section */}
  <div className='flex flex-col justify-center items-center px-4 mt-4 sm:px-16 md:px-24'>


  <div className='flex flex-col sm:flex-row w-full  mb-8'>       


{/* Youtube video Section */}
{/* <div className='flex w-full sm:w-1/2 flex-col justify-center items-center px-4 sm:px-16 md:px-8 h-full'>

<div className='flex flex-col  gap-6 mt-4 p-4 w-full bg-white items-center justify-center border rounded-lg shadow-lg'>
<div className="font-semibold">Youtube Section</div>
<div className='flex w-full'>
<label className="font-semibold mr-2 w-1/4">Youtube Url: </label>
      <input
        type="text"
        // accept="image/*"
        // onChange={(e) => handleFileChange(index, e.target.files[0])}
        className='cursor-pointer border '
        style={{ width: '100%' }}
      />
</div>

<button
        className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
        // onClick={() => handleSingleUpload(index)}
      >
        Update Youtube Link
      </button>
  
</div>

</div> */}







{/* Contact Us Section */}
{/* <div className='flex w-full sm:w-1/2  flex-col justify-center items-center px-4 sm:px-16 md:px-8 h-full '>
<div className='flex flex-col  gap-6 mt-4 p-4 w-full bg-white items-center border rounded-lg shadow-lg '>
<div className="font-semibold">Contact Us Section</div>

<div className='flex'>
<label className="font-semibold">Background Image: </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(3, e.target.files[0])}
        // className='cursor-pointer'
      />
</div>

{previews[3] && (
        <img
          src={previews[3]}
          alt={`Slide ${3 + 1}`}
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      )}
<button
        className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
        
          
        onClick={() => {
          setClickedButton("contact");
          handleSingleUpload(3, "Contact Background");
        }}
      >
        Update Contact Us
      </button>
  

      <div className='mt-4'>
  {message && clickedButton == 'contact' && <p className="text-sm text-red-600">{message}</p>}
</div>
</div>


</div> */}



</div>


  </div>






{/* Variable Settings */}
<div className='flex flex-col justify-center items-center px-4 mt-4 sm:px-16 md:px-24'>


<div className='flex flex-col sm:flex-row w-full  mb-8'>       


{/* DNQ Rates */}
<div className='flex w-full sm:w-1/2 flex-col justify-center items-center px-4 sm:px-16 md:px-8 h-full'>

<div className='flex flex-col  gap-6 mt-4 p-4 w-full bg-white items-center justify-center border rounded-lg shadow-lg'>
<div className="font-semibold">DNQ Rates</div>
<div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="naira" className="block text-sm font-medium text-black mb-2">Naira:</label>
                                            <input type="text" id="naira" name="naira"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Naira' 
                                            value={gs.naira} 
                                            onChange={(e) => setGs({ ...gs, naira: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="dollar" className="block text-sm font-medium text-black mb-2">Dollar:</label>
                                            <input type="text" id="dollar" name="dollar"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Dollar'   
                                            value={gs.dollar} 
                                            onChange={(e) => setGs({ ...gs, dollar: e.target.value })}
                                            />
                                        </div>

                                    </div>

<button
      className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
      onClick={() => updateDNQ()}
    >
      { isDataLoading ? 'Please wait..' : "Update DNQs" }
    </button>

</div>

</div>

{/* {"status":true,"generalSettingsData":[{"DNQ":{"id":"1","name":"naira","rate":"5000.00"},"Dollar_Exchange":{"id":"1","rate":"1700.00"}}]} */}





{/* Contact Us Section */}
<div className='flex w-full sm:w-1/2  flex-col justify-center items-center px-4 sm:px-16 md:px-8 h-full '>
<div className='flex flex-col  gap-6 mt-4 p-4 w-full bg-white items-center border rounded-lg shadow-lg '>
<div className="font-semibold">Dollar Exchange Rate</div>

<div className="flex flex-wrap ">
                                        <div className="w-full md:w-full px-2 mb-4">
                                            <label htmlFor="naira" className="block text-sm font-medium text-black mb-2">Exchange Rate:</label>
                                            <input type="text" id="naira" name="naira"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Naira' 
                                            value={gs.exchange} 
                                            onChange={(e) => setGs({ ...gs, exchange: e.target.value })}
                                            />
                                        </div>


                                    </div>


<button
      className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
      
        
      onClick={() => updateExhangeRate()}
    >
      { isDataLoading ? 'Please wait..' : "Update Exchange Rate" }
    </button>


    <div className='mt-4'>
{message && clickedButton == 'contact' && <p className="text-sm text-red-600">{message}</p>}
</div>
</div>


</div>



</div>


</div>

    





            {/* <LatestNews/> */}
            {/* <Parallax 
                imageUrl={hero1}
                title={"Contact Us"}
                subtitle={"Click here to reach out to us"}
            /> */}
            


            <AdminFooter 
            // gotoPage={gotoPage} 
            />


<NotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
            />
        </div>
    );
}
