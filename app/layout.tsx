import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ExitIntentPopup from "@/components/ExitIntentPopup";

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
    default: "Learn SAP with Sayan | Expert SAP Training & Consulting",
    template: "%s | Learn SAP with Sayan",
  },
  description: "Master SAP ABAP, RAP, CAP, and BTP with expert-led training and consulting. Solve complex technical issues with practical tutorials and professional architecture guidance.",
  applicationName: "Learn SAP with Sayan",
  keywords: [
    "SAP Training", 
    "SAP Consulting", 
    "SAP ABAP Tutorial", 
    "SAP RAP Training", 
    "SAP CAP Workflow", 
    "SAP BTP Consulting", 
    "SAP Technical Issues", 
    "SAP Architecture Guidance", 
    "Learn SAP RAP", 
    "SAP Fiori Development"
  ],
  authors: [{ name: "Sayan Samanta" }],
  creator: "Sayan Samanta",
  publisher: "Learn SAP with Sayan",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Learn SAP with Sayan | Expert SAP Training & Consulting",
    description: "Master SAP ABAP, RAP, CAP, and BTP with expert-led training and consulting. Solve complex technical issues with practical tutorials.",
    url: "https://www.learnsapwithsayan.com",
    siteName: "Learn SAP with Sayan",
    type: "website",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Learn SAP with Sayan - Expert SAP Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn SAP with Sayan | Expert SAP Training & Consulting",
    description: "Master SAP ABAP, RAP, CAP, and BTP with expert-led training and consulting.",
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
      <body className="min-h-full flex flex-col">
        <ExitIntentPopup />
        {children}
      </body>
    </html>
  );
}
