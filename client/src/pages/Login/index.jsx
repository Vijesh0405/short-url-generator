// LoginForm.js
import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Cookie from 'js-cookie'
import axios from 'axios';
const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    setError(null)
    setLoading(true)
    try {
        const response = await axios.post("http://localhost:5000/api/v1/users/login",loginData,)
        console.log(response)
        const {user,refreshToken,accessToken} = await response.data.data
        console.log(refreshToken," ",accessToken," ",user)
        localStorage.setItem('refreshToken',refreshToken)
        localStorage.setItem('accessToken',accessToken)
        Cookie.set("refreshToken",refreshToken)
        Cookie.set("accessToken",accessToken)
        navigate('/')
        setSuccess(true)
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        setError("login failed , please check credentials");
      }
    finally{
        setLoading(false)
    }
    // Add your login logic here
    console.log('Login data:', loginData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        {success && (
          <div className="mb-4 text-green-500">
            Signup successful! You can now <Link to="/">login</Link>.
          </div>
        )}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameOrEmail">
            Username or Email
          </label>
          <input
            className="w-full border rounded px-3 py-2 text-gray-700"
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={loginData.usernameOrEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex justify-between border rounded px-3">
          <input
            className="w-full  py-2 text-gray-700 outline-none"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
           <button
            type="button"
            onClick={handleTogglePassword}
            className="w-5 h-5 top-0 right-0 mt-2 mr-2 text-gray-500 cursor-pointer"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
          type="submit"
          onClick={handleSubmit}
        >
          {loading?"Loging In..":"Log In"}
        </button>
        <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500">
          Sign up here
        </Link>
      </p>
      </form>
      
    </div>
  );
};

export default LoginForm;
