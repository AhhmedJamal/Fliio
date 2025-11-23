"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocale } from "next-intl";
import { setLocale as setLocaleAction } from "@/store/localeSlice";
import type { Locale } from "@/i18n/routing";

export default function LocaleUpdater() {
  const dispatch = useDispatch();
  const locale = useLocale();

  useEffect(() => {
    dispatch(setLocaleAction(locale as Locale));
  }, [locale, dispatch]);

  return null;
}
