import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';



import LandingPage from './components/LandingPage.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';

import TermsAndConditionsPage from './components/TermsAndConditionsPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';


import SingleRequestsPage from './components/SingleRequestsPage.jsx';
import SingleSponsorPage from './components/SingleSponsorPage.jsx';
import SingleBeneficiaryPage from './components/SingleBeneficiaryPage.jsx';

import DonatePage from './components/DonatePage.jsx';
import AskPage from './components/AskPage.jsx';

 

function App() {
  

  const [currentRequestSlide, setCurrentRequestSlide] = useState(0);
    const [currentBeneficiarySlide, setCurrentBeneficiarySlide] = useState(0);
    const [currentSponsorSlide, setCurrentSponsorSlide] = useState(0);

        // Sample carouseRequestlItems
        const carouselRequestItems = [
            {
              id: 1,
              image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              name: "Emeka Eze",
              title: "Community Support",
              description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
              score: "81897",
              remark: "Financial Support",
              status: "Processing"
            },
            {
              id: 2,
              image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              name: "Chinwe Musa",
              title: "Environmental Care",
              description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
              score: "96783",
              remark: "Financial Support",
              status: "Processing"
            },
            {
              id: 3,
              image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              name: "Audu Mallam",
              title: "Youth Empowerment",
              description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
              score: "45674",
              remark: "Financial Support",
              status: "Processing"
            }
          ];
    
      // Sample carouselBeneficiaryItems
      const carouselBeneficiaryItems = [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Community Support",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "8451",
          name: "Mr Audu Eze",
          date: "2025-02-24 03:47:17",
          price: "N30,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Environmental Care",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "9343",
          name: "Mrs Chiamaka James",
          date: "2025-02-24 03:47:17",
          price: "N40,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "5344",
          name: "Ms Jane Paul",
          date: "2025-02-24 03:47:17",
          price: "N50,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "4744",
          name: "Ms Musa Mansa",
          date: "2025-02-24 03:47:17",
          price: "N10,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 5,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "4844",
          name: "Ms Pauline Aba",
          date: "2025-02-24 03:47:17",
          price: "N80,000.00",
          remark: "Financial Support",
          status: "Processed"
        },
        {
          id: 6,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          title: "Youth Empowerment",
          description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
          score: "4234",
          name: "Mr Emma Agada",
          date: "2025-02-24 03:47:17",
          price: "N70,000.00",
          remark: "Financial Support",
          status: "Processed"
        }
      ];
      
      // Sample carouselSponsorItems
        const carouselSponsorItems = [
          {
            id: 1,
            image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Community Support",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "43281",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N30,000.00",
            type: "Sponsor"
          },
          {
            id: 2,
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Environmental Care",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "5293",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N40,000.00",
            type: "Donor"
          },
          {
            id: 3,
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Youth Empowerment",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "6244",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N50,000.00",
            type: "Partner"
          },
          {
            id: 4,
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Youth Empowerment",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "4534",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N50,000.00",
            type: "Sponsor"
          },
          {
            id: 5,
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Youth Empowerment",
            description: "rbapps is a fullstack web and mobile application development company located in abuja and specializing in frontend and backend technologies.",
            score: "4734",
            name: "Koksons Seasons",
            date: "2025-02-24 03:47:17",
            price: "N50,000.00",
            type: "Partner"
          }
        ];




  useEffect(() => {
    // initAuth();
  }, []);

  return (
    <Router>
      <div>
        <div>

          <Routes>

            <Route path="/*" element={<div>NOT FOUND</div>} />            
            <Route path='/' element={<LandingPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
            />}/>
            <Route path='/about-us' element={<AboutUsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/contact-us' element={<ContactUsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>


            <Route path='/terms-and-conditions' element={<TermsAndConditionsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/privacy-policy' element={<PrivacyPolicyPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>

            <Route path='/single-request' element={<SingleRequestsPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/single-sponsor' element={<SingleSponsorPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            <Route path='/single-beneficiary' element={<SingleBeneficiaryPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>


            <Route path='/donate' element={<DonatePage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
             <Route path='/i-ask' element={<AskPage 
            currentRequestSlide={currentRequestSlide} carouselRequestItems={carouselRequestItems} setCurrentRequestSlide={setCurrentRequestSlide} 
            currentBeneficiarySlide={currentBeneficiarySlide} carouselBeneficiaryItems={carouselBeneficiaryItems} setCurrentBeneficiarySlide={setCurrentBeneficiarySlide}
            currentSponsorSlide={currentSponsorSlide} carouselSponsorItems={carouselSponsorItems} setCurrentSponsorSlide={setCurrentSponsorSlide}
             />}/>
            
            </Routes>
            
        </div>
      </div>
    </Router>
  )
}

export default App
