import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kapraNeue = localFont({
  src: [
    {
      path: "../public/fonts/Typoforge Studio - Kapra Neue Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Typoforge Studio - Kapra Neue SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
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
      <body className={kapraNeue.className}>{children}</body>
    </html>
  );
}
