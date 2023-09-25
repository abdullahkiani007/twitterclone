import { NextResponse } from "next/server";
import User from "../../../../models/user";
import connectToDB from "../../../../db/connect";
import { Iuser } from "../../../../types/types";

// verify code sent to email
export async function POST(request: Request) {
    try{
        connectToDB();
        const body =await request.json();
        const {userCode, email} = body;


        const user  = await User.findOne({email: email});

        if(user.verificationCode === userCode){
            user.emailVerified = true;
            user.save();
            
            return NextResponse.json({status:200, message: 'Email Verified'});
        }else{
            return NextResponse.json({status:401, message: 'Wrong Code'});
        }


    }catch(err){
        console.log(err);
    }
}