import type { Metadata } from "next";
import bgImage from "../../public/images/bg-image.png";

import { cormorant, satisfy } from "./fonts";

import Image from "next/image";
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
        <div className='w-screen h-screen relative overflow-hidden'>
          <Image
            src={bgImage}
            alt='bg image'
            className='absolute inset-0 object-cover w-full h-full scale-125 blur-[1px]'
          />
          <div className='absolute inset-0 bg-black bg-opacity-[50%]'></div>
          {children}
        </div>
      </body>
    </html>
  );
}
