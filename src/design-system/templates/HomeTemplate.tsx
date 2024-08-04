"use client";

import React from "react";
import HeroSection from "@/design-system/organism/HeroSection";

const HomeTemplate: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full relative">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="z-10">
        <HeroSection />
      </div>
    </div>
  );
};

export default HomeTemplate;
