import React from 'react'
import { IoIosSearch } from "react-icons/io";

const Dashboard = () => {
  return (
    <>
        <div className='flex bg-gradient-to-t from-violet-900 to-violet-300 h-full w-screen font-mono gap-8 overflow-clip'>
            <div className='w-3xs border-r-2 bg-violet-200/50 border-violet-300 shadow-2xl flex flex-col justify-around items-center backdrop-blur-2xl'>  
                
            </div>
            <div className='flex flex-col justify-between w-full p-4 gap-6 '>
                <div className='bg-violet-200/50 w-full h-fit py-2 px-4 mr-6 mt-6 rounded-2xl flex justify-between backdrop-blur-2xl'>
                    <div className='flex justify-between px-4 gap-1 w-full'>
                        <IoIosSearch className='m-auto'/>
                        <input type="search" className='px-1 w-full text-violet-500/70 bg-transparent placeholder:text-sm placeholder:text-violet-100 placeholder:font-light focus:outline-none focus:ring-0' placeholder='search'/>
                    </div>
                    <button className='rounded-full shadow-md h-12 w-12 bg-violet-400/50 backdrop-blur-2xl text-violet-700 p-4 overflow-clip'></button>
                </div>
                <div className='max-h-fit h-full w-full rounded-2xl py-3 grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className=' bg-violet-300 rounded-2xl h-72'></div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard