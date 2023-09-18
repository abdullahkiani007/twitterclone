import { NextResponse } from "next/server";

export async function GET(){
    console.log("Reqest Received on /api/products");
    let data = fetch("https://dummyjson.com/products",{
        method:"GET"
    })
    let response = await data.then((res) => res.json());
    console.log(response)

    
  
    // setTimeout(() => {
    //     console.log(data);
        return NextResponse.json({
            "message":"Hello from /api/products",
            "data":response.products
        });
    // }, 3000);
}