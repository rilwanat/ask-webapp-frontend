import React from 'react';

function HeaderParallax({ imageUrl, title, subtitle  }) {

  return (
    <div
      className="relative h-[120px] w-full flex justify-center items-center overflow-hidden mt-24 sm:mt-20"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center p-4">
        {/* <h2 className="text-3xl font-bold mb-2 z-1000">{title}</h2>
        <p className="text-lg z-1000">{subtitle}</p> */}
      </div>

      <div className="absolute inset-0  flex flex-col justify-center items-center text-gray-200 text-center p-4">
        <h2 className="text-3xl font-bold mb-2 z-90">{title}</h2>
        <div className='bg-theme mb-2 z-90' style={{ width: '80px', height: '4px' }}></div>
        <p className="text-lg z-90">{subtitle}</p>        
      </div>
    </div>
  );
}

export default HeaderParallax;