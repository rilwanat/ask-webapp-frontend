import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AskHeader from './navbar/AskHeader';
import AskFooter from './navbar/AskFooter';

import askLogo from '../assets/images/ask-logo.png';

import { motion } from 'framer-motion';

import Hero from './widgets/Hero';
import HeaderParallax from './widgets/HeaderParallax';
// import WidgetAboutForAbout from './widgets/WidgetAboutForAbout';
// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



export default function TermsAndConditionsPage() {
    const navigate = useNavigate();

    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth <= 500);
    //     };

    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);


    return (
        <div className="">
            <AskHeader gotoPage={gotoPage} showMarqees={false} />

            
            {/* <Hero/> */}
            <HeaderParallax 
                // imageUrl={askLogo}
                title={""}
                subtitle={""}
            />

<div className="w-full">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 py-4 pb-8">
        <div className="w-full p-4 my-4">



          <div className=""
            
            
            // style={{
            //   backgroundImage: `url(${background})`, 
            //   backgroundAttachment: 'fixed',
            //   backgroundSize: 'contain',
            //   backgroundPosition: 'center',
            // }}
            >

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.5 }}
className=" flex items-center justify-center "
>
<div className="mx-auto py-8">

<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.2, duration: 0.5 }}
className="text-2xl font-bold text-theme mb-2"
>
<div className='flex flex-col items-center justify-center mt-0 mb-2'>
<p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Terms And Conditions</p>
<div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
</div>

</motion.h1>

<motion.div
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.4, duration: 0.5 }}
className="text-lg text-gray-600 mb-6"
>
<div className='mb-8 text-center' style={{fontSize: '16px',   }}>

</div>
</motion.div>










<div className="mb-12"
    // style={{
    // backgroundImage: `url(${background})`, 
    // backgroundAttachment: 'fixed',
    // backgroundSize: 'contain',
    // backgroundPosition: 'center',
    // }}
>
    <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and below
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }} // Smooth animation
        className="flex flex-col w-full h-full items-center justify-center mt-4"
    >
        {/*       
        <div className='flex flex-col items-center justify-center mt-16 mb-2'>
            <p className='mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>About Us</p>
            <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
        </div> 
        */}

<div className='flex flex-col sm:flex-row '>
    <div className=''>
        <p className='mt-4 mb-2' >
            {'Terms and Conditions'.toUpperCase()}
        </p>
        <ul className=''>
            <li className='' ><strong>Last Updated:</strong> December 20, 2024</li>
            <li className='' ><strong>Effective Date:</strong> October 2024</li>
        </ul>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            Welcome to askfoundations.org, operated by the <strong>Ashabi Shobande Kokumo Foundation</strong> ("A.S.K Foundation"). These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to comply with these Terms. If you do not agree, you must discontinue using our services.
        </p>
        
        <hr className='my-4'/>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            {'Interpretation and Definitions'.toUpperCase()}
        </p>
        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Interpretation'.toUpperCase()}
        </p>
        <p className='mb-2' >
            Words with initial capital letters have meanings defined below. The definitions apply whether words appear in singular or plural form.
        </p>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Definitions'.toUpperCase()}
        </p>

        <ul className='ml-8 list-disc'>
            <li className='mb-2' ><strong>Affiliate</strong> Any entity under common control with a party, where control means 50% or more ownership of voting securities.</li>
            <li className='mb-2' ><strong>Country</strong> Nigeria.</li>
            <li className='mb-2' ><strong>Company</strong> Refers to Ashabi Shobande Kokumo Foundation, also referred to as "A.S.K Foundation" "We," "Us," or "Our."</li>
            <li className='mb-2' ><strong>Device</strong> Any tool that can access the Service, such as computers, mobile phones, or tablets.</li>
            <li className='mb-2' ><strong>Service</strong> Refers to the Website (askfoundations.org)</li>
            <li className='mb-2' ><strong>Terms</strong> and Conditions This agreement between You and the Company regarding the use of our Service.</li>
            <li className='mb-2' ><strong>Third-party Social Media Service</strong> External content, services, or products integrated into our Service.</li>
            <li className='mb-2' ><strong>Website</strong> The A.S.K Foundation platform, accessible via askfoundations.org.</li>
            <li className='mb-2' ><strong>You</strong> The individual or entity using the Service.</li>
        </ul>

        <hr className='my-4'/>
        
        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Acknowledgment'.toUpperCase()}
        </p>
        <p className='mb-2' >
            These Terms outline the agreement between You and the Company, establishing the rights and obligations of both parties. By accessing or using our services, You confirm that
        </p>

        <ol className='ml-8 list-decimal'>
            <li className='mb-2' >You are at least 18 years old.</li>
            <li className='mb-2' >You accept our Privacy Policy, which governs how we collect, use, and protect your data</li>
        </ol>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'User Agreement Highlights'.toUpperCase()}
        </p>
        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Data Protection
        </p>
        <p className='mb-2' >
            A.S.K Foundation complies with international laws such as GDPR and NDPR to protect your personal data.
        </p>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Use of Personal Information
        </p>
        <p className='mb-2' >
            Your information will:
        </p>
        <ul className='ml-8 list-disc'>
            <li className='mb-2' >Not be used for commercial purposes.</li>
            <li className='mb-2' >Be used internally for accountability, transparency, and reporting to donors.</li>
        </ul>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Account Creation and Usage
        </p>
        <ul className='ml-8 list-disc'>
            <li className='mb-2' >Each user is permitted to create only one account on the A.S.K Foundation platform</li>
            <li className='mb-2' >Creating multiple accounts is strictly prohibited.</li>
            <li className='mb-2' >Any user found to have created multiple accounts will be immediately disqualified as a beneficiary of A.S.K Foundation programs</li>
        </ul>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Processing Fees
        </p>
        <p className='mb-2' >
            A.S.K Foundation reserves the right to introduce processing fees (e.g., for KYC verification) without prior notice. Continued use of the Service constitutes acceptance of these fees. 
        </p>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Advertisements
        </p>
        <p className='mb-2' >
            We may include paid advertisements on the platform to support internal revenue. No user data will be shared with advertisers 
        </p>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Third-Party Website Management
        </p>
        <p className='mb-2' >
            Our website is managed by external providers bound by our data protection policies. 
        </p>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Indemnity'.toUpperCase()}
        </p>
        <p className='mb-2' >
            You agree to indemnify and hold harmless the A.S.K Foundation, its Affiliates, officers, and service providers from and against any claims, damages, or losses arising from:
        </p>

        <ol className='ml-8 list-decimal'>
            <li className='mb-2' >Your use of the Service.</li>
            <li className='mb-2' >Violation of these Terms.</li>
            <li className='mb-2' >Misuse of personal or third-party information through the Service</li>
        </ol>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Links to Other Websites'.toUpperCase()}
        </p>
        <p className='mb-2' >
            Our Service may include links to third-party websites. We do not control their content, policies, or practices and disclaim liability for any issues arising from their use.
        </p>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Termination'.toUpperCase()}
        </p>
        <p className='mb-2' >
            We may suspend or terminate access to the Service without notice if You breach these Terms.
        </p>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Governing Law'.toUpperCase()}
        </p>
        <p className='mb-2' >
            This Agreement is governed by the laws of the Federal Republic of Nigeria.
        </p>
        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Dispute Resolution
        </p>
        <p className='mb-2' >
            In case of disputes, You agree to attempt informal resolution by contacting Us at <strong><a onClick={() => {window.location.href = "mailto:info@askfoundations.org";}}>info@askfoundations.org</a></strong> before pursuing legal remedies.
        </p>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Severability and Waiver'.toUpperCase()}
        </p>
        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Severability
        </p>
        <p className='mb-2' >
            If any part of these Terms is found invalid, the remaining provisions will remain enforceable.
        </p>

        <p className='mt-4 mb-2 font-bold' style={{ fontSize: '18px' }}>
            Waiver
        </p>
        <p className='mb-2' >
            Failure to enforce any provision does not constitute a waiver of that provision. 
        </p>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Changes to These Terms and Conditions'.toUpperCase()}
        </p>
        <p className='mb-2' >
            A.S.K Foundation reserves the right to modify these Terms at any time. Changes will be effective upon posting. Continued use signifies acceptance of updated terms.
        </p>

        <hr className='my-4'/>

        <p className='mt-4 mb-2' style={{ fontSize: '18px' }}>
            {'Contact Us'.toUpperCase()}
        </p>
        <p className='mb-2' >
            For inquiries about these Terms:
        </p>
        <ul className='ml-8 list-disc'>
            <li className='mb-2' onClick={() => {window.location.href = "mailto:info@askfoundations.org";}}><strong>Email:</strong> info@askfoundations.org</li>
            <li className='mb-2' ><strong>Visit:</strong> www.askfoundations.org</li>
        </ul>

        <p className='mt-4 mb-2' >
            By using the A.S.K Foundation Website, You agree to these Terms and Conditions. 
        </p>
    </div>
</div>





    </motion.div>
</div>







</div>
</motion.div>



</div>



        </div>
      </div>
    </div>


            {/* <LatestNews/> */}



            <AskFooter gotoPage={gotoPage} />
        </div>
    );
}
