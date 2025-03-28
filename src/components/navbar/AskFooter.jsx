import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import askLogo from '../../assets/images/ask-logo.png';


import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';



import appstore from '../../assets/icons/app-store.png';
import googleplay from '../../assets/icons/google-play.png';

// import axios from 'axios';
// import axiosInstance from '../../../axiosConfig';

function AskFooter({ gotoPage }) {
    const [email, setEmail] = useState("");

    useEffect(() => {}, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };



    return (
        <div className="flex flex-col bg-theme">
            <div className="flex flex-col h-auto px-8 sm:px-16 md:px-32 py-4 pb-8">
                <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between ">
                    <div className="flex flex-col md:items-start md:w-2/4 my-4 md:h-40">
                        <div className="flex items-center mb-2">
                            <img
                                className="block h-16 w-auto max-w-none"
                                src={askLogo}
                                alt="Logo"
                                onClick={() => {
                                    gotoPage('');
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <div className='flex flex-col'>  
                            <p className='text-white mb-2' style={{  }}>Ashabi Shobande Kokumo Foundation</p>
                            <div className='flex my-1' ><PhoneIcon className='mr-2' style={{ color: "#ffffff" }}/><p className="text-white text-sm" style={{  }}><a onClick={() => {window.location.href = "tel:+2349122090051";}}>+234 912 2090 051</a>, <a onClick={() => {window.location.href = "tel:+447864869571";}}>+44 786 4869 571</a></p></div>
                            <div className='flex my-1' onClick={() => {window.location.href = "mailto:info@askfoundations.org";}}><EmailIcon className='mr-2' style={{ color: "#ffffff" }}/><p className="text-white text-sm" style={{  }}>info@askfoundations.org</p></div>
                            <div className='flex my-1'><PlaceIcon className='mr-2' style={{ color: "#ffffff" }}/><p className="text-white text-sm" style={{  }}>69 Avenue Road, Bexleyheath Kent DA7 4EQ, London.</p></div>
                        </div>
 
                        <div className="flex mt-4">
                        <div className="relative z-20">
              <ul className="flex">
                <li className='mr-4'>
                  <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target='_blank'>
                    <WhatsAppIcon style={{cursor: "pointer", color: "#ffffff" }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://t.me/askfoundations" target='_blank'>
                    <TelegramIcon style={{cursor: "pointer", color: "#ffffff" }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.facebook.com/askfoundationpage" target='_blank'>
                    <FacebookIcon style={{cursor: "pointer", color: "#ffffff" }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.twitter.com/askfoundations" target='_blank'>
                    <XIcon style={{cursor: "pointer", color: "#ffffff" }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.instagram.com/askfoundations" target='_blank'>
                    <InstagramIcon style={{cursor: "pointer", color: "#ffffff" }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.tiktok.com/@askfoundations" target='_blank'>
                    {/* <TiktokIcon style={{cursor: "pointer", color: "#ffffff" }}/> */}
                    <FontAwesomeIcon icon={faTiktok} style={{cursor: "pointer", color: "#ffffff", }}/>
                  </a>
                </li>
                <li className='mr-4'>
                  <a href="https://www.youtube.com/@Askfoundations" target='_blank'>
                    <YouTubeIcon style={{cursor: "pointer", color: "#ffffff" }}/>
                  </a>
                </li>

              </ul>
            </div>
                        </div>
                    </div>

                    {/* <div className="flex flex-col md:items-start md:w-1/3  my-4 md:h-40">
                        <p className='text-white mb-2' style={{ color: '', fontSize: '20px' }}>Company Info</p>
                        <p className='text-white mb-1' style={{ color: '', fontSize: '12px' }}>About Us</p>
                        <p className='text-white mb-1' style={{ color: '', fontSize: '12px' }}>Terms & Conditions</p>
                        <p className='text-white mb-1' style={{ color: '', fontSize: '12px' }}>Contact Us</p>
                    </div> */}

                    <div className="flex flex-col md:w-2/4 my-4 md:h-40">
                        <div className="flex flex-col items-start mb-4">
                            <p
                                className="text-white mb-2"
                                style={{ color: '', fontSize: '20px' }}
                            >
                                Subscribe to our Newsletter
                            </p>
                            <p
                                className="text-white"
                                style={{ color: '', fontSize: '12px' }}
                            >
                                Connect with people, share similar experiences and history to
                                better your health experiences and well-being.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row relative">
                            <input
                                type="text"
                                placeholder="Your Email"
                                className="pl-4 border border-gray-300 rounded-lg py-1 px-2 text-center text-white"
                                // onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <div
                                // onClick={() => { handleSubscribeToNewsletter() }}
                                style={{ borderWidth: '1px' }}
                                className="text-center mt-4 sm:mt-0 sm:ml-2 border-white rounded-lg px-4 py-2 text-white text-sm cursor-pointer"
                            >
                                Subscribe
                            </div>
                        </div>
                        <div className="flex py-2 my-2">
                            <img
                                onClick={() => {
                                    alert('googleplay');
                                }}
                                className="mr-4 cursor-pointer border-black border-4"
                                src={googleplay}
                                alt=""
                                style={{
                                    width: '128px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            <img
                                onClick={() => {
                                    alert('appStore');
                                }}
                                className="mr-4 cursor-pointer border-black border-4"
                                src={appstore}
                                alt=""
                                style={{
                                    width: '128px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center sm:justify-end items-center  text-center  mt-4 '>
                    <span className="text-white text-sm cursor-pointer block my-2 mr-8" 
                    onClick={() => { gotoPage("terms-and-conditions"); }}>
                        Terms and Conditions
                    </span>
                    <span className="text-white text-sm cursor-pointer block my-2" 
                    onClick={() => { gotoPage("privacy-policy"); }}>
                        Privacy Policy
                    </span>
                </div>


            </div>


            


            <div className="mt-auto ">
                <div className="bottom-0 w-full text-center">
                    <p className="text-xs py-4 text-white">
                        &copy; 2025 ASK Foundation. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AskFooter;
