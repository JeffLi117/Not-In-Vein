import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya } from 'next/font/google';
 
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

export default function Header() {
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
                    <button onClick={handleSignIn}>Login</button>
                    <button onClick={handleSignIn}>Sign Up</button>
                </div>)
            :
                (<div className="flex items-center justify-end gap-4">
                    <div>{user.displayName}</div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>) 
            }
            
        </div>
    )    
}