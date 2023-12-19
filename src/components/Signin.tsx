"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import logo from "../../public/logo-twitter-png-5860.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface responsetype {
  status: number;
  message: string;
}
function Signin() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setisFocused] = useState(false);
  const [ispassFocused, setisPassFocused] = useState(false);
  const [step, setStep] = useState(1);
  const [showPass, setShowpass] = useState(false);

  const handleFocus = () => {
    setisFocused(true);
  };
  const handlePassFocus = () => {
    setisPassFocused(true);
  };

  const handleBlur = () => {
    if (userInput === "") {
      setisFocused(false);
    }
  };
  const handlePassBlur = () => {
    if (password === "") {
      setisPassFocused(false);
    }
  };

  async function handleSignin() {
    if (step === 1) {
      let response: any;
      try {
        response = await fetch("api/findemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: userInput,
          }),
        });

        response.json().then((result: any) => {
          console.log("Fulfilled");
          console.log(result);
          if (result.status === 200) {
            console.log("step", step);
            setStep(step + 1);
            console.log(step);
          } else {
            console.log("yoo");
            console.log(result.status === 200);
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else if (step === 2) {
      console.log("email", userInput);
      const data = {
        email: userInput,
        password,
      };
      let response: any;
      try {
        response = await fetch("api/verifyPass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        });

        response.json().then((result: any) => {
          if (result.status === 200) {
            signIn();
            router.push("/home");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="bg-black text-white w-full p-4 px-8 flex flex-col h-full md:max-w-2xl  md:rounded-xl md:px-20">
      <div className="flex justify-between w-1/2">
        <button
          className="font-bold text-sm"
          onClick={() => {
            router.back();
          }}
        >
          X
        </button>
        <Image src={logo} alt="twitter logo" className="w-10" />
      </div>

      <div className="mt-28  mx-10">
        <h1 className="font-bold text-xl">Sign in to Twitter</h1>

        <div
          className={`mx-9  border-white overflow-hidden ${
            step === 1 ? "block" : "hidden"
          }`}
        >
          {/* Google Provider button */}
          <button
            onClick={() => signIn("google")}
            className=" text-black bg-white rounded-2xl  w-full  py-2 text-sm font -bold my-8 flex justify-center "
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            Sign Up with Google
          </button>

          <div className="flex items-center">
            <hr className="w-32 opacity-20" />
            <p className="mx-2 text-sm">or</p>
            <hr className="w-32 opacity-20" />
          </div>

          {/* Input */}
          <div className="relative px-2 mb-3">
            <input
              type="text"
              className={`bg-transparent border outline-none  w-full my-3 py-3 rounded-sm border-opacity-20 pl-2 h-14 ${
                isFocused || userInput
                  ? "pt-6 border-blue-400/100 "
                  : "border-white"
              } 
            
              `}
              // ${
              //   touched.name && errors.name
              //     ? "border-red-500 outline-red-700"
              //     : ""
              // }
              // placeholder="Name"
              name="name"
              id="name"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label
              className={`    text-sm absolute left-4 bottom-7 transition-all transform ${
                isFocused || userInput
                  ? "-translate-y-5 text-xs text-blue-500"
                  : "text-gray-500"
              }`}
              htmlFor="name"
              // ${
              //   touched.name && errors.name
              //     ? "border-red-500 outline-red-700"
              //     : ""
              // }
            >
              phone, email or username
            </label>
          </div>

          <button
            className=" py-1 bg-gray-200 text-black text-sm rounded-3xl w-full font-bold disabled:bg-gray-500 "
            disabled={false}
            onClick={handleSignin}
          >
            Next
          </button>
        </div>

        <div
          className={`mx-9  border-white overflow-hidden ${
            step === 2 ? "block" : "hidden"
          }`}
        >
          <div className="relative px-2 mb-3">
            <input
              type="text"
              className={`bg-transparent border outline-none text-gray-400  w-full my-3 py-3 rounded-sm border-opacity-20 pl-2 h-14`}
              name="name"
              id="name"
              placeholder={userInput}
              // disabled={true}
              onClick={() => {
                setStep(step - 1);
                console.log("too go back");
              }}
            />

            <label
              className={`    text-sm absolute left-4 bottom-7 transition-all transform ${
                isFocused || userInput
                  ? "-translate-y-5 text-xs text-blue-500"
                  : "text-gray-500"
              }`}
              htmlFor="name"
            >
              Email
            </label>
          </div>

          <div className="relative px-2 mb-3">
            <input
              type={`${showPass ? "text" : "password"}`}
              className={`bg-transparent border outline-none  w-full my-3 py-3 rounded-sm border-opacity-20 pl-2 h-14 ${
                ispassFocused || password
                  ? "pt-6 border-blue-400/100 "
                  : "border-white"
              } 
            
              `}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handlePassFocus}
              onBlur={handlePassBlur}
            />

            <label
              className={`    text-sm absolute left-4 bottom-14 transition-all transform ${
                ispassFocused || password
                  ? "-translate-y-5 text-xs text-blue-500"
                  : "text-gray-500"
              }`}
              htmlFor="name"
            >
              Password
            </label>
            <input
              id="check"
              type="checkbox"
              onChange={() => setShowpass(!showPass)}
            />
            <label htmlFor="check">Show password</label>
          </div>

          <button
            className=" py-1 bg-gray-200 text-black text-sm rounded-3xl w-full font-bold disabled:bg-gray-500 "
            disabled={password ? false : true}
            onClick={handleSignin}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
