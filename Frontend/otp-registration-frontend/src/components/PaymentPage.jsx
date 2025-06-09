import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { firstParent, secondParent, students } = location.state || {};

  const [showPaymentBox, setShowPaymentBox] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (!firstParent || !secondParent || !students) {
    return (
      <div className="error-message">
        <h2>No registration data found!</h2>
        <p>Please fill in the details before proceeding to payment.</p>
        <button onClick={() => navigate('/')}>Go Back to Details Form</button>
      </div>
    );
  }

  const handleInitiateClick = () => {
    setShowPaymentBox(true);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCard = (cardNumber) => {
    const sanitized = cardNumber.replace(/-/g, '');
    const cardRegex = /^[0-9]{16}$/;
    return cardRegex.test(sanitized);
  };

  const validateExpDate = (expiry) => {
    const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expRegex.test(expiry)) return false;

    const [month, year] = expiry.split('/');
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(`20${year}`, 10);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
  };

  const validateCVV = (cvv) => {
    const cvvRegex = /^[0-9]{3}$/;
    return cvvRegex.test(cvv);
  };

  const handlePaymentSubmit = () => {
    const { cardNumber, expiry, cvv } = cardDetails;

    if (!validateCard(cardNumber)) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    if (!validateExpDate(expiry)) {
      alert('Please enter a valid expiry date (MM/YY), not in the past.');
      return;
    }

    if (!validateCVV(cvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }

    setTimeout(() => {
      setShowSuccessPage(true);
    }, 1000);
  };

  if (showSuccessPage) {
    return (
      <div className="success-wrapper">
        <div className="success-container">
          <img src="/logo.png" alt="School Logo" className="success-logo" />
          <h2 className="success-title">Delhi Public School</h2>
          <p className="success-address">
            Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,<br />
            Maharashtra 411060
          </p>
          <img src="/success.png" alt="Success Icon" className="success-icon" />
          <button className="success-message">Registration Successful</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="center-content">
        <img src="/logo.png" alt="School Logo" className="school-logo" />
        <h2 className="payment-heading">Registration PAYMENT</h2>

        <div className="details-box">
          <div className="entry">
            <span className="icon green">P</span>
            <span className="name">{firstParent.name}</span>
            <span className="id">{firstParent.phone}</span>
            <span className="role">Parent</span>
          </div>

          <div className="entry">
            <span className="icon green">P</span>
            <span className="name">{secondParent.name}</span>
            <span className="id">{secondParent.phone}</span>
            <span className="role">Parent</span>
          </div>

          {students.map((student, index) => (
            <div className="entry" key={index}>
              <span className="icon orange">✓</span>
              <span className="name">{student.firstName}</span>
              <span className="id">{student.dob}</span>
              <span className="role">Student</span>
            </div>
          ))}
        </div>

        <div className="amount-box">
          <div className="amount-row">
            <span>Total Amount (Rs.)</span>
            <span>100.00</span>
          </div>
          <div className="amount-row">
            <span>Tax Amount (Rs.)</span>
            <span>18.00</span>
          </div>
          <div className="amount-row total">
            <span>Grand Total Amount (Rs.)</span>
            <span>118.00</span>
          </div>
        </div>

        {!showPaymentBox ? (
          <button className="initiate-btn" onClick={handleInitiateClick}>
            Initiate The PAYMENT
          </button>
        ) : (
          <div className="card-box">
            <h3>Enter Card Details</h3>
            <input
              type="text"
              placeholder="1111-2222-3333-4444"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              maxLength={19}
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardInputChange}
              maxLength={5}
            />
            <input
              type="password"
              placeholder="CVV"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
              maxLength={3}
            />
            <button onClick={handlePaymentSubmit}>Pay Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
