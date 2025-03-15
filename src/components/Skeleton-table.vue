<template>
    <div>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-[#181a1b]">
                <tr>
                    <th
                        class="px-4 py-2 text-sm font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                        {{ $t('table.id') }}
                    </th>
                    <th
                        class="px-4 py-2 text-sm font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                        {{ $t('table.name') }}
                    </th>
                    <th
                        class="px-4 py-2 text-sm font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                        {{ $t('table.role') }}
                    </th>
                    <th
                        class="px-4 py-2 text-sm font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                        {{ $t('table.email') }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-[#181a1b] divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="n in skeletonRows" :key="n" class="animate-pulse">
                    <td class="px-4 py-2 whitespace-nowrap">
                        <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap">
                        <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap">
                        <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap">
                        <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Number of skeleton rows to display
const skeletonRows = ref(5);
</script>