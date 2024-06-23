// src/pages/Team.js
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import TeamMember from './TeamMember';
import './Team.css';
import edwardImage from "../../assets/edwardImage.jpeg";
import clementImage from "../../assets/clementImage.jpeg";
import billImage from "../../assets/billImage.jpeg";
import nikhilImage from "../../assets/nikhilImage.jpg";
import { nickqr, clementqr, billqr, edwardqr } from '../../assets';

const Team = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <div className="main">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="content">
        <h1>Meet the Team!</h1>
        <div className="team-members">
          <TeamMember 
            name="Edward Chhun"
            school="Sac City College '25"
            major="Computer Science"
            linkedin="https://linkedin.com/in/edwardchhun3"
            image={edwardImage}
          />
          <TeamMember 
            name="Clement Boiteux"
            school="UCSB '27"
            major="Computer Engineering"
            linkedin="https://linkedin.com/in/clement-boiteux"
            image={clementImage}
          />
          <TeamMember 
            name="Bill Susanto"
            school="UC Irvine '25"
            major="Computer Science"
            linkedin="https://linkedin.com/in/bill-susanto"
            image={billImage}
          />
          <TeamMember 
            name="Nikhil Ankam"
            school="UToledo '27"
            major="Computer Science & Engineering"
            linkedin="https://linkedin.com/in/nikhil-ankam"
            image={nikhilImage}
          />
        </div>
        <div className="qr-codes">
          <img className="qr-code" src={edwardqr} alt='Edward' />
          <img className="qr-code" src={clementqr} alt='Clement' />
          <img className="qr-code" src={billqr} alt='Bill' />
          <img className="qr-code" src={nickqr} alt='Nick' />
        </div>
      </div>
    </div>
  );
};

export default Team;
