// "use client"
import './globals.css';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Not In Vein',
  description: 'Donate Blood. Save Lives',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' 
        />
      </head>
      <body>
        <AuthContextProvider>
          <Navbar />
          {children} 
        </AuthContextProvider>
      </body>
    </html>
  )
}
