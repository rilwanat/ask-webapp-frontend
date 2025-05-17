import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import hero1 from '../../assets/images/hero/hero1.jpg';
import hero2 from '../../assets/images/hero/hero2.jpg';
import hero3 from '../../assets/images/hero/hero3.jpg';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Hero = ({  }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

const baseDomain = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          "https://www.askfoundations.org" :
          "https://www.playground.askfoundations.org/"
        );

const images = [
  baseDomain + '/images/slider-images/slide1.png',
  baseDomain + '/images/slider-images/slide2.png',
  baseDomain + '/images/slider-images/slide3.png',
];


//   const headerText = [
//     'Header1',
//     'Header2',
//     'Header3',
//   ];
  
//   const subText = [
//     'Madam Esther Ashabi Shobande Kokumo',
//     'Feeding the vulnerable children of single parents!',
//     'Financial aid for small and medium entrepreneurs!',
// ];

  // //
  // const swipeConfidenceThreshold = 10000;
  // const swipePower = (offset, velocity) => {
  //   return Math.abs(offset) * velocity;
  // };

  // // useEffect(() => {
  // //   const interval = setInterval(() => {
  // //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  // //   }, 7000); // Change image every 5 seconds

  // //   return () => clearInterval(interval);
  // // }, [images.length]);

  // const imageVariants = {
  //   initial: { opacity: 0, scale: 1.05 },
  //   animate: { opacity: 1, scale: 1.1 },
  //   exit: { opacity: 0, scale: 1 },
  // };

  // const textVariants = {
  //   initial: { opacity: 0, y: 20 },
  //   animate: { opacity: 1, y: 0 },
  //   exit: { opacity: 0, y: -20 },
  // };
  // //


 
  // const [direction, setDirection] = useState(0); // 1 for forward, -1 for back
  // const variants = {
  //   enter: (direction) => ({
  //     x: direction > 0 ? '100%' : '-100%',
  //     opacity: 0.5
  //   }),
  //   center: {
  //     x: 0,
  //     opacity: 1,
  //     transition: { duration: 0.5 }
  //   },
  //   exit: (direction) => ({
  //     x: direction < 0 ? '100%' : '-100%',
  //     opacity: 0.5,
  //     transition: { duration: 0.5 }
  //   })
  // };

  // const swipeConfidenceThreshold = 10000;
  // const swipePower = (offset, velocity) => {
  //   return Math.abs(offset) * velocity;
  // };

  // const paginate = (newDirection) => {
  //   setDirection(newDirection);
  //   setCurrentIndex((prev) => {
  //     const newIndex = prev + newDirection;
  //     if (newIndex < 0) return images.length - 1;
  //     if (newIndex >= images.length) return 0;
  //     return newIndex;
  //   });
  // };

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };





  return (
    <>



    {/*
    <div className="w-full h-[280px] md:h-[300px] lg:h-[400px] overflow-hidden mt-24 sm:mt-20 shadow-lg">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        emulateTouch={true}
        swipeable={true}
        dynamicHeight={false}
        useKeyboardArrows={true}
        stopOnHover={false}
        autoPlay={true}
        showIndicators={false}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full h-[280px] md:h-[300px] lg:h-[400px]">
            <img 
              src={img} 
              className="w-full h-full object-cover"
              draggable="false" 
            />
          </div>
        ))}
      </Carousel>
    </div> */}

<div className="w-full h-[280px] md:h-[300px] lg:h-[400px] overflow-hidden mt-24 sm:mt-20 shadow-lg relative">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Adjust duration for smoother/faster transition
          className="absolute w-full h-full"
        >
          <img 
            src={images[currentIndex]} 
            className="w-full h-full object-cover"
            draggable="false"
          />
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 p-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl font-bold mb-2 text-center"
            >
              {headerText[currentIndex]}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-lg text-center max-w-2xl"
            >
              {subText[currentIndex]}
            </motion.p>
          </div> */}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {/* <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-opacity-50  bg-theme rounded-full text-white hover:bg-lightTheme cursor-pointer"
                >
                  <KeyboardArrowLeftIcon />
                </button> */}
      {/* <button
                        type="button"
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-opacity-50  bg-theme rounded-full text-white hover:bg-lightTheme cursor-pointer"
                      >
                        <KeyboardArrowRightIcon />
                      </button> */}
    </div>



</>
  );
};

export default Hero;