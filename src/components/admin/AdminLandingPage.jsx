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

import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';


export default function AdminLandingPage({ 
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


































    
    
      const [sampleDatas, setSampleDatas] = useState([]);
      const [requestDatas, setRequestDatas] = useState([]);
      const [upcomingAppointmentData, setUpcomingAppointmentData] = useState([]);
    
      const currentPageName = "Overview";
      useEffect(() => {
        
        //const storedName = localStorage.getItem('user_name');
        //setStoredName(storedName);
    
    
        // Mock workshops data for demonstration
        const sample = Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          sn: index + 1,
          name: `User ${index + 1}`,
          workshop: `Workshop ${index + 1}`,
          email: `user${index + 1}@example.com`,
          time: '10:00 AM',
        }));
    
        setSampleDatas(sample);
    
    
        const request = Array.from({ length: 5 }, (_, index) => ({
          id: index + 1,
          name: "James",
          time: '02:00 PM',
        }));
    
        setRequestDatas(request);
    
    
        const nomineesData = [
          {
            id: 1,
            type: 'Consultation',
            name: 'Martha Joseph',
            time: '10:00 AM',
            description: 'High fever with extreme cold for over a week',
            specialist: 'Rb Apps',
            specialization: 'General Practitioner'
          },
          {
            id: 2,
            type: 'Follow-up',
            name: 'Chinedu Okafor',
            time: '11:30 AM',
            description: 'Persistent headache and dizziness',
            specialist: 'Rb Apps',
            specialization: 'Neurologist'
          },
          {
            id: 3,
            type: 'Follow-up',
            name: 'Khatrin Abu',
            time: '1:30 PM',
            description: 'Tummy upsets and dizziness',
            specialist: 'Rb Apps',
            specialization: 'Neurologist'
          },
        ];
        setUpcomingAppointmentData(nomineesData);
    
    
      }, []);
    




  const [products, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(products ? products.length : 0);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    || product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
    || product.categories && product.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
    || product.price.includes(searchQuery)
);

const totalFilteredItems = filteredProducts.length;
const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);
const indexOfLastFilteredItem = currentPage * itemsPerPage;
const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
const currentFilteredProducts = filteredProducts.slice(
  indexOfFirstFilteredItem,
  indexOfLastFilteredItem
);
let countFiltered = indexOfFirstFilteredItem + 1;




const sample1 = [
  { name: 'Jan', sales: 6000, nominations: 5470},
  { name: 'Feb', sales: 5600, nominations: 1618},
  { name: 'Mar', sales: 2500, nominations: 9890},
  { name: 'Apr', sales: 7780, nominations: 1928},
  { name: 'May', sales: 4890, nominations: 3470},
  { name: 'Jun', sales: 6390, nominations: 1870},
  { name: 'Jul', sales: 5490, nominations: 8300},
  { name: 'Aug', sales: 7310, nominations: 4410},
  { name: 'Sep', sales: 3250, nominations: 1358},
  { name: 'Oct', sales: 1200, nominations: 6800},
  { name: 'Nov', sales: 3780, nominations: 2948},
  { name: 'Dec', sales: 4890, nominations: 9800}
];
  // Function to generate a random number within a range
  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
    // Function to randomize data
  const randomizeData = (data) => {
    return data.map(item => ({
      ...item,
      sales: getRandomNumberInRange(1000, 10000), // Adjust the range as needed
      totalOrders: getRandomNumberInRange(1000, 10000), // Adjust the range as needed
    }));
  };
  
  // Randomized data arrays
  const randomizedSample1 = randomizeData([...sample1]);













    

  const [isDataloading, setIsDataLoading] = useState(true);
  const [dashboard, setDashboardData] = useState([]);
  const [dashboardDoctorsCount, setDashboardDoctorsCount] = useState(0);
  const [dashboardPatientsCount, setDashboardPatientsCount] = useState(0);
  const [dashboardApointmentsCount, setDashboardApointmentsCount] = useState(0);

  const [dashboardTotal, setDashboardTotal] = useState(0);
  const [dashboardIncoming, setDashboardIncoming] = useState(0);
  const [dashboardOutgoing, setDashboardOutgoing] = useState(0);


  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {

    setIsDataLoading(true);


    try {
      // API request to get  count
      // alert(import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_DASHBOARD_STATISTICS);
      const adminDashboardStatisticsEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_DASHBOARD_STATISTICS;
      // alert(adminDashboardStatisticsEndpoint);
      const adminDashboardStatisticsResponse = await axiosAdminInstance.get(adminDashboardStatisticsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      setDashboardData(adminDashboardStatisticsResponse.data);  // Update state with  count
  
  
      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(adminDashboardStatisticsResponse.data), null, 2);  // Update state with appointments count
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

            
            
<div className='flex flex-col justify-center items-center px-0 sm:px-16 md:px-24'>

            <div className=' p-4 rounded-lg w-full mt-24'> 
                  <div className="flex flex-col md:flex-row p-4 bg-theme rounded-lg w-full" style={{  }}>
            
            
                                    <div className="w-full md:w-2/3 lg:w-3/4  rounded-lg  md:px-4 md:mx-2 bg-white">
            
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      
                                      <div className="rounded-lg p-4 flex my-2 mx-1 text-black  bg-white cursor-pointer" 
                                      // onClick={() => setActiveTab(2)}
                                      >
                                        <div className="flex flex-row items-center">
                                          <div className="py-2 mr-2">
                                            <div className='flex items-center justify-center p-1 rounded-3xl' style={{height: "48px", width: "48px", background: "#F4F7FE" }} >
                                              {/* <img className="w-12 h-12 object-scale-down p-1" 
                                            //   src={bars} 
                                              alt=""  /> */}
                                              <PaymentsIcon onClick={() => {
                                                
                                              }} />
                                            </div>
                                          </div>
                                          <div className="flex flex-col py-2 ml-2 text-theme">
                                            <p className='' style={{ fontSize: '14px', fontweight: '500'   }}>Total</p>
                                            {
                                              isDataloading ? <div className='my-2'><MiniLoading /></div>
                                              :
                                              <> 
                                              <p className='font-bold text-eDoctorDarkGray' style={{ fontSize: '24px' }}>N{dashboardTotal}</p>
                                              {/* <div className='flex justify-end items-center'>
                                                <ArrowDropUpIcon style={{ color: '#14CC26' }}/>
                                                <p className='' style={{ fontSize: '12px', fontWeight: '600', color: '#14CC26' }}>+/-##%</p>
                                              </div> */}
                                              </>
                                            }                                
                                            
                                          </div>
                                        </div>
                                      </div>
                                  
                                      <div className="rounded-lg p-4 flex my-2 mx-1 text-black  bg-white cursor-pointer" 
                                      // onClick={() => setActiveTab(1)}
                                      >
                                        <div className="flex flex-row items-center">
                                          <div className="py-2 mr-2">
                                            <div className='flex items-center justify-center bg-green-200 rounded-3xl' style={{height: "48px", width: "48px" }} >
                                              {/* <img className="w-12 h-12 object-scale-down p-1" 
                                            //   src={naira} 
                                              alt=""  /> */}
                                              <TrendingDownIcon />
                                            </div>
                                          </div>
                                          <div className="flex flex-col py-2 ml-2 text-theme">
                                            <p className='' style={{ fontSize: '14px', fontweight: '500'  }}>Incoming</p>
                                            {
                                              isDataloading ? <div className='my-2'><MiniLoading /></div>
                                              :
                                              <> 
                                              <p className='font-bold text-eDoctorDarkGray' style={{ fontSize: '24px' }}>{'₦' + formatAmount(dashboard.dashboardData[0].Total_Incoming)}</p>
                                              {/* <div className='flex justify-end items-center'>
                                                <ArrowDropDownIcon style={{ color: '#E63D46' }}/>
                                                <p className='' style={{ fontSize: '12px', fontWeight: '600', color: '#E63D46' }}>+/-##%</p>
                                              </div> */}
                                              </>
                                            }                               
                                          </div>
                                        </div>
                                      </div>
            
                                      <div className="rounded-lg p-4 flex my-2 mx-1 text-black  bg-white cursor-pointer" 
                                      // onClick={() => setActiveTab(3)}
                                      >
                                        <div className="flex flex-row items-center">
                                          <div className="py-2 mr-2">
                                            <div className='flex items-center justify-center bg-red-200 rounded-3xl' style={{height: "48px", width: "48px" }} >
                                              {/* <img className="w-12 h-12 object-scale-down " 
                                              // src={profile2user} 
                                              alt=""  /> */}
                                              <TrendingUpIcon />
                                            </div>
                                          </div>
                                          <div className="flex flex-col py-2 ml-2 text-theme">
                                            <p className='' style={{ fontSize: '14px', fontweight: '500' }}>Outgoing</p>
                                            {
                                              isDataloading ? <div className='my-2'><MiniLoading /></div>
                                              :
                                              <>
                                              <p className='font-bold text-eDoctorDarkGray' style={{ fontSize: '24px' }}>{'₦' + formatAmount(dashboard.dashboardData[0].Total_Outgoing)}</p>
                                              {/* <div className='flex justify-end items-center'>
                                                <ArrowDropDownIcon style={{ color: '#E63D46' }}/>
                                                <p className='' style={{ fontSize: '12px', fontWeight: '600', color: '#E63D46' }}>+/-##%</p>
                                              </div> */}
                                              </>
                                            }    
                                            
                                          </div>
                                        </div>
                                      </div>    
                                  
                                  
                                    </div>
            
            
            
                                    
            
                                        
                                        {/* Recharts LineChart */}
                                        <div className='flex flex-col w-full  pb-4 '>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      
                                      <div className="rounded-lg p-4 flex my-2 mx-1 text-black  cursor-pointer" style={{ backgroundColor: '#EDFCF2'}}
                                    onClick={() =>  navigateTo('/manage-users')}
                                      >
                                        <div className="flex flex-row items-center" >
                                          <div className="py-2 mr-2">
                                            <div className='' style={{height: "40px" }} >
                                              <GroupIcon style={{fontSize: '40px' }} 
                                              className="p-2 mb-2 text-white cursor-pointer rounded-3xl bg-theme"/>
                                              {/* <img className="w-12 h-12 object-scale-down " 
                                            //   src={profile2user} 
                                              alt=""  /> */}
                                            </div>
                                          </div>
                                          <div className="flex flex-col py-2 ml-2">
                                            {
                                              isDataloading ? <MiniLoading />
                                              : 
                                              <p className='font-bold text-eDoctorDarkGray' style={{ fontSize: '30px' }}>{dashboard.dashboardData[0].Total_Users}</p>
                                            }                                
                                            <p className=' text-eDoctorTextGray' style={{ fontSize: '18px', fontWeight: '500' }}>Users</p>
                                            {/* <p className='text-sm'><strong>{!(dashboard.length > 0) ? '-' : dashboard[0].Total_Commodities}</strong></p> */}
                                            {/* <p className='text-sm'><strong>{dashboardData.Total_Users}</strong></p> */}
                                          </div>
                                        </div>
                                      </div>
                                  
                                      <div className="rounded-lg p-4 flex my-2 mx-1 text-black  cursor-pointer"  style={{ backgroundColor: '#FEF3F2'}}
                                    onClick={() =>  navigateTo('/requests-list')}
                                      >
                                        <div className="flex flex-row items-center">
                                          <div className="py-2 mr-2">
                                            <div className='' style={{height: "40px" }} >
                                              <ElderlyIcon style={{fontSize: '40px' }} 
                                              className="p-2 mb-2 text-white cursor-pointer rounded-3xl bg-theme"/>
                                              {/* <img className="w-12 h-12 object-scale-down " 
                                            //   src={users} 
                                              alt=""  /> */}
                                            </div>
                                          </div>
                                          <div className="flex flex-col py-2 ml-2">
                                          {
                                              isDataloading ? <MiniLoading />
                                              : 
                                              <p className='font-bold text-eDoctorDarkGray' style={{ fontSize: '30px' }}>{dashboard.dashboardData[0].Total_Help_Requests}</p>
                                            }                                
                                            <p className=' text-eDoctorTextGray' style={{ fontSize: '18px' }}>Help Requests</p>
                                            {/* <p className='text-sm'><strong>{!(dashboard.length > 0) ? '-' : dashboard[0].Total_Markets}</strong></p>  */}
                                            {/* <p className='text-sm'><strong>{dashboardData.Total_Products}</strong></p> */}
                                            {/* <p className='text-sm'><strong>{'0'}</strong></p> */}
                                          </div>
                                        </div>
                                      </div>
            
                                      <div className="rounded-lg p-4 flex my-2 mx-1 text-black  cursor-pointer"   style={{ backgroundColor: '#FEF7E6'}}
                                      onClick={() =>  navigateTo('/beneficiaries-list')}
                                      >
                                        <div className="flex flex-row items-center">
                                          <div className="py-2 mr-2">
                                            <div className='' style={{height: "40px" }} >
                                              <VolunteerActivismIcon style={{fontSize: '40px' }} 
                                              className="p-2 mb-2 text-white cursor-pointer rounded-3xl bg-theme"/>
                                              {/* <img className="w-12 h-12 object-scale-down " 
                                            //   src={Icon} 
                                              alt=""  /> */}
                                            </div>
                                          </div>
                                          <div className="flex flex-col py-2 ml-2">
                                          {
                                              isDataloading ? <MiniLoading />
                                              : 
                                              <p className='font-bold text-eDoctorDarkGray' style={{ fontSize: '30px' }}>{dashboard.dashboardData[0].Total_Beneficiaries}</p>
                                            }                                
                                            <p className=' text-eDoctorTextGray' style={{ fontSize: '18px' }}>Beneficiaries</p>
                                            {/* <p className='text-sm'><strong>{!(dashboard.length > 0) ? '-' : dashboard[0].Total_Markets}</strong></p>  */}
                                            {/* <p className='text-sm'><strong>{'0'}</strong></p> */}
                                            {/* <p className='text-sm'><strong>{dashboardData.Total_Sales}</strong></p> */}
                                          </div>
                                        </div>
                                      </div>    
                                  
                                  
                                    </div>
            
            
                                    <div className="w-full md:w-4/4 lg:w-1/1 mt-8 border-black-200 border-2  white shadow-lg rounded-lg p-8">
                                      <div className='bg-gray-50 p-4 rounded-lg mb-2'>
                                        <div className='flex flex-col md:flex-row'>
                                          <div className='flex flex-row w-full'>
                                            
            
                                            <div className="w-full md:w-2/6 mb-4 mr-4 h-full flex items-center relative">
                  <select
                    id="statusSelect"
                    name="statusSelect"
                    className="bg-white border border-gray-300 text-eDoctorBlue text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2 pl-4 pr-8 appearance-none"
                    onChange={(e) => {
                      // handleChange for month
                    }}
                  >
                    <option value="">Month</option>
                    {/* Map categories here */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <KeyboardArrowDownIcon style={{ color: '#254EDB', width: '20px', height: '20px' }}/>
                  </div>
                </div>
            
            
                                          </div>
            
                                          <div className='flex flex-row w-full justify-end'>
                                          <div className="w-full md:w-2/6 mb-4 mr-4 h-full flex items-center relative">
                  <select
                    id="patientsSelect"
                    name="patientsSelect"
                    className="bg-white border border-gray-300 text-eDoctorBlue text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2 pl-4 pr-8 appearance-none"
                    onChange={(e) => {
                      // handleChange for 
                    }}
                  >
                    <option value="">Nominations</option>
                    {/* Map categories here */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <KeyboardArrowDownIcon style={{ color: '#254EDB', width: '20px', height: '20px' }}/>
                  </div>
                </div>
                                            
                                            <div className="w-full md:w-3/6 mb-4 mr-4 h-full flex items-center">
                                              <div className="relative w-full">
                                                <FileDownloadOutlinedIcon style={{ color: '#254EDB' }} className='absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none' />
                                                  <select
                                                    id="statusSelect"
                                                    name="statusSelect"
                                                    className="bg-white border border-gray-300 text-eDoctorTextDropdown text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                    block w-full pl-10 p-2 appearance-none"
                                                    onChange={(e) => {
                                                    // handleChange for status
                                                    }}
                                                  >
                                                    <option value="">Save Report</option>
                                                    {/* Map categories here */}
                                                  </select>
                                              </div>
                                            </div>
            
                                          </div>
                                        </div>
                                      </div>
                              
                              <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={randomizedSample1} barSize={8}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Line type="monotone" dataKey="nominations" stroke="#82ca9d" strokeWidth={3}/>
                                  
                                </LineChart>
                              </ResponsiveContainer>

                            </div>
                                        
                                        </div>
                                        
                                        
            
                                        
            
                                    </div>






                                    <div className="w-full md:w-1/3 lg:w-1/4  ">
                            
                            <div className='rounded-lg shadow-lg px-4 mx-0 border-black-200 border-2 bg-white'>
                            <div className="flex justify-between my-2 pb-2 " style={{ }}>
                                <div className="flex w-full items-center justify-between  bg-">
                                    <div className="text-s font-bold pr-2">Top Nominations</div>
                                    <div className="text-s px-2 mr-0 rounded bg-orange" style={{  color: '#ffffff' }}>{
                                      isDataloading ? <MiniLoading />
                                      : 
                                    dashboard.dashboardData[0].Top_Nominations.length
                                    }</div>
                                </div>
                                
                            </div>
                            <div>
                                {dashboard?.dashboardData?.[0]?.Top_Nominations?.map((requestData, index) => (
                                    <div key={index} 
                                    className='flex justify-between rounded-lg my-2' style={{ padding: '10px 10px', backgroundColor: '#FAF3E0'}}
                                    // onClick={(e) => navigateToAppointments()}
                                    >
                                    <div className='flex'>
                                    
                                    <div className='mr-2 bg-orange' style={{ width: '6px', height: '100%', }}></div>

                                    
                                            <div className='flex flex-col'>
                                            <p style={{fontSize: '14px', fontWeight: 'bold'}}>{requestData.fullname}</p>
                                          <p style={{fontSize: '10px'}}>{requestData.name}</p>
                                          <div className='flex'>
                                          <p style={{fontSize: '10px'}} className='mr-4'>{requestData.date}</p>
                                          {/* <p style={{fontSize: '10px'}}>{requestData.description}</p> */}
                                          </div>
                                      </div>
                                      </div>
                                      <div className='flex flex-col items-end'>
                                      <p style={{fontSize: '12px', fontWeight: 'bold' }}>{requestData.nomination_count}</p>
                                      <p style={{fontSize: '12px' }} className=''>{requestData.specialist}</p>
                                      </div>
                                      
                                      
                                      
                                  </div>
                                    ))}
                            </div>
                            <div className='flex w-full justify-end my-4 ' style={{ cursor: 'pointer' }} 
                            onClick={() => { navigate('/requests-list'); }}
                            >
                              <p style={{fontSize: '12px' }}>View All</p>
                            </div>
                            </div>

                            <div className='rounded-lg shadow-lg px-4 mx-0 border-2 border-black-200 bg-white mt-4'>
                            <div className="flex justify-between my-2 pb-2 " style={{ }}>
                                <div className="flex w-full items-center justify-between">
                                    <div className="text-s font-bold pr-2">#</div>
                                    <div className="text-s px-2 mr-0 rounded" style={{ backgroundColor:'#29B474', color: '#ffffff' }}>{chats.length}</div>
                                </div>
                                
                            </div>
                            <div>
                            {chats.length > 0 ? (
        <ul >
          {chats.map((chat) => (
            <li key={chat.id} className={`my-2 cursor-pointer 
              ${
                chat.id === selectedChatId
                  ? " bg-eDoctorVeryLightBlue"
                  : " "
              }
              `}
            onClick={() => {

              // setSelectedChatId(chat.id);

              // setReceiverName(chat.lastMessageReceiverName);
              // setSenderName(chat.lastMessageSenderName);
              
              // fetchMessages(chat.id);   
              
            //   navigate('/manage-messages');
            }}
            >
              <div className='flex flex-col'>
              <div className='flex'>
              {/* <div className="relative flex mr-4 items-center justify-center" style={{ borderRadius: '12px', width: '48px', height: '48px' }}>
                                            <img className="object-scale-down" src={getRandomImage()} alt="" style={{ borderRadius: '12px', width: '100%', height: '100%' }} />
                                            <div className='absolute z-50 border-2 border-white' style={{ width: '12px', height: '12px', 
                                              backgroundColor: getRandomColor(), 
                                              borderRadius: '6px', top: '0px', right: '0px' }}></div>
                                          </div> */}
              <div className="flex-shrink-0 flex mr-4 items-center justify-center  bg-black" style={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                                    <img className="object-scale-down" 
                                    // src={doctor.profile_image} 
                                    alt="" />
                                  </div>
    
<div className='flex flex-col text-sm w-full'>

                                  
              {/* <p><strong>Chat ID:</strong> {chat.id}</p> */}
              <div className='flex justify-between '>
                <div className='flex flex-col'>
                <p className=''>
                {/* <strong>Sender:</strong>  */}
                {chat.lastMessageSenderName}</p>
                <p style={{fontSize: '10px'}} >{chat.lastMessageTimestamp && chat.lastMessageTimestamp.toDate().toLocaleString()}</p>
                </div>
                {/* <p><strong>Last Message:</strong> {chat.lastMessage}</p> */}
                <div className='flex flex-col'>
                <p className='' style={{ fontSize: '10px' }}>
                  {/* ## */}
                  {chat.lastMessageTimestamp && getElapsedTime(chat.lastMessageTimestamp)}
                  </p>
                  <div className="text-s text-center rounded" style={{ backgroundColor:'#E53761', color: '#ffffff', width: '22px', height: '22px' }} >.</div>
                </div>
              </div>
                {/* <p><strong>ReceiverName:</strong> {chat.lastMessageReceiverName}</p>               */}
                {/* <p><strong>Timestamp:</strong> {chat.lastMessageTimestamp && chat.lastMessageTimestamp.toDate().toLocaleString()}</p> */}
                {/* <p style={{fontSize: '10px'}} >{chat.lastMessageTimestamp && chat.lastMessageTimestamp.toDate().toLocaleString()}</p> */}
                {/* <p className='text-xs text-eDoctorTextGray'>title</p> */}
                {/* <hr className='my-2'/> */}
              </div>
              </div>

              {/* <div className='text-sm mt-1'>
              <p className='mt-2 text-eDoctorTextGray'>
                <strong>Last Message:</strong> 
                {chat.lastMessage}</p>
              </div> */}
              </div>
              <hr className='my-4'/>
            </li>
          ))}
        </ul>
      ) : (
        <p>#</p>
      )}



                                {/* {requestDatas.map((requestData, index) => (
                                    <div className='flex flex-col'>
                                      <div key={index} 
                                      className='cursor-pointer flex justify-between rounded-lg my-2' style={{ padding: '8px 0px', backgroundColor: '#FFFFFF'}}
                                      onClick={(e) => navigateToMessages()} 
                                      >
                                        <div className='flex'>
                                          <div className="relative flex mr-4 items-center justify-center" style={{ borderRadius: '12px', width: '48px', height: '48px' }}>
                                            <img className="object-scale-down" src={getRandomImage()} alt="" style={{ borderRadius: '12px', width: '100%', height: '100%' }} />
                                            <div className='absolute z-50 border-2 border-white' style={{ width: '12px', height: '12px', 
                                              backgroundColor: getRandomColor(), 
                                              borderRadius: '6px', top: '0px', right: '0px' }}></div>
                                          </div>

                                          <div className='flex flex-col justify-center'>
                                            <p style={{fontSize: '14px'}}>{requestData.title}</p>
                                            <p style={{fontSize: '10px'}}>{requestData.time}</p>
                                          </div>
                                        </div>

                                        <div className='flex flex-col  items-end'>
                                          <p style={{fontSize: '10px'}}>{requestData.time}</p>
                                          <div className="text-s text-center rounded" style={{ backgroundColor:'#E53761', color: '#ffffff', width: '22px', height: '22px' }} >3</div>
                                        </div>                                      
                                  </div>
                                   <hr />
                                    </div>
                                  
                                    ))} */}


<div className='flex w-full justify-end my-4 ' style={{ cursor: 'pointer' }} 
                            // onClick={() => { navigate('/manage-nominations'); }}
                            >
                              <p style={{fontSize: '12px' }}>View All</p>
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
