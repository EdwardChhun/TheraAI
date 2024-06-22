import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { logo } from '../../assets';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/Account');
  };

  const handleKeyDown = (event) => {
    navigate('/Account');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="landing-container">
      <img className="landing-logo" src={logo} alt="TheraAI Logo" onClick={handleLogoClick} />
    </div>
  );
};

export default Landing;
