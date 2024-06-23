import React, { useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PopupMessage from '../PopupMessage/PopupMessage';

const Account = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleGuestClick = () => {
      navigate('/Home');
  };

  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emergencyContactFullName: '',
    emergencyContactPhoneNumber: '',
    emergencyContactEmail: '',
    medicalCenterName: '',
    medicalCenterAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  };

  return (
    <div className="account-container">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <h1>Your Profile</h1>
      <form className="account-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <h3>Emergency Contact</h3>
        <label>
          Full Name
          <input
            type="text"
            name="emergencyContactFullName"
            value={formData.emergencyContactFullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="emergencyContactPhoneNumber"
            value={formData.emergencyContactPhoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="emergencyContactEmail"
            value={formData.emergencyContactEmail}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
        <h3>Medical Center</h3>
        <label>
          Center Name
          <input
            type="text"
            name="medicalCenterName"
            value={formData.medicalCenterName}
            onChange={handleChange}
            placeholder="Center Name"
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="medicalCenterAddress"
            value={formData.medicalCenterAddress}
            onChange={handleChange}
            placeholder="Address"
          />
        </label>
        {showPopup && <PopupMessage message="Thank you for signing up!" onClose={() => setShowPopup(false)} />}
        <button className="sign-up-button" type="submit" onClick={handleSignUpClick}>Sign Up</button>
        <button className="guest-account-button" onClick={handleGuestClick}>Guest Account</button>
      </form>
    </div>
  );
};

export default Account;
