"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { checkForUserInDb, snapshotUserInformation } from "../firebase/functions";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [firebaseInfo, setFirebaseInfo] = useState({
        uid: null,
        latestDonation: null,
        upcomingDonation: null,
        allDonations: [],
    })

    // const updateWithFirebaseInfo = async (id) => {
    //     console.log(snapshotUserInformation(id));
    // }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const details = getAdditionalUserInfo(result);
            console.log(result);
            console.log(details);
            checkForUserInDb(result.user.uid, result.user.displayName);
            setFirebaseInfo((prevState) => ({
                ...prevState,
                uid: result.user.uid,
            }));
            snapshotUserInformation(result.user.uid, firebaseInfo, setFirebaseInfo);
          })
        // .then(updateWithFirebaseInfo(firebaseInfo.uid))
          .catch((error) => {
            console.log(error);
          });
    }

    const userSignOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser is ", currentUser);
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [user])

    useEffect(() => {
        console.log("firebaseInfo is ", firebaseInfo);
    }, [firebaseInfo])

    return (
        <AuthContext.Provider value={{user, googleSignIn, userSignOut, firebaseInfo, setFirebaseInfo}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}