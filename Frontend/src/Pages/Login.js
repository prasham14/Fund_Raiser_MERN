import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      }, { withCredentials: true });

      if (response && response.data) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', response.data.user.id);
        navigate('/');
      }
      setIsLoading(false);

    } catch (error) {

      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {
        isLoading ? (null) : (
          <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-full">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
            <form className="mt-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Type Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {error && <div className="text-red-500 text-center">{error}</div>} {/* Display error here */}

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
              >
                Login
              </button>

              <p className="mt-4 text-center text-gray-600">Don't have an account? Sign-up here!</p>
              <button
                type="button"
                onClick={handleSignUp}
                className="mt-2 w-full hover:underline focus:outline-none"
              >
                SignUp
              </button>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default Login;
