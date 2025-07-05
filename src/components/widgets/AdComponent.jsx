import React, { useEffect } from 'react';

const AdSenseAd = ({ slotId, format = "auto", responsive = true }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div key={slotId}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8713818304641575"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

export default AdSenseAd;