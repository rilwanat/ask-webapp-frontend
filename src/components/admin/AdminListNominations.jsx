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


export default function AdminListSponsoAdminListNominationsrs({ 
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




    const navigateTo = (route, data) => {
      navigate(route, { state: data });
    };



    
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






















    const handleNominationRowClick = (user, e) => {
      {                
          // alert(JSON.stringify(request, null, 2));
  
          // const encryptedData = AES.encrypt(JSON.stringify(product), 'encryptionKey').toString();
          navigate(`/specific-user/${user.id}`, {
            state: {
              selectedUser: user, // Pass any data you want as props here
            }
          });
  
          // setCurrentProduct(product);
          // navigateActiveTab(8);
  
          //
          
      }
      
  
    };











    
    
      const currentPageName = "Nominations";
    


      const [isDataloading, setIsDataLoading] = useState(true);
      const [nominations, setNominationsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(30);
    const [totalItems, setTotalItems] = useState(nominations ? nominations.length : 0);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const filteredNominations = (nominations || []).filter((request) =>
    request.voter.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.voter_email.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.nominee.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.device.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.voted_time.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.registration_date.includes(searchQuery.toLowerCase()) 
    || request.location.toLowerCase().includes(searchQuery.toLowerCase()) 
    || request.vote_weight.toLowerCase().includes(searchQuery.toLowerCase()) 
    // || request.tags && request.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
    // || request.categories && request.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
    // || request.price.includes(searchQuery)
);

const totalFilteredItems = filteredNominations.length;
const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);
const indexOfLastFilteredItem = currentPage * itemsPerPage;
const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
const currentFilteredNominations = filteredNominations.slice(
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
      // API request to get  count
      const adminNominationsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_ADMIN_READ_NOMINATIONS;
      // alert(adminSponsorsEndpoint);
      const adminNominationsResponse = await axiosAdminInstance.get(adminNominationsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNominationsData(adminNominationsResponse.data.data);  // Update state with  count
  
  
      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(adminNominationsResponse.data.data), null, 2);  // Update state with nominations count
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
  {/* <div className="px-4 py-1 flex justify-center items-center border border-white text-white mb-4 md:mb-0 rounded-lg">
    {currentPageName + ' (' + totalFilteredItems + ')'}
  </div> */}
  <div 
              onClick={() => { 
                
              }}
              style={{ width: '200px' }}
              className='text-center  rounded-sm px-4 py-1 text-sm cursor-pointer  bg-theme text-white mb-4 md:mb-0'>
              {currentPageName + ' (' + totalFilteredItems + ')'}
            </div>

    {/* Center section - Page title */}


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
                          Voter
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Voter Email
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Nominee
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Device
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Voted Time
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Reg. Date
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Location
                        </th>
                        <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Vote Weight
                        </th>
                        
                        {/* <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-left leading-4 text-theme  tracking-wider'>
                          Help Token
                        </th> */}

                        {/* <th style={{ }} className=' px-2 py-3 border-b border-gray-300 text-center leading-4 text-theme  tracking-wider'>
                          Action
                        </th> */}
                        
                      </tr>
                    </thead>
            
                    {
                      // isDataloading ? <Loading />
                      // : 
                    <tbody className='text-xs '>
                      {currentFilteredNominations.map((nomination, index) => (
                          <tr key={nomination.id} className={index % 2 === 0 ? 'bg-white' : 'bg-softTheme'}
                        onClick={(e) => handleNominationRowClick(nomination.user, e)} 
                          style={{ cursor: "pointer" }}
                          >
                          <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200'>
                          {countFiltered++}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> */}
                            {/* {process.env.REACT_APP_API_SERVER_650_IMAGE_PATH + nomination.productImages[0]} */}
                            {/* <img src={process.env.REACT_APP_API_SERVER_650_IMAGE_PATH + nomination.productImages[0]}  className="h-10 w-10 object-cover" /> */}
                          {/* </td> */}
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 cursor-pointer" onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(nomination, e);
                          }}>
                            {nomination.voter}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.voter_email}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.nominee}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.device}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.voted_time}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.registration_date}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.location}
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                            {nomination.vote_weight}
                          </td>
                          
                          {/* <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center ">
                          <span
                          className="text-theme cursor-pointer "
                          onClick={(e) => {
                            //setShowDialog(false); 
                            // handleProductClick(nomination, e);
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
