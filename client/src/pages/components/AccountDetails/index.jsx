// AccountDetails.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const AccountDetails = () => {
    const [user,setUser] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
                console.log(response)
                const user = response?.data?.data
                if(response.data.success)
                {
                   setUser(user)
                }
            else{
                <h1 className='text-red-700'>
                    Error
                </h1>
            }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    
    
        })()
    },[])
  return (
    <div className="flex flex-col items-center pt-[10%] px-6 bg-gray-200 h-screen w-full">
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
        <p className="text-gray-600">{user.fullName}</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Username:</label>
        <p className="text-gray-600">{user.username}</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <label className="text-lg font-semibold">Email:</label>
        <p className="text-gray-600">{user.email}</p>
      </div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default AccountDetails;
