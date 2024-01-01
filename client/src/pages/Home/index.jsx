// HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AccountDetails from '../components/AccountDetails';

const HomePage = () => {

  return (
   <>
   <div className='flex'>
    <div className="w-56">
    <Sidebar/>
    </div>
    <div className='h-screen w-full'>
    <AccountDetails/>
    </div>
   </div>

   </>
  );
};

export default HomePage;
