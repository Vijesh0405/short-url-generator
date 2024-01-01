// SignUpForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {validate} from 'email-validator'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add your signup logic here
    setLoading(true);
    if([formData.username,formData.email,formData.password,formData.fullName].some((value)=>value?.trim()==="")){
      setError("All fields are required")
      return 
    }
    if(!validate(formData.email)){
      setError("Please enter email in correct format")
      return
    }
    try {
      // Replace the URL with your backend API endpoint for signup
      const response = await axios.post('http://localhost:5000/api/v1/users/register', formData);
      console.log('Signup successful:', response.data);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError("email or username already exists")
      console.log(error)

    } finally {
      setLoading(false);
    }
    console.log('Form submitted:', formData);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        {success && (
          <div className="mb-4 text-green-500">
            Signup successful! You can now <Link to="/user/login">login</Link>.
          </div>
        )}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="w-full border rounded px-3 py-2 text-gray-700"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border rounded px-3 py-2 text-gray-700"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="w-full border rounded px-3 py-2 text-gray-700"
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
          type="submit"
          onClick={handleSubmit}
        >
          {loading?"Signing Up":"Sign Up"}
        </button>
        <p className="mt-4 text-gray-600">
        Already have an account?{' '}
        <Link to="/user/login" className="text-blue-500">
          Log in here
        </Link>
      </p>
      </form>
      
    </div>
  );
};

export default SignUpForm;
