import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Andrés Encarnación | Software Developer',
    description: 'Full-stack software developer specializing in JavaScript, TypeScript, React, and modern web technologies. 6+ years of experience building scalable web applications.',
    keywords: 'software developer, web developer, javascript, typescript, react, nextjs, nodejs, full-stack developer, andres encarnacion',
    authors: [{ name: 'Andrés Encarnación', url: 'https://andrese03.github.io' }],
    creator: 'Andrés Encarnación',
    publisher: 'Andrés Encarnación',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Andrés Encarnación | Software Developer',
        description: 'Full-stack software developer specializing in JavaScript, TypeScript, React, and modern web technologies.',
        url: 'https://andrese03.github.io',
        siteName: 'Andrés Encarnación Portfolio',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Andrés Encarnación - Software Developer',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Andrés Encarnación | Software Developer',
        description: 'Full-stack software developer specializing in JavaScript, TypeScript, React, and modern web technologies.',
        creator: '@andrese03',
        images: ['/images/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // Add your Google Search Console verification code
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
