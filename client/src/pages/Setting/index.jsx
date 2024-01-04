import React, { useEffect } from 'react'
import SettingsPage from '../components/SettingPage'
import Sidebar from '../components/Sidebar'
import { getCookie } from '../utils'
const Setting = () => {
  useEffect(() => {
    (async ()=>{
      if (!await getCookie('accessToken')) {
        window.location.href = "/user/login"
      }
    })()
  }, [])
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