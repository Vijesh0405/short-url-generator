import React from 'react'
import Sidebar from '../components/Sidebar'

const About = () => {
    return (
        <div className='flex'>
            <div className="w-56">
                <Sidebar/>
            </div>
            <div className='w-full h-screen bg-white text-black text-2xl'> 
            About us
            </div>
        </div>
    )
}

export default About