"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryString = searchParams?.toString();
  const search = queryString ? `?${queryString}` : "";
  const hash =
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash
      : "";

  const hasLocalePrefix = /^\/(en|ar)(\/|$)/.test(pathname);
  const currentLocale = hasLocalePrefix
    ? (pathname.match(/^\/(en|ar)/) || [])[1] || "en"
    : "en";
  const newLocale = currentLocale === "ar" ? "en" : "ar";

  const basePath = hasLocalePrefix
    ? pathname.replace(/^\/(en|ar)/, "")
    : pathname;
  const candidatePath = `/${newLocale}${basePath}${search}${hash}`;

  // دالة تتأكد إن التنقل مش يسبب 404: لو حصل 404 نعمل redirect إلى الصفحة الأساسية ل locale
  const handleToggle = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      // نجرب push للـ candidatePath أولًا
      await router.push(candidatePath);
      // لو الصفحة اللي فتحناها هي صفحة 404، عادة Next يظهر صفحة 404 client-side.
      // ما نقدرش برمجياً نتحقق مباشرة من status HTTP هنا، لذا نستخدم حل احتياطي بعد تأخير بسيط:
      setTimeout(() => {
        // لو العنوان الحالي لم يتغير للـ candidatePath (يعني ممكن حصل redirect ل404 أو middleware redirected)
        if (!window.location.pathname.startsWith(`/${newLocale}`)) {
          // نعيد التوجيه للجذر الخاص بالـ locale
          router.replace(`/${newLocale}`);
        }
      }, 400);
    } catch (err) {
      console.error("Language toggle failed:", err);
      // فشل: نعيد التوجيه للجذر الخاص بالـ locale
      router.replace(`/${newLocale}`);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
      <span style={{ fontSize: 14 }}>
        {currentLocale === "ar" ? "اللغة الحالية: العربية" : "Current: English"}
      </span>

      <button
        onClick={handleToggle}
        style={{
          cursor: "pointer",
          backgroundColor: "#0b63ff",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: 8,
          fontWeight: 600,
        }}
      >
        {newLocale === "ar" ? "العربية" : "English"}
      </button>
    </div>
  );
}
