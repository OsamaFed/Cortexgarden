import "./globals.css";
import { ReduxProvider } from "../store/Prov";
import { Providers } from "./providers";

export const metadata = {
  title: "CortexGarden - Brain Training Games | Challenge Your Mind",
  description: "Train your brain with engaging trivia, math puzzles, memory games, and logic challenges. Choose from multiple difficulty levels and track your progress.",
  keywords: "brain training, trivia games, math puzzles, memory games, logic games, brain exercises, cognitive training, mental fitness",
  authors: [{ name: "CortexGarden Team" }],
  creator: "CortexGarden",
  publisher: "CortexGarden",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cortexgarden.vercel.app",
    title: "CortexGarden - Brain Training Games",
    description: "Train your brain with engaging trivia, math puzzles, memory games, and logic challenges.",
    siteName: "CortexGarden",
    images: [
      {
        url: "https://i.imgur.com/cWZuLJB.jpeg",
        width: 1200,
        height: 630,
        alt: "CortexGarden - Brain Training Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CortexGarden - Brain Training Games",
    description: "Train your brain with engaging trivia, math puzzles, memory games, and logic challenges.",
    images: ["https://i.imgur.com/cWZuLJB.jpeg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <Providers>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
