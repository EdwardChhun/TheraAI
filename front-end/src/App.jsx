import React, { useRef } from 'react';
import './App.css'

import { Landing, Home } from "./components";

function App() {
  const homeRef = useRef(null);

  const scrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* <Landing onLogoClick={scrollToHome} /> */}
      <Home ref={homeRef} />
    </>
  )
}

export default App
