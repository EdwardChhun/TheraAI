import React, { useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Account = () => {
  const navigate = useNavigate();

  const handleSignUpClick = (e) => {
    e.preventDefault();
    alert("Thank you for signing up!");
    console.log(JSON.stringify(formData));
    localStorage.setItem('userData', JSON.stringify(formData));
  };

  const handleGuestClick = () => {
      navigate('/Home');
  };

  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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
  };

  return (
    <div className="account-container">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <h1>Your Profile</h1>
      <form className="account-form" onSubmit={handleSubmit}>
      <h3>Personal Details</h3>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Required"
            class="resizedTextbox"
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Required"
            class="resizedTextbox"
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Optional"
            class="resizedTextbox"
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
            placeholder="Required"
            class="resizedTextbox"
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="emergencyContactPhoneNumber"
            value={formData.emergencyContactPhoneNumber}
            onChange={handleChange}
            placeholder="Required"
            class="resizedTextbox"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="emergencyContactEmail"
            value={formData.emergencyContactEmail}
            onChange={handleChange}
            placeholder="Optional"
            class="resizedTextbox"
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
            placeholder="Required"
            class="resizedTextbox"
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="medicalCenterAddress"
            value={formData.medicalCenterAddress}
            onChange={handleChange}
            placeholder="Required"
            class="resizedTextbox"
          />
        </label>
        <button className="sign-up-button" type="submit" onClick={handleSignUpClick}>Sign Up</button>
        <button className="guest-account-button" onClick={handleGuestClick}>Guest Account</button>
      </form>
    </div>
  );
};

export default Account;
