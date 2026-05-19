import "./globals.css";
import { Toaster } from 'sonner';

export const metadata = {
  title: {
    default: "The Arcam Project | Timeless Digital Experiences",
    template: "%s | The Arcam Project",
  },
  description: "Premium digital agency crafting world-class websites, bespoke engineering, and elite brand experiences for ambitious businesses. Built for the modern web.",
  keywords: ["digital agency", "premium web development", "bespoke websites", "conversion optimization", "Next.js agency", "elite UX design", "timeless digital experiences", "software engineering"],
  authors: [{ name: "The Arcam Project", url: "https://thearcamproject.in" }],
  creator: "The Arcam Project",
  publisher: "The Arcam Project",
  metadataBase: new URL('https://thearcamproject.in'),
  alternates: {
    canonical: '/',
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thearcamproject.in",
    siteName: "The Arcam Project",
    title: "The Arcam Project | Timeless Digital Experiences",
    description: "Premium digital agency crafting world-class websites and elite brand experiences. Architected for high-fidelity conversion.",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'The Arcam Project - Premium Digital Agency',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Arcam Project | Timeless Digital Experiences",
    description: "Premium digital agency crafting world-class digital systems and brand experiences.",
    images: ['/logo.png'],
    creator: "@thearcamproject",
  },
  verification: {
    google: "ADD_GOOGLE_VERIFICATION_ID_HERE", // Optional: the user can replace this
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050505" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.addEventListener('pageshow', function(event) {
                  if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
                    window.location.reload();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="bg-black text-white">
        {children}
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '16px' } }} />
      </body>
    </html>
  );
}
