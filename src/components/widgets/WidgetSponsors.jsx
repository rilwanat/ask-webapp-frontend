import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// import sponsor from '../../assets/images/sponsors/sponsor.jpg';
// import sponsor2 from '../../assets/images/sponsors/sponsor2.jpg';

const WidgetSponsors = ({ carouselSponsorItems }) => {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (carouselSponsorItems.length * 300)); // Adjust item width (300px per item)
    }, 30); // Adjust speed

    return () => clearInterval(interval);
  }, [carouselSponsorItems.length]);

  return (
    <div className="w-full mt-4  bg-gold overflow-hidden h-84"> {/* Hide overflow */}
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
                    <p className='text-softTheme mb-2' style={{ fontWeight: '700', fontSize: '24px' }}>Benefactors</p>
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
                {carouselSponsorItems.concat(carouselSponsorItems).map((item, index) => ( // Duplicate for infinite loop
                <div key={index} 
                onClick={() => navigateTo('/single-sponsor', { selectedItem: item, allItems: carouselSponsorItems })}
                 className="bg-white
                          border border-gray-300 shadow-md
                           p-2 rounded-lg cursor-pointer ">
                            <div className="flex justify-center" 
                            style={{
                              height: '150px',
                              width: '150px',
                          }}
                          >
                            <img 
                            src={import.meta.env.VITE_API_SERVER_URL + "../../../" + item.image}
                            style={{
                              height: '150px',
                              width: '300px',
                          }}
                            alt={`Item ${item.id}`} className="w-full h-40 object-cover rounded-md mt-1" />
                              </div>
                
                <div className="flex flex-col items-center  mb-2 mt-auto">
                                  {/* <h3 className="text-2xl font-bold text-theme">{item.score}</h3> */}
                                  <div className='flex text-sm font-bold rounded-lg items-center justify-center w-full text-center mt-2'><p className="text-theme">{'' + item.name}</p> </div>
                                  <div className='flex text-sm  rounded-lg items-center justify-center w-full  mt-0'><p className="text-theme">{'' + item.type}</p></div>
                                </div>
                
                
                          </div>


                  // <div
                  //   key={index}
                  //   className="flex-none w-56 cursor-pointer bg-white rounded-lg shadow-md"
                  //   onClick={() => navigateTo('/single-sponsor', { selectedItem: item, allItems: carouselSponsorItems })}
                  // >
                  //   <div className="w-full flex justify-center">
                  //   <img
                  //     className="w-full  object-cover rounded-lg mt-4 "
                  //     style={{
                  //       height: '108px',
                  //       width: '108px',
                  //   }}
                  //     src={item.type == 'Donor' ? sponsor2 : sponsor}
                  //     alt={item.title}
                  //   />
                  //     </div>
                  //   <div className="flex flex-col p-2 items-center justify-center">
                  //     <h3 className="text-lg font-bold text-theme">{item.name}</h3>
                  //     <div className='flex text-sm  rounded-lg items-center justify-center w-full  mt-0'><p className="text-theme">{'' + item.type}</p></div>
                  //   </div>

                  // </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetSponsors;
