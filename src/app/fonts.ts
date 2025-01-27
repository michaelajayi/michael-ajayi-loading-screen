import { Cormorant_Unicase, Satisfy } from "next/font/google";

export const cormorant = Cormorant_Unicase({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-cormorant",
});

export const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
  variable: "--font-satisfy",
});
