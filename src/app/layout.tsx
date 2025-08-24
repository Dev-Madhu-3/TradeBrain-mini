import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeBrain - Intelligent Trading Journal & Analytics",
  description: "Sidhi baat no bakwas - Your intelligent trading companion for analyzing performance, tracking strategies, and improving your trading game.",
  keywords: ["trading", "journal", "analytics", "stocks", "forex", "crypto", "performance", "TradeBrain"],
  authors: [{ name: "TradeBrain Team" }],
  openGraph: {
    title: "TradeBrain - Intelligent Trading Journal & Analytics",
    description: "AI-powered trading journal and analytics platform for serious traders",
    url: "https://tradebrain.app",
    siteName: "TradeBrain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeBrain - Intelligent Trading Journal & Analytics",
    description: "AI-powered trading journal and analytics platform for serious traders",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
