import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";

import React from "react";

const Explore = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex items-center  rounded-full pl-4 h-18 py-3  w-2/3 bg-gray-800  border-blue-600 text-white hover:border ml-4 mt-2 lg:py-3 ">
        <BiSearch
          className={`mr-2 w-5 h-5 text-gray-500 hover:text-blue-500`}
        />
        Explore
        <input
          type="text"
          placeholder="Search.."
          name="search"
          className="bg-transparent h-full w-full focus:outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default Explore;
