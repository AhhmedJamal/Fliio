import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <LanguageSwitcher />
    </div>
  );
}
