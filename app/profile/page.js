"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya, Plaster } from 'next/font/google';
import cutDownDate from "../components/helpers";
import { formatDistanceToNow } from 'date-fns';
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

function takeFirstLetter(name){
  return name.charAt(0).toUpperCase();
}

export default function Profile() {
  const {user, firebaseInfo} = UserAuth();
  const [loading, setLoading] = useState(true);
  console.log(user);
  const upcomingDonation = firebaseInfo.upcomingDonation?.toDate();
  const latestDonation = firebaseInfo.latestDonation?.toDate();
  if(upcomingDonation){
    console.log(formatDistanceToNow(upcomingDonation))
  }

  "5 days until your upcoming donation date"
  "you don't have upcoming donation date scheduled"
  "last donation was XXX"

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
                {upcomingDonation
                ? (
                  <div>
                    <h2 className="text-xl font-bold">{formatDistanceToNow(upcomingDonation)} Days left until upcoming donation {cutDownDate(upcomingDonation)}</h2>
                    {/* <p>
                      {cutDownDate(upcomingDonation)}
                    </p> */}
                  </div>
                  )
                :(
                  <h2>You don't have upcoming donation date scheduled.</h2>
                )}
                {/* <h2 className="text-xl font-bold">Upcoming Donation Date</h2>
                <p>
                  {upcomingDonation
                  ? cutDownDate(upcomingDonation)
                  : ""}
                </p> */}
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