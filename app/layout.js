import './globals.css'
import { Providers } from './providers'
import WhatsAppFab from '@/components/dua/WhatsAppFab'

export const metadata = {
  metadataBase: new URL('https://cyberdyketech.vercel.app'),
  title: 'CyberdykeTech — Secure. Defend. Grow.',
  description: 'CyberdykeTech — premium digital marketing, branding, website development, and video production for ambitious brands.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'CyberdykeTech — We Create What\'s Next.',
    description: 'A creative digital agency helping brands grow through strategy, design, technology and performance.',
    images: ['/og-image.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberdykeTech',
    description: 'We Create What\'s Next.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-[#062817] text-white antialiased">
        <Providers>{children}</Providers>
        <WhatsAppFab />
      </body>
    </html>
  )
}
