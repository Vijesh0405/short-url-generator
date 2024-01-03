import React from 'react'
import Sidebar from '../components/Sidebar'

const Contact = () => {
    return (
        <div className='flex'>
            <div className="w-56">
                <Sidebar/>
            </div>
            <div className='w-full h-screen bg-white text-black text-2xl'> 
            Contact
            </div>
        </div>
    )
}

export default Contact