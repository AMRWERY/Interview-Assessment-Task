<template>
    <div>
        <div class="flex justify-start">
            <div class="relative w-full mb-8">
                <input type="text" :value="modelValue" @input="updateValue"
                    :placeholder="t('table.search_by_name_role_or_status')"
                    class="w-full px-3 py-2 leading-tight text-gray-800 transition-colors border-2 border-gray-300 rounded-md appearance-none dark:text-gray-200 ps-10 pe-10 hover:border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-outline dark:border-gray-600 dark:hover:border-gray-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 dark:bg-gray-800" />
                <div class="absolute inset-y-0 flex items-center ps-3 start-0">
                    <iconify-icon icon="material-symbols:search" width="24px" height="24px"
                        class="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"></iconify-icon>
                </div>
                <div class="absolute inset-y-0 flex items-center pe-3 end-0" @click="clearValue">
                    <iconify-icon icon="material-symbols:close-small-rounded" width="24px" height="24px"
                        class="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"></iconify-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

function updateValue(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
}

function clearValue() {
    emit('update:modelValue', '');
}
</script>