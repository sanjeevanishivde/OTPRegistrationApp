import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSummaryPage.css';

const PaymentSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the data passed from FillDetailsPage
  const { firstParent, secondParent, students } = location.state || {};

  const [showPaymentBox, setShowPaymentBox] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // If no data, redirect to fill details page or show message
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

  const handlePaymentSubmit = () => {
    // Simulate payment success
    setTimeout(() => {
      setShowSuccessPage(true);
    }, 1000); // simulate payment delay
  };

  if (showSuccessPage) {
    return (
      <div className="success-page">
        <img src="/success-logo.png" alt="School Logo" />
        <h2>
          <b>Delhi Public School</b>
        </h2>
        <p>
          Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,
          <br />
          Maharashtra 411060
        </p>
        <div style={{ fontSize: '4rem', margin: '20px 0' }}>👍</div>
        <button className="success-btn">Registration Successful</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <img src="/logo.png" alt="School Logo" className="school-logo" />
      <h2 className="payment-heading">Registration PAYMENT</h2>

      {/* Details and Amount */}
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
            placeholder="Card Number"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardInputChange}
          />
          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleCardInputChange}
          />
          <input
            type="password"
            placeholder="CVV"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardInputChange}
          />
          <button onClick={handlePaymentSubmit}>Pay Now</button>
        </div>
      )}
    </div>
  );
};

export default PaymentSummaryPage;
