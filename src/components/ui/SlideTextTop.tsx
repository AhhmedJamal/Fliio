"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { toast, Toaster } from "sonner";
import { useTranslations } from "next-intl";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
interface SlideTextTopProps {
  discount?: number;
  code?: string;
}
const SlideTextTop: React.FC<SlideTextTopProps> = ({
  discount = 40,
  code = `Fliio${discount}`,
}) => {
  const t = useTranslations("SlideTop");
  const textSlide = `${t("text", { dis: discount, code })}`;
  const locale = useSelector((state: RootState) => state.locale.value);

  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const speed = 50;
  const pauseRef = useRef(false);

  const isRTL = locale === "ar";

  const handlePause = (v: boolean) => {
    pauseRef.current = v;
  };

  const getContentHalfWidth = () =>
    containerRef.current ? containerRef.current.scrollWidth / 2 : 0;

  const animate = (delta: number, width: number) => {
    const direction = isRTL ? 1 : -1;
    const next = x.get() + direction * ((speed * delta) / 1000);
    if (isRTL) {
      x.set(next >= width / 2 ? 0 : next);
    } else {
      x.set(next <= -width / 2 ? 0 : next);
    }
  };

  useAnimationFrame((_, delta) => {
    if (pauseRef.current || !containerRef.current) return;
    const width = getContentHalfWidth();
    if (!width) return;
    animate(delta, width);
  });

  // Notify function to copy code and show toast
  const notify = () => {
    navigator.clipboard.writeText(code);
    toast.success(`${t("code", { code })}`, {
      description: t("message", { dis: discount }),
    });
  };

  return (
    <>
      <Toaster />
      <div
        className="overflow-hidden bg-black text-white py-2 cursor-pointer select-none"
        onMouseEnter={() => handlePause(true)}
        onMouseLeave={() => handlePause(false)}
        onClick={notify}
        ref={containerRef}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <motion.div
          className="whitespace-nowrap flex gap-10"
          style={{ x }}
          animate={{
            x: isRTL ? [0, getContentHalfWidth()] : [0, -getContentHalfWidth()],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {Array.from({ length: 10 }).map((_, idx) => (
            <span key={idx}>{textSlide}</span>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SlideTextTop;
