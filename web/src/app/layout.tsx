import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const primaryFont = Mulish({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "eve.fm",
  description: "EVE.",
  openGraph: {
    siteName: "eve.fm",
    title: "eve.fm",
    description: "EVE.",
    type: "website",
  },
  metadataBase:
    process.env.NODE_ENV === "production" ?
      new URL("https://eve.fm") :
      new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={primaryFont.className}>{children}</body>
    </html>
  );
}
