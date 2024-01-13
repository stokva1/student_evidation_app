import { Inter } from 'next/font/google'
import './globals.css'
import {AuthProvider} from "@/app/providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Student evidation',
  description: 'Student evidation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
