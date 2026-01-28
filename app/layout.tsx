import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} | Logistics & Transport in Nigeria`,
    template: `%s | ${siteMeta.name}`
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  openGraph: {
    title: siteMeta.name,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.name,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Logic Gates Logistics"
      }
    ]
  },
  icons: {
    icon: "/logo.png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
