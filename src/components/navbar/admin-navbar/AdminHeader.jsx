import React, { useState, useEffect } from 'react';

import AskHeaderAdminHead from './AdminHeaderHead';
import AdminMobileNavbar from './AdminMobileNavbar';

import MarqueeTextContainer from "../MarqueeTextContainer";

export default function AskAdminHeader({ carouselRequestItems, carouselBeneficiaryItems, carouselSponsorItems, gotoPage, showMarqees, isMobile}) {
    
    useEffect(() => {
        // Initial useEffect logic can be added here if needed
    }, []);


    return (
        <div>
            { showMarqees ? <MarqueeTextContainer /> : <div></div> }
            <div>
                {isMobile ? <AdminMobileNavbar 
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
