import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import CreateFeed from '../components/CreateFeed'

import { getCookie } from '../utils'

const Create = () => {


  useEffect(() => {
    (async () => {
      // console.log(await getCookie("accessToken"))
      if (!await getCookie("accessToken")) {
        window.location.href = "/user/login"
      }
    })()

  }, [])
  return (
    <div className='flex'>
      <div className="w-56 h-screen">
        <Sidebar />
      </div>
      <div className="h-screen w-full " >
        <CreateFeed />
      </div>



    </div>
  )
}

export default Create