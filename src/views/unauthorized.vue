<template>
    <div>
        <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-lg p-4 mx-auto bg-white rounded shadow dark:bg-gray-800">
                <div class="p-8 text-center">
                    <iconify-icon icon="material-symbols:warning-rounded" width="100" height="100"
                        class="mb-3 text-gray-900 dark:text-gray-200"></iconify-icon>
                    <h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-200">{{
                        $t('error_page.unauthorized_access') }}</h1>
                    <p class="font-semibold text-gray-700 dark:text-gray-100">{{
                        $t('error_page.you_do_not_have_permission_to_view_this_page') }}</p>
                    <router-link to="/table-view" class="inline-block mt-4 text-blue-500 dark:text-blue-300">
                        {{ $t('error_page.go_home') }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>