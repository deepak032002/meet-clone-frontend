"use client";
import React from "react";
import Image from "next/image";
import { CiLogout, CiUser } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/UserContext";
import { deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserDropDown = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none dark:focus-visible:outline-none">
        <div className="w-10 h-10 !p-0 focus-visible:ring-0 dark:focus-visible:ring-0 rounded-full overflow-hidden">
          {user && user.image ? (
            <Image
              src={user.image}
              alt="avatar"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-neutral-400 w-full h-full" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CiUser className="me-2 text-xl" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            deleteCookie("token");
            toast.success("Logout Successful");
            setUser(null);
            router.push("/login");
          }}
        >
          <CiLogout className="me-2 text-xl" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
