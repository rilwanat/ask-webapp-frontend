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


// import bars from '../../assets/icons/bars.png';
// import naira from '../../assets/icons/naira.png';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import search from '../../assets/icons/search-outline.png';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import AdjustIcon from '@mui/icons-material/Adjust';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'; 

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


import Loading from '../widgets/Loading';
import MiniLoading from '../widgets/MiniLoading';


import GroupIcon from '@mui/icons-material/Group';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ElderlyIcon from '@mui/icons-material/Elderly';

//
import axiosAdminInstance from '../../auth/axiosAdminConfig'; // Ensure the correct relative path
import { setCookie, getCookie, deleteCookie } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
//

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
// import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
// import { jwtDecode } from 'jwt-decode';
// import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import NotificationModal from '../modals/NotificationModal';


export default function AdminListBeneficiaries({ 
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

useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, []);







    
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState('');
  const [loading, setLoading] = useState(true);



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








    
    
      const currentPageName = "Beneficiaries";
    


      const [isDataloading, setIsDataLoading] = useState(false);
      const [beneficiaries, setBeneficiariesData] = useState([]);
      const [beneficiariesRatios, setBeneficiariesRatios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(beneficiaries ? beneficiaries.length : 0);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const filteredBeneficiaries = (beneficiaries || []).filter((request) =>
    request.date.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.nomination_count.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.email_address.toLowerCase().includes(searchQuery.toLowerCase()) 
    // || request.tags && request.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
    // || request.categories && request.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
    // || request.price.includes(searchQuery)
);

const totalFilteredItems = filteredBeneficiaries.length;
const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);
const indexOfLastFilteredItem = currentPage * itemsPerPage;
const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
const currentFilteredBeneficiaries = filteredBeneficiaries.slice(
  indexOfFirstFilteredItem,
  indexOfLastFilteredItem
);
let countFiltered = indexOfFirstFilteredItem + 1;


 const [isUpdateDataloading, setIsUpdateDataLoading] = useState(false);
const [shareType, setShareType] = useState("direct");
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [shareRatio, setShareRatio] = useState("");
  const [remark, setRemark] = useState("");
  



  // alert("email: " + request.email_address + ", helpToken: " + request.help_token);
  // postBeneficiary(request.email_address, request.help_token);
  const postBeneficiary = async (email, helpToken, amount) => { 
 
    // alert(remark);
    // return;
    // $email, $helpToken, $amount

    // setIsDataLoading
    // alert("X");
    // isDataLoading
         if (isDataloading) {
           // alert('Please wait');
           openNotificationModal(false, "ASK Post Beneficiary", "Please wait..");
           
           return;
         }
   
        //  // Validate email before proceeding
        //  if (!isValidEmail(email)) {
        //    // alert('Please enter a valid email address');
        //    openNotificationModal(false, "ASK Subscribe To Newsletter", "Please enter a valid email address");
           
        //    return;
        //  }
   
   
   
        setIsDataLoading(true);
         try {
     
           const requestData = {
             email: email,
             helpToken: helpToken,
             amount: amount,
             remark: remark
         };
         
        //  alert(JSON.stringify(requestData));
         // var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_USER_SUBSCRIBE_TO_NEWSLETTER;
         //  alert(endpoint);
         //  setIsSubsLoading(false);
         //  return;
         const response = await axiosInstance.post(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_POST_BENEFICIARY, requestData, {
             headers: {
                 "Content-Type": "application/json",
             },
         });
         
         
         setIsDataLoading(false);
           //alert(JSON.stringify(response.data, null, 2));
     
           if (response.data.status) {
            //  setEmail("");
   
             // alert("dashboard-products " + JSON.stringify(response.data.itemsData, null, 2));
             // alert("" + response.data.message);
             openNotificationModal(true, "ASK Post", "" + response.data.message);
             
   
             // Store the retrieved data in state variables
     
             // setProductsData(response.data.itemsData);
           } else {
             // alert("error1: " + response.data.message);
             openNotificationModal(false, "ASK Post", "error1: " + response.data.message);
             
           }
     
         } catch (error) {
           setIsDataLoading(false);
   
           alert(error);
         
           if (error.response && error.response.data && error.response.data.message) {
           const errorMessage = error.response.data.message;
           // setErrorMessage({ message: errorMessage });
   
           openNotificationModal(false, "ASK Post", errorMessage);
             //  setIsNotificationModalOpen(true);
   
         } else if (error.response && error.response.data && error.response.data.errors) {
           const { errors } = error.response.data;
           const errorMessages = errors.map(error => error.msg);
           const errorMessage = errorMessages.join(', '); // Join all error messages
           // setErrorMessage({ message: errorMessage });
   
           openNotificationModal(false, "ASK Post", errorMessage);
             //  setIsNotificationModalOpen(true);
         } else {
           // setErrorMessage({ message: 'ASK Subscribe To Newsletter failed. Please check your data and try again.' });
   
           openNotificationModal(false, "ASK Post", 'Please check your data and try again.');
             //  setIsNotificationModalOpen(true);
         }
       }
       };


    const getShares = async () => {
     
    

  //     const [shareType, setShareType] = useState("direct");
  // const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState("");
  // const [totalAmount, setTotalAmount] = useState("");
  // const [shareRatio, setShareRatio] = useState("");

  if (!shareType) {
    return openNotificationModal(false, "Error", "Missing: shareType");
  }
  
  if (!numberOfBeneficiaries || isNaN(numberOfBeneficiaries)) {
    return openNotificationModal(false, "Error", "Missing or invalid: numberOfBeneficiaries");
  }
  
  if (!totalAmount || isNaN(totalAmount)) {
    return openNotificationModal(false, "Error", "Missing or invalid: totalAmount");
  }
  

  if ((shareType === "ratio")) {
    if (!shareRatio || typeof shareRatio !== "string" || shareRatio.trim() === "") {
      return openNotificationModal(false, "Error", "Missing: shareRatio");
    }
  }


  // Convert shareRatio string to array of numbers
const parsedShareRatio = (shareType === "direct") ? [] : shareRatio.split(",").map(r => parseFloat(r.trim()));
  // Check if parsed share ratios are all valid numbers
if (parsedShareRatio.some(isNaN)) {
  return openNotificationModal(false, "Error", "Invalid values in shareRatio");
}
      try {
        // Define share parameters
        // const shareType = "ratio"; // or "direct"
        // const numberOfBeneficiaries = 3;
        // const totalAmount = 1000;
        // const shareRatio = [2, 1, 1]; // Only needed if shareType is "ratio"
    
        // Convert array to comma-separated string for GET
        // const ratioString = shareRatio.join(",");
  
        setIsDataLoading(true);
        const requestData = {
          "shareType": shareType,
          "numberOfBeneficiaries": numberOfBeneficiaries,
          "totalAmount": totalAmount,
          "shareRatio": parsedShareRatio
        }
        ;
    
        // Construct endpoint with query params
        const calculateSharesEndpoint = `${import.meta.env.VITE_API_SERVER_URL}${import.meta.env.VITE_CALCULATE_SHARES}`;
  
  
        // Make GET request
        const calculateSharesResponse = await axiosAdminInstance.post(calculateSharesEndpoint, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        // alert(calculateSharesResponse.data);
        // alert("Beneficiaries Share Ratios: " + JSON.stringify(calculateSharesResponse.data, null, 2));
        // console.log("Share Calculation Response:", calculateSharesResponse.data);
        // openNotificationModal(true, "Share Ratios", calculateSharesResponse.data);
    
        // Example: update state
        setBeneficiariesRatios(calculateSharesResponse.data.ratio);
        setBeneficiariesData(calculateSharesResponse.data.data);
    
        setIsDataLoading(false);
      } catch (error) {
        
        setIsDataLoading(false);
    
        alert(error);
    
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          openNotificationModal(false, currentPageName + " Error", errorMessage);
        } else {
          openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
        }
      }
    };



  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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
            
            

            <div className='flex w-full md:flex-row flex-col z-20'>
                             <div className="flex flex-col flex-grow border rounded-lg border-softTheme mx-4 mt-2 mb-12 px-4 " style={{ flexBasis: '50%' }}>                                 
                                 <div className='flex flex-col my-2 '>

                                 {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4 ">                                    
                                 <label htmlFor="fullname" className="block text-sm font-medium text-white mb-2">Profile Picture:</label>
                                 <div className="flex justify-center">
                                                <img 
                                                // src={import.meta.env.VITE_API_SERVER_URL + "../../../" + selectedUser.profile_picture}
                                                style={{
                                                  height: '200px',
                                                  width: '200px',
                                              }}
                                                className="w-full h-40 object-cover rounded-md mt-1" />
                                                  </div>                                  
                                    </div> */}

                                    

                                    <div className="flex flex-wrap ">
                                        {/* <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="fullname" className="block text-sm font-medium text-white mb-2">Share Type:</label>
                                            <select
    value={shareType}
    onChange={(e) => setShareType(e.target.value)}
    className='p-1 rounded text-black'
  >
    <option value="direct">Direct</option>
    <option value="ratio">Ratio</option>
  </select>
                                        </div> */}
                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="share_type" className="block text-sm font-medium text-white mb-2">Share Type:</label>
                                           
                                            <select
                id="share_type"
                name="share_type"
                className="bg-gray-50 border border-gray-300 text-black text-sm focus:ring-gray-500 focus:border-gray-500 rounded-lg 
                    block w-full p-2.5"
                    value={shareType}
    onChange={(e) => {
      setBeneficiariesData(null);
      setShareType(e.target.value);
    }
      }
            >
                <option value="Select">Select Share Type</option>
                <option value="direct">Direct</option>
                <option value="ratio">Ratio</option>
            </select>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="Number of Beneficiaries" className="block text-sm font-medium text-white mb-2">Number of Beneficiaries:</label>
                                            <input type="text" id="Number of Beneficiaries" name="Number of Beneficiaries"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Number of Beneficiaries' 
                                            value={numberOfBeneficiaries}
    onChange={(e) => 
    {
      setBeneficiariesData(null);
      setNumberOfBeneficiaries(e.target.value);
    }
    }
    />
                                        </div>

                                        

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="Total Amount" className="block text-sm font-medium text-white mb-2">Total Amount:</label>
                                            <input type="text" id="Total Amount" name="Total Amount"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Total Amount'   
                                            value={totalAmount}
    onChange={(e) => 
      {
        setBeneficiariesData(null);
      setTotalAmount(e.target.value);
      }}
    />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap ">
                                      <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="Share Ratio" className="block text-sm font-medium text-white mb-2">Share Ratio:</label>
                                            <input type="text" id="Share Ratio" name="Share Ratio"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Share Ratio'   
                                            value={shareRatio}
    onChange={(e) => 
      {
        setBeneficiariesData(null);
      setShareRatio(e.target.value);
      }}/>
                                        </div>


                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="kyc_status" className="block text-sm font-medium text-red-300 mb-2">Remark:</label>
                                           
                                            <select
                id="remark"
                name="remark"
                className="bg-gray-50 border border-gray-300 text-black text-sm focus:ring-gray-500 focus:border-gray-500 rounded-lg 
                    block w-full p-2.5"
                    value={remark}
                    // disabled
                    onChange={(e) => {
                      setRemark(e.target.value);                    
                  }}
            >
                <option value="Select">Select Remark</option>
                <option value="Financial Support">Financial Support</option>
                <option value="Food Support">Food Support</option>
                <option value="Sponsored">Sponsored</option>
                <option value="Wild Card">Wild Card</option>
            </select>
                                        </div>

                                    </div>

                                    <div className="flex flex-wrap ">
                                        
                                    </div>  

                                 </div>


                                 <hr className='mb-4'/>
                                 {
                                    
                                    <div  
                    onClick={() => getShares()} 
                    style={{ }} className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2">
                      {/* <UpdateIcon style={{ color: '#ffffff', borderRadius: '0px'}} className="mr-2 " /> */}
                      <div className="text-s " style={{color: '#ffffff'}}>{isDataloading ? "Getting.." : 'Get Ratios'}</div>
                    </div>
                                    
                                 }
                                                                 
                             </div>
                         </div>


            
                                  <div className='mx-0  '>
                                    <div className=''>
            
                                    
                                    
            
            
                                    <div className='flex flex-col md:flex-row p-2 items-center justify-between'>
  {/* Left section - Page title */}
  {/* <div className="px-4 py-1 flex items-center border border-white text-white mb-4 md:mb-0 rounded-lg">
    {currentPageName + ' (' + totalFilteredItems + ')'}
  </div> */}
  <div 
              onClick={() => { 
                // gotoPage('/contact-us') 
              }}
              style={{ width: '200px' }}
              className='text-center  rounded-sm px-4 py-1 text-sm cursor-pointer  bg-theme text-white mb-4 md:mb-0'>
              {currentPageName + ' (' + totalFilteredItems + ')'}
            </div>

            <div>
              <div  
                                  // onClick={() => updateUser(userData)} 
                                  style={{ }} className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2">
                                    {/* <UpdateIcon style={{ color: '#ffffff', borderRadius: '0px'}} className="mr-2 " /> */}
                                    <div className="text-s " style={{color: '#ffffff'}}>{isDataloading ? "Fetching.." : 'Stop Voting'}</div>
                                  </div>

                                  <div  
                    // onClick={() => updateUser(userData)} 
                    style={{ }} className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2">
                      {/* <UpdateIcon style={{ color: '#ffffff', borderRadius: '0px'}} className="mr-2 " /> */}
                      <div className="text-s " style={{color: '#ffffff'}}>{isDataloading ? "Fetching.." : 'Post Beneficiaries'}</div>
                    </div>
            </div>

  {/* Right section - Search */}
  <div className='relative flex items-center w-full md:w-auto'>
    <SearchIcon className="absolute left-3 h-5 w-5 text-white" />
    <input
      type='text'
      placeholder='Search'
      className='w-full md:w-64 pl-10 text-white bg-theme border border-white rounded-lg py-1 focus:outline-none focus:border-2 focus:border-theme placeholder-white'
      onChange={handleSearchChange}
    />
  </div>
</div>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                                    <div className='flex w-full '>
                                    <div className="w-full " >
                                                
                                                <div className=''>
                                                <div className='' style={{ width: '100%'  }}>
                                                    <div className="">
                                                        {/* <h1 className="">#</h1> */}
                                                        <div className=" " style={{  }}>
                                                            
            
                                                        <div className="flex flex-col overflow-x-auto">
              <div className="">
                <div className="inline-block min-w-full py-2 ">
                  <div className="overflow-x-auto">
            
            
            
            
            
            
            
            
                                                        <div className='overflow-x-auto mt-4'>
                  {
                    isDataloading ? <Loading />
                    : 
                    
                    <table className='min-w-full bg-white shadow-md overflow-hidden'>
                    {/* Table Header */}
                    <thead className='text-xs'>
                      <tr >
                      <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          SN
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Date
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Email Address
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Amount
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-center leading-4 text-theme  tracking-wider'>
                          Status
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Nomination Count
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Date Resolved
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Help Token
                        </th>

                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-center leading-4 text-theme  tracking-wider'>
                          Action
                        </th>
                        
                      </tr>
                    </thead>
            
                    {
                      // isDataloading ? <Loading />
                      // : 
                    <tbody className='text-xs '>
                      {currentFilteredBeneficiaries.map((request, index) => (
                          <tr key={request.id} className={index % 2 === 0 ? 'bg-white' : 'bg-softTheme'}
                        // onClick={(e) => handlerequestRowClick(request, e)} 
                          style={{ cursor: "pointer" }}
                          >
                          <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200'>
                          {countFiltered++}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> */}
                            {/* {process.env.REACT_APP_API_SERVER_650_IMAGE_PATH + request.productImages[0]} */}
                            {/* <img src={process.env.REACT_APP_API_SERVER_650_IMAGE_PATH + request.productImages[0]}  className="h-10 w-10 object-cover" /> */}
                          {/* </td> */}
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 cursor-pointer" onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(request, e);
                          }}>
                            {request.date}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {request.email_address}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-200">
                            {/* {request.tags.join(', ')} */}
                            {'₦' + formatAmount(beneficiariesRatios[index])}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                          <span
                                    style={{
                                      backgroundColor: request.status === 'approved' ? '#1cc939' : request.status === 'pending' ? '#d85a27' : '#FFE2E5', 
                                      color: request.status === 'approved' ? '#000000' : request.status === 'pending' ? '#ffffff' : '#F64E60', 
                                      borderRadius: '6px'
                                    
                                  }} 
                                    className={'text-white px-2 py-2 '
                                    }>{request.status}</span>
                          </td>	
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                            {request.nomination_count}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                            {request.date_resolved}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                            {request.help_token}
                          </td>
                          

                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center ">
                          <span
                          className="text-white cursor-pointer bg-theme rounded-lg px-2 py-1"
                          onClick={(e) => {
                            // alert("email: " + request.email_address + ", helpToken: " + request.help_token);
                            postBeneficiary(request.email_address, request.help_token, beneficiariesRatios[index]);
                          }}
                          >
                            Approve
                            </span>
                          </td>
                         
                          
                        </tr>
                      ))}
                    </tbody>
                    }
            
                  </table>

                  }
                </div>
            
            
            
            
                </div> </div> </div> </div>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4 mb-4">
                  <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mr-2 bg-gray-300 hover:bg-theme hover:text-white transition-colors duration-300"
                  style={{ width: '100px', cursor: 'pointer'
                  // borderRadius: '30px' 
                }}
                  >
                    <KeyboardArrowLeftIcon />
                  </button>
                  <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalFilteredPages))}
                  disabled={currentPage === totalFilteredPages}
                  className="px-4 py-2 bg-gray-300 hover:bg-theme hover:text-white transition-colors duration-300"
                  style={{ width: '100px', cursor: 'pointer'
                  // borderRadius: '30px' 
                }}
                  >
                    <KeyboardArrowRightIcon />
                  </button>
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
