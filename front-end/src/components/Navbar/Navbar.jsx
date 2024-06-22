import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css"

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
                        <li className={active === 'TheraAI' ? 'active' : ''} onClick={() => handleLinkClick('TheraAI')}>
                            <Link to="/" className='nav-link'>TheraAI</Link>
                        </li>
                        <li className={active === 'Home' ? 'active' : ''} onClick={() => handleLinkClick('Home')}>
                            <Link to="/Home" className='nav-link'>Home</Link>
                        </li>
                        <li className={active === 'Dashboard' ? 'active' : ''} onClick={() => handleLinkClick('Dashboard')}>
                        <Link to="/Dashboard" className='nav-link'>Dashboard</Link>
                        </li>
                        <li className={active === 'Account' ? 'active' : ''} onClick={() => handleLinkClick('Account')}>
                        <Link to="/Account" className='nav-link'>Account</Link>
                        </li>
                        <li className={active === 'About' ? 'active' : ''} onClick={() => handleLinkClick('About')}>
                        <Link to="/About" className='nav-link'>About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar