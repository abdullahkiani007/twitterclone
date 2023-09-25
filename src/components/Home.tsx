"use client";
import React, { DOMElement } from "react";
import avatar from "../../public/myPic.jpg";
import Image from "next/image";
import Tweet from "./Tweet";
import { AiOutlinePicture } from "react-icons/ai";
import { useSession, signIn } from "next-auth/react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  function textAreaAdjust(element: any) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
  }

  if (!session) {
    console.log("Pleses sign in", session);
    router.push("/login");
  }
  console.log(session);
  if (session && session.user) {
    return (
      <div className=" w-full pl-2  ">
        <div className="p-5 border-opacity-30 border-gray-400 border-y-2  flex mt-10">
          <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt="user avatar"
              className=" w-full h-full object-center "
              width={55}
              height={50}
            />
          </div>
          <div className="w-full">
            <textarea
              onInput={(e) => {
                textAreaAdjust(e.target);
              }}
              className="w-full bg-transparent focus:outline-none tracking-wide resize-none overflow-hidden h-fit"
              placeholder="What is happening?!"
            />
            <div className="flex items-center">
              <AiOutlinePicture className="w-6 h-6 text-sky-400" />
              <button className="bg-sky-400 rounded-2xl px-4 py-1 text-sm font-bold ml-auto">
                Post
              </button>
            </div>
          </div>
        </div>
        <Tweet />
        <Tweet />
      </div>
    );
  } else {
    return <h1>Not signed in</h1>;
  }
};

export default Home;
