"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocale } from "next-intl";
import { setLocale } from "@/store/localeSlice";
import { Locale } from "@/i18n/routing";

const LocaleUpdater = () => {
  const dispatch = useDispatch();
  const locale = useLocale();

  useEffect(() => {
    dispatch(setLocale(locale as Locale));
  }, [locale, dispatch]);

  return null;
};

export default LocaleUpdater;
