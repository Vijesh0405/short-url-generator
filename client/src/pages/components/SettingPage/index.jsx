// SettingsPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const SettingsPage = () => {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    email: `${Cookies.get("email")}`,
    fullName: `${Cookies.get("fullName")}`
  });
  const [success, setSuccess] = useState(false);
  const [accsuccess, setAccSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [accerror, setAccError] = useState(null);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleEditAccount = () => {
    setIsEditingAccount(!isEditingAccount);
  };

  const handleConfirmAccount = async () => {
    // Implement logic to update account details
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // Specify the content type
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
        // Add other headers as needed
      },
    };
    try {
      const response = await axios.patch('http://localhost:5000/api/v1/users/change-account-details', accountDetails, config)
      console.log(response)
      
      if (response.data.success) {
        setAccSuccess(true)
        //update Cookies
        Cookies.set("email",accountDetails.email)
        Cookies.set('fullName',accountDetails.fullName)
        console.log('Account details updated:', response.data?.data);
      }
    } catch (error) {
      setAccError("email is already taken")
      setAccountDetails({
        email: Cookies.get("email"),
        fullName: Cookies.get("fullName"),
      });
    }
   finally{
    setIsEditingAccount(false);
   }
    
  };

  const handlePasswordReset = async () => {
    // Implement logic to reset password
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // Specify the content type
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
        // Add other headers as needed
      },
    };
    try {
      const response = await axios.patch('http://localhost:5000/api/v1/users/change-password', passwordForm, config)
      console.log(response)
      console.log('Resetting password:', passwordForm);
      if (response.data.success) {
        setSuccess(true)
      }
    } catch (error) {
      setError("old password is not correct")
    }
    // Clear the form after handling
    finally {
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value,
    });
    setError(null)
    setSuccess(false)
    setAccError(null)
    setAccSuccess(false)
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    setError(null)
    setSuccess(false)
    setAccError(null)
    setAccSuccess(false)
  };

  return (
    <div className="p-4 w-[50%] ">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Update Account Details Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Account Details</h2>
        {accsuccess && (
          <div className="mb-3 text-green-500">
            Account details updated successfully!!
          </div>
        )}
        {accerror && (
          <div className="mb-3 text-red-500">
            {accerror}
          </div>
        )}
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="text"
            name="email"
            value={accountDetails.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded ${isEditingAccount ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            readOnly={!isEditingAccount}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={accountDetails.fullName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded ${isEditingAccount ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            readOnly={!isEditingAccount}
          />
        </div>
        <button
          onClick={isEditingAccount ? handleConfirmAccount : handleEditAccount}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300`}
        >
          {isEditingAccount ? 'Confirm' : 'Edit Details'}
        </button>
      </div>

      {/* Change Password Section */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        {success && (
          <div className="mb-3 text-green-500">
            Password changed successfully!!
          </div>
        )}
        {error && (
          <div className="mb-3 text-red-500">
            {error}
          </div>
        )}
        <div className="flex flex-col">
          <label className="text-sm font-bold mb-2">Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordForm.oldPassword}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded bg-gray-200"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-sm font-bold mb-2">New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded bg-gray-200"
          />
        </div>

        <button
          onClick={handlePasswordReset}
          className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300 mb-2`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;