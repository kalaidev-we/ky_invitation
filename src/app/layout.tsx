import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Little Miracle is on the Way | Krithika Yogesh's Baby Shower",
  description: "Join us in celebrating the beautiful journey of motherhood for Krithika Yogesh. You are warmly invited to the Baby Shower Ceremony on 18 June 2026 at Annapoorna, Coimbatore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins bg-pastel-bg text-[#4A3B32]">
        {children}
      </body>
    </html>
  );
}

