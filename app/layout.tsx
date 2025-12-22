import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Equine Oracle - Horse Racing Predictions",
  description: "AI-powered horse racing predictions using advanced machine learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
