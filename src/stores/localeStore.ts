import { defineStore } from "pinia";

interface LocaleState {
  locale: string;
  isOverlayVisible: boolean;
}

export const useLocaleStore = defineStore("locales", {
  state: (): LocaleState => ({
    locale: localStorage.getItem("locale") || "en",
    isOverlayVisible: false,
  }),

  actions: {
    updateLocale(value: string): void {
      this.isOverlayVisible = true;
      setTimeout(() => {
        this.locale = value;
        localStorage.setItem("locale", value);
        this.isOverlayVisible = false;
      }, 3000);
    },
  },

  getters: {
    isRTL(state: LocaleState): boolean {
      return state.locale === "ar";
    },
  },
});
