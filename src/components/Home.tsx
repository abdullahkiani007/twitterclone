
'use client'
import React from 'react'
import avatar from '../../public/myPic.jpg'
import Image from 'next/image'
import Tweet from './Tweet';
import { useSession , signIn} from 'next-auth/react';


const Home = () => {
  const { data : session}  =useSession();

  console.log(session);
  if (session && session.user) {
  return (

    <div className='ml-4 bg-black border-gray-400 border-r-2 border-opacity-30 border-l-2 w-full '>
      <h1 className='mt-2 font-bold'>Home </h1>
      <div className='p-5 border-opacity-30 border-gray-400 border-y-2  flex mt-10'>
      <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
        <Image
          src={avatar}
          alt="user avatar"
          className=" w-full h-full object-center "
          width={55}
          height={50}
        />
      </div>
        <div>
        <input type='text' className='w-full bg-transparent focus:outline-none tracking-wide ' placeholder='What is happening?!'/>
        <button className='bg-sky-400 rounded-2xl px-4 py-1 text-sm font-bold'>Post</button>
        </div>
        
      </div> 
      <Tweet/>
      <Tweet/> 
    </div>
  )
  }else{
    return(
      <h1>Not signed in</h1>
    )
  }
}

export default Home 