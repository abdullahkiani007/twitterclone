import React from 'react'
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import { Itweet } from '../../../../types/types';
import { Imuser } from '../../../../types/types';
import Post from '../../../../models/tweet';



export  async function POST(request:Request) {
   
    const body = await request.json();
    console.log(body)

   
    let user ;
    let post;
    try{
        user  = await User.findOne({ email: body.email }) as unknown as Imuser
       
       

        if(user){
            console.log(user)
             // Tweet object
        const tweet:Itweet = {
            content:body.tweet,
            user:user._id,
            likes:[],
            comments:[],
            retweets:[],
            media:""

        }
          post = await new Post(tweet).save()
        }else{
            console.log("User not found")
        }
    }catch(err){
        console.log(err)
    }

  return NextResponse.json({status:200,message:"Request received at /tweet"})
}

