"use client"
import React, {useState} from 'react'

function HamburgerIcon() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="relative group cursor-pointer md:hidden">
      <button className="relative group" onClick={handleClick}>
        <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-red-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md ${isClicked ? 'open' : ''}`}>
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isClicked ? 'group-focus:translate-x-10' : ''}`}></div>
            <div className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${isClicked ? 'group-focus:translate-x-10 delay-75' : ''}`}></div>
            <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isClicked ? 'group-focus:translate-x-10 delay-150' : ''}`}></div>

            <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
            <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0  ${isClicked ? 'group-focus:rotate-45 delay-300' : ''}`}></div>
            <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 ${isClicked ? 'group-focus:-rotate-45 delay-300' : ''}`}></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
  return (
    <div className="relative group">
      <button className="relative group" onClick={handleClick}>
        <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-red-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md ${isClicked ? 'open' : ''}`}>
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isClicked ? 'group-focus:translate-x-10' : ''}`}></div>
            <div className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${isClicked ? 'group-focus:translate-x-10 delay-75' : ''}`}></div>
            <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isClicked ? 'group-focus:translate-x-10 delay-150' : ''}`}></div>

            <div className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${isClicked ? '-translate-x-10 group-focus:translate-x-0' : 'group-focus:w-12'}`}>
              <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 ${isClicked ? 'group-focus:rotate-45' : ''}`}></div>
              <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${isClicked ? 'group-focus:-rotate-45' : ''}`}></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default HamburgerIcon