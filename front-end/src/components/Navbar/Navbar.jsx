import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css"
import { LogoImage} from "../../assets";

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
                        <Link to="/" className='nav-link'>
                            <img src={LogoImage} alt="TheraAI Logo" style={{ marginRight: '5px', height: '20px' }} />
                            TheraAI
                        </Link>
                    </li>
                <nav>
                    <ul className='nav-list'>
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