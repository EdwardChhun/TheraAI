import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Landing, Home, Dashboard, Account, About, Team } from './components'

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/About" element={<About />} />
          <Route path="/Team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;