import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/images/ask-logo.png';

import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';

import PsychologyIcon from '@mui/icons-material/Psychology';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';




const WidgetAboutForAbout = ({ }) => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
        <div className="w-full p-4">



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
<div className="mx-auto">

<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.2, duration: 0.5 }}
className="text-2xl font-bold text-theme mb-2"
>
{/* <div className='flex flex-col items-center justify-center mt-0 mb-2'>
<p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>About A.S.K Foundation</p>
<div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
</div> */}

</motion.h1>

{/* <motion.div
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.4, duration: 0.5 }}
className="text-lg text-gray-600 mb-6"
>
<div className='mb-8 text-center' style={{fontSize: '16px',   }}>
A community-based charity initiative
</div>
</motion.div> */}










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
              
        <div className='flex flex-col items-start justify-center mt-0 mb-2  w-full'>
            <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Our Mission</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
        </div> 
       

        <div className='flex flex-col sm:flex-row '>
            <div className=''>
                <p className='mt-4 pt-2 text-justify' style={{ fontSize: '18px',  }}>
                The A.S.K. Foundation is a community-based charity inspired by the life and legacy of Madam Esther Ashabi Shobande Kokumo. This initiative honors her unwavering dedication to building a society where resources are shared equitably, ensuring that acts of kindness benefit everyone.
                </p>
                <p className='mt-4 pt-2 text-justify' style={{ fontSize: '18px',   }}>
Our mission is rooted in the belief that everyone deserves support, and it takes courage to ask for help. To uphold this principle, we have developed a community-driven selection process that provides assistance without imposing burdensome interrogations, safeguarding the dignity and mental well-being of those in need.
</p>
<p className='mt-4 pt-2 text-justify' style={{ fontSize: '18px',   }}>
What sets the A.S.K. Foundation apart is its innovative, decentralized approach to beneficiary selection. Through a transparent, technology-driven community nomination system, we ensure equal opportunities for those seeking support.
</p>
<p className='mt-4 pt-2 text-justify' style={{ fontSize: '18px',  }}>
For donors committed to making a real difference, the A.S.K. Foundation serves as a trusted platform, ensuring that contributions reach the most vulnerable efficiently and deliver meaningful, lasting change where it is needed most.
                </p>
            </div>

            {/* <div className="flex w-full items-center justify-center px-2">
                <img 
                    // src={gideon} 
                    // alt={`Slide ${index + 1}`} 
                    className='ml-8 rounded-lg'
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', userSelect: 'none', pointerEvents: 'none' }}
                />
            </div> */}
        </div> 





    </motion.div>
</div>





<motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
>
    <div className="bg-softTheme p-8 rounded-lg">
        <div className='flex flex-col items-start mb-4'>
            <div className='p-4 mb-4 rounded-lg bg-theme flex items-center justify-center'>
                <LocalShippingIcon className='text-white text-3xl' />
            </div>
            <h2 className="text-2xl font-semibold text-theme">Alleviating Poverty and Hunger</h2>
        </div>
        <p className="text-lg text-gray-700">
            We provide food, financial aid, and essential resources to struggling communities, ensuring no one goes hungry.
        </p>
    </div>

    <div className="bg-softTheme p-8 rounded-lg">
        <div className='flex flex-col items-start mb-4'>
            <div className='p-4 mb-4 rounded-lg bg-theme flex items-center justify-center'>
                <PublicIcon className='text-white text-3xl' />
            </div>
            <h2 className="text-2xl font-semibold text-theme">Initiatives</h2>
        </div>
        <p className="text-lg text-gray-700">
            <ul className='ml-8 list-disc'>
                <li>Weekly Fincancial Support</li>
                <li>Feeding Vulnerable Children</li>
            </ul>
        </p>
    </div>

    <div className="bg-softTheme p-8 rounded-lg">
        <div className='flex flex-col items-start mb-4'>
            <div className='p-4 mb-4 rounded-lg bg-theme flex items-center justify-center'>
                <CompareArrowsIcon className='text-white text-3xl' />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Supporting Vulnerable Members of Society</h2>
        </div>
        <p className="text-lg text-gray-700">
            We offer assistance to at-risk groups, including children, the elderly, and marginalized communities, ensuring dignity and care.
        </p>
    </div>

    <div className="bg-softTheme p-8 rounded-lg">
        <div className='flex flex-col items-start mb-4'>
            <div className='p-4 mb-4 rounded-lg bg-theme flex items-center justify-center'>
                <PsychologyIcon className='text-white text-3xl' />
            </div>
            <h2 className="text-2xl font-semibold text-theme">Fostering Societal Reform</h2>
        </div>
        <p className="text-lg text-gray-700">
            We promote awareness, education, and community engagement to inspire positive societal transformation and long-term behavioral change.
        </p>
    </div>

    <div className="bg-softTheme p-8 rounded-lg">
        <div className='flex flex-col items-start mb-4'>
            <div className='p-4 mb-4 rounded-lg bg-theme flex items-center justify-center'>
                <HandshakeIcon className='text-white text-3xl' />
            </div>
            <h2 className="text-2xl font-semibold text-theme">Promoting Economic Empowerment</h2>
        </div>
        <p className="text-lg text-gray-700">
            We provide skills training, microloans, and entrepreneurship programs to help individuals achieve financial independence.
        </p>
    </div>

    <div className="bg-softTheme p-8 rounded-lg">
        <div className='flex flex-col items-start mb-4'>
            <div className='p-4 mb-4 rounded-lg bg-theme flex items-center justify-center'>
                <VolunteerActivismIcon className='text-white text-3xl' />
            </div>
            <h2 className="text-2xl font-semibold text-theme">Encouraging Volunteerism</h2>
        </div>
        <p className="text-lg text-gray-700">
            We foster a culture of giving back by encouraging volunteerism, mentorship, and active participation in social impact initiatives.
        </p>
    </div>
</motion.div>






<div className='flex flex-col items-start justify-center mt-16 mb-2  w-full'>
            <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Our Vision</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
        </div> 

<div className='flex flex-col sm:flex-row mb-8'>
            <div className=''>
            <p className='mt-4 pt-2 text-justify' style={{ fontSize: '18px', color: '#000000' }}>

At A.S.K. Foundation, our vision is a world where kindness is abundant, and every person enjoys their fair share of compassion and support.
</p>
            </div>

        </div> 



</div>
</motion.div>



</div>



        </div>
      </div>
    </div>
  );
};

export default WidgetAboutForAbout;