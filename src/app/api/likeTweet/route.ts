import { NextResponse } from "next/server";

export async function POST (request:Request){

    // implement function
    return NextResponse.json({
        message:"Yooo"
    })
}