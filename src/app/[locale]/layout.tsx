import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";

const archivo = Archivo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fliio",
  description: "Headphones & Accessories Store",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        cz-shortcut-listen="true"
        className={`${archivo.className} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// components/
// │
// ├── layout/
// │   ├── Header.tsx
// │   ├── Navbar.tsx
// │   ├── Footer.tsx
// │   └── MainLayout.tsx
// │
// ├── shared/
// │   ├── Button.tsx
// │   ├── Card.tsx
// │   ├── Modal.tsx
// │   ├── ThemeSwitcher.tsx
// │   └── LanguageSwitcher.tsx
// │
// └── ui/
//     ├── HeroSection.tsx
//     ├── FeaturesSection.tsx
//     ├── Testimonials.tsx
//     ├── PricingSection.tsx
//     ├── FAQSection.tsx
//     ├── ContactSection.tsx
//     ├── AboutSection.tsx
//     ├── ServicesSection.tsx
//     ├── CTASection.tsx
//     └── TeamSection.tsx
