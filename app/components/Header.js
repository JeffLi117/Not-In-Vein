import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

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
        <div>
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