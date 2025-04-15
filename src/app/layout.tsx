import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
