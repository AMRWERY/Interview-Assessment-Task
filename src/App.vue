<template>
  <div>
    <!-- Overlay Component -->
    <overlay-component :visible="overlayVisible" />

    <div :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">
      <!-- navbar component -->
      <navbar v-if="showNavbar" :is-dark="themeStore.isDark" @toggle-theme="themeStore.toggleTheme" />

      <main>
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore.ts'

const { locale } = useI18n();
const localeStore = useLocaleStore();
const themeStore = useThemeStore();

const isRTL = computed(() => {
  return locale.value === 'ar';
});

onMounted(() => {
  themeStore.loadTheme();
});

const overlayVisible = computed(() => {
  return themeStore.showOverlay || localeStore.isOverlayVisible;
});

const route = useRoute();

const showNavbar = computed(() => {
  return !route.meta.hideNavbar;
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>