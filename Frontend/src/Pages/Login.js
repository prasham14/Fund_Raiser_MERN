import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      }, { withCredentials: true });
      console.log(response); // Log the response object  
      if (response && response.data) {

        const token = response.data.token;
        localStorage.setItem('token', token);

      }
      console.log("No response")
      // Set the token in local storage or cookies  
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('userId', response.data._id);
      navigate('/');
      // toast.success("LoggedIn Successfully!");

    } catch (error) {
      setError(error.response.data.message);
      // toast.warning('Login Failed , try again later !')
    }

    // axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true })
    //   .then((res) => {
    //     console.log("hello", " ", res);

    //   }).catch((err) => {
    //     console.log("error");
    //   })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-600">Don't have an account? Sign-in here!</p>
          <button
            type="button"
            onClick={handleSignUp}
            className="mt-2 w-full  hover:underline focus:outline-none"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
