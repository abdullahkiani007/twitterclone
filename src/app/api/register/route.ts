import { NextResponse } from 'next/server'
import UserModel from "../../../../db/mongo"; // Import your Mongoose model
import clientPromise from '../../../../db/client';

interface Iuser {
  name: string,
  email: string,
  password: string,
}

export async function POST(request: Request) {
  console.log("POST Request Received on /api/register")

  const body = await request.json();
  console.log(body);

  const client = await clientPromise;
  client.connect();

  const newUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
  };

  try {
    // Create a new document and save it to the "users" collection
    const user = await UserModel.create(newUser);
    console.log(user);
  } catch (error) {
    console.error('Error creating user:', error);
  }

  return NextResponse.json({ message: 'Hello from /api/register' })
}
