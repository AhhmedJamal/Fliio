// store/localeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "@/i18n/routing";



const initialState = {
  value: "",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.value = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
