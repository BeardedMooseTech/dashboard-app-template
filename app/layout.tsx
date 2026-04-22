import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";

const muller = localFont({
  src: [
    {
      path: "../public/fonts/Muller-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Muller-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Muller-Bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-muller",
  display: "swap",
});

const kapraSemiBold = localFont({
  src: [
    {
      path: "../public/fonts/Typoforge Studio - Kapra Neue SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-kapra-semibold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pinsa Romana",
  description: "Progress Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${muller.className} ${muller.variable} ${kapraSemiBold.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
