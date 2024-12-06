import type { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PaletGen",
  description: "AI powered color palette generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white h-20 w-full sticky flex justify-start items-center shadow-sm">
          <h1 className=" mx-5">
            <Image
              src="/PaletGen.svg"
              alt="PaletGen Logo"
              width={75}
              height={75}
            />
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
