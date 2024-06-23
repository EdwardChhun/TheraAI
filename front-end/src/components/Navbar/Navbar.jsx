import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import "./Navbar.css"
import { navLogo, home, dashboard, account, about, team, menu, user } from "../../assets";

const Navbar = ({ toggle, setToggle }) => {
    const [active, setActive] = useState("");
    const [userData, setUserData] = useState({ fullName: 'Guest', email: 'Example@domain.com' });

    async function fetchData() {
        try {
            const response = await axios.get('http://127.0.0.1:5000/upload-contact');
            console.log("GET Response: ", response.data);
            if (response.data) {
                setUserData(response.data);
            }

        } catch (error) {
            console.log("Error with GET request: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleLinkClick = (Link) => {
      setActive(Link);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setUserData({ fullName: 'Guest', email: 'Example@domain.com' });
        alert('Logging out...');
      };

    return (
        <div>
            {/* <img
                className={`menu ${!toggle ? 'show' : 'menu-hidden'}`}
                src={menu}
                alt={"menu"}
                onClick={() => setToggle(!toggle)}
            /> */}
            {/* <div className={`sidebar ${toggle ? 'show' : 'sidebar-hidden'}`}> */}
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
                                <span>Home</span>
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
                    </ul>
                </nav>
                {/* <div className={`user-info ${toggle ? 'show' : ''}`}> */}
                <div className={`user-info`}>
                    <p><img className="user-logo" src={user} alt='User' /><strong>{userData.fullName}</strong></p>
                    <p>{userData.email}</p>
                    <button className={`logout-button`}onClick={handleLogout}>LOG OUT</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar