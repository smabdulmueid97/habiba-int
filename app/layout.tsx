import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import your Navbar and new Footer components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habiba International School",
  description: "Official website for Habiba International School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <LanguageProvider>
          {/* The Navbar stays at the top */}
          <Navbar />
          
          {/* The page content renders here */}
          {children}
          
          {/* 2. Place the Footer at the bottom so it appears on all pages! */}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
