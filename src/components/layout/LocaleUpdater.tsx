import { Locale } from '@/i18n/routing';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocale } from "next-intl";
import { setLocale } from "@/store/localeSlice";
import { Locale } from "@/i18n/routing";


  useEffect(() => {
    dispatch(setLocale(locale as Locale));
  }, [locale, dispatch]);

const initialState: LocaleState = {
  locale: 'en',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;