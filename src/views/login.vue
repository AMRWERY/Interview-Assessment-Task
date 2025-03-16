<template>
    <div>
        <div class="flex items-center justify-center min-h-screen">
            <form class="w-full max-w-md mx-auto">
                <h3 class="mb-8 text-2xl font-bold text-center text-slate-900 lg:text-3xl">
                    {{ $t('form.sign_in') }}
                </h3>

                <div class="space-y-6">
                    <div>
                        <label class='block mb-2 text-sm font-medium text-slate-800'>{{ $t('form.email') }}</label>
                        <input name="email" type="email" required
                            class="w-full px-4 py-3 text-sm border rounded-md outline-none bg-slate-100 text-slate-800 focus:border-blue-600 focus:bg-transparent"
                            :placeholder="t('form.enter_email')" />
                    </div>
                    <div>
                        <label class='block mb-2 text-sm font-medium text-slate-800'>{{ $t('form.password') }}</label>
                        <input name="password" type="password" required
                            class="w-full px-4 py-3 text-sm border rounded-md outline-none bg-slate-100 text-slate-800 focus:border-blue-600 focus:bg-transparent"
                            :placeholder="t('form.enter_password')" />
                    </div>
                </div>

                <div class="mt-8">
                    <button type="button"
                        class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        <iconify-icon icon="line-md:loading-twotone-loop" width="24" height="24"
                            v-if="isAdding"></iconify-icon>
                        <span v-else>{{ $t('form.log_in') }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isAdding = ref(false);
</script>