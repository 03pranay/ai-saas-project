import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-url[(/client/public/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen '>
        <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create Amazing Content<br/> With<span className='bg-primary'>AI TOOLS</span> </h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Unleash the power of AI to generate stunning visuals and text effortlessly.</p>
        </div>
        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
          <button onClick={() => navigate('/ai')} className='bg-primary cursor-pointer text-white py-2 px-4 rounded-md'>Start creating now</button>
          <button onClick={() => navigate('/learn-more')} className='border cursor-pointer border-gray-300 text-gray-700 py-2 px-4 rounded-md'>Learn more</button>
        </div>
        <div className='flex item-center gap-4 mt-8 mx-auto text-gray-600'>
          <img src={assets.user_group} className='h-8'/>Trusted by 10k+ people
        </div>
    </div>
  )
}

export default Header