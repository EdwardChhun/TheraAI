import React, { useState } from 'react';
import "./About.css";
import Navbar from '../Navbar/Navbar';
import './About.css';
import elderlyWomanImage from '../../assets/Image1.jpg';
import doctorImage from '../../assets/Image2.jpeg';
import elderlyManImage from '../../assets/Image3.jpeg';

const About = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <div>
        <Navbar toggle={toggle} setToggle={setToggle} />
        <div className="about-container">
        <h1>What is TheraAI about?</h1>
        <p>TheraAI is an AI-driven chatbot designed to assist elderly users by providing emotional support and monitoring their emotional well-being. The goal is to enhance the emotional well-being of elderly individuals through the innovative application of technology.</p>
        <div className="about-section">
            <div className="about-image">
            <img src={elderlyWomanImage} alt="Elderly Woman" />
            </div>
            <div className="about-text">
            <h3>Why TheraAI?</h3>
            <p>Studies show that around 17% of elderly individuals experience depression due to loneliness (source: CDC). TheraAI aims to bridge this gap by providing consistent emotional support and companionship through innovative AI technologies.</p>
            </div>
        </div>
        <div className="about-section reverse">
            <div className="about-image">
            <img src={doctorImage} alt="Doctor" />
            </div>
            <div className="about-text">
            <h3>Our Goal?</h3>
            <p>To enhance the emotional well-being of elderly individuals through empathetic AI interactions and continuous emotional monitoring, ensuring support, companionship, and safety.</p>
            </div>
        </div>
        <div className="about-section">
            <div className="about-image">
            <img src={elderlyManImage} alt="Elderly Man" />
            </div>
            <div className="about-text">
            <h3>Our Vision?</h3>
            <p>To harness AI to enhance the emotional well-being of elderly individuals through empathetic interactions and advanced technologies. We aim to develop TheraAI into a widely accessible product, providing compassionate support and monitoring to elderly users everywhere.</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default About;