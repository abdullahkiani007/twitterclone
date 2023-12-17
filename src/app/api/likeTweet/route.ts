import { NextResponse } from "next/server";
import Post from "../../../../models/tweet";

export async function POST(request: Request) {
  console.log("Request received at like tweet");

  try {
    const { id, tweetID } = await request.json();

    // Find the tweet by ID
    const post = await Post.findById(tweetID);

    if (!post) {
      return NextResponse.json({
        status: 404,
        message: "Tweet not found",
      });
    }

    console.log(post);

    // Get the likes array from the tweet
    let likes = post.likes || [];

    // Check if the user ID is in the likes array
    const index = likes.indexOf(id);

    if (index === -1) {
      // If the user has not liked the tweet, add the like
      likes.push(id);
    } else {
      // If the user has liked the tweet, remove the like
      likes.splice(index, 1);
    }

    // Update the likes array in the tweet document
    post.likes = likes;

    // Save the updated tweet document
    await post.save();

    console.log(post);

    // Respond with success message
    return NextResponse.json({
      status: 200,
      message: "Operation successful",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
