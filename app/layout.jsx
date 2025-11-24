import './globals.css'
import { Inter, Orbitron } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata = {
  title: 'Arcano Intelligence | AI Automation & Web Development',
  description: 'Transform your business with cutting-edge AI automation, professional web development, and strategic branding solutions.',
  keywords: 'AI automation, web development, branding, artificial intelligence, business automation, digital transformation',
  authors: [{ name: 'Arcano Intelligence' }],
  openGraph: {
    title: 'Arcano Intelligence | AI Automation & Web Development',
    description: 'Transform your business with cutting-edge AI automation and web solutions.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
