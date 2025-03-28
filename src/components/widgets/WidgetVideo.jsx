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

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import NotificationModal from '../modals/NotificationModal';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const WidgetVideo = ({ }) => {

    const getEmbedUrl = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&mute=1` : null;
      };


    return(
<div className="video-container  mt-4" 
// style={{
//   position: "relative",
//   width: "380px",
//   height: "700px",
//   margin: "auto",
//   zIndex: 1, // Lower than navbar
// }}
>
{/* https://www.youtube.com/watch?v=WDL5oNdAC1o&list=TLGGj00DqafXhykyODAzMjAyNQ */}
    {/* <Slider ref={sliderRef} {...settingsVideo}> */}
    

      {/* {videos.map((video, index) => ( */}
        <div 
        // key={index} 
        className="video-slide">
          <iframe
            width="100%"
            height="700px"
            src={getEmbedUrl("https://www.youtube.com/watch?v=WDL5oNdAC1o")}
            // title={`YouTube Video ${index + 1}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen 
            onContextMenu={(e) => e.preventDefault()}
          ></iframe>
        </div>
    {/*    ))} */}
    {/* </Slider> */}

    
    </div>
    );
}

export default WidgetVideo;