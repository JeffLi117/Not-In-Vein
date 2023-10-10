import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { firestoreDb } from "./firebase";

export const addUserToDb = async (userId, name) => {
    await setDoc(
        doc(firestoreDb, "users", userId), 
        { name: name, latestDonation: null, upcomingDonation: null, allDonations: [] });
}

export const mergeUserToDb = async (userId, name) => {
    const userRef = doc(firestoreDb, "users", userId);
    setDoc(
        userRef, 
        { name: name, latestDonation: null, upcomingDonation: null, allDonations: [] },
        { merge: true });
}

export const checkForUserInDb = async (userId, name) => {

    const userRef = doc(firestoreDb, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        // mergeUserToDb(userId, name);
    } else {
        // userSnap.data() will be undefined in this case
        addUserToDb(userId, name);
        console.log("No such user!");
    }
}

export const addRecentDonation = async (recentDate, userId) => {
    await updateDoc(doc(firestoreDb, "users", userId), {
        latestDonation: recentDate,
    });
}

export const addUpcomingForRecent = async (upcomingDate, userId) => {
    await updateDoc(doc(firestoreDb, "users", userId), {
        upcomingDonation: upcomingDate,
    });
}