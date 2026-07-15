import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://joblyhub.com"),

  title: {
    default: "JoblyHub",
    template: "%s | JoblyHub",
  },

  description:
    "Connecting Opportunities, Building Trust. Find jobs, recruit top talent, and grow your career with JoblyHub.",

  openGraph: {
    title: "JoblyHub",
    description:
      "Connecting Opportunities, Building Trust. Find jobs, recruit top talent, and grow your career with JoblyHub.",
    url: "https://joblyhub.com",
    siteName: "JoblyHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JoblyHub",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JoblyHub",
    description:
      "Connecting Opportunities, Building Trust. Find jobs, recruit top talent, and grow your career with JoblyHub.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}