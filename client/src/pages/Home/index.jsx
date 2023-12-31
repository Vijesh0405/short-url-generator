// HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AccountDetails from '../components/AccountDetails';

const HomePage = () => {
  // const [userData, setUserData] = useState({
  //   username: 'example_user',
  //   email: 'user@example.com',
  //   avatar: 'https://placekitten.com/100/100',
  // });

  // const [settings, setSettings] = useState({
  //   newPassword: '',
  //   newUsername: '',
  //   newAvatar: '',
  // });

  // const [showPasswordForm, setShowPasswordForm] = useState(false);
  // const [showUserDetailsForm, setShowUserDetailsForm] = useState(false);
  // const [showAvatarForm, setShowAvatarForm] = useState(false);

  // const handleSettingsChange = (e) => {
  //   const { name, value } = e.target;
  //   setSettings((prevSettings) => ({
  //     ...prevSettings,
  //     [name]: value,
  //   }));
  // };

  // const handleSetPassword = () => {
  //   setShowPasswordForm(true);
  // };

  // const handleSetUserDetails = () => {
  //   setShowUserDetailsForm(true);
  // };

  // const handleSetAvatar = () => {
  //   setShowAvatarForm(true);
  // };

  // const handleLogout = () => {
  //   console.log('Logging out...');
  //   // Implement your logout logic here
  // };

  // const handleGenerateShortUrl = () => {
  //   console.log('Generating short URL...');
  //   // Implement your short URL generation logic here
  // };

  return (
   <>
   <div className='flex'>
    <Sidebar/>
    <AccountDetails/>
   </div>

   </>
  );
};

export default HomePage;
