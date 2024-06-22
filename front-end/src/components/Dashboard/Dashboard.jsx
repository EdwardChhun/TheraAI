import React, { useState } from 'react';
import "./Dashboard.css"
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <Navbar toggle={toggle} setToggle={setToggle} />
  )
}

export default Dashboard