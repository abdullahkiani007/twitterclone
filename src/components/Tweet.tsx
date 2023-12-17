import Image from "next/image";
import React, { useState } from "react";
import userImg from "../../public/myPic.jpg";
import post from "../../public/post.png";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

interface props {
  name: string;
  id: string;
  tweetID: string;
  userName: string;
  likes: Array<string>;
  avatar: string;
  content: {
    date: string;
    text: string;
    image: string;
  };
}
const Tweet = (Props: props) => {
  const user = { ...Props };
  const date = new Date(user.content.date);
  const [likes, setLikes] = useState(user.likes.length);
  const [likesUsr, setUsrLike] = useState(user.likes);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formatDate = Intl.DateTimeFormat("en-US", options).format(date);

  const handleLike = async () => {
    const data = {
      id: user.id,
      tweetID: user.tweetID,
    };
    const response = await fetch("/api/likeTweet", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(user.likes);

    if (likesUsr.includes(user.id)) {
      setLikes(likes - 1);
      setUsrLike(likesUsr.filter((id) => id !== user.id));
    } else {
      setLikes(likes + 1);
      setUsrLike([...likesUsr, user.id]);
    }

    console.log(user);
    const body = await response.json();
    console.log(body);
  };
  return (
    <div className="p-4 border-b-2 border-gray-400 border-opacity-30 flex ">
      <div className="mb-4 mr-2 md:mb-0 md:mr-4 w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={user.avatar}
          alt="user avatar"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-sm tracking-wider">{user.name}</h2>
          <span className="ml-2 text-gray-500">{user.userName}</span>
          <span className="mx-2 text-gray-500">·</span>
          <span className="text-gray-500">{formatDate}</span>
        </div>

        <p className="text-sm font-normal mb-2">{user.content.text}</p>
        {user.content.image && (
          <div className="w-full">
            <Image
              src={user.content.image}
              alt="post"
              className="object-contain"
            />
          </div>
        )}

        <div className="justify-around flex mt-4 space-x-6 text-gray-500">
          <button>
            <div className="flex items-center hover:text-blue-400">
              <FiMessageCircle className="w-5 h-5" />
              <span className="ml-2">93</span>
            </div>
          </button>
          <button>
            <div className="flex items-center hover:text-green-400">
              <AiOutlineRetweet className="w-5 h-5" />
              <span className="ml-2">1,179</span>
            </div>
          </button>

          {/* LIKE BUTTON */}
          <button onClick={handleLike}>
            <div className="flex items-center hover:text-pink-700 ">
              {likesUsr.includes(user.id) ? (
                <AiFillHeart className="w-5 h-5 text-pink-700 " />
              ) : (
                <AiOutlineHeart className="w-5 h-5 " />
              )}
              <span className="ml-2">{likes}</span>
            </div>
          </button>

          <button>
            <div className="flex items-center">
              <FiUpload className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
