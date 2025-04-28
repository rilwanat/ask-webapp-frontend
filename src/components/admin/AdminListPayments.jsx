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

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import NotificationModal from '../modals/NotificationModal';


export default function AdminListPayments({ 
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








    
    
      const currentPageName = "Show Payments";
    


      const [isDataloading, setIsDataLoading] = useState(true);
      const [payments, setPaymentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(payments ? payments.length : 0);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const filteredDonations = payments.filter((payment) =>
    payment.created_on.toLowerCase().includes(searchQuery.toLowerCase()) 
    || payment.transaction_reference.toLowerCase().includes(searchQuery.toLowerCase()) 
    || payment.email && payment.email.toLowerCase().includes(searchQuery.toLowerCase()) 
    || payment.price.toLowerCase().includes(searchQuery.toLowerCase()) 
    || payment.subscription_type.toLowerCase().includes(searchQuery.toLowerCase()) 
    || payment.payment_method.toLowerCase().includes(searchQuery.toLowerCase()) 
    // || payment.tags && payment.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
    // || payment.categories && payment.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
    // || payment.price.includes(searchQuery)
);

const totalFilteredItems = filteredDonations.length;
const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);
const indexOfLastFilteredItem = currentPage * itemsPerPage;
const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
const currentFilteredPayments = filteredDonations.slice(
  indexOfFirstFilteredItem,
  indexOfLastFilteredItem
);
let countFiltered = indexOfFirstFilteredItem + 1;


 



  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {

    setIsDataLoading(true);


    try {
      // API payment to get  count
      const adminPaymentsEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_READ_PAYMENTS;
      // alert(adminPaymentsEndpoint);
      const adminPaymentsResponse = await axiosAdminInstance.get(adminPaymentsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPaymentsData(adminPaymentsResponse.data.data);  // Update state with  count
  
  
      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(adminPaymentsResponse.data.data), null, 2);  // Update state with payments count
    //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}





      // Once all data is fetched, set loading to false
      setIsDataLoading(false);
  
    } catch (error) {
      setIsDataLoading(false);
      
      // alert(error);
      // Handle errors
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

            {/* <div></div> */}

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
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-center leading-4 text-theme  tracking-wider'>
                          Transaction Reference
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Email
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Price
                        </th>
                        {/* <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Total Paid
                        </th> */}
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Subscription Type
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-right leading-4 text-theme  tracking-wider'>
                          Payment Method
                        </th>

                        {/* <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-center leading-4 text-theme  tracking-wider'>
                          Action
                        </th> */}
                        
                      </tr>
                    </thead>
            
                    {
                      // isDataloading ? <Loading />
                      // : 
                    <tbody className='text-xs '>
                      {currentFilteredPayments.map((payment, index) => (
                          <tr key={payment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-softTheme'}
                        // onClick={(e) => handlerequestRowClick(payment, e)} 
                          style={{ cursor: "pointer" }}
                          >
                          <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200'>
                          {countFiltered++}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> */}
                            {/* {process.env.REACT_APP_API_SERVER_650_IMAGE_PATH + payment.productImages[0]} */}
                            {/* <img src={process.env.REACT_APP_API_SERVER_650_IMAGE_PATH + payment.productImages[0]}  className="h-10 w-10 object-cover" /> */}
                          {/* </td> */}
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 cursor-pointer" onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(payment, e);
                          }}>
                            {payment.created_on}
                          </td>
                          {/* <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {payment.type}
                          </td> */}
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                          <span
                                    style={{
                                      backgroundColor: payment.type === 'naira' ? '#1cc939' : payment.type === 'dollar' ? '#161c34' : '#d85a27', 
                                      color: payment.type === 'naira' ? '#ffffff' : payment.type === 'dollar' ? '#ffffff': '#ffffff', 
                                      borderRadius: '6px'
                                    
                                  }} 
                                    className={'text-white px-2 py-2 '
                                    }>{payment.transaction_reference}</span>
                          </td>	
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 cursor-pointer" onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(payment, e);
                          }}>
                            {payment.email}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                            {/* {payment.tags.join(', ')} */}
                            {formatAmount(payment.price)}
                          </td>
                          {/* <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                            {formatAmount(payment.cumulative_price)}
                          </td> */}
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right cursor-pointer" onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(payment, e);
                          }}>
                            {payment.subscription_type}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-right cursor-pointer" onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(payment, e);
                          }}>
                            {/* {payment.payment_method} */}
                            <span
                                    style={{
                                      backgroundColor: payment.payment_method === 'naira' ? '#1cc939' : payment.payment_method === 'dollar' ? '#161c34' : '#d85a27', 
                                      color: payment.payment_method === 'naira' ? '#ffffff' : payment.payment_method === 'dollar' ? '#ffffff': '#ffffff', 
                                      borderRadius: '6px'
                                    
                                  }} 
                                    className={'text-white px-2 py-2 '
                                    }>{payment.payment_method}</span>
                          </td>
                          
                          {/* <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center ">
                          <span
                          className="text-theme cursor-pointer "
                          onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(payment, e);
                          }}
                          >
                            See Details
                            </span>
                          </td> */}
                         
                          
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
        </div>
    );
}
