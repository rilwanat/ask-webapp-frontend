import React from 'react';
import { useNavigate } from 'react-router-dom';


function Parallax({ imageUrl, title, subtitle  }) {

  const navigate = useNavigate();

  const gotoPage = (pageName) => {
    navigate(pageName);
}

  return (
    <div
      className="relative h-[400px] overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center p-4">

      </div>

      <div className="absolute inset-0  flex flex-col justify-center items-center text-gray-200 text-center p-4 ">

        <div className='flex flex-col bg-lightTheme rounded-lg p-4 shadow-lg items-center justify-center'>
        <h2 className="text-3xl font-bold mb-4 z-1000 ">{title}</h2>
        <div className='bg-white mb-2' style={{ width: '100px', height: '2px' }}></div>
        {/* <p className="text-lg z-1000">{subtitle}</p> */}
        <div 
              onClick={() => { gotoPage('/contact-us') }}
              style={{ borderWidth: '0px', width: '200px' }}
              className='mt-4 text-center  rounded-sm px-4 py-2  text-sm cursor-pointer bg-theme text-white  hover:text-softTheme'>
              Send Us a Message
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default Parallax;