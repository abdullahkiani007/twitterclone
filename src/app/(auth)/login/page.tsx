"use client";

// working on signup page

import React from "react";
import logo from "../../../../public/twitter-login.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("login", session);
  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session]);
  return (
    <div className="text-white w-full m-8 lg:flex justify-center items-center">
      <div className="">
        <Image src={logo} alt="twitter logo" className="w-10 lg:w-96 lg:h-96" />
      </div>
      <div className="">
        <h1 className="font-bold text-5xl mt-16">Happening now</h1>
        <h2 className="font-bold text-2xl mt-10">Join today.</h2>

        <div className=" w-80">
          <button
            onClick={() => signIn("google")}
            className=" text-black bg-white rounded-2xl px-16 py-2 text-sm font -bold my-4 flex justify-center "
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            Sign Up with Google
          </button>
          <div className="flex items-center">
            <hr className="w-36 opacity-20" />
            <p className="mx-2 text-sm">or</p>
            <hr className="w-36 opacity-20" />
          </div>
          <Link
            href={"/signup"}
            className=" text-white font-bold bg-blue-400 rounded-2xl px-24 py-2 text-sm font -bold my-4 flex justify-center "
          >
            Create Account
          </Link>
          <p className="text-xs tracking-normal">
            <span className="opacity-40">By signing up, you agree to the</span>{" "}
            <span className="text-blue-400 opacity-100">Terms of Service </span>{" "}
            <span className="opacity-40">and</span>{" "}
            <span className="text-blue-400 opacity-100">Privacy Policy</span>{" "}
            <span className="opacity-40">, including </span>
            <span className="text-blue-400 opacity-100">Cookie Use</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
