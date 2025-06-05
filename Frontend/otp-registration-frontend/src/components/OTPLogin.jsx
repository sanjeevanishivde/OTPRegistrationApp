import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './OTPLogin.css';

const OTPLogin = ({ onVerified }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOTP] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [timer, setTimer] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [errors, setErrors] = useState({ mobile: '', otp: '', general: '' });
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    dob: '',
    regMobile: '',
    role: '',
  });

  const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);
  const isValidOTP = (otp) => /^\d{6}$/.test(otp);

  const generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleGenerate = () => {
    if (!isValidMobile(mobile)) {
      setErrors({ ...errors, mobile: 'Mobile number must be 10 digits' });
      return;
    }
    const newOTP = generateRandomOTP();
    setGeneratedOTP(newOTP);
    alert(`Your OTP is: ${newOTP}`);
    setTimer(45);
    setErrors({ mobile: '', otp: '', general: '' });
    setResendCount(0);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    if (resendCount >= 3 || !isValidMobile(mobile)) return;
    const newOTP = generateRandomOTP();
    setGeneratedOTP(newOTP);
    alert(`Your new OTP is: ${newOTP}`);
    setResendCount(resendCount + 1);
    setTimer(45);
  };

  const handleValidate = () => {
    if (!isValidMobile(mobile)) {
      setErrors({ ...errors, mobile: 'Mobile number must be 10 digits' });
      return;
    }
    if (!isValidOTP(otp)) {
      setErrors({ ...errors, otp: 'OTP must be 6 digits' });
      return;
    }
    if (otp === generatedOTP) {
      setErrors({ mobile: '', otp: '', general: '' });
      onVerified(mobile);
    } else {
      setErrors({ ...errors, general: 'Invalid OTP. Please try again.' });
    }
  };

  // Auto-fill mobile in registration form when form is shown
  useEffect(() => {
    if (showRegistration) {
      setRegistrationData((prev) => ({ ...prev, regMobile: mobile }));
    }
  }, [showRegistration, mobile]);

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { name, dob, regMobile, role } = registrationData;
    if (!name || !dob || !/^\d{10}$/.test(regMobile) || !role) {
      alert('Please fill in all registration fields correctly.');
      return;
    }

    try {
      console.log("Sending registration data:", registrationData);

      const response = await axios.post('http://localhost:8080/api/register', {
        name,
        dob,
        regMobile,
        role
      });

      alert('Registration successful! You can now log in.');
      setShowRegistration(false);
      setMobile(regMobile); // auto-fill mobile field
      setOTP('');
      setGeneratedOTP(null);
      setErrors({ mobile: '', otp: '', general: '' });
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed: ' + (error.response?.data || 'Please try again.'));
    }
  };

  return (
    <div className="otp-container">
      <img src="/logo.png" alt="Logo" className="otp-logo" />
      <h2 className="otp-title">Delhi Public School</h2>
      <p className="otp-address">Nyati Estate Rd, Nyati County, Pune</p>

      {!showRegistration ? (
        <>
          <input
            placeholder="Enter Mobile No"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="otp-input"
          />
          {errors.mobile && <p className="otp-error">{errors.mobile}</p>}

          <button onClick={handleGenerate} className="otp-button otp-button-blue">
            Generate OTP
          </button>

          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="otp-input"
          />
          {errors.otp && <p className="otp-error">{errors.otp}</p>}

          <button onClick={handleValidate} className="otp-button otp-button-blue">
            Validate OTP
          </button>

          {timer > 0 ? (
            <p className="otp-resend otp-red">Resend OTP in {timer}s</p>
          ) : (
            resendCount < 3 && (
              <button
                className={`otp-resend ${resendCount === 0 ? 'otp-green' : 'otp-red'}`}
                onClick={handleResend}
              >
                Resend OTP
              </button>
            )
          )}
          {errors.general && <p className="otp-error">{errors.general}</p>}

          <p className="otp-register-link" onClick={() => setShowRegistration(true)}>
            Not Registered? <span style={{ color: 'blue', cursor: 'pointer' }}>Register Here</span>
          </p>
        </>
      ) : (
        <div className="otp-registration-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={registrationData.name}
            onChange={handleRegistrationChange}
            className="otp-input"
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={registrationData.dob}
            onChange={handleRegistrationChange}
            className="otp-input"
          />
          <input
            type="text"
            name="regMobile"
            placeholder="Mobile Number"
            value={registrationData.regMobile}
            onChange={handleRegistrationChange}
            className="otp-input"
          />
          <input
            type="text"
            name="role"
            placeholder="Role (e.g. Student, Parent)"
            value={registrationData.role}
            onChange={handleRegistrationChange}
            className="otp-input"
          />

          <button onClick={handleRegister} className="otp-button otp-button-green">
            Register
          </button>

          <p className="otp-register-link" onClick={() => setShowRegistration(false)}>
            Already Registered? <span style={{ color: 'blue', cursor: 'pointer' }}>Go Back</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default OTPLogin;
