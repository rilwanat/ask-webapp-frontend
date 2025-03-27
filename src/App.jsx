import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';


import './App.css'

import LandingPage from './components/LandingPage.jsx';

function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Router>
      <div>
        <div>

          <Routes>

            <Route path="/*" element={<div>NOT FOUND</div>} />            
            <Route path='/' element={<LandingPage isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />}/>

            </Routes>
            
        </div>
      </div>
    </Router>
  )
}

export default App
