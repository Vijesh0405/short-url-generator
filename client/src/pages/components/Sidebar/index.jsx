import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=" h-screen flex flex-col bg-gray-800 text-white">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4">
        <span className="text-2xl font-bold">Your Logo</span>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 ms-3">
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-700">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/user/account">Account</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/user/settings">Settings</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/url/create">Create</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/page/about">About Us</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/page/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 text-center border-t border-gray-600">
        <p>ShortUrls</p>
      </div>
    </div>
  );
};

export default Sidebar;