import React, { useState, useEffect } from 'react';

import GuestHeaderHead from './GuestHeaderHead';
import GuestMobileNavbar from './GuestMobileNavbar';

import MarqueeTextContainer from "../MarqueeTextContainer";

export default function GuestHeader({ carouselRequestItems, carouselBeneficiaryItems, carouselSponsorItems, gotoPage, showMarqees, isMobile}) {
    
    useEffect(() => {
        // Initial useEffect logic can be added here if needed
    }, []);


    return (
        <div>
            { showMarqees ? <MarqueeTextContainer /> : <div></div> }
            <div>
                {isMobile ? <GuestMobileNavbar 
                carouselRequestItems={carouselRequestItems} 
                carouselBeneficiaryItems={carouselBeneficiaryItems}
                carouselSponsorItems={carouselSponsorItems}
                gotoPage={gotoPage} /> : <div></div>}
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    {isMobile ? <div></div> : <GuestHeaderHead 
                    carouselRequestItems={carouselRequestItems} 
                    carouselBeneficiaryItems={carouselBeneficiaryItems}
                    carouselSponsorItems={carouselSponsorItems}
                    gotoPage={gotoPage} />}
                </div>
            </div>
        </div>
    );
}
