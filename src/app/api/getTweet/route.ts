import {NextResponse} from "next/server"
import Post from "../../../../models/tweet"
import { Iuser } from "../../../../types/types";





export async function GET(request:Request){
    console.log("GET request received on /api/getTweet")

    let posts;
    try{

        posts = await Post.find({}).populate('user');


        if(posts){
            // console.log(posts)

            const newPosts = posts.map((post)=>{
                const obj = {
                    user:post.user.name,
                    content:post.content,
                    likes:post.likes,
                    retweets:post.retweets,
                    createdAt:post.createdAt
                }

                return obj
            })

            console.log(newPosts)
            
            return NextResponse.json({
                status:200,
                posts:newPosts
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