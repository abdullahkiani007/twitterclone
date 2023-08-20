'use client'

import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { signOut } from "next-auth/react"

function SigninButton() {
    const { data : session}  =useSession();

    if (session && session.user) {
        return (
            <div>
                <p>{session.user.name}</p>
                <button onClick={()=>signOut()}>Sign out</button>
            </div>  
        )
    }
  return (
    
    <div>
        <button onClick={()=>signIn()}>Sign in</button>
    </div>
  )
}

export default SigninButton