<script setup lang="ts">
const { locale } = useI18n();
const localeStore = useLocaleStore();

const isRTL = computed(() => {
  return locale.value === 'ar';
});
</script>

<template>
  <div>
    <!-- Overlay Component -->
    <overlay-component :visible="localeStore.isOverlayVisible" />

    <div :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">
      <!-- navbar component -->
      <navbar />

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