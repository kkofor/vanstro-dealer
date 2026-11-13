import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'RTA Kitchen Cabinets Winnipeg | VanStro Building Materials',
  description: 'Buy ready-to-assemble kitchen cabinets & bathroom vanities in Winnipeg. ¾" plywood boxes, White & Light Grey Shaker doors, soft-close hardware. Same-day & next-day pickup at 856 Century St.',
  openGraph: {
    title: 'RTA Kitchen Cabinets Winnipeg | VanStro Building Materials',
    description: 'Ready-to-assemble kitchen cabinets & vanities in Winnipeg. Solid ¾" plywood boxes, White & Light Grey Shaker, soft-close hinges. Pick up at 856 Century Street.',
    type: 'website',
    url: 'https://www.vanstro.ca',
    siteName: 'VanStro Building Materials',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTA Kitchen Cabinets Winnipeg | VanStro Building Materials',
    description: 'Solid ¾" plywood RTA kitchen cabinets & vanities in Winnipeg. White & Light Grey Shaker. Fast pickup at 856 Century St.',
  },
  keywords: [
    'RTA kitchen cabinets Winnipeg',
    'ready to assemble cabinets Winnipeg',
    'kitchen cabinets Winnipeg Century Street',
    'bathroom vanities Winnipeg',
    'shaker cabinets Winnipeg',
    'plywood kitchen cabinets Manitoba',
    'VanStro cabinets'
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeGoodsStore',
  name: 'VanStro Building Materials',
  url: 'https://www.vanstro.ca',
  telephone: '+1-855-826-7876',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '856 Century Street',
    addressLocality: 'Winnipeg',
    addressRegion: 'MB',
    postalCode: 'R3H 0M5',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.8974,
    longitude: -97.2023,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  priceRange: '$$',
  image: 'https://www.vanstro.ca/og-image.jpg',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'RTA Kitchen Cabinets & Vanities',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'RTA Kitchen Cabinets (Base, Wall, Tall)',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Bathroom Vanities (24" to 66")',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Baseboards, Mouldings & Cabinet Hardware',
      },
    ],
  },
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body className="bg-stone-50 text-stone-900 font-sans antialiased selection:bg-[#f28a0b] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
