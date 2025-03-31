import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import CountryMatchingGame from './country-matching-game/CountryMatchingGame.jsx';
import OTPVerification from './otp-verification/OTPVerfication.jsx';
import FileExplorer from './file-explorer/FileExplorer.jsx';
import ProgressBars from './progress-bars/ProgressBars.jsx';

import './index.css';

const RouteComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/country-matching-game" element={<CountryMatchingGame />} />\
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/progress-bars" element={<ProgressBars />} />
      <Route path="/file-explorer" element={<FileExplorer />} />
    </Routes>
  </BrowserRouter >
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteComponent />
  </StrictMode>,
)
