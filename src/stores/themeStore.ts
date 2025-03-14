import { defineStore } from "pinia";

interface ThemeState {
  isDark: boolean;
  showOverlay: boolean;
}

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    isDark: false,
    showOverlay: false,
  }),

  actions: {
    toggleTheme() {
      this.showOverlay = true;
      setTimeout(() => {
        this.isDark = !this.isDark;
        if (this.isDark) {
          document.body.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.body.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        this.showOverlay = false;
      }, 3000);
    },

    loadTheme() {
      const savedTheme: string | null = localStorage.getItem("theme");
      this.isDark = savedTheme === "dark";
      if (this.isDark) {
        document.body.classList.add("dark");
      }
    },
  },
});
