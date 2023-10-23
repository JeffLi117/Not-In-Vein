"use client";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { add, isPast } from "date-fns";
import cutDownDate from "../components/helpers";
import { addUpcomingForRecent } from "../firebase/functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RecentlyDonatedSelectDate from "../components/RecentDonatedSelectDate";

export default function Reschedule(){
    const {user, firebaseInfo} = UserAuth();
    const upcomingDonation = firebaseInfo.upcomingDonation;
    const latestDonation = firebaseInfo.latestDonation;
    const nextPossDonation =latestDonation? add(new Date(latestDonation), {days:57}): 0; 
    const [newUpcomingDate, setNewUpcomingDate] = useState(new Date());
    const [isConfirmed, setIsConfirmed] = useState(false);

    async function handleDateChange(){
        try{
            await addUpcomingForRecent(newUpcomingDate, user.uid);
            setIsConfirmed(true);
        }catch(e){
            console.log("something went wrong during reschedule", e);
        }
    }

    return (
        <main>
                <h1 className="text-center text-xl font-bold m-5">Reschedule your donation date</h1>
                <div className={`${isConfirmed ? "hidden" : "block"} text-center`}>
                {latestDonation?
                (
                    <div>
                      <p className="mb-5">
                        <span className="block">
                            Since your most recent donation was on {`${cutDownDate(latestDonation)}`},
                        </span>
                            The earliest your next donation can be is {`${cutDownDate(nextPossDonation)}`}.
                        </p>
                        <RecentlyDonatedSelectDate
                            dateToPass={newUpcomingDate}
                            functionToPass={setNewUpcomingDate}
                            earliestPossDonation={nextPossDonation} />
                         <button onClick={handleDateChange}
                                 className="mt-5 mx-auto block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
                            Confirm
                        </button>
                    </div>
                )
                : (
                    <div>
                        <p className="mb-5">
                            Your current upcoming donation date is <span className="block">{`${cutDownDate(upcomingDonation)}`}</span>
                        </p>
                        <RecentlyDonatedSelectDate
                            dateToPass={newUpcomingDate}
                            functionToPass={setNewUpcomingDate}
                            earliestPossDonation={nextPossDonation} />
                         <button onClick={handleDateChange}
                                 className="mt-5 mx-auto block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
                            Confirm
                        </button>
                    </div>
                )}
            </div>
            <div className={`${isConfirmed ? "block" : "hidden"} text-center`}>
                <h2>Congratulations!</h2>
                <p>Your appointment has been confirmed for {`${cutDownDate(newUpcomingDate)}`}</p>
            </div>
        </main>

    )
}