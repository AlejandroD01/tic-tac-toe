import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tic tac toe',
  description: 'Created by Alejandro D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon"  href="/favicon.png" />
      <body>{children}</body>
    </html>
  )
}
