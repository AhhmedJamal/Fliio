import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header/Header";
import ReduxProviderWrapper from "@/components/layout/ReduxProviderWrapper";

const archivo = Archivo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fliio",
  description: "Headphones & Accessories Store",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;


  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body cz-shortcut-listen="true" className={`${archivo.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
            <ReduxProviderWrapper>
              <Header />
              {children}
            </ReduxProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


