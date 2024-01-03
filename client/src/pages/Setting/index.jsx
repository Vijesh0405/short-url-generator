import React from 'react'
import SettingsPage from '../components/SettingPage'
import Sidebar from '../components/Sidebar'
const Setting = () => {
  return (
    <div>
      <div className='flex min-h-screen'>
        <div className="w-56">
          <Sidebar />
        </div>
        <div className='h-screen w-full bg-white flex flex-col items-center pt-[20px]'>
          <SettingsPage />
        </div>
      </div>
    </div>
  )
}

export default Setting