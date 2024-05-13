import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/context/ThemeContext";
import Header from "@/design-system/organism/Header";
import QueryProvider from "@/context/QueryProvider";
import { GlobalContextProvider } from "@/context/GlobalContext";
import { UserContextProvider } from "@/context/UserContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GEEKS CONNECT",
  description: "Connect with your geeks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-[url('/2.webp')] bg-cover bg-no-repeat",
          fontSans.variable
        )}
      >
        <ThemeContext
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="geeksconnect-theme"
        >
          <Toaster />
          <QueryProvider>
            <GlobalContextProvider>
              <UserContextProvider>
                <Header />
                {children}
              </UserContextProvider>
            </GlobalContextProvider>
          </QueryProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
