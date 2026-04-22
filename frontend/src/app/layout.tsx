import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from 'next/font/google'
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "KaziCast | The Infrastructure for East African Film",
  description: "East Africa's premier platform for talent discovery and production infrastructure. Built for actors, models, and directors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#080808] text-[#F7F4EF] font-sans selection:bg-[#C8A97E] selection:text-black">
        {children}
      </body>
    </html>
  );
}
