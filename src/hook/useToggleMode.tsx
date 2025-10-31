"use client";
import { useLayoutEffect } from "react";

export const useToggleMode = () => {
  useLayoutEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", isDark);
  }, []);
};
