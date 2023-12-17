import { NextResponse } from 'next/server'
import User from '../../../../models/user'; // Import your Mongoose model
// import {clientPromise , connect} from '../../../../db/client';
import connectToDB from '../../../../db/connect';
import sendCode from '../../../../services/sendMail';


interface Iuser {
  name: string,
  email: string,
  password: string,
}

function genCode (){
  // generate 4 digit code
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  return code;
}

export async function POST(request: Request) {

  await connectToDB();
  console.log("POST Request Received on /api/register")

  const body = await request.json();
  const code = genCode()
  // console.log(body);
  const newUser = {
    ...body,verificationCode: code,avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1YZuLQXrcuhSLlnGixDD9wEHqCloTUe_KWyQz0N6L0W7fgneXDyxG3_HvoC8nQ3P4CY&usqp=CAU"
  }

    try{
      const data = await User.exists({email: body.email});
      if(data)
        return NextResponse.json({status:401 ,  message: 'User already exists' })
    }catch(err){
      console.log(err);
    }

  
  let user;
  try {
    sendCode(body.email , code);
    // Create a new document and save it to the "users" collection
    user = await new User(newUser).save();
    console.log(user);
  } catch (error) {
    console.error('Error creating user:', error);
  }

  return NextResponse.json({status:200 , message: 'User Created Successfully' , user })
}
