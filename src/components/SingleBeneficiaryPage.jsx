import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import GuestHeader from './navbar/guest-navbar/GuestHeader';
import GuestFooter from './navbar/guest-navbar/GuestFooter';

import HeaderParallax from './widgets/HeaderParallax';

export default function SingleBeneficiaryPage({ 
    isMobile,
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItem, allItems } = location.state || {};
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;
// Calculate pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = carouselBeneficiaryItems.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(carouselBeneficiaryItems.length / itemsPerPage);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, []);

    const gotoPage = (pageName) => {
        navigate("/" + pageName);
    }


    // Custom carousel configuration to prevent scroll interference
    const carouselConfig = {
        stopAutoPlayOnHover: true,
        showIndicators: false,
        showArrows: true,
        showStatus: false,
        showThumbs: false,
        infiniteLoop: false,
        autoPlay: false,
        swipeable: true,
        emulateTouch: true,
        swipeScrollTolerance: 5,
        preventMovementUntilSwipeScrollTolerance: true,
        verticalSwipe: 'natural',
        stopOnHover: false
    };

    const formatAmount = (amount) => {
        return Number(amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      };

    return (
        <div className="touch-pan-y">
            <GuestHeader isMobile={isMobile}
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems} 
                gotoPage={gotoPage} 
                showMarqees={false} 
            />

            <HeaderParallax 
                title={"A.S.K Beneficiaries"}
                subtitle={""}
            />

            <div className="w-full mt-4 touch-pan-y">
                <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
                    <div className="w-full py-4">
                        {/* Grid View */}
                        <div className="w-full py-4 flex justify-center">
                            <div 
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 touch-pan-y"
                                style={{ touchAction: 'pan-y' }}
                            >
                                {currentItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="border border-gray-300 shadow-md 
                                        p-2 rounded-lg cursor-pointer "
                                        // whileHover={{ scale: 1.03 }}
                                        // whileTap={{ scale: 0.97 }}
                                        onClick={() => navigate('/single-beneficiary', { state: { selectedItem: item, allItems: carouselBeneficiaryItems }})}
                                    >
                                        <div className="flex justify-center">
                                        <img 
                                            src={(
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + "../../../../" + item.user.profile_picture}
                                            alt={`Beneficiary ${item.id}`} 
                                            className="w-full object-cover rounded-md mt-1"
                                            style={{
                                                height: '190px',
                                                width: '190px',
                                            }}
                                            loading="lazy"
                                        />
                                        </div>
                                        <div className="flex flex-col items-center mb-2 mt-auto">
                                            <div className='flex text-sm rounded-lg items-center justify-center w-full mt-2'>
                                                <p className="text-theme text-center">{item.user.fullname}</p>
                                            </div>
                                            <div className='flex flex-col text-sm rounded-lg items-center justify-center w-full mt-0'>
                                                <p className="text-green  font-bold text-center">{'₦' + formatAmount(item.amount)}</p>
                                                <p className="text-theme text-center">{item.date}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>


                        {/* Pagination */}
                        <div className="flex justify-center my-4">
                            <nav className="inline-flex rounded-md shadow">
                                <ul className="flex list-style-none">
                                    <li>
                                        <button
                                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                            disabled={currentPage === 1}
                                            className={` cursor-pointer px-3 py-1 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-theme hover:bg-gray-100'}`}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                        <li key={number}>
                                            <button
                                                onClick={() => paginate(number)}
                                                className={` cursor-pointer px-3 py-1 border-t border-b border-gray-300 ${currentPage === number ? 'bg-theme text-white' : 'bg-white text-theme hover:bg-gray-100'}`}
                                            >
                                                {number}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                            disabled={currentPage === totalPages}
                                            className={` cursor-pointer px-3 py-1 rounded-r-md border border-gray-300 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-theme hover:bg-gray-100'}`}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>

            <GuestFooter gotoPage={gotoPage} />
        </div>
    );
}