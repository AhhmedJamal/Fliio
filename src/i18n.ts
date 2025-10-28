// src/i18n.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as any)) notFound();
  try {
    const messagesModule = await import(`./messages/${locale}.json`);
    const messages = messagesModule?.default ?? messagesModule;
    return { locale, messages };
  } catch (err) {
    console.error("[i18n] failed to load messages for locale:", locale, err);
    notFound();
  }
});
