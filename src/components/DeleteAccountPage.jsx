import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import HeaderParallax from "./widgets/HeaderParallax";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isAuthenticated } from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

import Loading from "./widgets/Loading";
import MiniLoading from "./widgets/MiniLoading";

import UserHeader from "./navbar/user-navbar/UserHeader";
import GuestHeader from "./navbar/guest-navbar/GuestHeader";
import GuestFooter from "./navbar/guest-navbar/GuestFooter";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";

import NotificationModal from "./modals/NotificationModal";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function DeleteAccountPage({
  isMobile,
  currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
}) {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };


    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

  const [emailToDelete, setEmailToDelete] = useState("");
      const handleSendTokenForDeletion = async () => {  
          
        if (isLoading) {
          // alert('Please wait');
          openNotificationModal(false, "A.S.K Delete Account Token", "Please wait..");
          
          return;
        }
  
        // Validate email before proceeding
        if (!isValidEmail(emailToDelete)) {
          // alert('Please enter a valid email address');
          openNotificationModal(false, "A.S.K Delete Account Token", "Please enter a valid email address");
          
          return;
        }
  
  
  
        setIsLoading(true);
        try {
    
          const requestData = {
            email: emailToDelete,
        };
        
        // alert(JSON.stringify(requestData));
        // var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_SUBSCRIBE_TO_NEWSLETTER;
        //  alert(endpoint);
        //  setIsSubsLoading(false);
        //  return;
        const response = await axiosInstance.post((
            import.meta.env.VITE_IS_LIVE === 'true' ?
            import.meta.env.VITE_API_SERVER_URL :
            import.meta.env.VITE_API_DEMO_SERVER_URL
          )
          + import.meta.env.VITE_USER_REQUEST_DELETION, requestData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        
        setIsLoading(false);
          // alert(JSON.stringify(response.data, null, 2));
    
          if (response.data.status) {
            // setEmail("");
  
            // alert("dashboard-products " + JSON.stringify(response.data.itemsData, null, 2));
            // alert("" + response.data.message);
            openNotificationModal(true, "A.S.K Delete Account Token", response.data.message);
            
  
            // Store the retrieved data in state variables
    
            // setProductsData(response.data.itemsData);
          } else {
            // alert("error1: " + response.data.message);
            openNotificationModal(false, "A.S.K Delete Account Token", response.data.message);
            
          }
    
        } catch (error) {
          setIsLoading(false);
  
          //  alert(error);
        
          if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          // setErrorMessage({ message: errorMessage });
  
          openNotificationModal(false, "A.S.K Delete Account Token", errorMessage);
            //  setIsNotificationModalOpen(true);
  
        } else if (error.response && error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
          const errorMessages = errors.map(error => error.msg);
          const errorMessage = errorMessages.join(', '); // Join all error messages
          // setErrorMessage({ message: errorMessage });
  
          openNotificationModal(false, "A.S.K Delete Account Token", errorMessage);
            //  setIsNotificationModalOpen(true);
        } else {
          // setErrorMessage({ message: 'A.S.K Delete Account failed. Please check your data and try again.' });
  
          openNotificationModal(false, "A.S.K Delete Account Token", 'Please check your data and try again.');
            //  setIsNotificationModalOpen(true);
        }
      }
      };

  const [deleteToken, setDeleteToken] = useState("");
            const handleDeleteAccount = async () => {  
          
        if (isLoading) {
          // alert('Please wait');
          openNotificationModal(false, "A.S.K Delete Account", "Please wait..");
          
          return;
        }
  
        // Validate email before proceeding
        if (!isValidEmail(emailToDelete)) {
          // alert('Please enter a valid email address');
          openNotificationModal(false, "A.S.K Delete Account", "Please enter a valid email address");
          
          return;
        }
  
  
  
        setIsLoading(true);
        try {
    
          const requestData = {
            email: emailToDelete,
            deleteToken: deleteToken,
        };
        
        // alert(JSON.stringify(requestData));
        // var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_SUBSCRIBE_TO_NEWSLETTER;
        //  alert(endpoint);
        //  setIsSubsLoading(false);
        //  return;
        const response = await axiosInstance.post((
            import.meta.env.VITE_IS_LIVE === 'true' ?
            import.meta.env.VITE_API_SERVER_URL :
            import.meta.env.VITE_API_DEMO_SERVER_URL
          )
          + import.meta.env.VITE_USER_DELETE, requestData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        
        setIsLoading(false);
          // alert(JSON.stringify(response.data, null, 2));
    
          if (response.data.status) {
            // setEmail("");
  
            // alert("dashboard-products " + JSON.stringify(response.data.itemsData, null, 2));
            // alert("" + response.data.message);
            openNotificationModal(true, "A.S.K Delete Account", response.data.message);
            
  
            // Store the retrieved data in state variables
    
            // setProductsData(response.data.itemsData);
          } else {
            // alert("error1: " + response.data.message);
            openNotificationModal(false, "A.S.K Delete Account", response.data.message);
            
          }
    
        } catch (error) {
          setIsLoading(false);
  
          // alert(error);
        
          if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          // setErrorMessage({ message: errorMessage });
  
          openNotificationModal(false, "A.S.K Delete Account", errorMessage);
            //  setIsNotificationModalOpen(true);
  
        } else if (error.response && error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
          const errorMessages = errors.map(error => error.msg);
          const errorMessage = errorMessages.join(', '); // Join all error messages
          // setErrorMessage({ message: errorMessage });
  
          openNotificationModal(false, "A.S.K Delete Account", errorMessage);
            //  setIsNotificationModalOpen(true);
        } else {
          // setErrorMessage({ message: 'A.S.K Delete Account failed. Please check your data and try again.' });
  
          openNotificationModal(false, "A.S.K Delete Account", 'Please check your data and try again.');
            //  setIsNotificationModalOpen(true);
        }
      }
      };

  return (
    <div className="touch-pan-y">
      {isAuthenticated() ? (
        <UserHeader
          isMobile={isMobile}
          carouselRequestItems={carouselRequestItems}
          carouselBeneficiaryItems={carouselBeneficiaryItems}
          carouselSponsorItems={carouselSponsorItems}
          gotoPage={gotoPage}
          showMarqees={false}
        />
      ) : (
        <GuestHeader
          isMobile={isMobile}
          carouselRequestItems={carouselRequestItems}
          carouselBeneficiaryItems={carouselBeneficiaryItems}
          carouselSponsorItems={carouselSponsorItems}
          gotoPage={gotoPage}
          showMarqees={false}
        />
      )}

      <HeaderParallax title={"A.S.K Delete Account"} subtitle={""} />




      <div className="flex flex-col items-center w-full">
  {/* First Section - Email Input */}
  <div className="w-full max-w-3xl p-4 mt-4 mb-4">
    <motion.div
      className="flex flex-col items-center w-full touch-pan-y"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full mb-0 flex flex-col items-center">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800">Hello,</h1>
          <p className="text-gray-600 my-2">
            You requested to delete your A.S.K account. <br/>Enter your email
            below and we'll send you a token:
          </p>
        </div>

        <div className="w-full max-w-md"> {/* Added max-w-md container */}
          <motion.button className="w-full">
            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-col sm:flex-row relative w-full">
                <input
                  type="text"
                  name="emailToDelete"
                  inputMode="text"
                  placeholder="Email"
                  className="border border-gray-300 rounded-sm py-2 px-2 w-full mt-0 bg-white text-center"
                  value={emailToDelete}
                  onChange={(e) => setEmailToDelete(e.target.value)}
                />
              </div>

              <div className="flex justify-center w-full"> {/* Centered button container */}
                <div
                  style={{ borderWidth: "0px", maxWidth: "100%" }}
                  className="mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-theme text-white hover:text-softTheme w-full md:w-auto"
                  onClick={() => {
handleSendTokenForDeletion(emailToDelete);
                  }}
                >
                  {isLoading ? "Please wait.." : "Send Delete Token"}
                </div>
              </div>
            </div>

            <div className="my-2 text-sm text-center" style={{ color: "#c2572b" }}>
              {errorMessage.message}
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  </div>

  {/* Second Section - Token Input */}
  <div className="w-full max-w-3xl p-4 mt-4 mb-4">
    <motion.div
      className="flex flex-col items-center w-full touch-pan-y"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full mb-8 flex flex-col items-center">
        <div className="w-full text-center">
          <p className="text-gray-600 my-2">
            Enter the token you received below to delete your A.S.K account:
          </p>
        </div>

        <div className="w-full max-w-md"> {/* Added max-w-md container */}
          <motion.button className="w-full">
            <div className="flex flex-col mt-2  w-full">
              <div className="flex flex-col sm:flex-row relative w-full">
                <input
                  type="text"
                  name="deleteToken"
                  inputMode="text"
                  placeholder="Delete Token"
                  className="border border-gray-300 rounded-sm py-2 px-2 w-full mt-0 bg-white text-center"
                  value={deleteToken}
                  onChange={(e) => setDeleteToken(e.target.value)}
                />
              </div>

              <div className="flex justify-center w-full"> {/* Centered button container */}
                <div
                  style={{ borderWidth: "0px", maxWidth: "100%" }}
                  className="mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-red-800 text-white hover:text-softTheme w-full md:w-auto"
                  onClick={() => {
                    handleDeleteAccount(emailToDelete);
                  }}
                >
                  {isLoading ? "Please wait.." : "Delete My Account"}
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  </div>
</div>




      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={closeNotificationModal}
        notificationType={notificationType}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
      />

      <GuestFooter gotoPage={gotoPage} />
    </div>
  );
}