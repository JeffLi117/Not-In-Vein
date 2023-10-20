
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
      <body>
        <AuthContextProvider>
          <Navbar />
          {children} 
        </AuthContextProvider>
      </body>
    </html>
  )
}
