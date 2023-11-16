import { Nunito, Alegreya } from 'next/font/google';
import WhyDonate from '../components/WhyDonate';

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
          
// &apos; is used for '

export default function page() {
  return (
    <div className="bg-red-200 h-screen p-4 flex justify-center items-start">
        <div className="flex flex-col justify-center items-center gap-4 w-1/2 text-center text-xl">
            <h1 className={`text-4xl ${alegreya.className} font-bold`}>About Us</h1>
            <p className="text-2xl font-medium">Not In Vein (NIV) was built to make it easier for people to schedule blood donations.</p>
            <p>
                Whether it&apos;s reminding you of an upcoming appointment or helping you find nearby donation options,
                NIV can do that for you. We&apos;ll also be able to save important information such as your most visited locations,
                when you can next donate, and more.
            </p>
            <p>Sign up today!</p>
            <WhyDonate />
        </div>
    </div>
  )
}