"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";

const Newsfeed = () => {
  const [isSearch, setSearch] = useState(true);

  const pathname = usePathname();
  console.log("pathname", pathname);

  useEffect(() => {
    if (pathname === "/explore" || pathname === "/signin") {
      setSearch(false);
    } else {
      setSearch(true);
    }
  }, [pathname]);

  console.log("News feed got rendered");
  return (
    <div
      className={`hidden md:flex w-80 ml-auto ${
        (pathname === "/login" ||
          pathname === "/signin" ||
          pathname === "/signup") &&
        "hidden"
      }`}
    >
      Newsfeed
      {isSearch && (
        <div className="flex items-center rounded-2xl pl-4 h-8 w-80 bg-gray-800  border-blue-600 text-white hover:border ">
          <BiSearch
            className={`mr-2 w-5 h-5 text-gray-500 hover:text-blue-500`}
          />
          <input
            type="text"
            placeholder="Search.."
            name="search"
            className="bg-transparent h-full w-full focus:outline-none text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default Newsfeed;
