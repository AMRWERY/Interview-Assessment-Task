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
                        <input name="email" type="email"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-300"
                            :placeholder="t('form.enter_email')" v-model="email" />
                        <span v-if="errors.email" class="text-sm text-red-500">{{ $t(errors.email) }}</span>
                    </div>
                    <div>
                        <label class='block mb-2 text-sm font-medium text-slate-800 dark:text-slate-200'>{{
                            $t('form.password') }}</label>
                        <div class="relative">
                            <input name="password" :type="passwordType"
                                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-300"
                                :placeholder="t('form.enter_password')" v-model="password" />
                            <!-- Toggle Button -->
                            <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3"
                                @click="togglePassword">
                                <iconify-icon :icon="passwordVisible ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                                    width="24" height="24" class="text-gray-400 dark:text-gray-400"></iconify-icon>
                            </button>
                        </div>
                        <span v-if="errors.password" class="text-sm text-red-500">{{ $t(errors.password) }}</span>
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

        <!-- dynamic-toast component -->
        <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
            <div class="pointer-events-auto">
                <dynamic-toast v-if="showToast" :message="toastMessage" :toastType="toastType" :duration="5000"
                    :toastIcon="toastIcon" @toastClosed="showToast = false" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useValidation } from '@/composables/useValidation';
import { useToast } from '@/composables/useToast';

const { t } = useI18n()
const email = ref('');
const password = ref('');
const auth = useAuth();
const router = useRouter();
const isAdding = ref(false);

const errors = ref({
    email: '',
    password: ''
});

const { validateRequired } = useValidation();

const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleLogin = async () => {
    errors.value = { email: '', password: '' };
    errors.value.email = validateRequired(email.value, 'validation.required.email') || '';
    errors.value.password = validateRequired(password.value, 'validation.required.password') || '';
    if (errors.value.email || errors.value.password) return;
    try {
        const user = auth.login(email.value, password.value);
        if (user) {
            isAdding.value = true;
            setTimeout(() => {
                router.push('/table-view');
                isAdding.value = false;
            }, 2000);
        } else {
            triggerToast({
                message: t('toast.invalid_credentials'),
                type: 'warning',
                icon: 'material-symbols:warning-rounded'
            });
        }
    } catch (err) {
        triggerToast({
            message: t('toast.login_failed'),
            type: 'warning',
            icon: 'material-symbols:warning-rounded'
        });
    }
};

const passwordVisible = ref(false);
const togglePassword = () => {
    passwordVisible.value = !passwordVisible.value;
};

const passwordType = computed(() => (passwordVisible.value ? 'text' : 'password'));
</script>