"use client";
import './globals.css';
import { AuthContextProvider } from './context/AuthContext';
import Header from './components/Header';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Header />
          {children} 
        </AuthContextProvider>
      </body>
    </html>
  )
}
