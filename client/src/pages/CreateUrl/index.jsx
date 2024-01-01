import React from 'react'
import Sidebar from '../components/Sidebar'
import CreateFeed from '../components/CreateFeed'

const Create = () => {
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