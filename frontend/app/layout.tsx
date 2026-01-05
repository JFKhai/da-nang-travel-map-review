import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins, Lora } from "next/font/google"
import "./globals.css"
import NavbarWrapper from "./components/NavbarWrapper"
import Footer from "./components/Footer"

/**
 * Font Configurations
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

/**
 * Site Metadata
 * Defines SEO information for the application
 */
export const metadata: Metadata = {
  title: "Đà Nẵng Travel - Khám phá du lịch Đà Nẵng",
  description: "Website review và tìm kiếm địa điểm du lịch, ăn uống, khách sạn tại Đà Nẵng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${lora.variable} antialiased flex flex-col min-h-screen`}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        <NavbarWrapper />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
