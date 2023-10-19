import {NextResponse} from "next/server"
import Post from "../../../../models/tweet"




export async function GET(request:Request){
    console.log("GET request received on /api/getTweet")

    let posts;
    try{

        posts = await Post.find({})

        if(posts){
            return NextResponse.json({
                status:200,
                posts
            })
        }else{
            return NextResponse.json({
                status:400,
                posts:"Not found"
            })
        }
    }catch(err)
    {
        console.log(err)
    }

}