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
      <div className="relative w-full  h-[360px] overflow-hidden mt-24 sm:mt-20">

      <AnimatePresence>
        <motion.img
          key={images[currentImageIndex]}
          src={images[currentImageIndex]}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 3.5 }}
        />
      </AnimatePresence>

      {/* <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center p-4"></div> */}

      <div className="absolute inset-0 flex flex-col justify-center  text-white px-8 md:px-4 lg:px-16 xl:px-32 2xl:px-80 ">
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4  md:w-1/2 text-theme" 
          style={{  }}
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
    </div>
  );
};

export default Hero;