import React, { useState, useEffect } from 'react';

const MarqueeTextContainer = () => {
  const sampleTexts = [
    "Welcome to Ashabi Shobande Kokumo Foundation",
  ];

  return (
    <div className='bg-theme py-2.5 flex justify-center text-white' style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
        {sampleTexts[0]}
    </div>
  );
};

export default MarqueeTextContainer;
