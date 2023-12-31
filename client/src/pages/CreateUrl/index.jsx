import React from 'react'
import Sidebar from '../components/Sidebar'
import CreateFeed from '../components/CreateFeed'

const Create = () => {
  return (
    <div className='inline-flex w-full items-center'>
      <div className="w-56 h-screen">
         <Sidebar/>
      </div>
    
    <div className="h-screen "style={{ width: 'calc(100vw - 224px)' }}>
       <CreateFeed/>
    </div>
   
   
   
   </div>
  )
}

export default Create