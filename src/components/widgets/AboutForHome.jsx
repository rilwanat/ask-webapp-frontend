import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/images/background.png';
import askLogo from '../../assets/images/ask-logo.png';

import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';




const AboutForHome = ({ }) => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 py-4 pb-8">
        <div className="w-full p-4 my-4">



          <div className=""
            
            
            // style={{
            //   backgroundImage: `url(${background})`, 
            //   backgroundAttachment: 'fixed',
            //   backgroundSize: 'contain',
            //   backgroundPosition: 'center',
            // }}
            >

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.5 }}
className=" flex items-center justify-center "
>
<div className="mx-auto py-8">

<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.2, duration: 0.5 }}
className="text-2xl font-bold text-gray-800 mb-2"
>
<div className='flex flex-col items-center justify-center mt-16 mb-2'>
<p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>About A.S.K Foundation</p>
<div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
</div>

</motion.h1>

<motion.div
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.4, duration: 0.5 }}
className="text-lg text-gray-600 mb-6"
>
<div className='mb-8 text-center' style={{fontSize: '16px',   }}>
A community-based charity initiative
</div>
</motion.div>










<div className="mb-12"
    // style={{
    // backgroundImage: `url(${background})`, 
    // backgroundAttachment: 'fixed',
    // backgroundSize: 'contain',
    // backgroundPosition: 'center',
    // }}
>
    <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and below
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }} // Smooth animation
        className="flex flex-col w-full h-full items-center justify-center mt-4"
    >
        {/*       
        <div className='flex flex-col items-center justify-center mt-16 mb-2'>
            <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>About Us</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
        </div> 
        */}

        <div className='flex flex-col sm:flex-row relative'>
            <div className='md:w-4/5'>
                <p className='my-8 pt-2' style={{ fontSize: '18px', color: '#000000' }}>
                    The A.S.K. Foundation is a community-based charity that honors Madam Esther Ashabi Shobande Kokumo's legacy. 
                    It uses a fair and open process (CBSPro) to choose people to help, making sure everyone has an equal chance. 
                    This approach respects people's dignity and mental health. By being efficient and targeting real needs, 
                    A.S.K. Foundation is a trusted organization that makes a real difference. 
                    <strong><a className='cursor-pointer text-theme' onClick={() => {navigateTo('/about-us')}}> Read more ..</a></strong>
                </p>
            </div>

            <div className="flex w-full items-center justify-center px-2">
                <img 
                    src={askLogo} 
                    // alt={`Slide ${index + 1}`} 
                    className='ml-8 rounded-lg'
                    style={{ width: '50%', height: 'auto', objectFit: 'contain', userSelect: 'none', pointerEvents: 'none' }}
                />
            </div>
        </div> 
    </motion.div>
</div>


</div>
</motion.div>



</div>



        </div>
      </div>
    </div>
  );
};

export default AboutForHome;