import React from 'react';
import 'animate.css';

import { useNavigate } from 'react-router-dom';

const SponsorSuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to home or another page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-100 to-indigo-200">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-teal-600 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Sponsor Request Sent Successfully!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Your request has been sent successfully. You can view and manage your status in your dashboard.
        </p>
        <button
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-full shadow-md transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300"
          onClick={handleGoHome}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SponsorSuccessPage;
