"use client"
import React, { useState } from 'react';
import { Alegreya } from 'next/font/google';
import { FaHeart, FaFireAlt, FaClipboardCheck } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  weight: '400',
  style: 'normal'
})

const reasonsToDonate = [
    {id: 1, string: "Improve/save the lives of 3 people.", icon: <FaHeart/>},
    {id: 2, string: "Get a free health screening.", icon: <FaClipboardCheck/>},
    {id: 3, string: "Lower your blood pressure and heart attack risk.", icon: <MdHealthAndSafety/>},
    {id: 4, string: "Burn 500 calories without breaking a sweat.", icon: <FaFireAlt/>},
]

export default function WhyDonate() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleWhy = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-2 md:mb-0">
        <button onClick={() => toggleWhy()} className={`${alegreya.className} border border-transparent w-[200px] rounded-md p-2 bg-red-400 text-white hover:border-black hover:text-black`}>
            {isOpen ? "Close" : "Why donate?"}
        </button>
        {isOpen && 
            <ul className="text-left text-sm md:text-base">
                {reasonsToDonate.map((reason) => {
                  return <li key={reason.id} className="flex flex-row justify-start items-center gap-1 mt-1">{reason.icon} {reason.string}</li>
            })}
        </ul>}
    </div>
  )
}
