import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/hooks/userContext";

export const metadata: Metadata = {
  title: "Password Remember",
  description: "A password manager that doesn't store your passwords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-zinc-900 flex items-center flex-col justify-center">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
