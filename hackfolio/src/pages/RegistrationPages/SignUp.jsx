import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignUp.css'

const SignUp = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userlogin/signup`, {
        email,
        password,
        username,
        firstName,
        lastName
      });

      console.log(response);
      // If successful, handle the success
      setSuccess('User created successfully!');
      navigate('/signin');
      setError(null);
    } catch (err) {
      // Handle errors
      setError('Error signing up. Please try again.');
      setSuccess(null);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Main container with reduced width and max width constraints */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Sign Up Form */}
        <div className="w-1/2 p-8">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Create your account</h2>
            <p className="text-center mb-6 text-sm text-gray-500">Start sharing your projects today!</p>
            <form onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Username"
                />
              </div>

              {/* First Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="First Name"
                />
              </div>

              {/* Last Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Last Name"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Email address"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Password (minimum 6 characters)"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Error and Success Messages */}
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
          </div>
        </div>

        {/* Right side - Welcome Section */}
        <div className="w-1/2 bg-[#6366f1] text-white flex items-center justify-center p-8 relative overflow-hidden">
          {/* Animated Wave */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[150px] transform rotate-180 animate-wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#2dd4bf"
              fillOpacity="1"
              d="M0,128L48,106.7C96,85,192,43,288,42.7C384,43,480,85,576,128C672,171,768,213,864,202.7C960,192,1056,128,1152,122.7C1248,117,1344,171,1392,213.3L1440,256V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
              className='animate-linear-move'
            ></path>
            <circle cx='300' cy='170' r='150' fill='#172554' className='animate-bounce' style={{animationDuration:"3.5s"}}></circle>
            <circle cx='200' cy='300' r='100' fill='#facc15' className='animate-bounce'style={{animationDuration:"3.0s"}}></circle>
          </svg>

          {/* Content */}
          <div className="text-center z-10">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6 text-lg">
              Sign in with your personal details to keep connected with your projects.
            </p>
            <button
              className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-gray-900"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;