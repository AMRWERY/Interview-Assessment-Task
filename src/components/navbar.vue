<template>
    <div>
        <nav class="flex items-center h-10 shadow-xl px-7">
            <div class="flex">
                <router-link to="" class="font-semibold text-gray-700 me-4" role="button" v-if="localeStore.isRTL">
                    <span class="[&>svg]:w-5" @click="setLocale('en')">
                        En
                    </span>
                </router-link>
                <router-link to="" class="font-semibold text-gray-700 me-4" role="button" v-else>
                    <span class="[&>svg]:w-5" @click="setLocale('ar')">
                        العربية
                    </span>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
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
</script>