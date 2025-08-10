import type { Metadata } from "next";
import { Kdam_Thmor_Pro } from 'next/font/google';
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const kdamThmorPro = Kdam_Thmor_Pro({
  weight: '400', // Você pode especificar os pesos que precisa
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ramal List by Rodrigosiqq",
  description: "Created by Rodrigosiqq - developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${kdamThmorPro} ${kdamThmorPro} antialiased overflow-hidden flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
