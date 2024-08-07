import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Landing, Home, Dashboard, Account, About, Team, } from './components';
import './App.css';

import WebSocketComponent from "./WebSocketComponent";
import LiveStreamRecorder from "./LiveStream";

const App = () => {
    const location = useLocation();

    // Temporary, replace with a fetch function that gets token from backend
    // this is a temp access token generated by making a request with API keys.
    // this key will not work if you try to use it, please fetch a new one
    const accessToken = "sSTVUu1eFVUkAIAhCGsucrgLqlAl";
    const apiKey = "ozI6ytVrmfgVr1r4G8evmtveAPyAMVTRxLuJW1MnoACKAwUq";


    return (
        <div>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes location={location}>
                        <Route path="/" element={<WebSocketComponent accessToken={accessToken} apiKey={apiKey} />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Account" element={<Account />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Team" element={<Team />} />
                        <Route path="/test" element={<LiveStreamRecorder />} />
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
