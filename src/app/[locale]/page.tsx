"use client";
import { useToggleMode } from "@/hook/useToggleMode";
import HeroSection from "@/components/ui/HeroSection";

export default function HomePage() {
  useToggleMode();
  return (
    <>
      <HeroSection />
    </>
  );
}
