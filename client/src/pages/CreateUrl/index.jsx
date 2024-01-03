import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import CreateFeed from '../components/CreateFeed'
import Cookies from 'js-cookie'

const Create = () => {

  useEffect(()=>{
    if(!Cookies.get('accessToken')){
      window.location.href = "/user/login"
    }
  },[])
  return (
    <div className='flex'>
      <div className="w-56 h-screen">
         <Sidebar/>
      </div>    
    <div className="h-screen w-full " >
       <CreateFeed/>
    </div>
   
   
   
   </div>
  )
}

export default Create