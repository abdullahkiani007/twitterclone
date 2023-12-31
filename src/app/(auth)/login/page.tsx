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
import Footer from "@/component/components/Footer";
const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("login", session?.user?.name);
  const data = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  };

  async function createuser(data: Object) {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // body: data,
    });
    const result = await res.json();
    console.log(result);
  }
  useEffect(() => {
    if (session) {
      createuser(data);
      router.push("/home");
    }
  }, [session]);
  return (
    <div>
      <div className="text-white w-full m-8 h-5/6 lg:flex justify-center items-center">
        <div className="">
          <Image
            src={logo}
            alt="twitter logo"
            className="w-10 lg:w-96 lg:h-96"
          />
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
              <span className="opacity-40">
                By signing up, you agree to the
              </span>{" "}
              <span className="text-blue-400 opacity-100">
                Terms of Service{" "}
              </span>{" "}
              <span className="opacity-40">and</span>{" "}
              <span className="text-blue-400 opacity-100">Privacy Policy</span>{" "}
              <span className="opacity-40">, including </span>
              <span className="text-blue-400 opacity-100">Cookie Use</span>.
            </p>

            <div className="pt-20">
              <h1 className="font-bold text-white">Already have an account?</h1>

              <Link
                href={"/signin"}
                className=" text-blue-400 font-bold bg-black hover:bg-slate-900/70 border border-white rounded-2xl px-24 py-2 text-sm font -bold my-4 flex justify-center "
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap h-fit bottom-0 w-full overflow-hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
