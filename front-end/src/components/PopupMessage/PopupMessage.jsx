import React from 'react';
import './PopupMessage.css';

const PopupMessage = ({ message }) => {
  return (
    <div className="popup-message">
      <div className="popup-content">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default PopupMessage;