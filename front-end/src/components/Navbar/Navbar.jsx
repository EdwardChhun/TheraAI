import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css"
import { navLogo, home, dashboard, account, about, team } from "../../assets";

const Navbar = ({ toggle, setToggle }) => {
    const [active, setActive] = useState("");
    const [userData, setUserData] = useState({ fullName: 'Guest', email: 'Example@domain.com' });

    useEffect(() => {
        const data = localStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      }, []);

    const handleLinkClick = (Link) => {
      setActive(Link);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData'); // Clear specific item from localStorage
        setUserData({ fullName: 'Guest', email: 'Example@domain.com' }); // Reset the state
        alert('Logging out...');
      };

    return (
        <div>
            <div className={`sidebar`}>
                    <li className={active === 'TheraAI' ? 'active' : ''} onClick={() => handleLinkClick('TheraAI')} style={{ paddingLeft: '0px' }}>
                        <Link to="/" className='nav-link-logo'>
                            <img src={navLogo} alt="TheraAI Logo" style={{ marginRight: '1px', height: '1em', }} />
                            TheraAI
                        </Link>
                    </li>
                <nav>
                    <ul className='nav-list'>
                        <li className={active === 'Home' ? 'active' : ''} onClick={() => handleLinkClick('Home')}>
                            <Link to="/Home" className='nav-link'>
                                <img className='nav-link-icons' src={home} alt='Home'/>
                                Home
                            </Link>
                        </li>
                        <li className={active === 'Dashboard' ? 'active' : ''} onClick={() => handleLinkClick('Dashboard')}>
                            <Link to="/Dashboard" className='nav-link'>
                                <img className='nav-link-icons' src={dashboard} alt='Dashboard'/>
                                Dashboard
                            </Link>
                        </li>
                        <li className={active === 'Account' ? 'active' : ''} onClick={() => handleLinkClick('Account')}>
                            <Link to="/Account" className='nav-link'>
                                <img className='nav-link-icons' src={account} alt='Account'/>
                                Account
                            </Link>
                        </li>
                        <li className={active === 'About' ? 'active' : ''} onClick={() => handleLinkClick('About')}>
                            <Link to="/About" className='nav-link'>
                                <img className='nav-link-icons' src={about} alt='About'/>
                                About
                            </Link>
                        </li>
                        <li className={active === 'Team' ? 'active' : ''} onClick={() => handleLinkClick('Team')}>
                            <Link to="/Team" className='nav-link'>
                                <img className='nav-link-icons' src={team} alt='Team'/>
                                <span className='nav-link-directory'> Team </span>
                            </Link>
                        </li>
                        <li className={active === 'Team' ? 'active' : ''} onClick={() => handleLinkClick('Team')}>
                            <Link to="/Team" className='nav-link'>Team</Link>
                        </li>
                    </ul>
                </nav>
                <div className="user-info">
                    <p><strong>{userData.fullName}</strong></p>
                    <p>{userData.email}</p>
                    <button className="logout-button" onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar