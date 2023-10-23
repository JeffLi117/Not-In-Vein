"use client";
import { UserAuth } from "../context/AuthContext";
import { add, isPast } from "date-fns";
import cutDownDate from "../components/helpers";
import addUpcomingForRecent from "../firebase/functions"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectDate from "../components/SelectDate";
import RecentlyDonatedSelectDate from "../components/RecentDonatedSelectDate";

export default function Reschedule(){
    const {user, firebaseInfo} = UserAuth();
    const upcomingDonation = firebaseInfo.upcomingDonation;
    const latestDonation = firebaseInfo.latestDonation;
    const nextPossDonation =latestDonation? add(new Date(latestDonation), {days:57}): 0; 
    
    async function handleDateChange(date){
        try{
            await addUpcomingForRecent(date, user.uid);
        }catch(e){
            console.log("something went wrong during reschedule", e);
        }
    }
    // if nextPossDonation is in the future then selected would be nextPossDonationDate.
    // if nextPossDonation is past then selected would be today.
    // only time we have to be careful is nextPossDonation date is in the future,
    // othewrise always shows today as selected day.


    return (
        <div className="text-center">
            <h1 className="text-xl font-bold m-5">Reschedule your donation date</h1>
            {latestDonation? 
            (
                <div>
                  <p>
                    <span className="block">
                        Since your most recent donation was on {`${cutDownDate(latestDonation)}`},
                    </span>
                    The earliest your next donation can be is {`${cutDownDate(nextPossDonation)}`}.
                  </p>
                  <DatePicker 
                     selected={isPast(nextPossDonation)? new Date(): nextPossDonation} 
                     onChange={(date) => handleDateChange(date)} 
                     minDate={isPast(nextPossDonation)? new Date(): nextPossDonation}
                     className="text-center border-l-4 border-red-600 w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-white"/>
                </div>
            ) 
            : (
                <div>
                    <p>reschedule</p>
                </div>
            )}
        </div>

    )

}