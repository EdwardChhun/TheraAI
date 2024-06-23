import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Landing, Home, Dashboard, Account, About, Team, } from './components';
import './App.css';

const App = () => {
    const location = useLocation();

    return (
        <div>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes location={location}>
                        <Route path="/" element={<Landing />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Account" element={<Account />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Team" element={<Team />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
