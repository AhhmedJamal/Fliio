"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocale } from "next-intl";
import { setLocale } from "@/store/localeSlice";

const LocaleUpdater = () => {
  const dispatch = useDispatch();
  const locale = useLocale();

  useEffect(() => {
    dispatch(setLocale(locale));
  }, [locale, dispatch]);

  return null;
};

export default LocaleUpdater;
