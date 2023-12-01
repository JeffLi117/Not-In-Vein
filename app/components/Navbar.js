"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya, Bebas_Neue } from 'next/font/google';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import Not_In_Vein_logo from "../../public/Not_In_Vein_logo.png";
import Image from "next/image";
 
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: '400',
  style: 'normal'
})

const bebas_n = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas_n',
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
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false);
        }
        checkAuthentication();
    }, [user])

    return (
        <nav className="md:flex h-[74px] items-center justify-between p-2 bg-red-500">
            <Link href="/" className={`text-4xl ${bebas_n.className} flex items-center justify-center gap-2`}>
                <Image 
                    className="rounded-lg"
                    src={Not_In_Vein_logo}
                    width={50}
                    height={50}
                    alt="PNG of Not In Vein logo"
                />
                <div className="flex items-center justify-center">
                    Not In Vein
                </div>
            </Link>
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
                    <Link href="/about" className="block md:inline- w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:bg-red-400 hover:text-white border border-transparent">About</Link>
                    <button onClick={handleSignIn} className="block md:inline- w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:border-white border border-transparent">Login</button>
                    <button onClick={handleSignIn} className="block md:inline-block w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:border-white border border-transparent">Sign Up</button>
                </div>)
            :
                (<div className={`md:flex md:items-center md:justify-end md:gap-4 font-semibold ${open? "block":"hidden"}`}>
                    <div className="py-1 px-2">Hi, {user.displayName}</div>
                    <Link href="/about" className="block md:inline- w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:border-white border border-transparent">About</Link>
                    <Link href="/donate" className="block py-1 px-2 rounded-md font-semibold hover:bg-red-400 hover:text-white">Donate</Link>
                    <Link href="/profile" className="block py-1 px-2 rounded-md font-semibold hover:text-white hover:border-white border border-transparent">Your Profile</Link>
                    <Link href="/" onClick={handleSignOut} className="block py-1 px-2 rounded-md font-semibold hover:text-white hover:border-white border border-transparent">Sign Out</Link>
                </div>) 
            }
        </nav>
    )    
}