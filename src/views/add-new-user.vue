<template>
    <div>
        <div class="max-w-lg p-4 mx-auto bg-white rounded shadow dark:bg-gray-800">
            <h2 class="mb-4 text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                {{ $t('form.add_new_user') }}
            </h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="name" class="block mb-1 text-gray-700 dark:text-gray-300">
                        {{ $t('form.name') }}
                    </label>
                    <input id="name" type="text" v-model="name" required
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                </div>

                <div class="mb-4">
                    <label for="email" class="block mb-1 text-gray-700 dark:text-gray-300">
                        {{ $t('form.email') }}
                    </label>
                    <input id="email" type="email" v-model="email" required
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                </div>

                <div class="mb-4">
                    <label for="role" class="block mb-1 text-gray-700 dark:text-gray-300">
                        {{ $t('form.role') }}
                    </label>
                    <select id="role" v-model="role" required
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                        <option value="Admin">{{ $t('form.admin') }}</option>
                        <option value="User">{{ $t('form.manager') }}</option>
                        <option value="User">{{ $t('form.viewer') }}</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="dateJoined" class="block mb-1 text-gray-700 dark:text-gray-300">
                        {{ $t('form.date_joined') }}
                    </label>
                    <input id="dateJoined" type="date" v-model="dateJoined"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                </div>
                <div class="flex justify-end">
                    <button type="submit" :disabled="isAdding"
                        class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring">
                        <iconify-icon icon="line-md:loading-twotone-loop" width="24" height="24" v-if="isAdding"></iconify-icon>
                        <span v-else>{{ $t('form.add') }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMockApiService } from '@/services/mockApiService';
import { useRouter } from 'vue-router';

const { addUser } = useMockApiService();
const router = useRouter();

const name = ref('');
const email = ref('');
const role = ref('');
const dateJoined = ref('');

const isAdding = ref(false);

function submitForm() {
    isAdding.value = true;
    const newUser = {
        name: name.value,
        email: email.value,
        role: role.value,
        dateJoined: dateJoined.value,
    };
    addUser(newUser)
    .then(() => {
      return new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
    })
        .then(() => {
            router.push('/');
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