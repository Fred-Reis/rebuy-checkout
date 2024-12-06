import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfPro = localFont({
  src: "./fonts/SFProRegular.woff",
  variable: "--font-sf-pro",
  weight: "400 500",
});

export const metadata: Metadata = {
  title: "Rebuy checkout",
  description: "App to checkout Rebuy products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.variable} antialiased`}>{children}</body>
    </html>
  );
}
