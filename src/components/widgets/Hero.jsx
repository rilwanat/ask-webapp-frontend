import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import hero1 from '../../assets/images/hero/hero1.jpg';
import hero2 from '../../assets/images/hero/hero2.jpg';
import hero3 from '../../assets/images/hero/hero3.jpg';

const Hero = ({  }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  //
  const images = [
    hero1,
    hero2,
    hero3,
  ];

  const headerText = [
    'Header1',
    'Header2',
    'Header3',
  ];
  
  const subText = [
    'Madam Esther Ashabi Shobande Kokumo',
    'Feeding the vulnerable children of single parents!',
    'Financial aid for small and medium entrepreneurs!',
];

  //
  const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1.1 },
    exit: { opacity: 0, scale: 1 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const navigateTo = (route) => {
    navigate(route);
  }

  return (
<div className="relative w-full h-[280px] overflow-hidden mt-24 sm:mt-20">
  <AnimatePresence>
    <motion.div
      key={images[currentImageIndex]}
      className="absolute inset-0 w-full h-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        } else if (swipe > swipeConfidenceThreshold) {
          setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        }
      }}
    >
      <motion.img
        src={images[currentImageIndex]}
        alt="Hero"
        className="w-full h-full object-cover"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 3.5 }}
      />
    </motion.div>
  </AnimatePresence>

  {/* Rest of your content remains the same */}
  <div className="absolute inset-0 flex flex-col justify-center text-white px-8 md:px-4 lg:px-16 xl:px-32 2xl:px-80">
    <motion.h1
      className="text-4xl md:text-6xl font-bold mb-4 md:w-1/2 text-theme"
      variants={textVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8 }}
    >
      {/* {headerText[currentImageIndex]} */}
    </motion.h1>

    <motion.p
      className="text-lg md:text-xl mb-4"
      variants={textVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* {subText[currentImageIndex]} */}
    </motion.p>
  </div>

  {/* Navigation Controls (same as before) */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>

  <button 
    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
    aria-label="Previous slide"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button 
    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
    aria-label="Next slide"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
  );
};

export default Hero;