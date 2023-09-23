import { NextResponse } from 'next/server'
import User from '../../../../models/user'; // Import your Mongoose model
// import {clientPromise , connect} from '../../../../db/client';
import connectToDB from '../../../../db/connect';

interface Iuser {
  name: string,
  email: string,
  password: string,
}



export async function POST(request: Request) {

  await connectToDB();
  console.log("POST Request Received on /api/register")

  const body = await request.json();
  // console.log(body);

    try{
      const data = await User.exists({email: body.email});
      const user = await User.find({email:body.email})
      console.log(user);
      
      if(data)
        return NextResponse.json({ message: 'User already exists' })
    }catch(err){
      console.log(err);
    }

  // const newUser = {
  //   name: "Haji Ahmad",
  //   email: "johndoe@example.com",
  //   password: "password123",
  // };

  // try {
  //   // Create a new document and save it to the "users" collection
  //   const user = await new User(newUser).save();
  //   console.log(user);
  // } catch (error) {
  //   console.error('Error creating user:', error);
  // }

  return NextResponse.json({ message: 'Hello from /api/register' })
}
