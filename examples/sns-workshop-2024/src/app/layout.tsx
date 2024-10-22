import type { Metadata } from "next";
import { AppWalletProvider } from "@/components/AppWalletProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNS Workshop 2024",
  description: "SDK Demo for SNS Workshop 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
