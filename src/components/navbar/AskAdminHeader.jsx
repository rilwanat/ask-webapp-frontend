import React, { useState, useEffect } from 'react';

import AskHeaderAdminHead from './AskHeaderAdminHead';
import AdminMobileAdminNavbar from './AdminMobileAdminNavbar';

import MarqueeTextContainer from "./MarqueeTextContainer";

export default function AskAdminHeader({ carouselRequestItems, carouselBeneficiaryItems, carouselSponsorItems, gotoPage, showMarqees}) {
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
                {isMobile ? <AdminMobileAdminNavbar 
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems}
                gotoPage={gotoPage} /> : <div></div>}
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    {isMobile ? <div></div> : <AskHeaderAdminHead 
                    carouselRequestItems={carouselRequestItems} 
                    carouselBeneficiaryItems={carouselBeneficiaryItems}
                    carouselSponsorItems={carouselSponsorItems}
                    gotoPage={gotoPage} />}
                </div>
            </div>
        </div>
    );
}
