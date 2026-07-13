import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: "AstroInterior — India's Premier Astro-Interior Consultancy",
  description: "Vedic Vastu & Architectural Astrology gridding for luxury homes and workspaces by Richa Agarwal.",
  metadataBase: new URL('https://www.astrointerior.in'),
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google Analytics (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-R7JYHYCJG4" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R7JYHYCJG4');
          `}
        </Script>
      </head>
      <body className="antialiased bg-c-bg-primary text-c-text-primary">
        {children}
      </body>
    </html>
  );
}

