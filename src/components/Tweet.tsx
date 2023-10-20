import Image from "next/image";
import React from "react";
import userImg from "../../public/myPic.jpg";
import post from "../../public/post.png";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

interface props {
  name: string;
  userName: string;
  avatar: string;
  content: {
    date: string;
    text: string;
    image: string;
  };
}
const Tweet = (Props: props) => {
  const user = { ...Props };

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
          <span className="text-gray-500">{user.content.date}</span>
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
          <button>
            <div className="flex items-center hover:text-pink-700">
              <AiOutlineHeart className="w-5 h-5" />
              <span className="ml-2">15.1k</span>
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
