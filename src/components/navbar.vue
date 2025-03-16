<template>
    <div>
        <nav class="flex items-center h-10 shadow-xl px-7 dark:shadow-transparent">
            <!-- Make the container full width with w-full -->
            <div class="flex items-center justify-between w-full">
                <!-- Left side group -->
                <div class="flex items-center gap-5">
                    <router-link to="" role="button" @click="handleLogout"
                        class="relative flex text-gray-700 rounded-full cursor-pointer dark:text-gray-200">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">logout</span>
                        <iconify-icon icon="material-symbols:logout" width="24" height="24"></iconify-icon>
                    </router-link>

                    <div class="flex">
                        <router-link to="" class="font-semibold text-gray-700 dark:text-gray-200" role="button"
                            v-if="localeStore.isRTL">
                            <span class="w-5" @click="setLocale('en')">
                                En
                            </span>
                        </router-link>
                        <router-link to="" class="font-semibold text-gray-700 dark:text-gray-200" role="button" v-else>
                            <span class="w-5" @click="setLocale('ar')">
                                العربية
                            </span>
                        </router-link>
                    </div>

                    <router-link to="" role="button"
                        class="relative flex text-gray-700 rounded-full cursor-pointer dark:text-gray-200"
                        @click.prevent="emit('toggle-theme')">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">toggle theme</span>
                        <iconify-icon
                            :icon="isDark ? 'material-symbols:wb-sunny-rounded' : 'material-symbols:moon-stars'"
                            width="24" height="24" class="ms-2"></iconify-icon>
                    </router-link>
                </div>

                <!-- Right side group: Image and user text -->
                <div class="flex items-center gap-3">
                    <img src="https://justfields.com/storage/projects/7M5rV059/images.jpg" alt="user-img"
                        class="w-8 h-8 border border-gray-200 rounded-full">
                    <p class="font-semibold text-gray-700 dark:text-gray-200">{{ currentUserRole }}</p>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/localeStore';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const { locale } = useI18n();
const localeStore = useLocaleStore();

onMounted(() => {
    locale.value = localeStore.locale;
});

const setLocale = (value: string) => {
    locale.value = value;
    localeStore.updateLocale(value);
};

computed(() => {
    const storedLocale = localeStore.locale;
    setLocale(storedLocale);
});

const router = useRouter();
const auth = useAuth();

function handleLogout() {
    auth.logout();
    router.push('/login');
}

//toggle themes
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

const props = defineProps<{ isDark: boolean }>();

const isDark = computed(() => props.isDark);

const currentUserRole = computed(() => auth.currentUser.value?.role || '');
</script>