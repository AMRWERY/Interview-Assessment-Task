<template>
    <div>
        <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <!-- Semi-transparent backdrop -->
            <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>
            <!-- Modal content -->
            <div class="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div class="flex items-center justify-between pb-3 border-b border-gray-300 dark:border-gray-600">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                        {{ viewOnly ? $t('dialog.view_user') : $t('dialog.edit_user') }}
                    </h3>
                    <button @click="close" class="text-gray-400 hover:text-red-500">
                        <iconify-icon icon="material-symbols:close-small-rounded" width="24" height="24"></iconify-icon>
                    </button>
                </div>
                <div class="mt-4 space-y-4">
                    <div>
                        <label class="block mb-1 text-gray-700 dark:text-gray-300">{{ $t('dialog.name') }}</label>
                        <input type="text" v-model="editedUser.name" :disabled="props.viewOnly"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200" />
                    </div>
                    <div>
                        <label class="block mb-1 text-gray-700 dark:text-gray-300">{{ $t('dialog.email') }}</label>
                        <input type="email" v-model="editedUser.email" :disabled="props.viewOnly"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200" />
                    </div>
                    <div>
                        <label class="block mb-1 text-gray-700 dark:text-gray-300">{{ $t('dialog.role') }}</label>
                        <select v-if="!viewOnly && (currentUserRole === 'Admin' || currentUserRole === 'Manager')"
                            v-model="editedUser.role"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200">
                            <option value="Admin">{{ $t('form.admin') }}</option>
                            <option value="Manager">{{ $t('form.manager') }}</option>
                            <option value="Viewer">{{ $t('form.viewer') }}</option>
                        </select>
                        <input v-else type="text" v-model="editedUser.role" disabled
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200" />
                    </div>
                    <div>
                        <label class="block mb-1 text-gray-700 dark:text-gray-300">{{ $t('dialog.date_joined')
                            }}</label>
                        <input type="date" v-model="editedUser.dateJoined" :disabled="props.viewOnly"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200" />
                    </div>
                </div>
                <div class="flex justify-end gap-4 pt-6 border-t border-gray-300 dark:border-gray-600" v-if="!viewOnly">
                    <button type="button" class="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                        @click="close">
                        {{ $t('dialog.cancel') }}
                    </button>
                    <button type="button" class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        @click="save">
                        {{ $t('dialog.update') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import type { User } from "@/user.model";

// const props = defineProps<{ user: User | null }>();
const props = defineProps({
    user: {
        type: Object as PropType<User | null>,
        default: null,
    },
    viewOnly: {
        type: Boolean,
        default: false,
    },
    currentUserRole: {
        type: String as PropType<'Admin' | 'Manager' | 'Viewer'>,
        required: true
    }
});

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'save', updatedUser: User): void;
}>();

// Create a reactive copy for editing
const editedUser = reactive({
    id: 0,
    name: '',
    email: '',
    role: '',
    dateJoined: ''
});

function formatDate(date: string): string {
    return new Date(date).toISOString().slice(0, 10);
}

// Watch for changes in the incoming user prop and update the local copy
watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            editedUser.id = newUser.id;
            editedUser.name = newUser.name;
            editedUser.email = newUser.email;
            editedUser.role = newUser.role;
            editedUser.dateJoined = newUser.dateJoined
                ? formatDate(newUser.dateJoined)
                : '';
        }
    },
    { immediate: true }
);

const close = () => {
    emit('close');
};

// Emit updated user data
const save = () => {
    emit('save', { ...editedUser });
    emit('close');
};
</script>