import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';



import LandingPage from './components/LandingPage.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';

import TermsAndConditionsPage from './components/TermsAndConditionsPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';



import SingleNominatePage from './components/SingleNominatePage.jsx';

import SingleRequestsPage from './components/SingleRequestsPage.jsx';
import SingleSponsorPage from './components/SingleSponsorPage.jsx';
import SingleBeneficiaryPage from './components/SingleBeneficiaryPage.jsx';


import DonatePage from './components/DonatePage.jsx';
import AskPage from './components/AskPage.jsx';



import AdminLoginPage from './components/admin/AdminLoginPage.jsx';
import AdminLandingPage from './components/admin/AdminLandingPage.jsx';
import ManageWebsiteImagesPage from './components/admin/ManageWebsiteImagesPage.jsx';
import AdminListRequests from './components/admin/AdminListRequests.jsx';
import AdminListBeneficiaries from './components/admin/AdminListBeneficiaries.jsx';
import AdminListSponsors from './components/admin/AdminListSponsors.jsx';
import AdminManageKyc from './components/admin/AdminManageKyc.jsx';
import AdminListDonations from './components/admin/AdminListDonations.jsx';

import AdminSpecificKyc from './components/admin/AdminSpecificKyc.jsx';
import AdminSpecificRequest from './components/admin/AdminSpecificRequest.jsx';
import AdminAddSponsorPage from './components/admin/AdminAddSponsorPage.jsx';
import AdminManageCrypto from './components/admin/AdminManageCrypto.jsx';



import UserDashboardPage from './components/user/UserDashboardPage.jsx';


import sponsor from './assets/images/sponsors/sponsor.jpg';
import sponsor2 from './assets/images/sponsors/sponsor2.jpg';


//
import axiosInstance from './auth/axiosConfig'; // Ensure the correct relative path
import { setCookie } from './auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from './auth/authUtils'; // Import getCookie function
//

import ProtectedAdminRoute from './auth/protectedAdminRoute';
import ProtectedRoute from './auth/protectedRoute';





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
      // const [donationsData, setDonationsData] = useState([]);



      
      // Sample carouselSponsorItems
        const carouselSponsorItems = [
          {
            id: 1,
            image: {sponsor},//"https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Community Support",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "43281",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N30,000.00",
            type: "Sponsor"
          },
          {
            id: 2,
            image: {sponsor2},//"https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Environmental Care",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "5293",
            name: "Adeyinka K. Kokumo",
            date: "2025-02-24 03:47:17",
            price: "N40,000.00",
            type: "Donor"
          },
          {
            id: 3,
            image: {sponsor},//"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Youth Empowerment",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "6244",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N50,000.00",
            type: "Sponsor"
          },
          {
            id: 4,
            image: {sponsor2},//"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Youth Empowerment",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "4534",
            name: "Adeyinka K. Kokumo",
            date: "2025-02-24 03:47:17",
            price: "N50,000.00",
            type: "Donor"
          },
          {
            id: 5,
            image: {sponsor},//"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Youth Empowerment",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "4734",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N50,000.00",
            type: "Sponsor"
          }
        ];




  



    useEffect(() => {
      handleHelpRequestsData();
      handleBeneficiariesData();
    }, []);
    const handleHelpRequestsData = async () => {
  
      setIsDataLoading(true);
  
  
      try {
        const helpRequestsEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_READ_HELP_REQUESTS;
        // alert(helpRequestsEndpoint);
        const helpRequestsResponse = await axiosInstance.get(helpRequestsEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setHelpRequestsData(helpRequestsResponse.data.data);  // Update state with doctors count
    
    
        // openNotificationModal(true, currentPageName, "");
        // alert(JSON.stringify(helpRequestsResponse.data.data), null, 2);  // Update state with appointments count
      //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
  
  
  
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
    
      } catch (error) {
        setIsDataLoading(false);
        
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

    const handleBeneficiariesData = async () => {
  
      setIsDataLoading(true);
  
  
      try {
        const beneficiariesRequestsEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_READ_BENEFICIARIES;
        // alert(beneficiariesRequestsEndpoint);
        const beneficiariesRequestsResponse = await axiosInstance.get(beneficiariesRequestsEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBeneficiariesData(beneficiariesRequestsResponse.data.data);  // Update state with doctors count
    
    
        // openNotificationModal(true, currentPageName, "");
        // alert(JSON.stringify(helpRequestsResponse.data.data), null, 2);  // Update state with appointments count
      //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
  
  
  
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
    
      } catch (error) {
        setIsDataLoading(false);
        
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

                        
            <Route path='/' element={<LandingPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails} 
            />}/>
            <Route path='/about-us' element={<AboutUsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/contact-us' element={<ContactUsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>


            <Route path='/terms-and-conditions' element={<TermsAndConditionsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/privacy-policy' element={<PrivacyPolicyPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>

            <Route path='/single-request' element={<SingleRequestsPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/single-sponsor' element={<SingleSponsorPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
            <Route path='/single-beneficiary' element={<SingleBeneficiaryPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>

<Route path='/help-request/:helpToken' element={<SingleNominatePage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>



            <Route path='/donate' element={<DonatePage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>
             <Route path='/i-ask' element={<AskPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            userDetails={userDetails} refreshUserDetails={refreshUserDetails}
             />}/>




<Route path='/ask-admin-login' element={<AdminLoginPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>

<Route path='/admin-home' element={<ProtectedAdminRoute><AdminLandingPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/manage-hero-images' element={<ProtectedAdminRoute><ManageWebsiteImagesPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/manage-kyc' element={<ProtectedAdminRoute><AdminManageKyc isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/requests-list' element={<ProtectedAdminRoute><AdminListRequests isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/beneficiaries-list' element={<ProtectedAdminRoute><AdminListBeneficiaries isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/sponsors-list' element={<ProtectedAdminRoute><AdminListSponsors isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/donations-list' element={<ProtectedAdminRoute><AdminListDonations isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/specific-kyc/:id' element={<ProtectedAdminRoute><AdminSpecificKyc isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/specific-request/:id' element={<ProtectedAdminRoute><AdminSpecificRequest isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>
             
<Route path='/admin-add-sponsor' element={<ProtectedAdminRoute><AdminAddSponsorPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/>
             
{/* <Route path='/manage-crypto' element={<ProtectedAdminRoute><AdminManageCrypto isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide} 
             /></ProtectedAdminRoute>}/> */}




<Route path='/user-dashboard' element={<ProtectedRoute><UserDashboardPage isMobile={isMobile}
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
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
