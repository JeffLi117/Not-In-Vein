"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import cutDownDate from "../components/helpers";
import { formatDistanceToNowStrict, isToday, isFuture } from 'date-fns';
import Link from 'next/link';
import { FaQuestionCircle } from "react-icons/fa";
import TokenApi from "../api/TokenApi";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand } from "@aws-sdk/lib-dynamodb";

const emailFrequency = [
  {freqType: "Default", description: "Receive a reminder 1 week before, 1 day before, and the morning of your upcoming donation!"},
  {freqType: "Weekly", description: "On top of the default frequency, receive an additional reminder for your upcoming donation on Monday of every week!"},
  {freqType: "Monthly", description: "On top of the default frequency, receive an additional for your upcoming donation on the first day of every month!"},
  {freqType: "WeekOf", description: "Receive a reminder every day for the week leading up to your upcoming donation!"},
  {freqType: "None", description: "Don't receive any reminders for your upcoming donations."},
]
 
export default function Profile() {
  const {user, dynamoDBInfo, setDynamoDBInfo} = UserAuth();
  const [loading, setLoading] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [emailQuestion, setEmailQuestion] = useState(false);
  const [emailSelection, setEmailSelection] = useState(null);
  const [savedSetting, setSavedSetting] = useState(null);
  // console.log(user);
  const upcomingDonation = new Date(dynamoDBInfo.upcomingDonation);
  const latestDonation = new Date(dynamoDBInfo.latestDonation);
  // console.log("🚀 ~ file: page.js:14 ~ Profile ~ upcomingDonation:", upcomingDonation)
  const handleSaveSettings = async () => {
    // if user is able to focus on "Save Changes" (i.e. bypass pointer events none)
    if (dynamoDBInfo.emailSettings === emailSelection) return

    // logic to save settings
    setOpenSettings(false); 
    setEmailQuestion(false);

    try {
      await setDynamoDBInfo(prevState => {
        const newState = { ...prevState, emailSettings: emailSelection };
        console.log(`new emailSettings is ${newState.emailSettings}`);
        return newState;
      });

      //  if Context state is properly updated, call TokenApi to backend to update user's setting in DB
      try {
        const params = {...dynamoDBInfo, emailSettings: emailSelection};
        const data = await TokenApi.updateEmailSettings(params);
        console.log("Success - email setting added", data);
        setSavedSetting(emailSelection);
      } catch (err) {
        console.log("Error", err);
      }
    } catch (err) {
      console.log("Some error occurred :(", err.message)
    }
  }

  useEffect(() => {
      const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLoading(false);
      }
      checkAuthentication();
  }, [user])

  useEffect(() => {
    if (savedSetting !== null) { 
      setDynamoDBInfo((prevState) => ({
        ...prevState,
        emailSettings: savedSetting,
      }))
    }
  }, [savedSetting])

  const handleEmailSelection = (event) => {
    const selectedValue = event.target.value;
    setEmailSelection(selectedValue);
  }
    
    // console.log(user);
    return (
        <div className="bg-red-200 h-[calc(100vh-74px)] justify-center items-center p-4">
          {loading ? 
            <p>Loading...</p>
          : !user ? (
            <div>
              <p>Please login first</p>
            </div>
          ): 
          (
          <div className="w-full flex flex-col justify-start items-center md:grid md:grid-cols-3 md:px-32 lg:px-40 mt-5">
            <header className="col-start-3 col-end-4 h-full flex flex-col items-center justify-start text-center">
              <img 
                src={user.photoURL? user.photoURL : "default.jpg"} 
                alt="user's photo image." 
                referrerPolicy="no-referrer" 
                className="rounded-full h-48 w-48 object-cover"
              /> 
              <h1 className="text-2xl font-bold py-4">{user.displayName}</h1>
              <section>
                <h2 className="text-xl font-bold">Badges</h2>
                <ul className="flex justify-center items-center sm:justify-start">
                  <li>❤️</li>
                  <li>💉</li>
                </ul>
              </section>
            </header>
            <main className="row-start-1 col-start-1 col-end-3 mt-4 text-center flex flex-col justify-start items-start gap-8 sm:text-left">
              <section>
                <ShowDonationCountDown date={upcomingDonation} />
              </section>
              <section className="flex w-full flex-col justify-start items-start">
                <div className="w-full">
                  <div className="flex flex-col justify-start items-start gap-2 overflow-auto">
                    <div className="">
                      <h2 className="text-xl font-bold flex justify-start items-start">Email Notification Settings
                        <FaQuestionCircle 
                          className={`${(emailQuestion) ? "bg-white" : ""} transition ease-in-out p-1 text-sm z-20 rounded-full h-fit w-fit hover:opacity-50`}
                          onClick={() => setEmailQuestion(!emailQuestion)}
                        /> 
                      </h2>
                    </div>
                    {savedSetting ? <div>Your setting has been updated to: {savedSetting}</div> : <div>Current setting: {dynamoDBInfo.emailSettings ? dynamoDBInfo.emailSettings : "Default"}</div>}
                    
                    {openSettings ? 
                      <div className="flex justify-start items-center gap-2">
                        <button className={`block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600 ${dynamoDBInfo.emailSettings === emailSelection ? "pointer-events-none bg-gray-400 opacity-70" : ""}`} onClick={handleSaveSettings}>Save Changes</button>
                        <button className="block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600" onClick={() => {setOpenSettings(false); setEmailQuestion(false)}}>Cancel</button>
                        <div className="flex flex-col justify-start items-start">
                          <select
                            name="email"
                            id="email"
                            className="border rounded-md p-2 transition-all duration-300 hover:border-red-500"
                            onChange={handleEmailSelection}
                            defaultValue={`${emailSelection ? emailSelection : "Default"}`}
                          >
                            <option value="Default">Default</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="WeekOf">WeekOf</option>
                            <option value="None">None</option>
                          </select>
                        </div>
                      </div> 
                    : 
                      <button className="block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600" onClick={() => {setOpenSettings(true); setEmailQuestion(true)}}>Change Settings</button>
                    }
                  </div>
                  <ul className={`text-sm rounded-md p-2 bg-white h-fit w-fit mt-2 ${emailQuestion ? "opacity-100" : "opacity-0"}`}>
                    {emailFrequency.map((el) => {
                      return <li key={el.freqType} className="text-left md:text-center mb-2 md:mb-0">
                        <span className="font-semibold">{el.freqType}</span>: {el.description}
                        </li>
                    })}
                  </ul>
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
          <h2 className="text-xl font-bold flex flex-col justify-start items-start md:block text-left">
            <span className="text-3xl pb-5">{formatDistanceToNowStrict(date)}</span>
            <span className="flex justify-start">until upcoming donation date: {cutDownDate(date)}</span>
          </h2>
          <Link href="/reschedule" className="block">
            <button className="mt-5 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
              Reschedule
            </button>
          </Link>
        </div>
        )
  } else if( date && isToday(date)){
    return(
      <div>
        <h2 className="text-xl font-bold flex flex-col justify-start items-start md:block text-left">
          Today is your donation day!
        </h2>
        <Link href="/reschedule" className="block">
          <button className="mt-5 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
            Reschedule
          </button>
        </Link>
      </div>
    )
  } else{
    return (
      <div>
        <h2 className="text-xl font-bold flex flex-col justify-start items-start md:block text-left">You don&apos;t have an upcoming donation date scheduled.</h2>
        <Link href='/donate' className="block">
          <button className="mt-5 block py-2 px-3 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">
            Schedule Donation
          </button>
        </Link>
      </div>
    )
  }
}
