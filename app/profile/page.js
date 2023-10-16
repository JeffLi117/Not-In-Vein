"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya, Plaster } from 'next/font/google';
import cutDownDate from "../components/helpers";
import { formatDistanceToNowStrict, isToday, isFuture } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
 
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: '400',
  style: 'normal'
})

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  weight: '400',
  style: 'normal'
})

export default function Profile() {
  const {user, firebaseInfo} = UserAuth();
  const [loading, setLoading] = useState(true);
  console.log(user);
  const upcomingDonation = firebaseInfo.upcomingDonation;
  const latestDonation = firebaseInfo.latestDonation;
  if(upcomingDonation){
    console.log(formatDistanceToNowStrict(upcomingDonation))
  }

  useEffect(() => {
      const checkAuthentication = async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setLoading(false);
      }
      checkAuthentication();
  }, [user])
    
    console.log(user);
    return (
        <div className="mt-10 justify-center items-center w-10/12 mx-auto">
          {loading ? 
            <p>Loading...</p>
          : !user ? (
            <div>
              <p>Please login first</p>
            </div>
          ): 
          (
          <div>
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
            <main className="mt-10 text-center sm:text-left">
              <section>
                <ShowDonationCountDown date={upcomingDonation} />
              </section>
              <section className="mt-10">
                <h2 className="text-xl font-bold"> Badges</h2>
                <ul className="flex justify-center items-center sm:justify-start">
                  <li>❤️</li>
                  <li>💉</li>
                </ul>
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
            until upcoming donation date{cutDownDate(date)}</h2>
        </div>
        )
  } else if( date && isToday(date)){
    return(
      <div>
      <h2 className="text-xl font-bold">
        Today is your donation day!
      </h2>
    </div>
    )
  } else{
    return (
      <div>
        <h2 className="text-xl font-bold pb-2">You don't have upcoming donation date scheduled.</h2>
        <Link href='/donate'><button  className="block py-1 px-2 rounded-md font-semibold bg-red-400 text-white hover:bg-red-600">Schedule Donation</button> </Link>
      </div>
    )
  }
}
