import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vilsan | Tecnologia em Purificação de Água em Angola',
  description:
    'Especialistas em sistemas avançados de tratamento de água, osmose inversa e soluções industriais em Luanda. Certificação INIS.',
  keywords: [
    'purificação de água Angola',
    'osmose inversa Luanda',
    'filtros de água Angola',
    'certificação INIS',
    'Vilsan',
  ],
  openGraph: {
    title: 'Vilsan | Tecnologia em Purificação de Água em Angola',
    description: 'Especialistas em osmose inversa, dessalinização e purificação com certificação INIS.',
    type: 'website',
    locale: 'pt_AO',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
