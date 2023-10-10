"use client";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Nunito, Alegreya, Plaster } from 'next/font/google';
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
  const {user} = UserAuth();
  const [loading, setLoading] = useState(true);
  console.log(user);

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
                <h2 className="text-xl font-bold">Donation Date</h2>
                <ul>
                  <li>2023/8/15</li>
                  <li>2023/10/1</li>
                </ul>
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