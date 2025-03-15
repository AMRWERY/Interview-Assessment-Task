<template>
  <div>
    <div class="text-center mb-7">
      <p class="font-semibold text-gray-700 sm:text-lg md:text-3xl dark:text-gray-200">{{ $t('table.users_table') }}</p>
    </div>

    <div class="container p-4 mx-auto shadow-lg">
      <!-- Search Input -->
      <search-input v-model="searchQuery" />

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
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-[#181a1b] divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in paginatedData" :key="user.id">
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.id }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.name }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.role }}</td>
                <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ user.email }}</td>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useMockApiService } from '@/services/mockApiService';

const { users, loading, error, fetchUsers, addUser, removeUser } = useMockApiService();

onMounted(() => {
  fetchUsers();
});

const createNewUser = () => {
  addUser({ name: "New User", email: "new@example.com", role: "User" });
};

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

const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage));

// Computed property to slice the filtered data for the current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return filteredData.value.slice(start, start + rowsPerPage);
});

// Reset currentPage when search query changes
watch(searchQuery, () => {
  currentPage.value = 1;
});
</script>