// AccountDetails.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils';

const AccountDetails = () => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // Specify the content type
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
        // Add other headers as needed
      },
    };

   
    
    const [isLogin,setIsLogIn] = useState(false)
    const handleLogOut = async ()=>{
      try {
        const response  = await axios.post('http://localhost:5000/api/v1/users/logout',{},config)
        if(response.data.success){
          console.log(response.data.message)
          setIsLogIn(false)
          localStorage.clear()
          window.location.href = '/user/login'
          
        }
      } catch (error) {
        console.log("error occured : ",error)
      }
    }
    
    useEffect(()=>{
        (async () => {  
            try {
                setIsLogIn(await getCookie("accessToken"))
                const response = await axios.get(`http://localhost:5000/api/v1/users/get-current-user`,config)
                // console.log(response)
                const user = response?.data?.data
                if(response.data.success)
                {
                   localStorage.setItem("email",user.email)
                   localStorage.setItem("fullName",user.fullName)
                   localStorage.setItem("username",user.username)
                   setUser(user)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        })()
    },[])
  return (
    <div className="flex flex-col items-center pt-[10%] px-6 bg-gray-200 h-screen w-full">
    {
      (isLogin) && (
      <>
       <div className="mb-4">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="rounded-full h-20 w-20 border-2 border-gray-500"
        />
      </div>
      <div className="flex flex-col items-start">
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Full Name:</label>
        <p className="text-gray-600">{localStorage.getItem("fullName")}</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Username:</label>
        <p className="text-gray-600">{localStorage.getItem("username")}</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Email:</label>
        <p className="text-gray-600">{localStorage.getItem("email")}</p>
      </div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300" onClick={handleLogOut}>
        Logout
      </button>
      </>
      )
    }
    {
      !isLogin && (
       
        <Link to="/user/login" className="mt-56 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
          Login
        </Link>
       
      )
    }
    </div>
  );
};

export default AccountDetails;
