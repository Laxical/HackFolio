import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const email = localStorage.getItem('email');
    const otp = localStorage.getItem('otp');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userlogin/resetpassword`, {
                email,
                otp,
                newPassword
            });
            setSuccess('Password reset Succeddfully');
            setError(null);

            localStorage.removeItem('email');
            localStorage.removeItem('otp');

            setTimeout(() => {
                navigate('/signin');
            }, 3000);
        } catch (err) {
            setError('Failed to reset password');
            setSuccess(null);
        }
    };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-md font-medium text-gray-700">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-indigo-500 sm:text-md"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-indigo-500 sm:text-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Reset Password
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}
      {success && (
        <div className="mt-4 text-green-500 text-center">
          {success}
          <div className="alert-box bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2">
            <span className="block sm:inline">Password reset successful. Redirecting to login...</span>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default ResetPassword;
