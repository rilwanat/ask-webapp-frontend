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

const DonateAndAsk = ({ }) => {
    return(
<div className='flex mr-2'>
<div
                            className="flex cursor-pointer px-2 py-1 rounded-md mx-4  bg-softTheme hover:bg-theme hover:text-white"
                            onClick={() => {
                                // navigate('/donate');
                            }}
                        >
                            <MonetizationOnIcon className='mr-2'/>
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Donate
                            </p>
                        </div>

                        <div
                            className="flex cursor-pointer px-2 py-1 rounded-md mx-4  bg-softTheme hover:bg-theme hover:text-white"
                            onClick={() => {
                                // navigate('/i-ask');
                            }}
                        >
                            <LiveHelpIcon className='mr-2'/>
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

export default DonateAndAsk;