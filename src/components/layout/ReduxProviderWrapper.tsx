"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import LocaleUpdater from "@/components/layout/LocaleUpdater";

const ReduxProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <LocaleUpdater /> 
      {children}
    </Provider>
  );
};

export default ReduxProviderWrapper;
