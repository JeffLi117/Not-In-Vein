"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya, Bebas_Neue } from 'next/font/google';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import Not_In_Vein_logo from "../../public/Not_In_Vein_logo.png";
import Image from "next/image";
import HamburgerIcon from "./HamburgerIcon";
import { Button, Dropdown, DropdownItem, ToolbarButton, DropdownDivider } from "flowbite-react";
 
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
        <nav className="flex h-[74px] items-center justify-between p-2 bg-red-500">
            <Link href="/" className={`text-4xl ${bebas_n.className} flex items-center justify-center gap-2`}>
                <Image 
                    className="rounded-lg mb-[7px]"
                    src={Not_In_Vein_logo}
                    width={50}
                    height={50}
                    alt="PNG of Not In Vein logo"
                />
                <div className="flex items-center justify-center">
                    Not In Vein
                </div>
            </Link>

            <Dropdown label="" dismissOnClick={true} renderTrigger={() => <span><HamburgerIcon /></span>}>
                {!user ? null : <Dropdown.Item>Hi, {user.displayName}</Dropdown.Item>}
                <Dropdown.Item><Link href="/about">About</Link></Dropdown.Item>
                {!user && <Dropdown.Divider />}
                {!user ? <Dropdown.Item onClick={handleSignIn}>Login</Dropdown.Item> : <Dropdown.Item><Link href="/donate">Donate</Link></Dropdown.Item>}
                {!user ? <Dropdown.Item onClick={handleSignIn}>Sign Up</Dropdown.Item> : <Dropdown.Item><Link href="/profile">Profile</Link></Dropdown.Item>}
                {user && <Dropdown.Divider />}
                {!user ? null : <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>}
            </Dropdown>

            {loading ? null : !user ? 
                (<div className={`md:flex items-center justify-end gap-4 hidden`}>
                    <Link href="/about" className="block md:inline- w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:bg-red-400 hover:text-white border border-transparent">About</Link>
                    <button onClick={handleSignIn} className="block md:inline- w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:border-white border border-transparent">Login</button>
                    <button onClick={handleSignIn} className="block md:inline-block w-full md:w-fit text-left font-semibold md:text-center py-1 px-2 rounded-md hover:text-white hover:border-white border border-transparent">Sign Up</button>
                </div>)
            :
                (<div className={`md:flex items-center justify-end gap-4 font-semibold hidden`}>
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