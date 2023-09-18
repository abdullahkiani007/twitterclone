import { NextResponse } from 'next/server'

export async function POST(request:Request) {

    console.log("POST Request Received on /api/register")

    const body = await request.json();
    console.log(body);
    
  return NextResponse.json({ message: 'Hello from /api/register' })
}