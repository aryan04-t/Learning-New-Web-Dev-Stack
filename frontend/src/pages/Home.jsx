import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='w-screen h-screen bg-zinc-900 text-white flex flex-col items-center justify-center gap-8 p-4'>
      
      <div className='w-full text-[50px] sm:text-[100px] flex justify-center items-center text-center'>
        Suppp, Welcome to the My Web App 
      </div>
      
      <div className='w-full text-xl sm:text-3xl text-center'>
        Wanna navigate to Fruits' Page??      
        <Link to={'/fruits-page'}>
          <span className='text-blue-500 hover:text-green-500 pl-2 cursor-pointer'>
            Click Me 
          </span>
        </Link>
      </div>
    
    </div>
  )
}

export default Home