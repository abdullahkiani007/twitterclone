import React from 'react'
import Sidebar from '@/component/components/Sidebar'
import Home from '@/component/components/Home'
import Newsfeed from '@/component/components/Newsfeed'


const page = () => {
    return (
        <div className="flex w-full bg-black text-white h-full ">
          {/* <div className="flex lg:flex-grow border-r-2">
            <Sidebar />
          </div> */}
       
            <Home />
         
          {/* <div className="hidden w-1/3 md:flex   ">
            <Newsfeed />
          </div> */}
        </div>
      );
}

export default page