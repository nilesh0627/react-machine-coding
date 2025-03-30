import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CountryMatchingGame from './country-matching-game';
import OTPVerification from './otp-verification';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProgressBars from './progress-bars';

const RouteComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/country-matching-game" element={<CountryMatchingGame />} />\
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/progress-bars" element={<ProgressBars />} />
    </Routes>
  </BrowserRouter >
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteComponent />
  </StrictMode>,
)
