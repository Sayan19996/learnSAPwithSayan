import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.learnsapwithsayan.com"),
  title: {
    default: "Learn SAP with Sayan",
    template: "%s | Learn SAP with Sayan",
  },
  description: "Practical SAP tutorials, architecture guidance, RAP and Fiori learning paths, and career roadmap content.",
  applicationName: "Learn SAP with Sayan",
  keywords: ["SAP", "ABAP", "RAP", "Fiori", "BTP", "CDS", "architecture"],
  authors: [{ name: "Sayan Samanta" }],
  creator: "Sayan Samanta",
  publisher: "Learn SAP with Sayan",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Learn SAP with Sayan",
    description: "Practical SAP tutorials, architecture guidance, RAP and Fiori learning paths, and career roadmap content.",
    url: "https://www.learnsapwithsayan.com",
    siteName: "Learn SAP with Sayan",
    type: "website",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Learn SAP with Sayan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn SAP with Sayan",
    description: "Practical SAP tutorials, architecture guidance, RAP and Fiori learning paths, and career roadmap content.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
