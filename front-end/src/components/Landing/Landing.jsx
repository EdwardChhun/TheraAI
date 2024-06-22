import React from 'react'
import "./Landing.css";
import { logo } from '../../assets';

const Landing = ({ onLogoClick }) => {
    return (
    <div className='landing-container'>
        <img className='landing-logo' src={logo} alt='TheraAI Logo' onClick={onLogoClick} />
    </div>
    )
}

export default Landing