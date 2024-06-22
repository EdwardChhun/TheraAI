import React, { useState } from 'react';
import "./About.css";
import Navbar from '../Navbar/Navbar';

const About = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <Navbar toggle={toggle} setToggle={setToggle} />
  )
}

export default About