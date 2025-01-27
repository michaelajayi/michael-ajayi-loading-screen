import type { Metadata } from "next";

import { cormorant, satisfy } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Ajayi | Loading Screen",
  description: "Michael Ajayi | Loading Screen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${cormorant.variable} ${satisfy.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
