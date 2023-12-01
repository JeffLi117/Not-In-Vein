"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import cutDownDate from "../components/helpers";
import { formatDistanceToNowStrict, isToday, isFuture } from 'date-fns';
import Link from 'next/link';
import { FaQuestionCircle } from "react-icons/fa";

const emailFrequency = [
  {freqType: "Default", description: "Receive a reminder 1 week before, 1 day before, and the morning of your upcoming donation!"},
  {freqType: "Weekly", description: "On top of the default frequency, receive an additional reminder for your upcoming donation on Monday of every week!"},
  {freqType: "Monthly", description: "On top of the default frequency, receive an additional for your upcoming donation on the first day of every month!"},
  {freqType: "WeekOf", description: "Receive a reminder every day for the week leading up to your upcoming donation!"},
]
 
export default function Profile() {
  const {user, dynamoDBInfo} = UserAuth();
  const [loading, setLoading] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [emailQuestion, setEmailQuestion] = useState(false);
  const [emailSelection, setEmailSelection] = useState(null);
  // console.log(user);
  const upcomingDonation = new Date(dynamoDBInfo.upcomingDonation);
  const latestDonation = new Date(dynamoDBInfo.latestDonation);
  // console.log("🚀 ~ file: page.js:14 ~ Profile ~ upcomingDonation:", upcomingDonation)
  const handleSaveSettings = async () => {
    // logic to save settings
    setOpenSettings(false);
  }

  useEffect(() => {
      const checkAuthentication = async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setLoading(false);
      }
      checkAuthentication();
  }, [user])

  const handleEmailSelection = (str) => {
    setEmailSelection(str)
  }
    
    // console.log(user);
    return (
        <div className="bg-red-200 h-screen justify-center items-center p-4">
          {loading ? 
            <p>Loading...</p>
          : !user ? (
            <div>
              <p>Please login first</p>
            </div>
          ): 
          (
          <div className="max-w-screen-md mx-auto mt-5">
            <header className="flex flex-col sm:flex-row items-center text-center sm:text-left">
              <div className="pb-5 sm:pr-10">
                <img 
                  src={user.photoURL? user.photoURL : "default.jpg"} 
                  alt="user's photo image." 
                  referrerPolicy="no-referrer" 
                  className="rounded-full h-40 w-40 object-cover"
                />
              </div>       
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
            </header>
            <main className="mt-10 text-center flex flex-col justify-start items-start gap-4 sm:text-left">
              <section>
                <ShowDonationCountDown date={upcomingDonation} />
              </section>
              <section>
                <h2 className="text-xl font-bold">Badges</h2>
                <ul className="flex justify-center items-center sm:justify-start">
                  <li>❤️</li>
                  <li>💉</li>
                </ul>
              </section>
              <section className="flex w-full flex-col justify-start items-start">
                <div className="grid w-full grid-cols-[40%,60%]">
                  <div className="flex flex-col justify-start items-start gap-1">
                    <div className="flex justify-start items-center gap-1">
                      <h2 className="text-xl font-bold">Email Notification Settings</h2>
                      <div className={`${(emailQuestion && !openSettings) ? "bg-white" : ""} transition ease-in-out p-1 rounded-full`}>
                        <FaQuestionCircle 
                          className="text-sm z-20 rounded-full" 
                          onClick={() => setEmailQuestion(!emailQuestion)}
                        /> 
                      </div>
                    </div>
                    
                    <div>Current setting: {user.emailSettings ? user.emailSettings : "Default"}</div>
                    {openSettings ? 
                      <div className="flex justify-start items-center gap-2">
                        <button className="mt-2 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600" onClick={handleSaveSettings}>Save Changes</button>
                        <button className="mt-2 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600" onClick={() => setOpenSettings(false)}>Cancel</button>
                      </div> 
                    : 
                      <button className="mt-2 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600" onClick={() => setOpenSettings(true)}>Change Settings</button>
                    }
                  </div>
                  {(emailQuestion && !openSettings) && <ul className="text-xs rounded-md p-2 bg-white">
                    {emailFrequency.map((el) => {
                      return <li key={el.freqType}>
                        <span className="font-semibold">{el.freqType}</span>: {el.description}
                        </li>
                    })}
                  </ul>}
                  {openSettings && <ul>
                    {emailFrequency.map((el) => {
                      return <li key={el.freqType} className="p-1 hover:bg-white transition ease-in-out" onClick={() => handleEmailSelection(el.freqType)}>
                        <span className="font-semibold">{el.freqType}</span>: {el.description}
                        </li>
                    })}
                  </ul>}
                </div>
              </section>
            </main>
          </div>
          )
        }
        </div>
    )
}

// I will put this into separate component, but for now I want to keep it here.
function ShowDonationCountDown({date}){
  if(date && isFuture(date)){
    return(  
        <div>
          <h2 className="text-xl font-bold">
            <span className="block text-3xl pb-5">{formatDistanceToNowStrict(date)}</span>
            until upcoming donation date: {cutDownDate(date)}
          </h2>
          <Link href="/reschedule" className="flex justify-center sm:block">
          <button className="mt-5 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
            Reschedule
          </button>
          </Link>
        </div>
        )
  } else if( date && isToday(date)){
    return(
      <div>
      <h2 className="text-xl font-bold">
        Today is your donation day!
      </h2>
      <Link href="/reschedule" className="flex justify-center sm:justify-start">
        <button className="mt-5 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
          Reschedule
        </button>
      </Link>
    </div>
    )
  } else{
    return (
      <div>
        <h2 className="text-xl font-bold pb-2">You don&apos;t have upcoming donation date scheduled.</h2>
        <Link href='/donate'>
          <button  className="mt-5 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
            Schedule Donation
          </button>
        </Link>
      </div>
    )
  }
}
