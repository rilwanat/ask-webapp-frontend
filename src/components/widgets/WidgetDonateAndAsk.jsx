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

const WidgetDonateAndAsk = ({ }) => {

    const navigate = useNavigate();

    const navigateTo = (route, data) => {
        navigate(route, { state: data });
      };


    return(
<div className='flex mr-2'>
<div
                            className="flex items-center cursor-pointer px-2 py-1 rounded-md mr-1 text-white bg-theme  hover:bg-white hover:text-theme"
                            onClick={() => {
                                // navigate('/donate');
                                navigateTo('/donate', { selectedItem: null, allItems: null  });
                            }}
                        >
                            <MonetizationOnIcon className='mr-1'/>
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Donate
                            </p>
                        </div>

                        <div
                            className="flex items-center cursor-pointer px-2 py-1 rounded-md ml-1 text-white  bg-orange hover:bg-white hover:text-theme"
                            onClick={() => {
                                // navigate('/i-ask');
                                navigateTo('/i-ask', { selectedItem: null, allItems: null  });
                            }}
                        >
                            <LiveHelpIcon className='mr-1'/>
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                iAsk
                            </p>
                        </div>
</div>
    );
}

export default WidgetDonateAndAsk;