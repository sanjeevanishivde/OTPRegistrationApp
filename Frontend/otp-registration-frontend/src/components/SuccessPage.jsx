
import React from 'react';
import './SuccessPage.css';

const SuccessPage = () => (
  <div className="success-container">
    <img src="/logo.png" alt="Logo" className="success-logo" />
    <h2 className="success-title">Delhi Public School</h2>
    <p className="success-address">Nyati Estate Rd, Pune</p>

    <div className="success-icon">✅</div>
    <p className="success-message">Registration Successful</p>
    <p className="success-fee">Static fee amount: ₹118.00</p>
  </div>
);

export default SuccessPage;

