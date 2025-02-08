"use client";  // Ensure this is marked as client-side rendering if you're using client-only features

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>{children}</main>  {/* Wrap children inside a <main> tag */}
        <Footer />
      </body>
    </html>
  );
}
