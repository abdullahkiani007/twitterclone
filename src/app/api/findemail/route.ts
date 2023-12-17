import { NextResponse } from "next/server";
import User from "../../../../models/user";
import connectToDB from "../../../../db/connect";




export async function POST (request:Request){

    console.log("Request received on api/findemail")
    const {input} = await request.json();
    console.log(input)
    await connectToDB();
    try{
        const user =await User.findOne({email : input})
        console.log("User" , user)
        if (user){
            return NextResponse.json({
                status:200,
                message:"User exists"
            })
        }else{
            return NextResponse.json({
                status:401,
                messsage:"Unauthorized"
            })
        }
        

    }catch(error){
        console.log("Signin error ",error)
        return NextResponse.json({
            status:200,
            message:"No user found"
        })
    }

}