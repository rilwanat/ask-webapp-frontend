import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminHeader from '../navbar/admin-navbar/AdminHeader';
import AdminFooter from '../navbar/admin-navbar/AdminFooter';


import { motion } from 'framer-motion';

import WidgetForAddCrypto from './WidgetForAddCrypto';

//
import axiosAdminInstance from '../../auth/axiosAdminConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

import NotificationModal from '../modals/NotificationModal';


export default function AdminBroadcastPage({ 
  isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,

}) {
    const navigate = useNavigate();
    
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const [broadcastMessage, setBroadcastMessage] = useState("");
const [isDataloading, setIsDataLoading] = useState(false);


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
    



    
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }



    const currentPageName = "Add Sponsor";//requestData.userFullname;

    const sendBroadcast = async () => {
      if (isDataloading) {
        openNotificationModal(false, "Broadcast", "Please wait...");
        return;
      }
    
      if (!broadcastMessage.trim()) {
        openNotificationModal(false, "Broadcast", "Message cannot be empty.");
        return;
      }
    
      setIsDataLoading(true);
    
      try {
        const endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_BROADCAST;
    
        const response = await axiosAdminInstance.post(endpoint, { message: broadcastMessage });
    
        setIsDataLoading(false);
    
        if (response.data.status) {
          openNotificationModal(true, "Broadcast Sent", response.data.message || "Message sent successfully.");
          setBroadcastMessage(""); // Clear textarea
        } else {
          openNotificationModal(false, "Broadcast Error", response.data.message);
        }
      } catch (error) {
        setIsDataLoading(false);
        openNotificationModal(false, "Broadcast Error", error.message || "An error occurred");
      }
    };
    

    return (
        <div className="bg-theme h-full">
            <AdminHeader isMobile={isMobile}
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
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




      <div className="flex flex-col gap-4  w-full">
  <textarea
    className="w-full h-48 p-4  border border-gray-300 rounded-lg bg-white text-black"
    placeholder="Enter broadcast message..."
    value={broadcastMessage}
    onChange={(e) => setBroadcastMessage(e.target.value)}
  />


  <div  
                      onClick={sendBroadcast}
                      style={{ }} className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2">
                        {/* <UpdateIcon style={{ color: '#ffffff', borderRadius: '0px'}} className="mr-2 " /> */}
                        <div className="text-s " style={{color: '#ffffff'}}>{isDataloading ? "Sending.." : 'Send Broadcast'}</div>
                      </div>



</div>







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
