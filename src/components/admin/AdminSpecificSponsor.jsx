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


export default function AdminSpecificSponsor({ 
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
  const { selectedSponsor } = location.state || {};
    // alert(JSON.stringify(selectedSponsor), null, 2);


    const [sponsorData, setSponsorData] = useState({
      id: selectedSponsor.id,
      name: selectedSponsor.name,
      date: selectedSponsor.date,
      type: selectedSponsor.type,
      image: selectedSponsor.image
  
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












    
    
      const currentPageName = "Sponsor";//sponsorData.userFullname;
   


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





    

 




  const updateSponsor = async (sponsor) => {

    if (isUpdateDataloading) {
        // alert("please wait..");
        openNotificationModal(false, "Update Sponsor", "Please wait...");
        return;
    }

    setIsUpdateDataLoading(true);

    
    try {
      const updateSponsorData = {
        sponsorId: sponsor.id,
        sponsorName: sponsor.name,
        sponsorType: sponsor.type
    };
    // alert(JSON.stringify(updateSponsorData), null, 2);
    // setIsUpdateDataLoading(false);
    // return;

        
        var endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_UPDATE_SPONSOR;
  //  alert(endpoint);
//    return;

  const response = await axiosAdminInstance.post(endpoint, updateSponsorData, {
              headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${token}`,
              },
            });

            setIsUpdateDataLoading(false);
            // alert(JSON.stringify(response.data, null, 2));
            if (response.data.status) {
                // alert("update-product " + JSON.stringify(response.data, null, 2));
                openNotificationModal(true, "Update Sponsor", response.data.message);
                


                // navigateActiveTab(1);
                // navigate('/sponsors-list');

            } else {
                // alert("error: " + response.data.message);
                openNotificationModal(false, "Update Sponsor", response.data.message);
                
            }
    } catch (error) {
        setIsUpdateDataLoading(false);
        // alert("error: " + error);
        openNotificationModal(false, "Update Sponsor", error);
        
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
                  <div className="p-4 bg-theme rounded-lg w-full  " style={{  }}>
            
            


            
                                  <div className='mx-0  '>
                                    <div className=''>
            


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


                                    
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                                    <div className='flex w-full'>
                                    <div className="w-full " >
                                      

                                    <div className='flex w-full md:flex-row flex-col z-20'>
                             <div className="flex flex-col flex-grow border rounded-lg border-softTheme mx-4 mt-2 mb-12 px-4 " style={{ flexBasis: '50%' }}>                                 
                                 <div className='flex flex-col my-2 '>

                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4 ">                                    
                                 {/* <label htmlFor="fullname" className="block text-sm font-medium text-white mb-2">Profile Picture:</label> */}
                                 <div className="flex justify-center">
                                                <img 
                                                src={import.meta.env.VITE_API_SERVER_URL + "../../../" + sponsorData.image}
                                                style={{
                                                  height: '200px',
                                                  width: '200px',
                                              }}
                                                className="w-full h-40 object-cover rounded-md mt-1" />
                                                  </div>                                  
                                    </div>

                                    

                                    



                                    <div className="flex flex-wrap ">
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="is_cheat" className="block text-sm font-medium text-white mb-2">Sponsor Name:</label>
                                            <input type="text" id="is_cheat" name="is_cheat"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='Is Cheat' 
                                            value={sponsorData.name} 
                                            // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                                            />
                                        </div>
                                        
                                        {/* <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="opened_welcome_msg" className="block text-sm font-medium text-white mb-2">Date:</label>
                                            <input type="text" id="opened_welcome_msg" name="opened_welcome_msg"
                                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                            block w-full p-2.5" placeholder='KYC Status'   
                                            value={sponsorData.date}
                                            // onChange={(e) => setProductData({ ...productData, productSlug: e.target.value })}
                                            />
                                        </div> */}
                                        <div className="w-full md:w-1/2 px-2 mb-4">
                                            <label htmlFor="kyc_status" className="block text-sm font-medium text-red-300 mb-2">Sponsor Type:</label>
                                           
                                            <select
                id="userKycStatus"
                name="userKycStatus"
                className="bg-gray-50 border border-gray-300 text-black text-sm focus:ring-gray-500 focus:border-gray-500 rounded-lg 
                    block w-full p-2.5"
                    value={sponsorData.type}
                    // disabled
                    onChange={(e) => {
                      // alert(e.target.value);
                      setSponsorData({ ...sponsorData, type: e.target.value })                     
                  }}
            >
<option value="Select">Select Type</option>
  <option value="Sponsor">Sponsor</option>
  <option value="Donor">Donor</option>
  <option value="Partner">Partner</option>
            </select>
                                        </div>
                                    </div>






                                 </div>


                                 <hr className='mb-4'/>
                                 {
                                    
                                    <div  
                    onClick={() => updateSponsor(sponsorData)} 
                    style={{ }} className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2">
                      <UpdateIcon style={{ color: '#ffffff', borderRadius: '0px'}} className="mr-2 " />
                      <div className="text-s " style={{color: '#ffffff'}}>{isUpdateDataloading ? "Updating.." : 'Update Sponsor'}</div>
                    </div>
                                    
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
