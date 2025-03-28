import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import askLogo from '../../assets/images/ask-logo.png';



export default function AskHeaderHead({}) {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        // Initial useEffect logic if needed
    }, []);


    return (
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-32 py-4 pb-4 bg-white shadow-lg">
            

            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mr-8">
                    <img
                        className="block h-16 w-auto max-w-none"
                        src={askLogo}
                        alt="Logo"
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className='text-center w-full'>
                    <div className="flex items-center z-50" style={{ height: "40px" }}>
                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Home
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                navigate('/about-us');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                About
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                // navigate('/requests');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Requests
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                // navigate('/gallery');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Gallery
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                // navigate('/gallery');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Sponsor
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                // navigate('/gallery');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Beneficiary
                            </p>
                        </div>

                        <div
                            className="cursor-pointer px-2 py-1 rounded-md mx-4 hover:bg-theme hover:text-white"
                            onClick={() => {
                                navigate('/contact-us');
                            }}
                        >
                            <p
                                className="text-sm cursor-pointer"
                                style={{ fontWeight: '600' }}
                            >
                                Contact
                            </p>
                        </div>

                        

                    </div>
                </div>

                {/* <div className="flex items-center" style={{  }}>
                    <img
                        className="block h-12 w-auto max-w-none"
                        src={scrappLogo}
                        alt="Logo"
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div> */}

                {/* <div className="flex items-center bg-blue-800">
                    <>
                        <div className="flex items-center" style={{ height: "40px" }}>
                            <div className='hidden flex-col mr-4 md:flex items-end'>
                                <p className='text-sm font-bold text-black'>{'rbapps'}</p>
                                <p className='text-sm text-black'>{'User'}</p>
                            </div>

                            <div
                                // onClick={() => { navigate('/'); }}
                                style={{ width: '176px', borderWidth: '1px' }}
                                className="text-center shadow-lg border-eDoctorBlue bg-eDoctorWhite rounded-lg px-4 py-2 text-eDoctorBlue text-sm cursor-pointer mx-1"
                            >
                                Download Our App
                            </div>

                            <div
                                // onClick={() => { handleRegister() }}
                                style={{ width: '128px', borderWidth: '1px' }}
                                className="text-center border-eDoctorBlue rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1"
                            >
                                Register
                            </div>
                        </div>
                    </>
                </div> */}
            </div>
        </div>
    );
}
