import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kolkata Job Map — Verified Tech Jobs & IT Offices in Kolkata',
  description: 'Interactive geospatial tech job directory for Kolkata. Explore office buildings, tech parks, and verified hiring across Salt Lake Sector V, New Town Rajarhat, Park Street, and Kasba.',
  keywords: [
    'Kolkata Jobs',
    'IT Jobs in Kolkata',
    'Salt Lake Sector V Tech Companies',
    'New Town Kolkata Software Jobs',
    'Fresher IT Jobs Kolkata',
    'Kolkata Job Map',
    'Tech Parks in Kolkata',
    'Bengal Silicon Valley Hub',
    'TCS Cognizant Wipro Kolkata'
  ],
  authors: [{ name: 'Kolkata Job Map Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kolkata-job-map.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kolkata Job Map — Verified Tech Jobs & IT Offices in Kolkata',
    description: 'Explore real office buildings and live verified hiring opportunities across Salt Lake Sector V, New Town Rajarhat, Park Street, Kasba and Kolkata IT hubs.',
    url: 'https://kolkata-job-map.vercel.app',
    siteName: 'Kolkata Job Map',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolkata Job Map — Geospatial Tech Job Discovery',
    description: 'Explore office buildings and live verified hiring opportunities across Salt Lake Sector V, New Town, and Kolkata tech corridors.',
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
};

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://kolkata-job-map.vercel.app/#website',
        url: 'https://kolkata-job-map.vercel.app',
        name: 'Kolkata Job Map',
        description: 'Interactive map and verified tech job portal for Kolkata IT corridors.',
        inLanguage: 'en-IN',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://kolkata-job-map.vercel.app/?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'EmploymentAgency',
        '@id': 'https://kolkata-job-map.vercel.app/#organization',
        name: 'Kolkata Job Map',
        url: 'https://kolkata-job-map.vercel.app',
        areaServed: {
          '@type': 'City',
          name: 'Kolkata',
          containedInPlace: {
            '@type': 'State',
            name: 'West Bengal',
          },
        },
        description: 'Geospatial discovery engine for tech jobs and companies in Kolkata.',
      },
    ],
  };

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 rx=%228%22 fill=%22%2309090b%22/><path d=%22M16 6C12 6 9 9 9 13C9 18 16 25 16 25C16 25 23 18 23 13C23 9 20 6 16 6Z%22 fill=%22%2310b981%22/><circle cx=%2216%22 cy=%2213%22 r=%223%22 fill=%22%23ffffff%22/></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#FAFAFA] text-zinc-900 antialiased overflow-hidden min-h-screen">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
