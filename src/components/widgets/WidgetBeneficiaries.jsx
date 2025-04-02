import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import background from '../../assets/images/ask-logo.png';
import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share'; 

const WidgetBeneficiaries = ({ currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide }) => {
  const navigate = useNavigate();
  // const [currentBeneficiarySlide, setCurrentBeneficiarySlide] = useState(0);
  // const [zoomedItemId, setZoomedItemId] = useState(null);

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };



  return (
    <div className="w-full mt-4">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col  items-center justify-between">


          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className=" flex items-center justify-center "
              >
              <div className="mx-auto">
              
              <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800 mb-2"
              >
              <div className='flex flex-col items-center justify-center mt-0 mb-2'>
              <p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Beneficiaries Gallery</p>
              <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
              </div>
              
              </motion.h1>
              
              </div>
              </motion.div>






            
            <Carousel
              showIndicators={false}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              selectedItem={currentBeneficiarySlide}
              onChange={(index) => setCurrentBeneficiarySlide(index)}
              className="rounded-lg overflow-hidden  w-full"
            >
              
              {carouselBeneficiaryItems.map((item, index) => (
                <div key={item.id} className="flex flex-col h-full cursor-pointer z-1000"
                onClick={() => {
                  // e.stopPropagation();
                  navigateTo('/single-beneficiary', { selectedItem: item, allItems: carouselBeneficiaryItems  });
                }}
                >
                <div className="flex-1 overflow-hidden ">
                  <img 
                    className="rounded-lg w-full h-full object-contain "
                    src={item.image}
                    alt={item.title}
                    style={{
                      // transform: zoomedItemId === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.8s ease',
                      maxHeight: '70vh', // Adjust this as needed
                      width: 'auto',
                      margin: '0 auto',
                      display: 'block'
                    }}
                    // onMouseEnter={() => setZoomedItemId(index)}
                    // onMouseLeave={() => setZoomedItemId(null)}
                  />
                </div>
                <div className="pt-4 mt-auto">
                  <h3 className="text-2xl font-bold text-theme">{item.name}</h3>
                  <p className="text-theme font-bold mt-1">{item.price}</p>
                  <p className="text-theme mt-1">{item.date}</p>
                </div>
                <div className="flex flex-col items-center  mt-auto">
                  {/* <h3 className="text-2xl font-bold text-theme">{item.score}</h3> */}
                  <div className='flex  p-1 rounded-lg items-center justify-center w-70 bg-softTheme mt-2'><p className="text-theme">{'remark: ' + item.remark}</p> </div>
                  <div className='flex  p-1 rounded-lg items-center justify-center w-70 bg-softTheme mt-2'><p className="text-theme">{'status: ' + item.status}</p></div>
                </div>
                
                
              </div>
              ))}


            </Carousel>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetBeneficiaries;