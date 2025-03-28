import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

import askLogo from '../assets/images/ask-logo.png';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
import Contact from './widgets/Contact';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



export default function SingleRequestsPage() {
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }
    


    return (
        <div className="">
            <AskHeader gotoPage={gotoPage} showMarqees={false} />

            
            {/* <Hero/> */}
            <HeaderParallax 
                // imageUrl={askLogo}
                title={""}
                subtitle={""}
            />

            {/* <Contact/> */}


            {/* <LatestNews/> */}



            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
