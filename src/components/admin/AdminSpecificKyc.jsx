import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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

import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';


export default function AdminSpecificKyc({ 
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





    

  const [isUpdateDataloading, setIsUpdateDataLoading] = useState(false);
  const location = useLocation();
  const { selectedUser } = location.state || {};
    // alert(JSON.stringify(selectedUser), null, 2);

    const [userData, setUserData] = useState({
        userId: selectedUser.id,
        userFullname: selectedUser.fullname,
        userEmailAddress: selectedUser.email_address,
        userPhoneNumber: selectedUser.phone_number,
        userKycStatus: selectedUser.kyc_status,
        userAccountNumber: selectedUser.account_number,
        userAccountName: selectedUser.account_name,
        userBankname: selectedUser.bank_name,
        userGender: selectedUser.gender,
        userStateOfResidence: selectedUser.state_of_residence,
        userProfilePicture: selectedUser.profile_picture,
        userEmailVerified: selectedUser.email_verified,
        userRegistrationDate: selectedUser.registration_date,
        userUserType: selectedUser.user_type,
        userEligibility: selectedUser.eligibility,
        userIsCheat: selectedUser.is_cheat,
        userOpenedWelcomeMsg: selectedUser.opened_welcome_msg,

    });





    
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












    
    
      const currentPageName = "KYC";//userData.userFullname;
   


      const [isDataloading, setIsDataLoading] = useState(true);
      const [users, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(users ? users.length : 0);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.email_address && user.email_address.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.phone_number && user.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.kyc_status && user.kyc_status.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.account_number && user.account_number.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.account_name && user.account_name.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.bank_name && user.bank_name.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.gender && user.gender.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.state_of_residence && user.state_of_residence.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.email_verified && user.email_verified.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.registration_date && user.registration_date.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.user_type && user.user_type.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.eligibility && user.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.is_cheat && user.is_cheat.toLowerCase().includes(searchQuery.toLowerCase()) 
    || user.opened_welcome_message && user.opened_welcome_message.toLowerCase().includes(searchQuery.toLowerCase()) 
    // || user.tags && user.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
    // || user.categories && user.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
    // || user.price.includes(searchQuery)
);

const totalFilteredItems = filteredUsers.length;
const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);
const indexOfLastFilteredItem = currentPage * itemsPerPage;
const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
const currentFilteredUsers = filteredUsers.slice(
  indexOfFirstFilteredItem,
  indexOfLastFilteredItem
);
let countFiltered = indexOfFirstFilteredItem + 1;





    

 



  // useEffect(() => {
  //   handleData();
  // }, []);
  // const handleData = async () => {

  //   setIsDataLoading(true);


  //   try {
  //     // API user to get doctors count
  //     const adminUsersEndpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_READ_USERS;
  //     // alert(adminUsersEndpoint);
  //     const adminUsersResponse = await axiosAdminInstance.get(adminUsersEndpoint, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setUsersData(adminUsersResponse.data.data);  // Update state with doctors count
  
  
  //     // openNotificationModal(true, currentPageName, "");
  //     // alert(JSON.stringify(adminRequestsResponse.data.data), null, 2);  // Update state with users count
  //   //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}





  //     // Once all data is fetched, set loading to false
  //     setIsDataLoading(false);
  
  //   } catch (error) {
  //     setIsDataLoading(false);
      
  //     alert(error);
  //     // Handle errors
  //     if (error.response && error.response.data) {
  //       const errorMessage = error.response.data.message;
  //       openNotificationModal(false, currentPageName + " Error", errorMessage);
  //     } else {
  //       openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
  //     }
  //   }
  // };



  const updateUser = async (user) => {

    



    if (isUpdateDataloading) {
        // alert("please wait..");
        openNotificationModal(false, "Update User", "Please wait...");
        return;
    }



    setIsUpdateDataLoading(true);



    


    
    try {

      const requestData = {
        email: user.userEmailAddress,
        kycStatus: user.userKycStatus,
    };
    // alert(JSON.stringify(requestData), null, 2);
    // setIsUpdateDataLoading(false);
    // return;




        
        var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_UPDATE_KYC;
  //  alert(endpoint);
//    return;

  const response = await axiosAdminInstance.post(endpoint, requestData, {
              headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${token}`,
              },
            });

            setIsUpdateDataLoading(false);
            // alert(JSON.stringify(response.data, null, 2));
            if (response.data.status) {
                // alert("update-product " + JSON.stringify(response.data, null, 2));
                openNotificationModal(true, "Update User", response.data.userData.fullname + "'s " + response.data.message);
                setIsNotificationModalOpen(true);


                // navigateActiveTab(1);
                // navigate('/manage-kyc');

            } else {
                // alert("error: " + response.data.message);
                openNotificationModal(false, "Update User", response.data.message);
                setIsNotificationModalOpen(true);
            }
    } catch (error) {
        setIsUpdateDataLoading(false);
        // alert("error: " + error);
        openNotificationModal(false, "Update User", error);
        setIsNotificationModalOpen(true);
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
                  <div className="p-4  rounded-lg w-full  " style={{  }}>
            
            


            
                                  <div className='mx-0  '>
                                    <div className='  '>
            
                                    
                                    <motion.h1
                                                                        initial={{ y: -50, opacity: 0 }}
                                                                        animate={{ y: 0, opacity: 1 }}
                                                                        transition={{ delay: 0.2, duration: 0.5 }}
                                                                        className="text-2xl font-bold text-softTheme mb-2"
                                                                        >
                                                                        <div className='flex flex-col items-center justify-center  mb-2'>
                                                                        <p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>{currentPageName}</p>
                                                                        <div className='bg-softTheme mb-2' style={{ width: '80px', height: '2px' }}></div>
                                                                        </div>
                                                                        
                                                                        </motion.h1>


            
            
                                    {/* <div className='flex flex-col md:flex-row p-2 items-center justify-between'> */}
  {/* Left section - Page title */}
  {/* <div className="px-4 py-1 flex items-center bg-white text-theme mb-4 md:mb-0 rounded-lg">
    {currentPageName}
  </div> */}

  {/* Right section - Search */}
  {/* <div className='relative flex items-center w-full md:w-auto'>
    <SearchIcon className="absolute left-3 h-5 w-5 text-white" />
    <input
      type='text'
      placeholder='Search'
      className='w-full md:w-64 pl-10 text-white bg-theme border border-white rounded-lg py-1 focus:outline-none focus:border-2 focus:border-theme placeholder-white'
      onChange={handleSearchChange}
    />
  </div> */}
{/* </div> */}
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                                    <div className='flex w-full'>
                                    <div className="w-full" >
                                      

                                    <div className='flex w-full md:flex-row flex-col z-20'>
                             <div className="flex flex-col flex-grow border rounded-lg border-softTheme mx-4 mt-2 mb-12 px-4 " style={{ flexBasis: '50%' }}>                                 
                                 <div className='flex flex-col my-2 '>

                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4 ">                                    
                                 {/* <label htmlFor="fullname" className="block text-sm font-medium text-white mb-2">Profile Picture:</label> */}
                                 <div className="flex justify-center">
                                                <img 
                                                src={selectedUser.profile_picture}
                                                style={{
                                                  height: '200px',
                                                  width: '200px',
                                              }}
                                                className="w-full h-40 object-cover rounded-md mt-1" />
                                                  </div>                                  
                                    </div>

                                    

                                    <div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="fullname" className="block text-sm font-medium text-white mb-2">Fullname:</label>
                                            <input type="text" id="fullname" name="fullname"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Fullname' 
                                            value={selectedUser.fullname} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="email_address" className="block text-sm font-medium text-white mb-2">Email Address:</label>
                                            <input type="text" id="fullname" name="email_address"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Email Address' 
                                            value={selectedUser.email_address} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="phone_number" className="block text-sm font-medium text-white mb-2">Phone Number:</label>
                                            <input type="text" id="phone_number" name="phone_number"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Email Address'   
                                            value={selectedUser.phone_number}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap ">
                                      <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="gender" className="block text-sm font-medium text-white mb-2">Gender:</label>
                                            <input type="text" id="email_address" name="email_address"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Gender'   
                                            value={selectedUser.gender}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="email_verified" className="block text-sm font-medium text-white mb-2">Email Verified:</label>
                                            <input type="text" id="email_verified" name="email_verified"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Email Verified' 
                                            value={selectedUser.email_verified} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="eligibility" className="block text-sm font-medium text-white mb-2">Eligibility:</label>
                                            <input type="text" id="eligibility" name="eligibility"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Eligibility'   
                                            value={selectedUser.eligibility}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap ">
                                        
                                    </div>      

                                    {/* <div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="registration_date" className="block text-sm font-medium text-white mb-2">Registration Date:</label>
                                            <input type="text" id="registration_date" name="registration_date"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Registration Date' 
                                            value={selectedUser.registration_date} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>
                                        
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="user_type" className="block text-sm font-medium text-white mb-2">User Type:</label>
                                            <input type="text" id="user_type" name="user_type"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Email Address'   
                                            value={selectedUser.user_type}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>
                                    </div>*/}

                                    <div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="bank_name" className="block text-sm font-medium text-white mb-2">Bank name:</label>
                                            <input type="text" id="bank_name" name="bank_name"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Registration Date' 
                                            value={selectedUser.bank_name} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="account_name" className="block text-sm font-medium text-white mb-2">Account Name:</label>
                                            <input type="text" id="account_name" name="account_name"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Account Name'   
                                            value={selectedUser.account_name}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="account_number" className="block text-sm font-medium text-white mb-2">Account Number:</label>
                                            <input type="text" id="account_number" name="account_number"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Email Address'   
                                            value={selectedUser.account_number}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="state_of_residence" className="block text-sm font-medium text-white mb-2">State of Residence:</label>
                                            <input type="text" id="state_of_residence" name="state_of_residence"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='State of Residence' 
                                            value={selectedUser.state_of_residence} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>
                                        
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="kyc_status" className="block text-sm font-medium text-white mb-2">KYC Status:</label>
                                           
                                            <select
                id="userKycStatus"
                name="userKycStatus"
                className="bg-gray-50 border border-gray-300 text-black text-sm focus:ring-gray-500 focus:border-gray-500 rounded-lg 
                    block w-full p-2.5"
                    value={userData.userKycStatus}
                    onChange={(e) => {
                      // alert(e.target.value);
                      setUserData({ ...userData, userKycStatus: e.target.value })                      
                  }}
            >
                <option value="">Select KYC Status</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="is_cheat" className="block text-sm font-medium text-white mb-2">Is Cheat:</label>
                                            <input type="text" id="is_cheat" name="is_cheat"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Is Cheat' 
                                            value={selectedUser.is_cheat} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>
                                        
                                        <div className="w-full md:w-1/3 px-2 mb-4">
                                            <label htmlFor="opened_welcome_msg" className="block text-sm font-medium text-white mb-2">Opened Welcome Message:</label>
                                            <input type="text" id="opened_welcome_msg" name="opened_welcome_msg"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='KYC Status'   
                                            value={selectedUser.opened_welcome_msg}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                 



                                    

                                    
                                    {/* <div className="w-full md:w-1/1 px-2 mb-4 ">
                                        <label htmlFor="productDescription" className="block text-sm font-medium text-white mb-2">Product Description:</label>
                                        <textarea id="productDescription" name="description"
                                        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                        block w-full p-2.5" placeholder='Description'  style={{ height: '180px' }}
                                        // value={productData.productDescription} 
                                        // onChange={(e) => setProductData({ ...productData, productDescription: e.target.value })}
                                        ></textarea>
                                    </div> */}

                                    

                                    
                                    
                                    





                                 </div>


                                 <hr className='mb-4'/>
                                 {
                                    
                    //                 <div  
                    // // onClick={() => updateUser(userData)} 
                    // style={{ }} className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2">
                    //   <UpdateIcon style={{ color: '#ffffff', borderRadius: '0px'}} className="mr-2 " />
                    //   <div className="text-s " style={{color: '#ffffff'}}>{isUpdateDataloading ? "Updating.." : 'Update KYC'}</div>
                    // </div>
                                    
                                 }
                                                                 
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
