import React, { useState } from 'react';
import "./Home.css";

import Navbar from '../Navbar/Navbar';


import { camera, microphone } from '../../assets';

const Home = () => {
    const [toggle, setToggle] = useState(false);
    return (
      <div className="main-content">
        <Navbar toggle={toggle} setToggle={setToggle} />
        <div className="icon-container">
          <img src={camera} alt="Camera Icon" className="icon" />
        </div>
        <div className="microphone-container">
          
          <h1>Share your thoughts...</h1>
        </div>
      </div>
    );
};

export default Home