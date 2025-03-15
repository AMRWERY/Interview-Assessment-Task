<template>
    <div>
        <nav class="flex items-center h-10 shadow-xl px-7">
            <div class="flex">
                <router-link to="" class="font-semibold text-gray-700 me-4 dark:text-gray-200" role="button" v-if="localeStore.isRTL">
                    <span class="w-5" @click="setLocale('en')">
                        En
                    </span>
                </router-link>
                <router-link to="" class="font-semibold text-gray-700 me-4 dark:text-gray-200" role="button" v-else>
                    <span class="w-5" @click="setLocale('ar')">
                        العربية
                    </span>
                </router-link>
            </div>

            <router-link to="" role="button" class="relative flex text-gray-700 rounded-full cursor-pointer dark:text-gray-200"
                @click="emit('toggle-theme')">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">toggle theme</span>
                <iconify-icon :icon="isDark ? 'material-symbols:wb-sunny-rounded' : 'material-symbols:moon-stars'"
                    width="24" height="24" class="ms-2"></iconify-icon>
            </router-link>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/localeStore';

const { locale } = useI18n();
const localeStore = useLocaleStore();

onMounted(() => {
    locale.value = localeStore.locale;
});

const setLocale = (value) => {
    locale.value = value;
    localeStore.updateLocale(value);
};

computed(() => {
    const storedLocale = localeStore.locale;
    setLocale(storedLocale);
});

//toggle themes
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

const props = defineProps<{ isDark: boolean }>();

const isDark = computed(() => props.isDark);
</script>