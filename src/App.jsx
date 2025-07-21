import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';

import askLogo from './assets/images/ask-logo.png';



import DeleteAccountPage from './components/DeleteAccountPage.jsx';

import LandingPage from './components/LandingPage.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';

import TermsAndConditionsPage from './components/TermsAndConditionsPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';



import SingleNominatePage from './components/SingleNominatePage.jsx';
import PasswordResetPage from './components/PasswordResetPage.jsx';

import SingleRequestsPage from './components/SingleRequestsPage.jsx';
import MediaPage from './components/MediaPage.jsx';
import SingleSponsorPage from './components/SingleSponsorPage.jsx';
import SingleBeneficiaryPage from './components/SingleBeneficiaryPage.jsx';


import DonatePage from './components/DonatePage.jsx';
import AskPage from './components/AskPage.jsx';
import WelcomePage from './components/WelcomePage.jsx';



import LoginPage from './components/LoginPage.jsx';

import AdminLoginPage from './components/admin/AdminLoginPage.jsx';
import AdminLandingPage from './components/admin/AdminLandingPage.jsx';
import GeneralSettingsPage from './components/admin/GeneralSettingsPage.jsx';
import AdminListRequests from './components/admin/AdminListRequests.jsx';
import AdminListBeneficiaries from './components/admin/AdminListBeneficiaries.jsx';
import AdminListSponsors from './components/admin/AdminListSponsors.jsx';
import AdminListCrypto from './components/admin/AdminListCrypto.jsx';
import AdminManageUsers from './components/admin/AdminManageUsers.jsx';
import AdminManageTopUsers from './components/admin/AdminManageTopUsers.jsx';
import AdminListDonations from './components/admin/AdminListDonations.jsx';
import AdminListPayments from './components/admin/AdminListPayments.jsx';
import AdminListAdmins from './components/admin/AdminListAdmins.jsx';
import AdminBroadcastPage from './components/admin/AdminBroadcastPage.jsx';
import AdminListNominations from './components/admin/AdminListNominations.jsx';

import AdminSpecificUser from './components/admin/AdminSpecificUser.jsx';
import AdminSpecificRequest from './components/admin/AdminSpecificRequest.jsx';
import AdminSpecificSponsor from './components/admin/AdminSpecificSponsor.jsx';
import AdminSpecificCrypto from './components/admin/AdminSpecificCrypto.jsx';
import AdminSpecificAdmin from './components/admin/AdminSpecificAdmin.jsx';



import AdminAddSponsorPage from './components/admin/AdminAddSponsorPage.jsx';
import AdminManageCrypto from './components/admin/AdminManageCrypto.jsx';
import AdminAddAdminPage from './components/admin/AdminAddAdminPage.jsx';


import UserDashboardPage from './components/user/UserDashboardPage.jsx';


// import sponsor from './assets/images/sponsors/sponsor.jpg';
// import sponsor2 from './assets/images/sponsors/sponsor2.jpg';


//
import axiosInstance from './auth/axiosConfig'; // Ensure the correct relative path
import { setCookie } from './auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from './auth/authUtils'; // Import getCookie function
//

import ProtectedAdminRoute from './auth/protectedAdminRoute';
import ProtectedRoute from './auth/protectedRoute';


import { getFingerprint } from './auth/fingerPrint';


function App() {
  


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


      const [fingerPrint, setFingerPrint] = useState('');
      useEffect(() => {
       const loadFingerprint = async () => {
         const result = await getFingerprint();
         setFingerPrint(result); // this is the unique fingerprint
       };
       loadFingerprint();
     }, []); // run only once on mount

      
      //USER DETAILS
      const [userDetails, setUserDetails] = useState(null);
          const refreshUserDetails = async () => {
              // setIsLoading(true);
              // setError(null);              
              try {
                  // Option 1: If you only need to refresh from cookies
                  const storedUserDetails = getCookie('ask-user-details');
                  const parsedUserDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
                  setUserDetails(parsedUserDetails);
                  // alert(JSON.stringify(parsedUserDetails), null, 2);
              } catch (err) {
                  // setError('Failed to refresh user details');
                  alert('Refresh User error:', err);
              } finally {
                  // setIsLoading(false);
              }
          };
          // Initial load
          useEffect(() => {
              refreshUserDetails();
          }, []);
      //USER DETAILS

      //ADMIN DETAILS
      const [adminDetails, setAdminDetails] = useState(null);
      const refreshAdminDetails = async () => {
        // setIsLoading(true);
        // setError(null);        
        try {
            // Option 1: If you only need to refresh from cookies
            const storedAdminDetails = getCookie('ask-admin-details');
            const parsedAdminDetails = storedAdminDetails ? JSON.parse(storedAdminDetails) : null;
            setAdminDetails(parsedAdminDetails);
        } catch (err) {
            // setError('Failed to refresh user details');
            alert('Refresh Adminn error:', err);
        } finally {
            // setIsLoading(false);
        }
      };
      // Initial load
      useEffect(() => {
        refreshAdminDetails();
      }, []);
      //ADMIN DETAILS






  const [currentRequestSlide, setCurrentRequestSlide] = useState(0);
    const [currentBeneficiarySlide, setCurrentBeneficiarySlide] = useState(0);
    const [currentSponsorSlide, setCurrentSponsorSlide] = useState(0);



      const [isDataloading, setIsDataLoading] = useState(true);

      const [helpRequestsData, setHelpRequestsData] = useState([]);
      const [beneficiariesData, setBeneficiariesData] = useState([]);
      const [sponsorsData, setSponsorsData] = useState([]);

      // const [donationsData, setDonationsData] = useState([]);


      const defaultRequestItems = [
        {
          id: 1,
          date: "2025-02-24 03:47:17",
          nomination_count: 0,
          description: "A.S.K request description.",
          remark: "A.S.K remark.",
          email_address: "ask@askfoundations.org",
          request_image: "../../../../images/help-requests-images/ask-logox.png",
          help_token: "ASK123456",
      
          user: {
            id: 1,
            fullname: "Ashabi Shobande Kokumo",
            email_address: "ask@askfoundations.org",
            phone: "08000000000",
            kyc_status: "pending",
            account_number: "1234567890",
            account_name: "Ashabi Shobande Kokumo",
            bank_name: "A.S.K Bank",
            gender: "Female",
            state: "Abuja",
            profile_picture: "../../../../images/help-requests-images/ask-logox.png",
            email_verified: true,
            registration_date: "2025-01-01 12:00:00",
            user_type: "user",
            eligibility: true,
            is_cheat: false,
            opened_welcome_msg: true
          }
        }
      ];

      const defaultBeneficiariesItems = [
        {
          id: 1,
          email_address: "ask@askfoundations.org",
          date: "2025-04-15 12:32:00",
          amount: 50000,
          status: "approved",
          date_resolved: "2025-04-15 12:32:00",
          nomination_count: 0,
          remark: "Financial Support",
      
          user: {
            id: 1,
            fullname: "Ashabi Shobande Kokumo",
            email_address: "ask@askfoundations.org",
            phone: "08000000001",
            kyc_status: "verified",
            account_number: "0987654321",
            account_name: "Ask Shobande",
            bank_name: "A.S.K Bank",
            gender: "Female",
            state: "Lagos",
            profile_picture: "../../../../images/help-requests-images/ask-logox.png",
            email_verified: true,
            registration_date: "2025-04-15 12:32:00",
            user_type: "user",
            eligibility: true,
            is_cheat: false,
            opened_welcome_msg: false
          }
        }
      ]; 

      const defaultSponsorItems = [
        {
          id: 1,
          image: askLogo,
          title: "A.S.K Title",
          description: "A.S.K description for sponsor/donor.",
          score: 0,
          name: "A.S.K Name",
          date: "2025-04-15 12:32:00",
          price: 0,
          type: "Sponsor"
        }
      ];





    useEffect(() => {
      handleHelpRequestsData();
      handleBeneficiariesData();
      handleSponsorsData();
    }, []);
    const handleHelpRequestsData = async () => {
  
      setIsDataLoading(true);
  
  
      try {
        const helpRequestsEndpoint = 
        (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_READ_HELP_REQUESTS;
        // alert(helpRequestsEndpoint);
        const helpRequestsResponse = await axiosInstance.get(helpRequestsEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = helpRequestsResponse.data?.data ?? defaultRequestItems;
        setHelpRequestsData(data);  
    
    // alert(helpRequestsData.length.toString());
        // openNotificationModal(true, currentPageName, "");
        // alert(JSON.stringify(helpRequestsResponse.data.data), null, 2);  // Update state with appointments count
      //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
  
  
  
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
        return data; // 🔥 return the fetched data
    
      } catch (error) {
        setIsDataLoading(false);
        
        // alert(error);
        // Handle errors
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          openNotificationModal(false, "Help Requests" + " Error", errorMessage);
        } else {
          openNotificationModal(false, "Help Requests" + " Error", "An unexpected error occurred.");
        }
        return []; // return empty array on error
      }
    };

    const handleBeneficiariesData = async () => {
  
      setIsDataLoading(true);
  
  
      try {
        const beneficiariesRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_READ_BENEFICIARIES;
        // alert(beneficiariesRequestsEndpoint);
        const beneficiariesRequestsResponse = await axiosInstance.get(beneficiariesRequestsEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBeneficiariesData(beneficiariesRequestsResponse.data?.data ?? defaultBeneficiariesItems);  // Update state with  count
    
    
        // openNotificationModal(true, currentPageName, "");
        // alert(JSON.stringify(beneficiariesRequestsResponse.data.data), null, 2);  // Update state with appointments count
      //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
  
  
  
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
    
      } catch (error) {
        setIsDataLoading(false);
        
        // alert(error);
        // Handle errors
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          openNotificationModal(false, "Beneficiaries" + " Error", errorMessage);
        } else {
          openNotificationModal(false, "Beneficiaries" + " Error", "An unexpected error occurred.");
        }
      }
    };

    const handleSponsorsData = async () => {
  
      setIsDataLoading(true);
  
  
      try {
        const sponsorsRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_READ_SPONSORS;
        // alert(beneficiariesRequestsEndpoint);
        const sponsorsRequestsResponse = await axiosInstance.get(sponsorsRequestsEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSponsorsData(sponsorsRequestsResponse.data?.data ?? defaultSponsorItems);  // Update state with  count
    
    
        // openNotificationModal(true, currentPageName, "");
        // alert(JSON.stringify(helpRequestsResponse.data.data), null, 2);  // Update state with appointments count
      //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
  
  
  
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
    
      } catch (error) {
        setIsDataLoading(false);
        
        // alert(error);
        // Handle errors
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          openNotificationModal(false, "Sponsors" + " Error", errorMessage);
        } else {
          openNotificationModal(false, "Sponsors" + " Error", "An unexpected error occurred.");
        }
      }
    };





const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);








  return (
    <Router>
      <div>
        <div>

          <Routes>
<Route path='/delete-account' element={<DeleteAccountPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>


                        
            <Route path='/' element={<LandingPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails} 
            handleHelpRequestsData={handleHelpRequestsData} 
            />}/>
            <Route path='/about-us' element={<AboutUsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/contact-us' element={<ContactUsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>


            <Route path='/terms-and-conditions' element={<TermsAndConditionsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/privacy-policy' element={<PrivacyPolicyPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>


            <Route path='/media' element={<MediaPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>

            <Route path='/single-sponsor' element={<SingleSponsorPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/single-beneficiary' element={<SingleBeneficiaryPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>

<Route path='/single-request' element={<SingleRequestsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails} 
            handleHelpRequestsData={handleHelpRequestsData} 
            fingerPrint={fingerPrint}
             />}/>
<Route path='/help-request/:helpToken' element={<SingleNominatePage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
            handleHelpRequestsData={handleHelpRequestsData}
            fingerPrint={fingerPrint}
             />}/>

<Route path='/reset-password/:passwordResetToken' element={<PasswordResetPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>

            <Route path='/donate' element={<DonatePage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
             <Route path='/i-ask' element={<AskPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails} 
            handleHelpRequestsData={handleHelpRequestsData}
             />}/>
  
<Route path='/ask-login' element={<LoginPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>




<Route path='/ask-admin-login' element={<AdminLoginPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>

<Route path='/admin-home' element={<ProtectedAdminRoute><AdminLandingPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/general-settings' element={<ProtectedAdminRoute><GeneralSettingsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/manage-users' element={<ProtectedAdminRoute><AdminManageUsers isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>
<Route path='/manage-top-users' element={<ProtectedAdminRoute><AdminManageTopUsers isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/requests-list' element={<ProtectedAdminRoute><AdminListRequests isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/beneficiaries-list' element={<ProtectedAdminRoute><AdminListBeneficiaries isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/sponsors-list' element={<ProtectedAdminRoute><AdminListSponsors isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/crypto-list' element={<ProtectedAdminRoute><AdminListCrypto isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/donations-list' element={<ProtectedAdminRoute><AdminListDonations isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/admin-show-donations' element={<ProtectedAdminRoute><AdminListPayments isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>


<Route path='/specific-user/:id' element={<ProtectedAdminRoute><AdminSpecificUser isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/specific-request/:id' element={<ProtectedAdminRoute><AdminSpecificRequest isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>
             
<Route path='/admin-add-sponsor' element={<ProtectedAdminRoute><AdminAddSponsorPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/>

<Route path='/specific-sponsor/:id' element={<ProtectedAdminRoute><AdminSpecificSponsor isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/specific-crypto/:id' element={<ProtectedAdminRoute><AdminSpecificCrypto isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>
             
<Route path='/admin-add-crypto' element={<ProtectedAdminRoute><AdminManageCrypto isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/>

<Route path='/list-admins' element={<ProtectedAdminRoute><AdminListAdmins isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/admin-add-admin' element={<ProtectedAdminRoute><AdminAddAdminPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/>

<Route path='/specific-admin/:id' element={<ProtectedAdminRoute><AdminSpecificAdmin isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/admin-broadcast' element={<ProtectedAdminRoute><AdminBroadcastPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/>

<Route path='/admin-nominations' element={<ProtectedAdminRoute><AdminListNominations isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/>

<Route path='/user-dashboard' element={<ProtectedRoute><UserDashboardPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             /></ProtectedRoute>}/>

<Route path='/welcome' element={<ProtectedRoute><WelcomePage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={sponsorsData} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             /></ProtectedRoute>}/>
            


<Route path="/*" element={<div>NOT FOUND</div>} />
            </Routes>
            
        </div>
      </div>
    </Router>
  )
}

export default App
