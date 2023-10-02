import { Nunito, Alegreya } from 'next/font/google';

const landingPageSentences = [
  "DONATE TODAY",
  "Donate blood. Save lives.",
  "Want to donate blood but having a hard time remembering? We keep track of when you last donated and remind you of upcoming scheduled appointments.",
]

const reasonsToDonate = [
  "Improve/save the lives of 3 people.",
  "Get a free health screening.",
  "Lower your blood pressure and heart attack risk.",
  "Burn 500 calories without breaking a sweat.",
]

{/* {reasonsToDonate.map((string) => {
            return <div key={string.id}>{string}</div>
})} */}
        
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
    <div className={`h-screen relative bg-red-bg p-20 ${alegreya.className}`}>
      <div className="h-full w-1/2 bg-transparent rounded-lg p-8">
        <div className="flex flex-col justify-center items-start gap-4">
          <div className="text-2xl font-bold">{landingPageSentences[0]}</div>
          <div className="text-6xl">{landingPageSentences[1]}</div>
          <div className="text-2xl">{landingPageSentences[2]}</div>
          <button className="border p-2 border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 hover:text-white transition ease-in-out">Find a blood drive near you</button>
        </div>
      </div>
    </div>
  )
}
