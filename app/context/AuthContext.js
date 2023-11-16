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
        allDonations: [],
    })

    // const updateWithFirebaseInfo = async (id) => {
    //     console.log(snapshotUserInformation(id));
    // }

    const googleSignIn = () => {
        console.log('google signin run');
        //  all we need from here is getting uid, email, displayname?
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const details = getAdditionalUserInfo(result);
            console.log("result is ", result);
            // console.log(details);
            // checkForUserInDb is for Firebase
            // checkForUserInDb(result.user.uid, result.user.displayName, result.user.email);
            
            // TokenApi.getUserData(result.user.uid)
            //     .then((res) => {
            //         console.log(res);
            //         if(!res) {
            //             TokenApi.addUserData(result.user)
            //         } else {
            //             console.log(`user already exists with id of ${res.id}`)
            //         }
            //     })
              
            // TokenApi.token = someFirebaseToken;
            // TokenApi.getUserData(123);
            setDynamoDBInfo((prevState) => ({
                ...prevState,
                id: result.user.uid,
                email: result.user.email,
                name: result.user.displayName
            }));
            // snapshotUserInformation(result.user.uid, firebaseInfo, setFirebaseInfo);
          })
        // .then(updateWithFirebaseInfo(firebaseInfo.uid))
          .catch((error) => {
            console.log(error);
          });
    }

    // let snapshotUserInfoUnsubscribe;

    // const snapshotUserInformation = (userId, stateObj, stateFxn) => {
    //     snapshotUserInfoUnsubscribe = onSnapshot(doc(firestoreDb, "users", userId), (doc) => {
    //         console.log("Current data: ", doc.data());
    //         stateFxn((stateObj) => ({
    //             ...stateObj,
    //             latestDonation: doc.data().latestDonation,
    //             upcomingDonation: doc.data().upcomingDonation,
    //             allDonations: doc.data().allDonations,
    //         }))
    //     });
    // }

    // const cancelSnapshotListener = () => {
    //     off(snapshotUserInfoUnsubscribe)
    // }

    const userSignOut = () => {
        signOut(auth);
        TokenApi.token = null;
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("currentUser is ", currentUser);
            setUser(currentUser);
    
            if (currentUser != null) {
                // console.log("Getting the IdToken");
                try {
                    const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
                    // console.log("IdToken is ", idToken);
                    TokenApi.token = idToken;
                    // test if we get data back when new user sign in. Since returnValues added to register route now
                    let gottenUserData = await TokenApi.getUserData(currentUser);
                    if(!gottenUserData) {
                        await TokenApi.addUserData(currentUser);
                        gottenUserData = await TokenApi.getUserData(currentUser);
                    } else {
                        console.log(`user already exists`)
                    }
                    console.log("gottenUserData is ", gottenUserData);
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