"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { toast, Toaster } from "sonner";

const SlideTextTop: React.FC = () => {
  const codeDis: string = "Fliio40";
  const message: string = `Get a discount 40% when using Code: ${codeDis}`;

  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const speed: number = 50;
  const pauseRef = useRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lang, setLang] = useState<"en" | "ar">("en");

  const handlePause = (v: boolean): void => {
    pauseRef.current = v;
  };

  const getContentHalfWidth = () =>
    containerRef.current ? containerRef.current.scrollWidth / 2 : 0;

  const animateLeft = (delta: number, width: number) => {
    const next = x.get() - (speed * delta) / 1000;
    x.set(next <= -width / 2 ? 0 : next);
  };

  useAnimationFrame((_, delta) => {
    if (pauseRef.current || !containerRef.current) return;
    const width = getContentHalfWidth();
    if (!width) return;

    animateLeft(delta, width);
  });

  const notify = (): void => {
    navigator.clipboard.writeText(codeDis);
    toast.success(`Code copied: ${codeDis}`, {
      description: "Paste it at checkout to get your 40% discount 🎉",
    });
  };

  return (
    <div
      className="top-nav bg-black text-white py-2 overflow-hidden whitespace-nowrap"
      onMouseEnter={() => handlePause(true)}
      onMouseLeave={() => handlePause(false)}
      ref={containerRef}
    >
      <Toaster position="top-center" />
      <motion.div
        className="inline-flex cursor-pointer"
        style={{ x }}
        onClick={notify}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {Array.from({ length: 20 }).map((_, idx) => (
          <span key={idx} className="px-4">
            {message}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
export default SlideTextTop;
