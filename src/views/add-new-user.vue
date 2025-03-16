<template>
    <div>
        <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-lg p-4 mx-auto bg-white rounded shadow dark:bg-gray-800">
                <h2 class="mb-4 text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                    {{ $t('form.add_new_user') }}
                </h2>
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label for="name" class="block mb-1 text-gray-700 dark:text-gray-300">
                            {{ $t('form.name') }}
                        </label>
                        <input id="name" type="text" v-model="name"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                        <span v-if="errors.name" class="text-sm text-red-500">{{ $t(errors.name) }}</span>
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block mb-1 text-gray-700 dark:text-gray-300">
                            {{ $t('form.email') }}
                        </label>
                        <input id="email" type="email" v-model="email"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                        <span v-if="errors.email" class="text-sm text-red-500">{{ $t(errors.email) }}</span>
                    </div>

                    <div class="mb-4">
                        <label for="role" class="block mb-1 text-gray-700 dark:text-gray-300">
                            {{ $t('form.role') }}
                        </label>
                        <select id="role" v-model="role"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                            <option value="Admin">{{ $t('form.admin') }}</option>
                            <option value="User">{{ $t('form.manager') }}</option>
                            <option value="User">{{ $t('form.viewer') }}</option>
                        </select>
                        <span v-if="errors.role" class="text-sm text-red-500">{{ $t(errors.role) }}</span>
                    </div>

                    <div class="mb-4">
                        <label for="dateJoined" class="block mb-1 text-gray-700 dark:text-gray-300">
                            {{ $t('form.date_joined') }}
                        </label>
                        <input id="dateJoined" type="date" v-model="dateJoined"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                        <span v-if="errors.dateJoined" class="text-sm text-red-500">{{ $t(errors.dateJoined) }}</span>
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" :disabled="isAdding"
                            class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring">
                            <iconify-icon icon="line-md:loading-twotone-loop" width="24" height="24"
                                v-if="isAdding"></iconify-icon>
                            <span v-else>{{ $t('form.add') }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMockApiService } from '@/services/mockApiService';
import { useValidation } from '@/composables/useValidation';

const { addUser } = useMockApiService();
const router = useRouter();

const name = ref('');
const email = ref('');
const role = ref('');
const dateJoined = ref('');

const isAdding = ref(false);

const errors = ref({
    name: '',
    email: '',
    role: '',
    dateJoined: ''
});

const { validateRequired } = useValidation();

function submitForm() {
    errors.value.name = validateRequired(name.value, 'validation.required.name') || '';
    errors.value.email = validateRequired(email.value, 'validation.required.email') || '';
    errors.value.role = validateRequired(role.value, 'validation.required.role') || '';
    errors.value.dateJoined = validateRequired(dateJoined.value, 'validation.required.date_joined') || ''
    if (Object.values(errors.value).some(error => error)) return;
    isAdding.value = true;
    const newUser = {
        name: name.value,
        email: email.value,
        role: role.value,
        dateJoined: dateJoined.value,
    };
    addUser(newUser)
        .then(() => {
            return new Promise(resolve => setTimeout(resolve, 3000));
        })
        .then(() => {
            router.push('/table-view');
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            isAdding.value = false;
            name.value = '';
            email.value = '';
            role.value = 'User';
            dateJoined.value = new Date().toISOString().slice(0, 10);
        })
}
</script>