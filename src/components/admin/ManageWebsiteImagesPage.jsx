import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AskHeader from '../navbar/AskHeader';
import AskAdminHeader from '../navbar/AskAdminHeader';
import AskFooter from '../navbar/AskFooter';

import askLogo from '../../assets/images/ask-logo.png';
import contactUs from '../../assets/images/contact-us.jpg';
import hero1 from '../../assets/images/hero/hero1.jpg';

import { motion } from 'framer-motion';

import Parallax from '../widgets/Parallax';

import Hero from '../widgets/Hero';
import WidgetAboutForHome from '../widgets/WidgetAboutForHome';
import WidgetHelpRequests from '../widgets/WidgetHelpRequests';
import WidgetBeneficiaries from '../widgets/WidgetBeneficiaries';
import WidgetSponsors from '../widgets/WidgetSponsors';
import WidgetVideo from '../widgets/WidgetVideo';

// import Services from './widgets/Services';
// import LatestNews from './widgets/LatestNews';



export default function ManageWebsiteImagesPage({ 
    currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
    currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
    currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,

}) {
    const navigate = useNavigate();
    
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []); 
    const gotoPage = (pageName) => {
        navigate("/" + pageName)
    }







    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [message, setMessage] = useState("");

  const handleFileChange = (index, file) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setPreviews(updatedPreviews);
  };

  const handleSingleUpload = async (index) => {
    const file = selectedFiles[index];
    if (!file) {
      setMessage(`Please select a file for Slide ${index + 1}.`);
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file, `slide${index + 1}.png`);
  
    const endpoint = process.env.REACT_APP_API_SERVER_URL + '/response/upload.php';
  
    try {
      const response = await axiosInstance.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Slide ${index + 1} uploaded successfully.`);
    } catch (error) {
      console.error(`Error uploading slide${index + 1}:`, error);
      setMessage(`Slide ${index + 1} failed to upload.`);
    }
  };
  
    

    return (
        <div className="">

            <AskAdminHeader 
            carouselRequestItems={carouselRequestItems} 
            carouselBeneficiaryItems={carouselBeneficiaryItems}
            carouselSponsorItems={carouselSponsorItems} 
            gotoPage={gotoPage} showMarqees={false} />

            
            

<div className='flex flex-col justify-center items-center px-4 sm:px-16 md:px-24'>
      
      

<div className='flex flex-col sm:flex-row gap-6 mt-24 p-4 w-full bg-amber-300 items-center justify-center'>
  {[0, 1, 2].map((index) => (
    <div key={index} className="flex flex-col gap-2 items-start w-full sm:w-1/3">
      <label className="font-semibold">Slide {index + 1}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(index, e.target.files[0])}
        // className='cursor-pointer'
      />
      {previews[index] && (
        <img
          src={previews[index]}
          alt={`Slide ${index + 1}`}
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      )}
      <button
        className="px-4 py-1 bg-theme text-white rounded-lg cursor-pointer "
        onClick={() => handleSingleUpload(index)}
      >
        Upload Slide {index + 1}
      </button>
    </div>
  ))}
  
</div>


<div className='my-4'>
  {message && <p className="text-sm text-red-600">{message}</p>}
</div>




    </div>


    
            


            {/* <LatestNews/> */}
            {/* <Parallax 
                imageUrl={hero1}
                title={"Contact Us"}
                subtitle={"Click here to reach out to us"}
            /> */}
            

{/* 
            <AskFooter gotoPage={gotoPage} /> */}
        </div>
    );
}
