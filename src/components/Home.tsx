"use client";
import React, { useState } from "react";
import avatar from "../../public/myPic.jpg";
import Image from "next/image";
import Tweet from "./Tweet";
import { AiOutlinePicture } from "react-icons/ai";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Itweet } from "../../types/types";
import Head from "next/head";
import Script from "next/script";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Home = () => {
  const { data: session } = useSession();
  const [tweet, setTweet] = useState("");
  const [posts, setPosts] = useState<Itweet[]>([]);
  const [refresh, setRefresh] = useState(true);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const router = useRouter();

  async function getPosts() {
    try {
      const response = await fetch("/api/getTweet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await response.json();

      if (body.status === 200) {
        console.log(body.posts);
        setPosts(body.posts);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // setInterval(() => {
  //   getPosts();
  // }, 5000);

  useEffect(() => {
    if (session) {
      getPosts();
      console.log(posts);
    }
  }, [refresh]);

  function textAreaAdjust(element: any) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
  }

  function generateRandom() {
    const result: any[] = [];

    while (result.length < 4) {
      const randomNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
      if (!result.includes(randomNumber)) {
        result.push(randomNumber);
      }
    }

    return result.join("");
  }
  async function handlePost() {
    console.log(session!.user?.email);
    try {
      const tweetData = {
        tweet,
        email: session!.user?.email,
      };
      console.log("Tweet data ", tweetData);
      const response = await fetch("api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetData),
      });
      getPosts();
      setRefresh(true);
      setTweet("");
    } catch (e) {}
  }

  if (!session) {
    console.log("Please sign in", session);
    router.push("/login");
  }

  console.log("Session: ", session, "\nPosts: ", posts);

  const startListening = () => {
    alert("Started");
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    alert("Stopped");
    setTweet(transcript);
    console.log("Transcript ....", transcript);
  };
  useEffect(() => {
    const eventHandlers = {
      onEnd: () => {
        console.log("Speech recognition ended");
      },
      onError: (event: { error: any }) => {
        console.error("Speech recognition error:", event.error);
      },
    };

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
      ...eventHandlers,
    });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  if (session && session.user) {
    return (
      <div className="w-full pl-2">
        <Script strategy="afterInteractive">
          {`
        (function (d, s, id) {
          var js,
            el = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.async = true;
          js.src =
            "https://s3.ap-south-1.amazonaws.com/conferbot.defaults/dist/v1/widget.min.js";
          js.id = id;
          js.charset = "UTF-8";
          el.parentNode.insertBefore(js, el);
          // Initializes the widget when the script is ready
          js.onload = function () {
            var w = window.ConferbotWidget("657740bbb3d7f38922ae9c26", "live_chat");
          };
        })(document, "script", "conferbot-js");
      `}
        </Script>

        <div className="p-5 border-opacity-30 border-gray-400 border-y-2  flex mt-10">
          <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt="user avatar"
              className="w-full h-full object-center"
              width={55}
              height={50}
            />
          </div>

          <div className="w-full">
            <textarea
              onInput={(e) => {
                textAreaAdjust(e.target);
              }}
              value={`${transcript} ${tweet}`}
              onChange={(e) => setTweet(e.target.value)}
              className="w-full bg-transparent focus:outline-none tracking-wide resize-none overflow-hidden h-fit"
              placeholder="What is happening?!"
            />
            <div className="flex items-center">
              <AiOutlinePicture className="w-6 h-6 text-sky-400" />
              <button
                className="bg-sky-400 rounded-2xl px-4 py-1 text-sm font-bold ml-2"
                onClick={startListening}
              >
                Start Listening
              </button>
              <button
                className="bg-sky-400 rounded-2xl px-4 py-1 text-sm font-bold ml-2"
                onClick={stopListening}
              >
                Stop Listening
              </button>
              <button
                className="bg-sky-400 rounded-2xl px-4 py-1 text-sm font-bold ml-auto"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {posts.map((item) => {
          // console.log("item", item);
          const user = {
            name: item.user,
            tweetID: item.tweetID,
            id: item.id,
            likes: item.likes,
            userName: item.user + generateRandom(),
            avatar: "",
            content: {
              date: item.createdAt,
              text: item.content,
              image: "",
            },
          };
          return <Tweet {...user} />;
        })}
      </div>
    );
  } else {
    return <h1>Not signed in</h1>;
  }
};

export default Home;
