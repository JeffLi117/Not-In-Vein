"use client";
import { useState, useEffect } from "react";
import Past56SelectDate from "../components/Past56SelectDate";
import RecentlyDonatedSelectDate from "../components/RecentDonatedSelectDate";
import SelectDate from "../components/SelectDate";
import { add, parseISO, isBefore, setMilliseconds, setSeconds, setMinutes, setHours } from "date-fns";
import { UserAuth } from "../context/AuthContext";
import AddData from "../pages/adddata";

export default function Donate() {
    const { user, dynamoDBInfo } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [donatedRecently, setDonatedRecently] = useState();
    const [donatedRecentlyDate, setDonatedRecentlyDate] = useState(new Date());
    const [scheduledDonationDate, setScheduledDonationDate] = useState(new Date());
    const [earliestPossDonation, setEarliestPossDonation] = useState(null);
    const [openScheduleDonatedRecently, setOpenScheduleDonatedRecently] = useState(false);
    const [scheduleDonatedRecently, setScheduleDonatedRecently] = useState(new Date());
    const [canConfirm, setCanConfirm] = useState(false);
    const [remindSchedule, setRemindSchedule] = useState(false);
    const [confirmedAptFadeOut, setConfirmedAptFadeOut] = useState(false);
    const [confirmedAptFadeIn, setConfirmedAptFadeIn] = useState(false);
    const [stayOnScheduling, setStayOnScheduling] = useState(false);
    
    // Date saved in DynamoDB is string. It needs to be converted back to Date Object
    let upcomingDonation, latestDonation;
    // const upcomingDonation = new Date(dynamoDBInfo.upcomingDonation);
    // const latestDonation = new Date(dynamoDBInfo.latestDonation);
    if (dynamoDBInfo.upcomingDonation) upcomingDonation = dynamoDBInfo.upcomingDonation;
    if (dynamoDBInfo.latestDonation) latestDonation = dynamoDBInfo.latestDonation;

    const cutDownDate = (longerDate) => {
        const wordsInArray = longerDate.toString().split(" ");
        const shorterDate = wordsInArray.slice().splice(0,1)+ ", " + wordsInArray.slice().splice(1,3).join(" ");
        return shorterDate
    }

    //for those who donated recently, when they can donate again
    const earliestToDonate = (aDate) => {
        // console.log(setHours(setMinutes(setSeconds(setMilliseconds(add(aDate, {days: 57}), 0), 0), 0), 0));
        return setHours(setMinutes(setSeconds(setMilliseconds(add(parseISO(aDate), {days: 57}), 0), 0), 0), 0);
    }

    const toggleOpenSchedDonatedRecently = () => {
        setRemindSchedule(false);
        setOpenScheduleDonatedRecently(!openScheduleDonatedRecently);
        setCanConfirm(true);
    }

    const confirmAptRecentDonation = async () => {
        if (!canConfirm) {
            setRemindSchedule(true);
            return
        }
        Promise.all([console.log("Congrats on confirming your upcoming appointment! (with recent donation)")])
            .then(setStayOnScheduling(true))
            .then(changeToConfirmedApt())
            .catch(function(err) {
                console.log("Some error occurred :(", err.message)
            })
        // addRecentDonation(donatedRecentlyDate, user.uid); params: recentDate, userId
        // addUpcomingForRecent(scheduleDonatedRecently, user.uid); params: upcomingDonation, userId
    }

    const confirmApt = async () => {
        Promise.all([console.log("Congrats on confirming your upcoming appointment!")])
            .then(setStayOnScheduling(true))
            .then(changeToConfirmedApt())
            .catch(function(err) {
                console.log("Some error occurred :(", err.message)
            })
        // addRecentDonation(donatedRecentlyDate, user.uid); params: recentDate, userId
        // addUpcomingForRecent(scheduleDonatedRecently, user.uid); params: upcomingDonation, userId
    }

    const changeToConfirmedApt = async () => {
        Promise.allSettled([setConfirmedAptFadeOut(true)])
            .then(setTimeout(() => console.log(".then middle delay"), 1500))
            .then(setTimeout(() => {setConfirmedAptFadeIn(true); console.log(".then last delay")}, 1500))
            .catch(function(err) {
                console.log("Some error occurred :(", err.message)
            })
    }

    // const isEarliestToDonateBeforeNow = (pastDate) => {
    //     console.log(pastDate);
    //     isBefore(scheduleDonatedRecently, new Date())
    // }

    const checkForLatest = () => {
        if (latestDonation) {
            console.log(`User's latestDonation is ${(cutDownDate(latestDonation))}`);
            setDonatedRecently(true);
            setDonatedRecentlyDate(latestDonation);
        } else {
            console.log("Schedule page.js -User doesn't have latest in DB");
        }
        setTimeout(() => {setLoading(false)}, 1000)
    }

    useEffect(() => {
        // console.log("New donatedRecentlyDate ", donatedRecentlyDate);
        console.log("donatedRecentlyDate useEffect running ");
        setEarliestPossDonation(earliestToDonate(donatedRecentlyDate));
        setScheduleDonatedRecently(earliestToDonate(donatedRecentlyDate));
    }, [donatedRecentlyDate])

    useEffect(() => {
        if (dynamoDBInfo !== null && dynamoDBInfo.uid !== null) {
            checkForLatest();
        }
    }, [dynamoDBInfo])

    // useEffect(() => {
    //     if (loading) {
    //         setTimeout(() => {setLoading(false)}, 3000)
    //     }
    // }, [])

    // upcomingDonationReturned();

    /*=====Note =====
    Currently even if the upcomingdate is past, the page shows "You have an upcoming scheduled on ..." We can make a modal or a page to show if upcoming date is past. If a user donated on that day, we will make that upcomingdate as latest, if a user did not donate, we will delete upcomingdate.
    */
    
    if (loading) {
        return (<div className="text-2xl font-medium flex flex-col justify-center items-center">Loading...</div>)
    }
    
    return (
        <div className="bg-red-200 h-[calc(100vh-74px)] p-4">
            {isBefore(scheduleDonatedRecently, new Date()) ? 
                <div>
                    <p>The latest donation is old enough so that they do not need to have a min-date for scheduling</p>
                    <SelectDate
                        dateToPass={scheduledDonationDate} 
                        functionToPass={setScheduledDonationDate}
                    />
                </div> 
                : 
                <div>
                    <div>Because your latest donation was on {`${cutDownDate(new Date(scheduleDonatedRecently))}`}, the earliest you can next donate is {`${cutDownDate(new Date(scheduleDonatedRecently))}`}</div>
                    <RecentlyDonatedSelectDate
                        earliestPossDonation={earliestPossDonation} 
                        dateToPass={scheduleDonatedRecently} 
                        functionToPass={setScheduleDonatedRecently}
                    />
                </div>
            }
            {/* {((user && upcomingDonation) && !stayOnScheduling)? 
            <div className="text-2xl font-medium flex flex-col justify-center items-center">You have an upcoming appointment scheduled on {`${cutDownDate(new Date(upcomingDonation))}`}.</div>
                : ((user && (!upcomingDonation || stayOnScheduling)) && (user && latestDonation)) ?
                <div>
                    <div className={`${confirmedAptFadeIn ? "animate-fadein" : "hidden"} flex flex-col justify-center items-center gap-4 text-xl`}>
                        <div className="text-2xl font-medium">Congratulations!</div>
                        <div>Your appointment has been confirmed for {`${cutDownDate(scheduledDonationDate)}`}.</div>
                    </div>
                    
                    <div className={`${confirmedAptFadeOut ? "animate-fadeout" : null}`}>
                        <div className={`${donatedRecently === true ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500 delay-500 flex flex-col justify-center items-center gap-4`}>
                            {(donatedRecently === true && donatedRecentlyDate !== null) &&
                                <div>Since your most recent donation was on {`${cutDownDate(donatedRecentlyDate)}`},
                                <br></br>
                                The earliest your next donation can be is {`${cutDownDate(earliestPossDonation)}`}.</div>
                            }
                            <button onClick={() => toggleOpenSchedDonatedRecently()} className={`border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out ${remindSchedule ? "bg-white animate-pulse" : null}`}>
                                {openScheduleDonatedRecently ? "Close calendar" : "Schedule your next appointment"
                                }
                            </button>
                            {openScheduleDonatedRecently && 
                                <RecentlyDonatedSelectDate
                                    earliestPossDonation={earliestPossDonation} 
                                    dateToPass={scheduleDonatedRecently} 
                                    functionToPass={setScheduleDonatedRecently}
                                />
                            }   
                            {cutDownDate(scheduleDonatedRecently) === cutDownDate(new Date()) ? null : 
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <div>Your next donation is scheduled to be {`${cutDownDate(scheduleDonatedRecently)}`}.</div>
                                    <AddData
                                        passIntoFunct={confirmAptRecentDonation}
                                        upcomingDonation={scheduleDonatedRecently.toISOString()}
                                        latestDonation={donatedRecentlyDate.toISOString()}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                    : (user && (!upcomingDonation || stayOnScheduling)) ?
                    <div>
                        <div className={`${confirmedAptFadeIn ? "animate-fadein" : "hidden"} flex flex-col justify-center items-center gap-4 text-xl`}>
                            <div className="text-2xl font-medium">Congratulations!</div>
                            <div>Your appointment has been confirmed for {`${cutDownDate(scheduledDonationDate)}`}.</div>
                        </div>
                        
                        <div className={`${confirmedAptFadeOut ? "animate-fadeout" : null}`}>
                            <div className="text-xl flex justify-center items-center mb-4">Have you donated blood within the past 56 days?</div>
                            <div className="flex justify-center items-center gap-2 mb-4">
                                <button onClick={() => setDonatedRecently(true)} className={`border p-2 min-w-[17%] md:min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out ${donatedRecently === true ? "bg-red-600" : null}`}>Yes</button>
                                <button onClick={() => setDonatedRecently(false)} className={`border p-2 min-w-[17%] md:min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out ${donatedRecently === false ? "bg-red-600" : null}`}>No</button>
                            </div>
                            {donatedRecently === true && 
                                <div className={`${donatedRecently === true ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500 delay-500 flex flex-col justify-center items-center gap-4`}>
                                    <div>Please select the date of your most recent donation</div>
                                    <Past56SelectDate
                                        dateToPass={donatedRecentlyDate} 
                                        functionToPass={setDonatedRecentlyDate}
                                    />
                                    {(donatedRecently === true && donatedRecentlyDate !== null) &&
                                        <div className="italic"> 
                                            <span className="hidden md:block">
                                                Since your most recent donation was on {`${cutDownDate(donatedRecentlyDate)}`},
                                                <br />
                                                the earliest your next donation can be is {`${cutDownDate(earliestPossDonation)}`}.
                                            </span>
                                            <span className="md:hidden">
                                                Since your most recent donation was on {`${cutDownDate(donatedRecentlyDate)}`}, the earliest your next donation can be is {`${cutDownDate(earliestPossDonation)}`}.
                                            </span>
                                        </div>
                                    }
                                    <button onClick={() => toggleOpenSchedDonatedRecently()} className={`border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out ${remindSchedule ? "bg-white animate-pulse" : null}`}>
                                        {openScheduleDonatedRecently ? "Close calendar" : "Schedule your next appointment"
                                        }
                                    </button>
                                    {openScheduleDonatedRecently && 
                                        <RecentlyDonatedSelectDate
                                            earliestPossDonation={earliestPossDonation} 
                                            dateToPass={scheduleDonatedRecently} 
                                            functionToPass={setScheduleDonatedRecently}
                                        />
                                    }   
                                    {cutDownDate(scheduleDonatedRecently) === cutDownDate(new Date()) ? null : 
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <div>Your next donation is scheduled to be {`${cutDownDate(scheduleDonatedRecently)}`}.</div>
                                            <AddData
                                                passIntoFunct={confirmAptRecentDonation}
                                                upcomingDonation={scheduleDonatedRecently.toISOString()}
                                                latestDonation={donatedRecentlyDate.toISOString()}
                                            />
                                        </div>
                                    }
                                </div>
                            }
                            {donatedRecently === false &&
                                <div className={`${donatedRecently === false ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500 delay-500 flex flex-col justify-center items-center gap-4`}>
                                    <div>Please select the date of your next donation appointment</div>
                                    <SelectDate
                                        dateToPass={scheduledDonationDate} 
                                        functionToPass={setScheduledDonationDate}
                                    />
                                    <div>Your next donation is scheduled to be {cutDownDate(scheduledDonationDate) === cutDownDate(new Date()) ? "today" : `${cutDownDate(scheduledDonationDate)}`}.</div>
                                    <AddData
                                        passIntoFunct={confirmApt}
                                        upcomingDonation={scheduledDonationDate.toISOString()}
                                        latestDonation={null}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                        : (user || user == null) ? 
                        <div className="text-2xl font-medium flex flex-col justify-center items-center">Loading...</div>
                            : 
                            <div className="text-2xl font-medium flex flex-col justify-center items-center">Please login to schedule your appointment!</div>
            } */}
        </div>
    )
  }
  