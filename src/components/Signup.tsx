"use client";

import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { redirect, useRouter } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { userSchema } from "../../Schema/userSchema";
import { signIn } from "next-auth/react";

import { User } from "../../Schema/userSchema";
import Input from "./Input";
import { set } from "mongoose";

function Signup() {
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: userSchema,

      onSubmit: (values) => {
        console.log(values);
      },
    });

  const [minor, setMinor] = useState(true);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState(values.name);
  const [email, setEmail] = useState(values.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [step, setStep] = useState(1);
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);

  useEffect(() => {
    // console.log(values);
    setName(values.name);
    setEmail(values.email);
    setPassword(values.password);
    setConfirmPassword(values.confirmPassword);
  }, [{ ...values }]);

  const calAge = new Date().getFullYear() - Number(selectedYear);

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
    // setName(values.name);
    // alert(values.name);
    setIsNameFocused(true);
  };

  const handleNameBlur = () => {
    if (name === "") {
      setIsNameFocused(false);
    }
  };

  const handleEmailFocus = () => {
    // setEmail(values.email);
    // alert(values.email);
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    if (email === "") {
      setIsEmailFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };
  const handlePasswordBlur = () => {
    if (password === "") {
      setIsPasswordFocused(false);
    }
  };
  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };
  const handleConfirmPasswordBlur = () => {
    if (confirmPassword === "") {
      setIsConfirmPasswordFocused(false);
    }
  };

  const handleCodeFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("Sending request");
    if (step === 4) {
      const data = {
        name,
        email,
        password,
        age: calAge,
      };
      console.log("clicked");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(await response.json());
    } else if (step == 5) {
      const data = {
        userCode: code1 + code2 + code3 + code4,
        email,
      };
      console.log("Clicked : ", data);

      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(await response.json());
      let res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("X .... ", res);
      if (!res?.error) {
        router.push("/home");
        e.preventDefault();
      } else {
        setStep(5);
      }
    }
  };

  function handleDisableButton() {
    if (selectedDay && selectedMonth && selectedYear && calAge < 13) {
      return true;
    } else if (errors.name || errors.email) {
      return true;
    } else if (
      name === "" ||
      email === "" ||
      selectedDay === "" ||
      selectedMonth === "" ||
      selectedYear === ""
    ) {
      return true;
    } else if (
      (code1 === "" || code2 === "" || code3 === "" || code4 === "") &&
      step === 5
    ) {
      return true;
    }

    return false;
  }

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
              {/* name input */}
              <div className="relative ">
                <input
                  type="text"
                  className={`bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16 ${
                    isNameFocused || name ? "pt-6" : ""
                  } ${
                    touched.name && errors.name
                      ? "border-red-500 outline-red-700"
                      : ""
                  } `}
                  // placeholder="Name"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onFocus={handleNameFocus}
                  onBlur={handleBlur}
                />

                <label
                  className={`absolute left-2 bottom-7 transition-all transform ${
                    isNameFocused || name ? "-translate-y-6 text-xs" : ""
                  } ${isNameFocused ? "text-primary" : "text-gray-500"} ${
                    touched.name && errors.name ? "text-red-500" : ""
                  }`}
                >
                  Name
                </label>
              </div>
              {errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
              {/* <Input
                values
                handleBlur
                handleChange
                touched
                errors
                name="name"
                isNameFocused
                handleNameFocus
              /> */}
              <div className="relative ">
                {/* Email Input */}
                <input
                  type="email"
                  className={`bg-transparent border border-white w-full my-3 py-4 h-16 rounded-sm border-opacity-20 pl-2 ${
                    isEmailFocused || email ? "pt-6" : ""
                  }`}
                  // placeholder="Email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onFocus={handleEmailFocus}
                  onBlur={handleBlur}
                />
                <label
                  className={`absolute left-2 bottom-7 transition-all transform ${
                    isEmailFocused || email ? "-translate-y-6 text-xs" : ""
                  } ${isEmailFocused ? "text-primary" : "text-gray-500"}
                  ${touched.email && errors.email ? "text-red-500" : ""}
                  `}
                >
                  Email
                </label>
              </div>
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
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
              {selectedDay && selectedMonth && selectedYear && calAge < 13 && (
                <div className="text-sm text-red-500 ">
                  You should be atleast 13 years old to use this app
                </div>
              )}
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

          {/* Step 4 */}
          <form className={` ${step != 4 && "hidden"}`}>
            <div className="py-6 pr-4 mb-3">
              {/* Confirm Password */}
              <div className="relative ">
                <input
                  type={`${checked ? "text" : "password"}`}
                  className={`bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16 ${
                    isPasswordFocused || password ? "pt-6" : ""
                  } ${
                    touched.password && errors.password
                      ? "border-red-500 outline-red-700"
                      : ""
                  } `}
                  // placeholder="Name"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handleBlur}
                />

                <label
                  className={`absolute left-2 bottom-7 transition-all transform ${
                    isPasswordFocused || password
                      ? "-translate-y-6 text-xs"
                      : ""
                  } ${isPasswordFocused ? "text-primary" : "text-gray-500"} ${
                    touched.password && errors.password ? "text-red-500" : ""
                  }`}
                >
                  Password
                </label>
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
              <input
                type="checkbox"
                id="showPassword"
                className=" checked:bg-blue-500 border border-gray-400 w-4 h-4 rounded-md"
                // onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   if (e.target.checked) {
                //   }
                // }}
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
              <label htmlFor="showPassword" className="ml-2 text-gray-700">
                Show password
              </label>
              <div className="relative ">
                <input
                  type="password"
                  className={`bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16 ${
                    isConfirmPasswordFocused || confirmPassword ? "pt-6" : ""
                  } ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 outline-red-700"
                      : ""
                  } `}
                  // placeholder="Name"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleBlur}
                />

                <label
                  className={`absolute left-2 bottom-7 transition-all transform ${
                    isPasswordFocused || password
                      ? "-translate-y-6 text-xs"
                      : ""
                  } ${
                    isConfirmPasswordFocused ? "text-primary" : "text-gray-500"
                  } ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Confirm Password
                </label>
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </form>

          {/* Step 5 */}
          <form className={` ${step != 5 && "hidden"}`}>
            <h1>Enter the Verification code sent to </h1>
            <p className="text-sm text-blue-500">{email}</p>
            <div className="py-6 pr-4 mb-3">
              {/* Confirm Code */}
              <div className="flex">
                <input
                  type="text"
                  maxLength={1}
                  className="bg-transparent text-center border border-gray-500 mr-4 text-white font-bold w-10 h-10"
                  value={code1}
                  onChange={(e) => {
                    setCode1(e.target.value);
                  }}
                />
                <input
                  type="text"
                  maxLength={1}
                  className="bg-transparent text-center border border-gray-500 mr-4 text-white font-bold w-10 h-10"
                  value={code2}
                  onChange={(e) => {
                    setCode2(e.target.value);
                  }}
                />
                <input
                  type="text"
                  maxLength={1}
                  className="bg-transparent text-center border border-gray-500 mr-4 text-white font-bold w-10 h-10"
                  value={code3}
                  onChange={(e) => {
                    setCode3(e.target.value);
                  }}
                />
                <input
                  type="text"
                  maxLength={1}
                  className="bg-transparent text-center border border-gray-500 mr-4 text-white font-bold w-10 h-10"
                  value={code4}
                  onChange={(e) => {
                    setCode4(e.target.value);
                  }}
                />
              </div>
              {invalidCode && <p>Invalid Code . Please try Again.</p>}
            </div>
          </form>
        </div>
      </div>

      {/* SignUP button */}
      <div className="mr-4 h-full flex align-bottom pb-6">
        <button
          className="mt-auto py-3 bg-gray-200 text-black rounded-3xl w-full font-bold disabled:bg-gray-500 "
          disabled={handleDisableButton()}
          onClick={(e) => {
            setStep(step + 1);
            handleClick(e);
          }}
        >
          {step === 4 ? "Sign Up" : step === 5 ? "Verify" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
