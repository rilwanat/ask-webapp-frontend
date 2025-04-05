import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation  } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

import askLogo from '../assets/images/ask-logo.png';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import Contact from './widgets/Contact';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function SingleBeneficiaryPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
 }) {
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedItem, allItems } = location.state || {}; // Handle undefined case

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }



    return (
        <div className="">
            <AskHeader 
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            {/* <Hero/> */}
            <HeaderParallax 
                // imageUrl={askLogo}
                title={"A.S.K Beneficiary"}
                subtitle={""}
            />

            {/* <Contact/> */}

            {/* <div className="flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold text-gray-800">{selectedItem?.name || "No Name"}</h1>
                <p className="text-gray-600 mt-2">{selectedItem?.description || "No Description Available"}</p>

                <div className="w-full max-w-3xl mt-4">
                    <Carousel 
                        showIndicators={false}
                        showArrows={true}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={false}
                        autoPlay={false} // 👈 Disabled auto-slide
                        swipeable={true} // 👈 Enables manual swiping
                        emulateTouch={true} // ✅ Fix swipe gestures on mobile
                        // useKeyboardArrows={true} // ✅ Allow left/right keyboard navigation
                        // dynamicHeight={true} // 👈 Adjusts height based on content
                    >
                        {allItems?.map((item) => (
                            <div key={item.id} className="flex flex-col items-center">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="rounded-lg w-full h-64 object-cover"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">{item.name}</h3>
                                <p className="text-gray-600">{item.price}</p>
                                <p className="text-theme font-bold my-1">{item.date}</p>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div> */}


<div className="w-full mt-4">
    <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
        <div className="w-full py-4 ">

        {/* <div className="flex flex-col md:flex space-x-4">
        {carouselSponsorItems.map((item) => (
          <div key={item.id} className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-4">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            <p className=" text-sm">{item.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-semibold">{item.price}</span>
              <span className="text-sm text-gray-500">{item.score} pts</span>
            </div>
          </div>
        ))}
      </div> */}

      
    {/* <div className="w-full overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Score</th>
            <th className="border border-gray-300 p-2">Beneficiary</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {carouselBeneficiaryItems.map((item) => (
            <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="border border-gray-300 p-2">{item.title}</td>
              <td className="border border-gray-300 p-2 text-sm">{item.description}</td>
              <td className="border border-gray-300 p-2">{item.score}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2 font-semibold">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
            
            <div className="w-full py-4 flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {carouselBeneficiaryItems.map((item) => (
          <div key={item.id} className="
          border border-gray-300 shadow-md
           p-2 rounded-lg ">
            <img src={item.image} alt={`Item ${item.id}`} 
            className="w-full h-40 object-cover rounded-md"
            style={{
              height: '190px',   
              width: '190px',   
          }}
            />

            <div className="flex flex-col items-center mb-2 mt-auto">
                  {/* <h3 className="text-2xl font-bold text-theme">{item.score}</h3> */}
                  <div className='flex text-sm  rounded-lg items-center justify-center w-70  mt-2'><p className="text-theme">{'' + item.name}</p> </div>
                  <div className='flex text-sm  rounded-lg items-center justify-center w-70  mt-0'><p className="text-theme">{'' + item.price}</p></div>
                </div>

          </div>
        ))}
      </div>
    </div>

        </div>
    </div>

</div>


            {/* <LatestNews/> */}



            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
