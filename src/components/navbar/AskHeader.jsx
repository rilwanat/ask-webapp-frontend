import React, { useState, useEffect } from 'react';

import AskHeaderHead from './AskHeaderHead';
import AdminMobileNavbar from './AdminMobileNavbar';

import MarqueeTextContainer from "./MarqueeTextContainer";

export default function AskHeader({ gotoPage, showMarqees}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        // Initial useEffect logic can be added here if needed
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 500);
    };

    return (
        <div>
            { showMarqees ? <MarqueeTextContainer /> : <div></div> }
            <div>
                {isMobile ? <AdminMobileNavbar gotoPage={gotoPage} /> : <div></div>}
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    {isMobile ? <div></div> : <AskHeaderHead gotoPage={gotoPage} />}
                </div>
            </div>
        </div>
    );
}
