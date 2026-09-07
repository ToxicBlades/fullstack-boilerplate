import "./styles.css";
import { createMetadata } from "@project/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  description: "A thoughtful studio for brands, products, and better ideas.",
  title: "Project",
});

import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geist.variable} ${geistMono.variable}`} lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
