import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  
  const email = localStorage.getItem('email'); // Retrieve the email stored earlier

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send OTP and email to the backend for verification
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userlogin/verifyotp`, { email, otp });
      setSuccess('OTP verified successfully');
      setError(null);

      // Store OTP in localStorage for resetting the password later
      localStorage.setItem('otp', otp);

      // Redirect to the password reset page
      navigate('/resetpassword');
    } catch (err) {
      setError('Invalid OTP');
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-md font-medium text-gray-700">OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-indigo-500 sm:text-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-green-500 text-center">{success}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
