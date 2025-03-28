import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/images/ask-logo.png';

import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Services = ({ }) => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 py-4 pb-8">
        <div className="w-full p-4 my-4">
          <div className="flex flex-col md:flex-row items-center justify-between">

            <div
              className="service-card rounded-lg shadow-md md:w-1/3 m-4 p-8 w-full flex flex-col bg-white hover:bg-scrappGreenDark hover:shadow-lg"
              style={{
                position: 'relative',
                // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                // minHeight: '200px',
                overflow: 'hidden',
                transition: 'all 0.9s ease', // Smooth transition for all properties
              }}
            >
              {/* Background icon */}
              <div
                className="background-icon"
                style={{
                  position: 'absolute',
                  bottom: '-30px', right: '-30px',
                  transition: 'transform 1.5s ease',
                }}
              >
                <RecyclingIcon style={{ color: '#C8E6C9', height: '160px', width: '160px' }} />
              </div>

              {/* Icon container */}
              <div className='p-4 mb-4 bg-scrappGreenLight rounded-lg w-[60px] h-[60px] flex items-center justify-center'>
                <RecyclingIcon style={{ color: '#FFFFFF', height: '32px', width: '32px' }} />
              </div>

              {/* Text content */}
              <div
                className="text-title mb-4"
                style={{
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'color 0.3s ease',
                }}
              >
                Play & Earn with ScrAppCoinquest!
              </div>
              <div
                className="text-description z-50"
                style={{
                  fontSize: '16px',
                  transition: 'color 0.9s ease',
                }}
              >
                Recycle, level up, and earn rewards in the ultimate eco-friendly crypto game. Join the movement and turn waste into wealth!
              </div>
            </div>
            
            <div
              className="service-card rounded-lg shadow-md md:w-1/3 m-4 p-8 w-full flex flex-col bg-white hover:bg-scrappGreenDark hover:shadow-lg"
              style={{
                position: 'relative',
                // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                // minHeight: '200px',
                overflow: 'hidden',
                transition: 'all 0.9s ease', // Smooth transition for all properties
              }}
            >
              {/* Background icon */}
              <div
                className="background-icon"
                style={{
                  position: 'absolute',
                  bottom: '-30px', right: '-30px',
                  transition: 'transform 1.5s ease',
                }}
              >
                <PublicIcon style={{ color: '#C8E6C9', height: '160px', width: '160px' }} />
              </div>

              {/* Icon container */}
              <div className='p-4 mb-4 bg-scrappGreenLight rounded-lg w-[60px] h-[60px] flex items-center justify-center'>
                <PublicIcon style={{ color: '#FFFFFF', height: '32px', width: '32px' }} />
              </div>

              {/* Text content */}
              <div
                className="text-title mb-4"
                style={{
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'color 0.3s ease',
                }}
              >
                Invest & Grow Your Green Empire!
              </div>
              <div
                className="text-description z-50"
                style={{
                  fontSize: '16px',
                  transition: 'color 0.9s ease',
                }}
              >
                Build facilities, partner with industries, and expand your recycling empire. Every investment takes you closer to saving the planet—and earning more!
              </div>
            </div>

            <div
              className="service-card rounded-lg shadow-md md:w-1/3 m-4 p-8 w-full flex flex-col bg-white hover:bg-scrappGreenDark hover:shadow-lg"
              style={{
                position: 'relative',
                // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                // minHeight: '200px',
                overflow: 'hidden',
                transition: 'all 0.9s ease', // Smooth transition for all properties
              }}
            >
              {/* Background icon */}
              <div
                className="background-icon"
                style={{
                  position: 'absolute',
                  bottom: '-30px', right: '-30px',
                  transition: 'transform 1.5s ease',
                }}
              >
                <EmojiEventsIcon style={{ color: '#C8E6C9', height: '160px', width: '160px' }} />
              </div>

              {/* Icon container */}
              <div className='p-4 mb-4 bg-scrappGreenLight rounded-lg w-[60px] h-[60px] flex items-center justify-center'>
                <EmojiEventsIcon style={{ color: '#FFFFFF', height: '32px', width: '32px' }} />
              </div>

              {/* Text content */}
              <div
                className="text-title mb-4"
                style={{
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'color 0.3s ease',
                }}
              >
                Challenge Friends & Dominate the Leaderboard!
              </div>
              <div
                className="text-description z-50"
                style={{
                  fontSize: '16px',
                  transition: 'color 0.9s ease',
                }}
              >
                Compete in daily quizzes, complete missions, and climb the ranks. Prove you're the ultimate Earth Guardian and claim exclusive rewards!
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;