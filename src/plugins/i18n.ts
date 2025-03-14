import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

function loadLocaleMessages(): Record<string, any> {
  return {
    en,
    ar,
  };
}

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});
