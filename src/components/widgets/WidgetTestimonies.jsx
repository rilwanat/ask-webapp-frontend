import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import askLogo from '../../assets/images/ask-logo.png';

// import sponsor from '../../assets/images/sponsors/sponsor.jpg';
// import sponsor2 from '../../assets/images/sponsors/sponsor2.jpg';

//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../../auth/authUtils'; // Import getCookie function
//



const WidgetSponsors = ({ carouselSponsorItems }) => {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };

  const [isDataloading, setIsDataLoading] = useState(true);
  const [testimoniesData, setTestimoniesData] = useState([]);
  const defaultTestimoniesItems = [
          {
            id: 1,
            image: askLogo,
            title: "A.S.K Title",
            description: "A.S.K description for testimony.",
            score: 0,
            name: "A.S.K Name",
            date: "2025-04-15 12:32:00",
            price: 0,
            type: "Testimony"
          }
        ];
const handleTestimoniesData = async () => {
  
      setIsDataLoading(true);
  
  
      try {
        const testimoniesRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_READ_TESTIMONIES;
        // alert(beneficiariesRequestsEndpoint);
        const testimoniesRequestsResponse = await axiosInstance.get(testimoniesRequestsEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // alert(JSON.stringify(testimoniesRequestsResponse.data.data), null, 2);  // Update state with appointments count
        setTestimoniesData(testimoniesRequestsResponse.data?.data ?? defaultTestimoniesItems);  // Update state with  count
    
    
        // openNotificationModal(true, currentPageName, "");
        
      //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
  
  
  
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
    
      } catch (error) {
        setIsDataLoading(false);
        
        // alert(error);
        // Handle errors
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          // openNotificationModal(false, "Testimonies" + " Error", errorMessage);
          alert(errorMessage);
        } else {
          // openNotificationModal(false, "Testimonies" + " Error", "An unexpected error occurred.");
          alert("An unexpected error occurred.");
        }
      }
    };
    useEffect(() => {
      handleTestimoniesData();
    }, []);



  useEffect(() => {
    if (carouselSponsorItems && carouselSponsorItems.length > 0) {
      const itemWidth = 150; // Adjust this if your item width changes
      const totalWidth = carouselSponsorItems.length * itemWidth;

      const interval = setInterval(() => {
        setScrollPosition((prev) => (prev + 1) % totalWidth);
      }, 30); // Adjust speed

      return () => clearInterval(interval);
    }
  }, [carouselSponsorItems]);


  const playlistUrl = "https://youtube.com/playlist?list=PLih08HDQf-eQ40EuTf8P1ttbpJWzy-I3n";
  const playlistId = "PLih08HDQf-eQ40EuTf8P1ttbpJWzy-I3n";

  return (
    <>
    <div className="w-full -mt-12  bg-lightTheme overflow-hidden h-112"> {/* Hide overflow */}
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col items-center justify-between">

{/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="mx-auto">
                <motion.h1
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  <div className='flex flex-col items-center justify-center mt-0 mb-2'>
                    <p className='text-softTheme mb-2' style={{ fontWeight: '700', fontSize: '24px' }}>Testimonies</p>
                    <div className='bg-softTheme mb-2' style={{ width: '80px', height: '4px' }}></div>
                  </div>
                </motion.h1>
              </div>
            </motion.div>

            {/* Scrollable Sponsor List */}
            <div className="relative w-full flex justify-center "> {/* Container with fixed height */}
              
              <div className="youtube-playlist-container">
      {/* <h2>Embedded YouTube Playlist</h2> */}
      <div className="youtube-embed">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
          title="YouTube playlist player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className='text-center text-white text-xs mt-2'>
        <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
          View playlist on YouTube
        </a>
      </p>
    </div>

            </div>


          </div>
        </div>
      </div>
    </div>



    <div className="w-full -mt-4  bg-lightTheme overflow-hidden h-112"> {/* Hide overflow */}
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col items-center justify-between">

{/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="mx-auto">
                <motion.h1
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  <div className='flex flex-col items-center justify-center mt-0 mb-2'>
                    <p className='text-softTheme mb-2' style={{ fontWeight: '700', fontSize: '24px' }}>Photo Reel</p>
                    <div className='bg-softTheme mb-2' style={{ width: '80px', height: '4px' }}></div>
                  </div>
                </motion.h1>
              </div>
            </motion.div>

            {/* Scrollable Sponsor List */}
            <div className="relative w-full "> {/* Container with fixed height */}
              <div
                ref={listRef}
                className="absolute flex space-x-4 "
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
                  transition: "transform 0.1s linear", // Smooth movement
                  width: `${carouselSponsorItems.length * 300}px`, // Ensure all items fit
                }}
              >
                {
                // [...carouselSponsorItems, ...carouselSponsorItems]
                testimoniesData
                .map((item, index) => ( // Duplicate for infinite loop
                  <div key={index}
                    
                  className="bg-white
                              border border-gray-300 shadow-md
                                p-2 rounded-lg cursor-pointer ">
                                <div className="flex justify-center"
                                style={{
                                  height: '300px',
                                  width: '300px',
                                }}
                              >
                                <img
                                src={(
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + item.url}
                                style={{
                                  height: '300px',
                                  width: '300px',
                                }}
                                alt={`Item ${item.id}`} className="w-full h-40 object-cover rounded-md mt-1" />
                                  </div>

                    {/* <div className="flex flex-col items-center  mb-2 mt-auto"> */}
                                      {/* <h3 className="text-2xl font-bold text-theme">{item.score}</h3> */}
                                      {/* <div className='flex text-sm font-bold rounded-lg items-center justify-center w-full text-center mt-2'><p className="text-theme">{'' + item.name}</p> </div> */}
                                      {/* <div className='flex text-sm  rounded-lg items-center justify-center w-full  mt-0'><p className="text-theme">{'' + item.type}</p></div> */}
                                    {/* </div> */}


                                  </div>


                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    </>
    
    
  );
};

export default WidgetSponsors;