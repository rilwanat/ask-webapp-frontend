import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import HeaderParallax from './widgets/HeaderParallax';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share'; 
import FavoriteIcon from '@mui/icons-material/Favorite';

import WidgetShare from './widgets/WidgetShare';
import WidgetNominate from './widgets/WidgetNominate';

import NominateNotificationModal from './modals/NominateNotificationModal';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import SearchIcon from '@mui/icons-material/Search';


export default function SingleRequestsPage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
    userDetails, refreshUserDetails, 
    handleHelpRequestsData
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItem, allItems } = location.state || {};
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [updatedItem, setUpdatedItem] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(allItems);

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);


    
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


    useEffect(() => { 
       
          // Find the index of the selected item when component mounts
          if (selectedItem && allItems) {
            const index = allItems.findIndex(item => item.id === selectedItem.id);
            if (index !== -1) {
                setSelectedIndex(index);
            }
        }
    }, [selectedItem, allItems]);

    const gotoPage = (pageName) => {
        navigate("/" + pageName);
    }

    const handleChange = (index) => {
        setSelectedIndex(index);
    };


    const navigateTo = (route, data) => {
        navigate(route, { state: data });
      };
      const navigateAndRefresh = async (updatedItem) => {
        const data = await handleHelpRequestsData();
        navigateTo('/single-request', { selectedItem: updatedItem, allItems: data }); // Pass the data, not the function
    }

    // const [scrollCarousel, setScrollCarousel] = useState(false);
    const carouselRef = useRef();
    // Custom carousel configuration to prevent scroll interference
    const carouselConfig = {
        // stopAutoPlayOnHover: true,
        showIndicators: false,
        showArrows: false,//true,
        showStatus: false,
        showThumbs: false,
        infiniteLoop: true,
        autoPlay: false, // scrollCarousel ? true : false,
        swipeable: false, //true,
        emulateTouch: false, //true,
        swipeScrollTolerance: 5,
        preventMovementUntilSwipeScrollTolerance: true,
        verticalSwipe: 'natural',
        // stopOnHover: true,
        className: "touch-pan-y", // Added to prevent scroll interference
        selectedItem: selectedIndex, // Start with the selected item
        onChange: handleChange, // Update selected index when carousel changes
        ref: carouselRef,
        interval: 0, 

    };




    // Handle search input change
        const [searchTimeout, setSearchTimeout] = useState(null);
        const handleSearchChange = (e) => {
          // alert("C");
        //   setScrollCarousel(false);
    
          const query = e.target.value.toLowerCase();
          setSearchQuery(query);
          
          // Clear previous timeout if it exists
          if (searchTimeout) clearTimeout(searchTimeout);
          
          // Set new timeout
          setSearchTimeout(setTimeout(() => {
            if (query === '') {
              setFilteredItems(allItems);
              return;
            }
        // alert("C");
            const filtered = allItems.filter(item => {
              return (
                item.description.toLowerCase().includes(query) ||
                item.help_token.toLowerCase().includes(query) ||
                item.email_address.toLowerCase().includes(query) ||
                item.user.fullname.toLowerCase().includes(query)
              );
            });
        
            setFilteredItems(filtered);
            setCurrentRequestSlide(0);

            carouselRef.current?.decrement();
          }, 1000)); // 300ms delay
        };
        // Clean up timeout on unmount
        useEffect(() => {
          return () => {
            if (searchTimeout) clearTimeout(searchTimeout);
          };
        }, [searchTimeout]);// 300ms delay
        // Update filtered items when allItems prop changes
        useEffect(() => {
          setFilteredItems(allItems);
        }, [allItems]);




    return (
        <div className="touch-pan-y"> {/* Main container with touch action */}
            <GuestHeader isMobile={isMobile}
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems} 
                gotoPage={gotoPage} 
                showMarqees={false} 
            />

            <HeaderParallax 
                title={"A.S.K Requests"}
                subtitle={""}
            />

            <div className="flex flex-col items-center p-4 touch-pan-y mb-8">

                <div className="flex flex-col items-center w-full mb-4">
                
                      <div className="flex justify-between  ">
                          <button
                                type="button"
                                onClick={() => carouselRef.current?.decrement()}
                                disabled={selectedIndex === 0}
                                // title={label}
                                className="mr-6 p-2 bg-theme rounded-lg text-white hover:bg-green cursor-pointer"
                                // style={{ top: '40%', transform: 'translateY(-50%)' }}
                            >
                                <KeyboardArrowLeftIcon />
                            </button>

                            <div className='relative flex items-center justify-center  md:w-auto '>
                      {/* <SearchIcon className="absolute h-5 w-5 text-white" /> */}
                      <input
                        type='text'
                        placeholder='Search requests'
                        className='w-full md:w-64 text-center text-white bg-theme border border-theme rounded-lg py-1 focus:outline-none focus:border focus:border-theme placeholder-white'
                        onChange={handleSearchChange}
                      />
                    </div>
                      
                      
                          <button
                                type="button"
                                onClick={() => carouselRef.current?.increment()}
                                disabled={selectedIndex === filteredItems.length - 1}
                                // title={label}
                                className="ml-6 p-2 bg-theme rounded-lg text-white hover:bg-green cursor-pointer"
                                // style={{ top: '40%', transform: 'translateY(-50%)' }}
                            >
                                <KeyboardArrowRightIcon />
                            </button>
                      </div>
                      <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
                      </div>
                

            


                <div className="w-full max-w-3xl mt-4">
                    <Carousel 
                    {...carouselConfig}
                    >
                        {/* {allItems?.map((item) => ( */}
                        {filteredItems?.map((item) => (
                            <motion.div 
                                key={item.id} 
                                className="flex flex-col items-center justify-center w-full touch-pan-y select-none cursor-pointer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                                    



                                <div className="w-full text-center">
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        You are viewing {item.user.fullname}'s help request
                                    </h1>
                                    <p className="text-gray-600 my-2">
                                        {item.description || "No Description Available"}
                                    </p>
                                </div>

                                <motion.div
                                    // whileHover={{ scale: 1.02 }}
                                    // whileTap={{ scale: 0.98 }}
                                    className="w-full flex justify-center"
                                >
                                    <img 
                                        // src={item.image} 
                                        src={import.meta.env.VITE_API_SERVER_URL + "../../../" + item.request_image}
                                        alt={item.title} 
                                        className="rounded-lg object-cover"
                                        style={{ 
                                            width: '190px',
                                            height: '190px',
                                            // maxWidth: '100%' // Ensure responsiveness
                                        }}
                                        loading="lazy"
                                    />
                                </motion.div>

                                <div className="flex p-4 mt-auto items-center justify-center">
                                    <h3 className="text-3xl font-bold text-theme">
                                        {item.nomination_count >= 1000 ? (item.nomination_count / 1000).toFixed(1) + 'K' : item.nomination_count}
                                    </h3>
                                    <FavoriteIcon 
                                        className='ml-2' 
                                        style={{ width: '28px', height: '28px', marginTop: '2px' }}
                                    />
                                </div>

                                <div className='flex flex-col items-center touch-pan-y'>
                                    <motion.div
                                        // whileHover={{ scale: 1.05 }}
                                        // whileTap={{ scale: 0.95 }}
                                    >
                                        <WidgetNominate 
                                        helpToken={item.help_token} userDetails={userDetails} 
                                        refreshUserDetails={refreshUserDetails} 
                                        //itemName={item.user.fullname}                                        
                                        openNotificationModal={openNotificationModal} 
                                        handleHelpRequestsData={handleHelpRequestsData}
                                        navigateAndRefresh={navigateAndRefresh}
                                        // setScrollCarousel={setScrollCarousel}

                                        setUpdatedItem={setUpdatedItem}
                                        />
                                    </motion.div>
                                    <motion.div
                                        // whileHover={{ scale: 1.05 }}
                                        // whileTap={{ scale: 0.95 }}
                                        // className='cursor-pointer flex rounded-lg w-50 justify-center items-center bg-theme text-white p-2 my-1'
                                    >
                                        <WidgetShare helpToken={item.help_token}/>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </Carousel>
                </div>
            </div>

            <NominateNotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
              gotoPage={gotoPage}

              updatedItem={updatedItem}
              navigateAndRefresh={navigateAndRefresh}
            />

            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}