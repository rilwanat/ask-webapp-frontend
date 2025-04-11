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

  //










  // const images = [hero1, hero2, hero3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for back

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0.5
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0.5,
      transition: { duration: 0.5 }
    })
  };

  // const swipeConfidenceThreshold = 10000;
  // const swipePower = (offset, velocity) => {
  //   return Math.abs(offset) * velocity;
  // };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const newIndex = prev + newDirection;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  return (
    <>



    <div className="w-full h-[280px] overflow-hidden mt-24 sm:mt-20 shadow-lg">
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
        // renderArrowPrev={(clickHandler, hasPrev) => (
        //   <button 
        //     onClick={clickHandler}
        //     className="absolute left-2 top-2/5 z-10 bg-black/50 text-white p-2 rounded-full cursor-pointer"
        //     disabled={!hasPrev}
        //   >
        //     <ArrowBackIosNewIcon  />
        //   </button>
        // )}
        // renderArrowNext={(clickHandler, hasNext) => (
        //   <button 
        //     onClick={clickHandler}
        //     className="absolute right-2 top-2/5 z-10 bg-black/50 text-white p-2 rounded-full cursor-pointer "
        //     disabled={!hasNext}
        //   >
        //     <ArrowForwardIosIcon />
        //   </button>
        // )}
      >
        {images.map((img, index) => (
          <div key={index} className="h-64 md:h-96">
            <img 
              src={img} 
              // alt={`Slide ${index}`}
              className="w-full h-full object-cover"
              draggable="false" // Prevent image dragging
            />
          </div>
        ))}
      </Carousel>
    </div>

</>
  );
};

export default Hero;