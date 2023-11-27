"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { add, isPast, isFuture } from "date-fns";
import cutDownDate from "../components/helpers";
import TokenApi from "../api/TokenApi";
import DatePicker from "react-datepicker";
import RecentlyDonatedSelectDate from "../components/RecentDonatedSelectDate";
import { is } from "date-fns/locale";


export default function Reschedule(){
    const {user, dynamoDBInfo} = UserAuth();
    let upcomingDonation = dynamoDBInfo?.upcomingDonation;
    let latestDonation = dynamoDBInfo?.latestDonation;  
    // let latestDonation = null;  
    const nextPossDonation =latestDonation? add(new Date(latestDonation), {days:57}): null; 
    const [newUpcomingDate, setNewUpcomingDate] = useState(new Date());
    console.log("🚀 ~ file: page.js:18 ~ Reschedule ~ newUpcomingDate:", newUpcomingDate)
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        setNewUpcomingDate(nextPossDonation && isFuture(nextPossDonation)? new Date(nextPossDonation): new Date()) 
    },[])

    async function handleDateChange(){
        dynamoDBInfo.upcomingDonation = newUpcomingDate;
        try{
        await TokenApi.updateUpcomingDonation(dynamoDBInfo, user.uid);
        setIsConfirmed(true);
        } catch(error){
            console.log(`error:`, error)
        }
    }

    if(!dynamoDBInfo.name){
        return <h1 className="text-center">loading...</h1>
    }

    return (
        <main className="bg-red-200 h-screen pt-10">
            <h1 className="text-center text-xl font-bold m-5">Reschedule your donation date</h1>
            <div className={`${isConfirmed ? "block" : "hidden"} text-center delay-700`}>
                <h2>Congratulations!</h2>
                <p>Your appointment has been confirmed for {`${cutDownDate(newUpcomingDate)}`}</p>
            </div>
            <div className={`${isConfirmed ? "hidden" : "block"} text-center `}>
            {latestDonation?
            (
                <div>
                    <p className="mb-5">
                    <span className="block">
                        Since your most recent donation was on {`${cutDownDate(new Date(latestDonation))}`},
                    </span>
                        The earliest your next donation can be is {`${cutDownDate(nextPossDonation)}`}.
                    </p>
                    {/* <RecentlyDonatedSelectDate
                        dateToPass={nextPossDonation}
                        functionToPass={setNewUpcomingDate}
                        earliestPossDonation={nextPossDonation} /> */}
                    <DatePicker 
                        selected={newUpcomingDate}
                        onChange={(date) => setNewUpcomingDate(date)} 
                        minDate={nextPossDonation}
                        className="text-center border-l-4 border-red-600 w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-white"
                        />
                    <button onClick={handleDateChange}
                                className="mt-5 mx-auto block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
                        Confirm
                    </button>
                </div>
            )
            : (
                <div>
                    <p className="mb-5">
                        Your current upcoming donation date is <span className="block">{`${cutDownDate(new Date(upcomingDonation))}`}</span>
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
       
        </main>

    )
}