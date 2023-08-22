import Image from 'next/image'
import { ImHome2 , ImSearch } from "react-icons/im";
import { IconContext } from "react-icons";
import React from 'react'
import Link from 'next/link'
import twitterlogo from '../../public/logo-twitter-png-5860.png'

const Sidebar = () => {
  return (
    <div className=' mx-4 flex  w-full   h-full    min-[1250px]:ml-60 text-white bg-purple-900'>
      <div className=''>
      <Image className='w-10 align-right mb-8' src={twitterlogo} alt='twitter logo'/>

        <Link href="/home">
        <div className='flex items-center mb-4 hover:cursor-pointer h-10'>
          <div>
          <ImHome2 style={{ fontSize: '24px' }}/>
          </div>
          <div className='hidden lg:flex'>
          <h1 className='font-bold text-lg  ml-4 '>Home</h1>
          </div>
        </div>
        </Link>

        <Link href="/explore">
        <div className='flex items-center mb-4 hover:cursor-pointer h-10'>
          <div>
          <ImSearch style={{ fontSize: '24px' }}/>
          </div>
          <div className='hidden lg:flex'>

          <h1 className='font-bold text-lg  ml-4 '>Explore</h1>
          </div>
        </div>
        </Link> 

        
      </div>
        
    </div>
  )
}

export default Sidebar

