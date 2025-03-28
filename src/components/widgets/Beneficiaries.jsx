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

const Beneficiaries = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomedItemId, setZoomedItemId] = useState(null);

  const navigateTo = (route) => {
    navigate(route);
  };

  // Sample carousel data
  const carouselItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Community Support",
      description: "My name is .. and ...",
      score: "81",
      name: "Mr Audu Eze",
      date: "2025-02-24 03:47:17",
      price: "N30,000.00"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Environmental Care",
      description: "Good morning, My name is .. and ...",
      score: "93",
      name: "Mrs Chiamaka James",
      date: "2025-02-24 03:47:17",
      price: "N40,000.00"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Youth Empowerment",
      description: "I am a .. and ...",
      score: "44",
      name: "Ms Jane Paul",
      date: "2025-02-24 03:47:17",
      price: "N50,000.00"
    }
  ];

  return (
    <div className="w-full ">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 py-4 pb-8">
        <div className="w-full p-4 my-4">
          <div className="flex flex-col  items-center justify-between">


          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className=" flex items-center justify-center "
              >
              <div className="mx-auto py-8 ">
              
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
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              className="rounded-lg overflow-hidden  w-full"
            >
              {/* {carouselItems.map((item, index) => (
                <div key={item.id} className="relative h-96">
                  <img 
                    className="rounded-lg w-full h-full object-cover"
                    src={item.image}
                    alt={item.title}
                    style={{
                      transform: zoomedItemId === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={() => setZoomedItemId(index)}
                    onMouseLeave={() => setZoomedItemId(null)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-white mt-2">{item.description}</p>
                  </div>
                </div>
              ))} */}
              
              {carouselItems.map((item, index) => (
                <div key={item.id} className="flex flex-col h-full">
                <div className="flex-1 overflow-hidden ">
                  <img 
                    className="rounded-lg w-full h-full object-contain "
                    src={item.image}
                    alt={item.title}
                    style={{
                      transform: zoomedItemId === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.8s ease',
                      maxHeight: '70vh', // Adjust this as needed
                      width: 'auto',
                      margin: '0 auto',
                      display: 'block'
                    }}
                    onMouseEnter={() => setZoomedItemId(index)}
                    onMouseLeave={() => setZoomedItemId(null)}
                  />
                </div>
                <div className="p-4 mt-auto">
                  <h3 className="text-2xl font-bold text-theme">{item.name}</h3>
                  <p className="text-theme font-bold mt-1">{item.price}</p>
                  <p className="text-theme mt-1">{item.date}</p>
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

export default Beneficiaries;