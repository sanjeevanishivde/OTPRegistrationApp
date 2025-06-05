import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import OTPLogin from './components/OTPLogin';
import WelcomePage from './components/WelcomePage';
import FillDetailsPage from './components/FillDetailsPage';
import PaymentSummaryPage from './components/PaymentSummaryPage';

function App() {
  const navigate = useNavigate();

  const handleVerified = (mobile) => {
    navigate('/welcome', { state: { mobile } });
  };

  return (
    <Routes>
      <Route path="/" element={<OTPLogin onVerified={handleVerified} />} />
      <Route path="/welcome" element={<WelcomeWrapper />} />
      <Route path="/fill-details" element={<FillDetailsPage />} />
      <Route path="/payment" element={<PaymentSummaryPage />} />
    </Routes>
  );
}

const WelcomeWrapper = () => {
  const location = useLocation();
  const mobile = location.state?.mobile;

  if (!mobile) return <div>Missing mobile number</div>;

  return <WelcomePage mobile={mobile} />;
};

export default App;
