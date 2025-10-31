"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";
import Header from "./Header";
import { useToggleMode } from "@/hook/useToggleMode";

type Props = {
  messages: Record<string, unknown>;
  locale?: string; // 👈 أضفناها هنا
  children: React.ReactNode;
};

export default function ClientWrapper({
  messages,
  locale = "en",
  children,
}: Props) {
  useToggleMode();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      {children}
    </NextIntlClientProvider>
  );
}
