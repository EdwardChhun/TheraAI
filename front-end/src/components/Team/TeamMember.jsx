// src/components/TeamMember.js
import React from 'react';
import './TeamMember.css';


const TeamMember = ({ name, school, major, linkedin, image }) => {
  return (
    <div className="team-member">
      <img src={image} alt={`${name}'s profile`} className="profile-pic" />
      <h3>{name}</h3>
      <p>{school}</p>
      <p>{major}</p>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a>
    </div>
  );
};

export default TeamMember;
