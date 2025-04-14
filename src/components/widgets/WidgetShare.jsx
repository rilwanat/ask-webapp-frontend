import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/ask-logo.png';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import XIcon from '../../assets/images/socials/x.png';
import FacebookIcon from '../../assets/images/socials/facebook.png';
import InstagramIcon from '../../assets/images/socials/instagram.png';
import YouTubeIcon from '../../assets/images/socials/youtube.png';
import TelegramIcon from '../../assets/images/socials/telegram.png';
import WhatsAppIcon from '../../assets/images/socials/whatsapp.png';
import TikTokIcon from '../../assets/images/socials/tiktok.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

const WidgetShare = ({ helpToken }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/help-request/${helpToken}`;
  const shareText = `Help me win A.S.K Foundation's weekly financial support! Nominate me via link: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Platform-specific share URLs
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Help me with my request')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing
    tiktok: `https://www.tiktok.com/`, // TikTok doesn't support direct sharing
    youtube: `https://www.youtube.com/` // YouTube doesn't support direct sharing
  };

  return (
    <div className='flex flex-col bg-theme rounded-lg py-1 px-8 justify-center mt-1'>
      <div className='flex items-center'>
        <div className='text-white' style={{ fontWeight: '600', marginTop: '-1px' }}>Share:</div>
        <ul className="flex ml-4">
          <li className='mr-4'>
            <button onClick={handleCopy} style={{ background: 'none', border: 'none', padding: 0 }}>
              <ContentCopyIcon style={{ 
                cursor: "pointer", 
                color: copied ? "#4CAF50" : "#ffffff", 
                width: '28px', 
                height: '28px' 
              }}/>
            </button>
          </li>
          <li className='mr-4'>
            <a href={shareLinks.whatsapp} target='_blank' rel="noopener noreferrer">
              <img src={WhatsAppIcon} alt="WhatsApp" style={{cursor: "pointer", width:'28px', height:'28px' }}/>
            </a>
          </li>
          <li className='mr-4'>
            <a href={shareLinks.telegram} target='_blank' rel="noopener noreferrer">
              <img src={TelegramIcon} alt="Telegram" style={{cursor: "pointer", width:'28px', height:'28px' }}/>
            </a>
          </li>
          <li className='mr-4'>
            <a href={shareLinks.facebook} target='_blank' rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook" style={{cursor: "pointer", width:'28px', height:'28px' }}/>
            </a>
          </li>
          <li className='mr-4'>
            <a href={shareLinks.twitter} target='_blank' rel="noopener noreferrer">
              <img src={XIcon} alt="Twitter" style={{cursor: "pointer", width:'28px', height:'28px' }}/>
            </a>
          </li>
          {/* <li className='mr-4'>
            <a href={shareLinks.instagram} target='_blank' rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram" style={{cursor: "pointer", width:'28px', height:'28px' }}/>
            </a>
          </li> */}
          {/* <li className='mr-4'>
            <a href={shareLinks.tiktok} target='_blank' rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} style={{cursor: "pointer", color: "#ffffff", width:'20px', height:'20px', marginTop: '4px' }}/>
            </a>
          </li> */}
          {/* <li className='mr-4'>
            <a href={shareLinks.youtube} target='_blank' rel="noopener noreferrer">
              <img src={YouTubeIcon} alt="YouTube" style={{cursor: "pointer", width:'24px', height:'24px' }}/>
            </a>
          </li> */}
        </ul>
      </div>
      {copied && (
        <div className="text-white text-sm mt-1">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default WidgetShare;