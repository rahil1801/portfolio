import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nibras | Rahil Alam',
  description: 'Explore the portfolio of Rahil, a Full-Stack MERN developer and creative designer. Showcasing web applications, real-time projects, UI/UX designs, and innovative solutions.',
  icons: {
    icon: "/Nibras-logo.png",
    shortcut: "/Nibras-logo.png",
    apple: "/Nibras-logo.png",
  },
  keywords: [
    "Rahil",
    "portfolio",
    "MERN developer",
    "full-stack developer",
    "web developer",
    "JavaScript",
    "React",
    "Node.js",
  ],
  authors:[{name: "Rahil"}],
  openGraph: {
    title: "Rahil's Portfolio | Full-Stack Developer & Designer",
    description:
      "Showcasing MERN stack projects, creative UI/UX designs, and innovative web applications by Rahil.",
    url: "",
    siteName: "Nibras",
    images: [
      {
        url: "/Nibras-logo.png",
        width: 1200,
        height: 630,
        alt: "Preview of Rahil's Portfolio Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
