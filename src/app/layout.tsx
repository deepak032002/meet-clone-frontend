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
import { getMe } from "@/lib/action";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GEEKS CONNECT",
  description: "Connect with your geeks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getMe();

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#ededed] dark:bg-[#1c1c1c] font-sans antialiased",
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
              <UserContextProvider userData={data.data.user}>
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
