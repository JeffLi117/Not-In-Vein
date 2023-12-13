"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { checkForUserInDb } from "../firebase/functions";
import { doc, onSnapshot, query } from "firebase/firestore"; 
import { firestoreDb } from "../firebase/firebase";
import TokenApi from "../api/TokenApi";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [dynamoDBInfo, setDynamoDBInfo] = useState({
        uid: null,
        latestDonation: null,
        upcomingDonation: null,
        email: null,
        emailSettings: null,
        allDonations: [],
    })

    // set initial id, email, and name within dynamoDBInfo state using Firebase's Google Auth result
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // console.log("result is ", result);
    
            setDynamoDBInfo((prevState) => ({
                ...prevState,
                id: result.user.uid,
                email: result.user.email,
                name: result.user.displayName
            }));
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const userSignOut = () => {
        signOut(auth);
        TokenApi.token = null;
    }

    useEffect(() => {
        // create "listener" for dynamoDB
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // console.log("currentUser is ", currentUser);
            setUser(currentUser);
    
            if (currentUser != null) {
                try {
                    const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
                    // console.log("IdToken is ", idToken);
                    TokenApi.token = idToken;

                    // test if we get data back when new user signs in
                    let gottenUserData = await TokenApi.getUserData(currentUser);

                    // if no data is gotten, add user to DB and then set that to data gotten
                    if(!gottenUserData) {
                        await TokenApi.addUserData(currentUser);
                        gottenUserData = await TokenApi.getUserData(currentUser);
                    } else {
                        console.log(`user already exists`)
                    }
                    console.log("gottenUserData is ", gottenUserData);
                    // setting front-end state to the information from DB
                    setDynamoDBInfo(gottenUserData)
                } catch (err) {
                    console.log(err);
                }
            }
        });
    
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        console.log("dynamoDBInfo has changed, it's now: ", dynamoDBInfo);
    }, [dynamoDBInfo])

    return (
        <AuthContext.Provider value={{user, googleSignIn, userSignOut, dynamoDBInfo, setDynamoDBInfo}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}