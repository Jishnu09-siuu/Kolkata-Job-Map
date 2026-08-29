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
  title: 'Kolkata Job Map',
  description: 'Explore real office buildings and live verified hiring opportunities across Salt Lake Sector V, New Town Rajarhat, Park Street, Kasba and Kolkata IT hubs.',
  keywords: ['Kolkata Jobs', 'Sector V Jobs', 'New Town Tech Jobs', 'Fresher Jobs Kolkata', 'TCS Kolkata', 'Kolkata Job Map', 'Tech Jobs West Bengal'],
  authors: [{ name: 'Kolkata Job Map Team' }],
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
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 rx=%228%22 fill=%22%2309090b%22/><path d=%22M16 6C12 6 9 9 9 13C9 18 16 25 16 25C16 25 23 18 23 13C23 9 20 6 16 6Z%22 fill=%22%2310b981%22/><circle cx=%2216%22 cy=%2213%22 r=%223%22 fill=%22%23ffffff%22/></svg>" />
      </head>
      <body className="font-sans bg-[#FAFAFA] text-zinc-900 antialiased overflow-hidden min-h-screen">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
