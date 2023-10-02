"use client";
import { useState, useEffect} from "react";
import SelectDate from "../components/SelectDate"

export default function Donate() {
    const [donatedRecently, setDonatedRecently] = useState(null);
    const [donatedRecentlyDate, setDonatedRecentlyDate] = useState(null);

    return (
        <div className="bg-red-200 h-screen p-4">
            <div className="text-xl flex justify-center items-center mb-4">Have you donated blood within the past 2 months?</div>
            <div className="flex justify-center items-center gap-2">
                <button onClick={() => setDonatedRecently(true)} className="border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out">Yes</button>
                <button onClick={() => setDonatedRecently(false)} className="border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out">No</button>
            </div>
            <SelectDate />
            {(donatedRecently === true && donatedRecentlyDate !== null) &&
                <div>Your most recent donation was on {donatedRecently}</div>
            }
        </div>
    )
  }
  