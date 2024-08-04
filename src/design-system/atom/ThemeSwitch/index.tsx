"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </Button>
  );
};

export default ThemeSwitch;
