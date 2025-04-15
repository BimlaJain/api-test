import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "API test",
  description: "lorem ipsum dolor sit amet",
  openGraph: {
    title: "API test",
    description: "lorem ipsum dolor sit amet ",
    images: [
      {
        url: "/meta-img.png",
        width: 900,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          {children}
        </Suspense>

      </body>
    </html>
  );
}
