'use client'

import Image from 'next/image'
import { ImHome2 , ImSearch } from "react-icons/im";
import { IconContext } from "react-icons";
import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import twitterlogo from '../../public/logo-twitter-png-5860.png'
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Sidebar = () => {

  const pathname = usePathname();
  const { data : session}  =useSession();

  const router = useRouter();
  const [isClicked , setClicked] = useState(false);
  if (!session){
    router.push("/login")
  }

  return (
    <div className={`mx-2 md:mx-4 flex mt-2 h-full min-[1250px]:ml-60 text-white bg-black ${pathname === "/login" && 'hidden'}`}>
      <div className='flex flex-col w-16 md:w-64'>
        <div className='flex items-center  p-4'>
          <Image className='w-8 h-8' src={twitterlogo} alt='twitter logo'/>
        </div>

        <Link href="/home">
          <div className='flex items-center mb-2 md:mb-4 hover:bg-blue-500 hover:text-white p-2 rounded-lg cursor-pointer'>
            <ImHome2 className='w-6 h-6 md:w-8 md:h-8' />
            <span className='hidden md:block ml-2 font-semibold text-lg'>Home</span>
          </div>
        </Link>

        <Link href="/explore">
          <div className='flex items-center mb-2 md:mb-4 hover:bg-blue-500 hover:text-white p-2 rounded-lg cursor-pointer'>
            <ImSearch className='w-6 h-6 md:w-8 md:h-8' />
            <span className='hidden md:block ml-2 font-semibold text-lg'>Explore</span>
          </div>
        </Link>

        <div className='mt-auto'>
        {isClicked && (
            <div className='md:absolute md:right-0 mt-2 md:w-48 bg-black border border-gray-300 p-2 rounded-md shadow-md'>
              <button className='text-white' onClick={()=>signOut()}>Logout as {session?.user?.name}</button>
            </div>
          )}
          <div className='flex items-center p-4  hover:text-white cursor-pointer' onClick={() => setClicked(!isClicked)}>
            <Image src={session?.user?.image as string} alt="User" className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
            <div className='hidden md:block ml-2'>
              <h1 className='font-semibold text-base'>{session?.user?.name}</h1>
              <h1 className='text-sm text-gray-500'>{`@${session?.user?.email?.split('@')[0]}`}</h1>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Sidebar

