"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { addUserToDb, checkForUserInDb } from "../firebase/functions";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const details = getAdditionalUserInfo(result);
            // console.log(result);
            // console.log(details);
            // addUserToDb(result.user.uid, result.user.displayName)
            checkForUserInDb(result.user.uid, result.user.displayName);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const userSignOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [user])

    return (
        <AuthContext.Provider value={{user, googleSignIn, userSignOut}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}