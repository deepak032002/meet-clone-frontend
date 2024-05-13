"use client";

import Link from "next/link";
import React from "react";
import { Audiowide } from "next/font/google";
import { useUserContext } from "@/context/UserContext";
import UserDropDown from "@/design-system/molecules/UserDropDown";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const audioWide = Audiowide({ subsets: ["latin"], weight: "400" });

const Header = () => {
  const { user } = useUserContext();

  const pathname = usePathname();

  if (pathname.includes("room")) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <Link
              className="flex flex-shrink-0 items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
              href="/"
            >
              <span className={`md:text-2xl text-lg ${audioWide.className}`}>
                Geek Connect
              </span>
            </Link>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-4">
            {!user && (
              <Button asChild variant={"ghost"}>
                <Link href="/login">Login</Link>
              </Button>
            )}

            {user && <UserDropDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
