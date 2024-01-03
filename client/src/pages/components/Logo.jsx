import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-red-400 rounded-full mr-2 flex items-center justify-center text-white font-bold text-xl">S</div>
      <span className="text-xl font-semibold">Generate shortest url using <span className='text-red-400'>ShortUrls</span></span>
    </div>
  );
};

export default Logo;