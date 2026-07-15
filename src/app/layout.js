import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://joblyhub.com"),
  title: {
    default: "JoblyHub",
    template: "%s | JoblyHub",
  },
  description:
    "Find jobs, hire talent and read career insights.",

  openGraph: {
    siteName: "JoblyHub",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}