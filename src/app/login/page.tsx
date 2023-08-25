'use client'

import React from 'react'
import logo from "../../../public/twitter-login.png"
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter();
    const { data : session}  =useSession();
    console.log("login" , session)
    useEffect(() => {
        if (session) {
            router.push('/home')
        }
    },[session])
  return (
    <div className='text-white w-full m-8 lg:flex justify-center items-center'>
      

      <div className='border border-white'>
        <Image src={logo} alt='twitter logo' className='w-10 lg:w-96 lg:h-96' />
        
      </div>
        <div className='border border-white'>
        <h1 className='font-bold text-5xl mt-16'>Happening now</h1>
        <h2 className='font-bold text-2xl mt-10'>Join today.</h2>
        
            <button onClick={() => signIn('google')} className="bg-red-500 text-white w-full">Sign In</button>
        </div>
    </div>
  )
}

export default Login