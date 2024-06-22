import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css"
import { menu, close, LogoImage} from "../../assets";

const Navbar = ({ toggle, setToggle }) => {
    const [active, setActive] = useState("");
  
    const handleLinkClick = (Link) => {
      setActive(Link);
    };

    return (
        <div>
            <div className={`sidebar`}>
                <nav>
                    <ul>
                    <li className={active === 'TheraAI' ? 'active' : ''} onClick={() => handleLinkClick('TheraAI')} style={{ paddingLeft: '0px' }}>
                    <img src={LogoImage} alt="TheraAI Logo" style={{ marginRight: '5px', height: '20px' }} />
                    TheraAI
                    </li>
                        <li className={active === 'Home' ? 'active' : ''} onClick={() => handleLinkClick('Home')}>
                        {/* <Link to="/home">Home</Link> */} Home
                        </li>
                        <li className={active === 'Dashboard' ? 'active' : ''} onClick={() => handleLinkClick('Dashboard')}>
                        {/* <Link to="/projects">Projects</Link> */} Dashboard
                        </li>
                        <li className={active === 'Account' ? 'active' : ''} onClick={() => handleLinkClick('Account')}>
                        {/* <Link to="/inbox">Inbox</Link> */} Account
                        </li>
                        <li className={active === 'About' ? 'active' : ''} onClick={() => handleLinkClick('About')}>
                        {/* <Link to="/inbox">Inbox</Link> */} About
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar