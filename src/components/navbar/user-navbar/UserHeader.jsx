import React, { useState, useEffect } from 'react';

import UserHeaderHead from './UserHeaderHead';
import UserMobileNavbar from './UserMobileNavbar';

import MarqueeTextContainer from "../MarqueeTextContainer";

export default function AskProfileHeader({ carouselRequestItems, carouselBeneficiaryItems, carouselSponsorItems, gotoPage, showMarqees}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        setIsMobile(window.innerWidth <= 768);
    };

    return (
        <div>
            { showMarqees ? <MarqueeTextContainer /> : <div></div> }
            <div>
                {isMobile ? <UserMobileNavbar 
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems}
                gotoPage={gotoPage} /> : <div></div>}
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    {isMobile ? <div></div> : <UserHeaderHead 
                    carouselRequestItems={carouselRequestItems} 
                    carouselBeneficiaryItems={carouselBeneficiaryItems}
                    carouselSponsorItems={carouselSponsorItems}
                    gotoPage={gotoPage} />}
                </div>
            </div>
        </div>
    );
}
