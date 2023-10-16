import { doc, onSnapshot, setDoc, getDoc, getDocs, updateDoc, collection } from "firebase/firestore"; 
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
        // mergeUserToDb(userId, name); *MERGE for future changes?
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

export const checkUpcomingDonation = async (userId) => {
    const userRef = doc(firestoreDb, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && userSnap.data().upcomingDonation !== null) {
        console.log("userSnap has an upcomingDonation");
        return userSnap.data().upcomingDonation.toDate();
    } else if (userSnap.exists() && userSnap.data().upcomingDonation == null) {
        console.log("In checkUpcomingDonation, user upcomingDonation is null.");
        return null;
    } else {
        console.log("Weird -- in checkUpcomingDonation, user doesn't exist");
        return null;
    }
}

export const checkRecentDonation = async (userId) => {

}