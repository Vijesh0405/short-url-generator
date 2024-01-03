// AccountDetails.jsx
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const AccountDetails = () => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLogout,seIsLogout] = useState(!Cookies.get('accessToken'))
    const handleLogOut = async ()=>{
      Cookies.remove('accessToken')
      Cookies.remove("email")
      Cookies.remove("username")
      Cookies.remove("fullName")
      window.location.href = '/user/login'
    }
    
    useEffect(()=>{
        (async () => {  
            try {
                const config = {
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json', // Specify the content type
                      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
                      // Add other headers as needed
                    },
                  };
                const response = await axios.get(`http://localhost:5000/api/v1/users/get-current-user`,config)
                // console.log(response)
                const user = response?.data?.data
                if(response.data.success)
                {
                   Cookies.set("email",user.email)
                   Cookies.set("fullName",user.fullName)
                   Cookies.set("username",user.username)
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
      !isLogout && (
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
        <p className="text-gray-600">{Cookies.get("fullName")}</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Username:</label>
        <p className="text-gray-600">{Cookies.get("username")}</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Email:</label>
        <p className="text-gray-600">{Cookies.get("email")}</p>
      </div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300" onClick={handleLogOut}>
        Logout
      </button>
      </>
      )
    }
    {
      isLogout && (
       
        <Link to="/user/login" className="mt-56 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
          Login
        </Link>
       
      )
    }
    </div>
  );
};

export default AccountDetails;
