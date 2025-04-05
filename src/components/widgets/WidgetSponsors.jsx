import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import sponsor from '../../assets/images/sponsors/sponsor.jpg';
import sponsor2 from '../../assets/images/sponsors/sponsor2.jpg';

const WidgetSponsors = ({ carouselSponsorItems }) => {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };

  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        // Reset position when reaching the duplicated content
        if (prev >= carouselSponsorItems.length * 300) {
          return 1; // Small offset to prevent flickering
        }
        return prev + 0.5; // Slower scroll speed
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [carouselSponsorItems.length, isHovered]);

  return (
    <div className="w-full mt-4 bg-gold overflow-hidden h-96 touch-pan-y">
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
                    <p className='text-softTheme mb-2' style={{ fontWeight: '700', fontSize: '24px' }}>Sponsors</p>
                    <div className='bg-softTheme mb-2' style={{ width: '80px', height: '4px' }}></div>
                  </div>
                </motion.h1>
              </div>
            </motion.div>

            {/* Scrollable Sponsor List */}
            <div 
              className="relative w-full h-48 overflow-x-hidden touch-pan-y"
              style={{ touchAction: 'pan-y' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                ref={listRef}
                className="absolute flex space-x-4"
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
                  transition: "transform 0.1s linear",
                  width: `${carouselSponsorItems.length * 300}px`,
                }}
              >
                {[...carouselSponsorItems, ...carouselSponsorItems].map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex-none w-72 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => navigateTo('/single-sponsor', { selectedItem: item, allItems: carouselSponsorItems })}
                  >
                    <img
                      className="w-full h-40 object-cover rounded-lg mt-4"
                      src={item.type === 'Donor' ? sponsor2 : sponsor}
                      alt={item.title}
                      loading="lazy" // Better performance
                    />
                    <div className="flex flex-col p-4 items-center justify-center">
                      <h3 className="text-xl font-bold text-theme">{item.name}</h3>
                      <div className='flex text-sm rounded-lg items-center justify-center w-70 mt-0'>
                        <p className="text-theme">{item.type}</p>
                      </div>
                    </div>
                  </div>
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