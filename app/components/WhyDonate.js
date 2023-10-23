"use client"
import React, { useState } from 'react';
import { Alegreya } from 'next/font/google';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  weight: '400',
  style: 'normal'
})

const reasonsToDonate = [
    {id: 1, string: "Improve/save the lives of 3 people.", icon: null},
    {id: 2, string: "Get a free health screening.", icon: null},
    {id: 3, string: "Lower your blood pressure and heart attack risk.", icon: null},
    {id: 4, string: "Burn 500 calories without breaking a sweat.", icon: null},
]

export default function WhyDonate() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleWhy = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4">
        <button onClick={() => toggleWhy()} className={`${alegreya.className} border border-transparent w-[120px] rounded-md p-2 bg-red-400 text-white hover:border-black hover:text-black`}>
            {isOpen ? "Close" : "Why donate?"}
        </button>
        {isOpen && 
            <ul className="text-left">
                {reasonsToDonate.map((reason) => {
                    return <li key={reason.id}>{reason.string}</li>
            })}
        </ul>}
    </div>
  )
}
