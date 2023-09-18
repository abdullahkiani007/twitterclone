"use client";

import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";
import { set } from "mongoose";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [step, setStep] = useState(1);

  const date = `${selectedMonth} ${selectedDay},${selectedYear}`;
  // Define lists of options for months, days, and years
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const router = useRouter();

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const years = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = () => {
    if (name === "") {
      setIsNameFocused(false);
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    if (email === "") {
      setIsEmailFocused(false);
    }
  };

  const handleClick = async () => {
    const data = {
      name,
      email,
      date: `${selectedMonth}/${selectedDay}/${selectedYear}`,
    };
    console.log("clicked");
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="bg-black text-white w-full p-4 px-8 flex flex-col h-full md:max-w-2xl  md:rounded-xl md:px-20 ">
      <div className="h-0">
        {step === 1 ? (
          <IoCloseSharp
            onClick={() => {
              setStep(0);
              router.back();
            }}
            className="text-2xl -translate-x-16 hover:cursor-pointer hover:bg-slate-800 rounded-full"
          />
        ) : (
          <IoMdArrowRoundBack
            onClick={() => {
              setStep(step - 1);
              // router.back();
            }}
            className="text-2xl -translate-x-7 md:-translate-x-16 hover:cursor-pointer hover:bg-slate-800 rounded-full"
          />
        )}
      </div>

      <div className="">
        <h1 className="font-bold text-xl ml-7">Step {step} of 5</h1>
        {/* form */}
        <div className="mt-8 h-fit mb-8">
          <form className={` ${step != 1 && "hidden"}`}>
            <h1 className="font-bold text-2xl">Create your account</h1>

            <div className="py-6 pr-4 mb-3">
              <div className="relative ">
                <input
                  type="text"
                  className={`bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16 ${
                    isNameFocused || name ? "pt-6" : ""
                  }`}
                  // placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleNameFocus}
                  onBlur={handleNameBlur}
                />
                <label
                  className={`absolute left-2 bottom-7 transition-all transform ${
                    isNameFocused || name ? "-translate-y-6 text-xs" : ""
                  } ${isNameFocused ? "text-primary" : "text-gray-500"}`}
                >
                  Name
                </label>
              </div>

              <div className="relative ">
                <input
                  type="email"
                  className={`bg-transparent border border-white w-full my-3 py-4 h-16 rounded-sm border-opacity-20 pl-2 ${
                    isEmailFocused || email ? "pt-6" : ""
                  }`}
                  // placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                />
                <label
                  className={`absolute left-2 bottom-7 transition-all transform ${
                    isEmailFocused || email ? "-translate-y-6 text-xs" : ""
                  } ${isEmailFocused ? "text-primary" : "text-gray-500"}`}
                >
                  Email
                </label>
              </div>
            </div>

            <h3 className="text-sm font-bold mb-2">Date of birth</h3>
            <p className="text-sm opacity-50">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div>
              <div className="flex space-x-2 mt-4">
                {/* Month Selector */}

                <div className=" relative rounded-lg mr-2  h-16 border border-gray-800 py-6 px-2 hover:border-blue-700">
                  <label className="text-gray-600 text-xs  absolute top-2 ">
                    Month
                  </label>
                  <select
                    className="px-2  rounded-md shadow-sm    flex-grow bg-transparent w-20 md:w-36"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="" className="left-2 text-green-800"></option>

                    {months.map((month, index) => (
                      <option
                        className="bg-black text-white"
                        key={index}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Day Selector */}

                <div className=" relative rounded-lg mr-2 h-16 border border-gray-800 py-6 px-2 hover:border-blue-700">
                  <label className="text-gray-600 text-xs  absolute top-2 ">
                    Day
                  </label>
                  <select
                    className=" bg-transparent  rounded-md shadow-sm  w-16 p-2"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    <option value=""></option>
                    {days.map((day, index) => (
                      <option
                        className="bg-black text-white"
                        key={index}
                        value={day}
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Year Selector */}

                <div className=" relative rounded-lg mr-2 h-16 border border-gray-800 py-6 px-2 hover:border-blue-700">
                  <label className="text-gray-600 text-xs  absolute top-2 ">
                    year
                  </label>
                  <select
                    className=" bg-transparent rounded-md shadow-sm    w-20"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">
                      <label className="bottom-2"></label>
                    </option>
                    {years.map((year, index) => (
                      <option
                        className="bg-black text-white"
                        key={index}
                        value={year}
                      >
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>

          {/* Step 2 */}
          <div className={` ${step != 2 && "hidden"}`}>
            <h1 className="font-bold text-2xl md:text-3xl ">
              Customize your experience
            </h1>
            <h2 className="font-bold text-lg mt-10">
              Track where you see X content across the web
            </h2>
            <p className="text-sm mt-5 mr-2 text-gray-300">
              X uses this data to personalize your experience. This web browsing
              history will never be stored with your name, email, or phone
              number.
            </p>
            <p className="text-sm text-gray-600 mt-8 hover:cursor-text">
              By signing up, you agree to our{" "}
              <span className="text-blue-500 hover:cursor-pointer">Terms</span>,{" "}
              <span className="text-blue-500 hover:cursor-pointer">
                Privacy Policy
              </span>
              , and{" "}
              <span className="text-blue-500 hover:cursor-pointer">
                Cookie Use
              </span>
              . X may use your contact information, including your email address
              and phone number for purposes outlined in our Privacy Policy.
              <span className="text-blue-500 hover:cursor-pointer">
                {" "}
                Learn more
              </span>
            </p>
          </div>
          {/* Step 3 */}
          <form className={` ${step != 3 && "hidden"}`}>
            <h1 className="font-bold text-2xl">Create your account</h1>

            <div className="py-6 pr-4 mb-3">
              <div
                onClick={() => {
                  setStep(1);
                }}
                className={`hover:cursor-pointer bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16  `}
              >
                <p className="text-sm text-gray-500 w-fit -translate-y-2">
                  Name
                </p>
                <div className="-translate-y-2 pr-2 flex justify-between items-center">
                  <p>{name}</p>
                  <AiFillCheckCircle className="text-green-500" />
                </div>
              </div>

              <div
                onClick={() => {
                  setStep(1);
                }}
                className={`hover:cursor-pointer bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16  `}
              >
                <p className="text-sm text-gray-500 w-fit -translate-y-2">
                  Email
                </p>
                <div className="-translate-y-2 pr-2 flex justify-between items-center">
                  <p>{email}</p>
                  <AiFillCheckCircle className="text-green-500" />
                </div>
              </div>
              <div
                onClick={() => {
                  setStep(1);
                }}
                className={`hover:cursor-pointer bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16  `}
              >
                <p className="text-sm text-gray-500 w-fit -translate-y-2">
                  Date
                </p>
                <div className="-translate-y-2 pr-2 flex justify-between items-center">
                  <p>{date}</p>
                  <AiFillCheckCircle className="text-green-500" />
                </div>
              </div>
              <p className="text-sm  text-gray-500 hover:cursor-text">
                By signing up, you agree to the{" "}
                <span className="text-blue-500 hover:cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-500 hover:cursor-pointer">
                  Privacy
                </span>
                Policy, including{" "}
                <span className="text-blue-500 hover:cursor-pointer">
                  Cookie Use
                </span>
                . Twitter may use your contact information, including your email
                address and phone number for purposes outlined in our Privacy
                Policy, like keeping your account secure and personalizing our
                services, including ads.
                <span className="text-blue-500  hover:cursor-pointer">
                  Learn more
                </span>
                . Others will be able to find you by email or phone number, when
                provided, unless you choose otherwise
                <span className="text-blue-500 hover:cursor-pointer">
                  {" "}
                  here
                </span>
                .
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="mr-4 h-full flex align-bottom pb-6">
        <button
          className="mt-auto py-3 bg-gray-200 text-black rounded-3xl w-full font-bold"
          onClick={() => {
            setStep(step + 1);
            handleClick();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Signup;
