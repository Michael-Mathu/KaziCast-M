import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
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
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-surface-variant text-text-main font-sans selection:bg-accent/20 selection:text-text-main">
        <Providers>
          {children}
          <div className="fixed bottom-6 right-6 z-[9999]">
            <ThemeToggle />
          </div>
        </Providers>
      </body>
    </html>
  );
}
