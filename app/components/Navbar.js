"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya } from 'next/font/google';
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
        <div className="flex items-center justify-between p-2">
            <div className={`text-4xl ${alegreya.className}`}>Not In Vein</div>
            {loading ? null : !user ? 
                (<div className="flex items-center justify-end gap-4">
                    <button onClick={handleSignIn} className="py-1 px-2 rounded-md  hover:text-red-400 hover:border-red-400 hover:border">Login</button>
                    <button onClick={handleSignIn} className="py-1 px-2 rounded-md  hover:text-red-400 hover:border-red-400 hover:border">Sign Up</button>
                </div>)
            :
                (<div className="flex items-center justify-end gap-4">
                    <div className="px-2">{user.displayName}</div>
                    <Link href="/donate" className="py-1 px-2 rounded-md hover:bg-red-400 hover:text-white"> Donate </Link>
                    <button onClick={handleSignOut} className="py-1 px-2 rounded-md hover:text-red-400 hover:border-red-400 hover:border">Sign Out</button>
                </div>) 
            }
            
        </div>
    )    
}