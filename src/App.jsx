import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';



import LandingPage from './components/LandingPage.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';

import TermsAndConditionsPage from './components/TermsAndConditionsPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';


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


      




  const [currentRequestSlide, setCurrentRequestSlide] = useState(0);
    const [currentBeneficiarySlide, setCurrentBeneficiarySlide] = useState(0);
    const [currentSponsorSlide, setCurrentSponsorSlide] = useState(0);



      const [isDataloading, setIsDataLoading] = useState(true);
      const [helpRequestsData, setHelpRequestsData] = useState([]);
      const [beneficiariesData, setBeneficiariesData] = useState([]);
      // const [donationsData, setDonationsData] = useState([]);



        // Sample carouseRequestlItems
        const carouselRequestItems = [
            {
              id: 1,
              image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              name: "Emeka Eze",
              title: "Community Support",
              description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
              score: "81897",
              remark: "Financial Support",
              status: "Processing"
            },
            {
              id: 2,
              image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              name: "Chinwe Musa",
              title: "Environmental Care",
              description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
              score: "96783",
              remark: "Financial Support",
              status: "Processing"
            },
            {
              id: 3,
              image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              name: "Audu Mallam",
              title: "Youth Empowerment",
              description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
              score: "45674",
              remark: "Financial Support",
              status: "Processing"
            }
          ];
    
      // Sample carouselBeneficiaryItems
      const carouselBeneficiaryItems = [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Community Support",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "8451",
          name: "Mr Audu Eze",
          date: "2025-02-24 03:47:17",
          price: "N30,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Environmental Care",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "9343",
          name: "Mrs Chiamaka James",
          date: "2025-02-24 03:47:17",
          price: "N40,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "5344",
          name: "Ms Jane Paul",
          date: "2025-02-24 03:47:17",
          price: "N50,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "4744",
          name: "Ms Musa Mansa",
          date: "2025-02-24 03:47:17",
          price: "N10,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 5,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "4844",
          name: "Ms Pauline Aba",
          date: "2025-02-24 03:47:17",
          price: "N80,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 6,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "4234",
          name: "Mr Emma Agada",
          date: "2025-02-24 03:47:17",
          price: "N70,000.00",
          remark: "Financial Support",
          status: "Processed"
        }
      ];
      
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
    // initAuth();
  }, []);



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
















  return (
    <Router>
      <div>
        <div>

          <Routes>

            <Route path="/*" element={<div>NOT FOUND</div>} />            
            <Route path='/' element={<LandingPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            />}/>
            <Route path='/about-us' element={<AboutUsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/contact-us' element={<ContactUsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>


            <Route path='/terms-and-conditions' element={<TermsAndConditionsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/privacy-policy' element={<PrivacyPolicyPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>

            <Route path='/single-request' element={<SingleRequestsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/single-sponsor' element={<SingleSponsorPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/single-beneficiary' element={<SingleBeneficiaryPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>


            <Route path='/donate' element={<DonatePage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
             <Route path='/i-ask' element={<AskPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>




<Route path='/ask-admin-login' element={<AdminLoginPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>

<Route path='/admin-home' element={<ProtectedAdminRoute><AdminLandingPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/manage-hero-images' element={<ProtectedAdminRoute><ManageWebsiteImagesPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/manage-kyc' element={<ProtectedAdminRoute><AdminManageKyc 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/requests-list' element={<ProtectedAdminRoute><AdminListRequests 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/beneficiaries-list' element={<ProtectedAdminRoute><AdminListBeneficiaries 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/sponsors-list' element={<ProtectedAdminRoute><AdminListSponsors 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/donations-list' element={<ProtectedAdminRoute><AdminListDonations 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/specific-kyc/:id' element={<ProtectedAdminRoute><AdminSpecificKyc 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>

<Route path='/specific-request/:id' element={<ProtectedAdminRoute><AdminSpecificRequest 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>
             
<Route path='/admin-add-sponsor' element={<ProtectedAdminRoute><AdminAddSponsorPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedAdminRoute>}/>
             





<Route path='/user-dashboard' element={<ProtectedRoute><UserDashboardPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={helpRequestsData} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={beneficiariesData} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             /></ProtectedRoute>}/>

            
            </Routes>
            
        </div>
      </div>
    </Router>
  )
}

export default App
