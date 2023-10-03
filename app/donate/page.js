"use client";
import { useState, useEffect} from "react";
import SelectDate from "../components/SelectDate";
import { add, setMilliseconds, setSeconds, setMinutes, setHours } from "date-fns";

export default function Donate() {
    const [donatedRecently, setDonatedRecently] = useState();
    const [donatedRecentlyDate, setDonatedRecentlyDate] = useState(new Date());
    const [scheduledDonationDate, setScheduledDonationDate] = useState(new Date());
    const [earliestPossDonation, setEarliestPossDonation] = useState(null);

    const cutDownDate = (longerDate) => {
        const wordsInArray = longerDate.toString().split(" ");
        const shorterDate = wordsInArray.slice().splice(0,4).join(" ");
        return shorterDate
    }

    //for those who donated recently, when they can donate again
    const earliestToDonate = (aDate) => {
        console.log(setHours(setMinutes(setSeconds(setMilliseconds(add(aDate, {days: 57}), 0), 0), 0), 0));
        return setHours(setMinutes(setSeconds(setMilliseconds(add(aDate, {days: 57}), 0), 0), 0), 0);
    }
    
    useEffect(() => {
        console.log("New donatedRecentlyDate ", donatedRecentlyDate);
        setEarliestPossDonation(earliestToDonate(donatedRecentlyDate));
    }, [donatedRecentlyDate])

    return (
        <div className="bg-red-200 h-screen p-4">
            <div className="text-xl flex justify-center items-center mb-4">Have you donated blood within the past 56 days?</div>
            <div className="flex justify-center items-center gap-2">
                <button onClick={() => setDonatedRecently(true)} className={`border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out ${donatedRecently === true ? "bg-red-600" : null}`}>Yes</button>
                <button onClick={() => setDonatedRecently(false)} className={`border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out ${donatedRecently === false ? "bg-red-600" : null}`}>No</button>
            </div>
            {donatedRecently === true && 
                <div className={`${donatedRecently === true ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500 delay-500`}>
                    <div>Please select the date of your most recent donation</div>
                    <SelectDate
                        dateToPass={donatedRecentlyDate} 
                        functionToPass={setDonatedRecentlyDate}
                    />
                    {(donatedRecently === true && donatedRecentlyDate !== null) &&
                        <div>Since your most recent donation was on {`${cutDownDate(donatedRecentlyDate)}`},
                        <br></br>
                        The earliest your next donation can be is {`${cutDownDate(earliestPossDonation)}`}.</div>
                    }
                </div>
            }
            {donatedRecently === false &&
                <div className={`${donatedRecently === false ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500 delay-500`}>
                    <div>Please select the date of your next donation appointment</div>
                    <SelectDate
                        dateToPass={scheduledDonationDate} 
                        functionToPass={setScheduledDonationDate}
                    />
                </div>
            }
        </div>
    )
  }
  