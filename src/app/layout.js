import "./globals.css";
import { Toaster } from 'sonner';

export const metadata = {
  title: "The Arcam Project | Timeless Digital Experiences",
  description: "Premium digital agency crafting world-class websites, digital systems, and brand experiences for ambitious businesses. EST. 2026 | Timeless By Design",
  keywords: "digital agency, premium websites, brand identity, conversion optimization, web design",
  authors: [{ name: "The Arcam Project" }],
  creator: "The Arcam Project",
  metadataBase: new URL('https://thearcamproject.in'),
  openGraph: {
    title: "The Arcam Project | Timeless Digital Experiences",
    description: "Premium digital agency crafting world-class digital experiences",
    url: "https://thearcamproject.in",
    siteName: "The Arcam Project",
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'The Arcam Project Logo' }],
    type: "website",
  },
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
