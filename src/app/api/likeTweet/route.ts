import { NextResponse } from "next/server";

export async function POST (request:Request){

    console.log("Request received at like tweet")
    const body = await request.json()

    // get likes of that tweet from user 
    // also fetch the tweet id
    // store like in the likes array of tweet
    // if like already exist don't store it
    console.log(body)
    // implement function
    return NextResponse.json({
        message:"Yooo"
    })
}