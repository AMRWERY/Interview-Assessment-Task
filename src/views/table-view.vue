<template>
  <div>
    <div class="text-center mb-7">
      <p class="font-semibold text-gray-700 sm:text-lg md:text-3xl dark:text-gray-200">{{ $t('table.users_table') }}</p>
    </div>

    <div class="container p-4 mx-auto shadow-lg">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <!-- Search Input -->
        <search-input v-model="searchQuery" />

        <router-link to="/add-new-user" type="button"
          class="flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
          <iconify-icon icon="material-symbols:add" width="20" height="20"></iconify-icon>
          <span class="ms-1">{{ $t('table.add_user') }}</span>
        </router-link>
      </div>

      <!-- Responsive Table Wrapper -->
      <div class="overflow-x-auto rounded shadow dark:bg-[#181a1b]">

        <!-- skeleton-table component -->
        <template v-if="loading">
          <skeleton-table />
        </template>

        <template v-else>
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
                <th
                  class="px-4 py-2 text-sm font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                  {{ $t('table.date_joined') }}
                </th>
                <th
                  class="px-4 py-2 text-sm font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-[#181a1b] divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in paginatedData" :key="user.id">
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.id }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.name }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.role }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.email }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ formatDate(user.dateJoined) }}</td>
                <td class="py-2 text-blue-600 cursor-pointer dark:text-blue-300" @click="openDialog(user)">{{
                  $t('table.edit') }}</td>
              </tr>

              <tr v-if="!loading && paginatedData.length === 0">
                <td colspan="3" class="px-4 py-2 font-semibold text-center text-gray-800 dark:text-gray-200">{{
                  $t('table.no_results_found') }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>

      <!-- Pagination Controls -->
      <pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>

    <!-- edit-user-dialog component -->
    <edit-user-dialog v-if="dialogOpen" :user="selectedUser" @close="closeDialog" @save="handleUserUpdate" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useMockApiService } from '@/services/mockApiService';

const { users, loading, fetchUsers, removeUser } = useMockApiService();

onMounted(() => {
  fetchUsers(1, 1000);
});

const searchQuery = ref('');
const currentPage = ref(1);
const rowsPerPage = 10;

const filteredData = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value;
  }
  return users.value.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const totalUsers = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / rowsPerPage));
// const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return filteredData.value.slice(start, start + rowsPerPage);
});

watch(searchQuery, () => {
  currentPage.value = 1;
});

const dialogOpen = ref(false);
const selectedUser = ref(null);

// Opens the dialog and sets the selected user
function openDialog(user: any) {  // Replace "any" with your User type if available
  selectedUser.value = user;
  dialogOpen.value = true;
}

// Closes the dialog
function closeDialog() {
  dialogOpen.value = false;
}

// Handles saving the updated user data from the dialog
function handleUserUpdate(updatedUser: any) {
  // For example, update the user in the API or store
  // You could call an update function here and then update the local array:
  const index = users.value.findIndex((u: any) => u.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
}

function formatDate(date: string): string {
  if (!date) return '';
  // Convert the date string to a Date object, then to ISO format, and extract YYYY-MM-DD.
  return new Date(date).toISOString().slice(0, 10);
}
</script>