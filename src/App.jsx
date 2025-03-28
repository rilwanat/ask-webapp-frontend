import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';



import LandingPage from './components/LandingPage.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';

import TermsAndConditionsPage from './components/TermsAndConditionsPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';

 

function App() {
  
  useEffect(() => {
    // initAuth();
  }, []);

  return (
    <Router>
      <div>
        <div>

          <Routes>

            <Route path="/*" element={<div>NOT FOUND</div>} />            
            <Route path='/' element={<LandingPage  />}/>
            <Route path='/about-us' element={<AboutUsPage  />}/>
            <Route path='/contact-us' element={<ContactUsPage  />}/>


            <Route path='/terms-and-conditions' element={<TermsAndConditionsPage  />}/>
            <Route path='/privacy-policy' element={<PrivacyPolicyPage  />}/>

            </Routes>
            
        </div>
      </div>
    </Router>
  )
}

export default App
