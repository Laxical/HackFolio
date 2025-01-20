import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectSuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to home or another page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Project Uploaded Successfully!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Your project has been successfully uploaded and is now live. You can view and manage your project in your dashboard.
        </p>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#5f3abd] to-purple-600 text-white font-semibold rounded-full shadow-md transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleGoHome}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProjectSuccessPage;
