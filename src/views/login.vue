<template>
    <div>
        <div class="flex items-center justify-center min-h-screen">
            <form class="w-full max-w-lg p-4 mx-auto bg-white rounded shadow dark:bg-gray-800"
                @submit.prevent="handleLogin">
                <h3 class="mb-8 text-2xl font-bold text-center text-slate-900 lg:text-3xl dark:text-slate-200">
                    {{ $t('form.sign_in') }}
                </h3>

                <div class="space-y-6">
                    <div>
                        <label class='block mb-2 text-sm font-medium text-slate-800 dark:text-slate-200'>{{
                            $t('form.email') }}</label>
                        <input name="email" type="email" required
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-300"
                            :placeholder="t('form.enter_email')" v-model="email" />
                    </div>
                    <div>
                        <label class='block mb-2 text-sm font-medium text-slate-800 dark:text-slate-200'>{{
                            $t('form.password') }}</label>
                        <input name="password" type="password" required
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-300"
                            :placeholder="t('form.enter_password')" v-model="password" />
                    </div>
                </div>

                <div class="mt-8">
                    <button type="submit"
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
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { t } = useI18n()
const email = ref('');
const password = ref('');
const error = ref('');
const auth = useAuth();
const router = useRouter();
const isAdding = ref(false);

const handleLogin = async () => {
    try {
        const user = auth.login(email.value, password.value);
        if (user) {
            isAdding.value = true;
            setTimeout(() => {
                router.push('/table-view');
                isAdding.value = false;
            }, 2000);
        } else {
            error.value = 'Invalid credentials';
        }
    } catch (err) {
        error.value = 'Login failed';
    }
};
</script>