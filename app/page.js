import { Nunito, Alegreya } from 'next/font/google';
 
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

export default function Home() {
  return (
    <div className="h-screen relative bg-red-bg p-16">
      <h1 className={`absolute z-30 inset-x-0 mx-auto my-4 text-4xl ${alegreya.className} border-2 rounded-lg bg-red-300 border-red-800 p-2 w-fit`}>Not In Vein</h1>
      <div className="h-full bg-white opacity-70 rounded-lg">
      </div>
      
    </div>
  )
}
