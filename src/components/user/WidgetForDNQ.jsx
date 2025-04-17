import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import InfoIcon from '@mui/icons-material/Info';

const WidgetForDNQ = ({ userDetails, openNotificationModal, gotoPage }) => {
  








  return (
    <div className="flex flex-col items-center  w-full px-4  ">
                <div className='flex  flex-col items-center justify-center mt-0'>
                    {/* <InfoIcon className='text-theme' style={{ width: '64px', height: '64px' }}/>  */}
                    <p className='text-center font-bold mb-2'>Daily Nomination Quota (DNQ)</p>
                    <div className='bg-theme mb-2' style={{ width: '160px', height: '1px' }}></div>
                </div>
        
                {/* <div className='flex justify-center w-full sm:w-1/2 mt-2 mb-4 text-center'>
                You can increase your influence in deciding beneficiary by boosting your daily nomination quota through becoming a donor.                
                </div>   */}
        
                <div className='flex justify-between items-center mt-2'>
                  <div className='flex justify-center cursor-pointer' 
                   onClick={() => {
                    openNotificationModal(true, "DNQ", "You can increase your influence in deciding beneficiary by boosting your daily nomination quota through becoming a donor.");
                  }}
                  >
                    <InfoIcon className='text-theme  rounded-lg ' style={{ width: '40px', height: '40px', }}/> 
                  </div>

                  
                  <div 
                    onClick={() => {
                      // onRequestClose();
                      gotoPage('donate');
                    }}
                    style={{ width: '128px', borderWidth: '1px' }}
                    className='text-center border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1'>
                    Boost
                  </div>

                  <div className='flex items-center font-bold text-xs  justify-center  bg-green rounded-full border-2 border-white text-white' 
                  style={{ width: '40px', height: '40px', }}
                   onClick={() => {
                    // openNotificationModal(true, "DNQ", "You can increase your influence in deciding beneficiary by boosting your daily nomination quota through becoming a donor.");
                  }}
                  >
                    {userDetails.vote_weight}
                  </div>
                </div>
              </div>
  );
};

export default WidgetForDNQ;