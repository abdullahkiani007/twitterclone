import { NextResponse } from "next/server";
import User from "../../../../models/user";
import connectToDB from "../../../../db/connect";




export async function POST (request:Request){

    console.log("Request received on api/VerifyPass")
    const input = await request.json();
    await connectToDB();
    console.log(input)
    try{
        const user =await User.findOne({email : input.email})
        console.log("User password : ",user.password, " User input : ",input.password)
        if (user.password === input.password){
            return NextResponse.json({
                status:200,
                message:"Login Success"
            })
        }else{
            return NextResponse.json({
                status:401,
                message:"Unauthorized"
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