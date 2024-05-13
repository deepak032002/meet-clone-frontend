"use client";

import React, { useEffect } from "react";
import HeroSection from "../organism/HeroSection";
import { useUserContext } from "@/context/UserContext";

const HomeTemplate: React.FC<{ data: User | null }> = ({ data }) => {
  const { setUser } = useUserContext();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="z-10">
        <HeroSection />
      </div>
    </div>
  );
};

export default HomeTemplate;
