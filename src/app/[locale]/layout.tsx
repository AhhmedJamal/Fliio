import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { getMessages } from "next-intl/server";
import ClientWrapper from "@/components/layout/ClientWrapper";
// لا تستورد useToggleMode هنا!

const archivo = Archivo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fliio",
  description: "Headphones & Accessories Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

 
  const setThemeScript = `
    try {
      const isDark = localStorage.getItem('theme') === 'dark';
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  `;

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
      </head>
      <body
        className={`${archivo.className} antialiased`}
        cz-shortcut-listen="true"
      >
        {/* ClientWrapper هو اللي يستدعي useToggleMode */}
        <ClientWrapper messages={messages}>{children}</ClientWrapper>
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
