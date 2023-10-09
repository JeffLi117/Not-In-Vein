"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya } from 'next/font/google';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link';
 
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: '400',
  style: 'normal'
})

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  weight: '400',
  style: 'normal'
})

export default function Navbar() {
    const { user, googleSignIn, userSignOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch(error) {
            console.log(error);
        }
    }

    const handleSignOut = async () => {
        try {
            await userSignOut();
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            setLoading(false);
        }
        checkAuthentication();
    }, [user])

    return (
        <nav className="md:flex items-center justify-between p-2">
            <Link href="/" className={`text-4xl ${alegreya.className}`}>Not In Vein</Link>
            {/* menu icon */}
            <div onClick={() => setOpen(!open)} className="absolute top-4 right-6 cursor-pointer md:hidden">
                {open? 
                <AiOutlineClose className="text-3xl text-gray-800" />
                :
                <FiMenu className=" text-3xl text-gray-800" />
                }
            </div>
            {loading ? null : !user ? 
                (<div className={`md:flex md:items-center md:justify-end md:gap-4  ${open? "block":"hidden"}`}>
                    <button onClick={handleSignIn} className="block md:inline- w-full md:w-fit text-left md:text-center py-1 px-2 rounded-md  hover:text-red-400 hover:border-red-400 hover:border">Login</button>
                    <button onClick={handleSignIn} className="block md:inline-block w-full md:w-fit  text-left md:text-center py-1 px-2 rounded-md  hover:text-red-400 hover:border-red-400 hover:border">Sign Up</button>
                </div>)
            :
                (<div className={`md:flex md:items-center md:justify-end md:gap-4  ${open? "block":"hidden"}`}>
                    <div className="py-1 px-2">Hi, {user.displayName}</div>
                    <Link href="/donate" className="block py-1 px-2 rounded-md hover:bg-red-400 hover:text-white">Donate</Link>
                    <Link href="/profile" className="block py-1 px-2 rounded-md  hover:text-red-400 hover:border-red-400 hover:border">Your Profile</Link>
                    <Link href="/" onClick={handleSignOut} className="block py-1 px-2 rounded-md hover:text-red-400 hover:border-red-400 hover:border">Sign Out</Link>
                </div>) 
            }
        </nav>
    )    
}