<template>
  <div>
    <div class="text-center mb-7">
      <p class="font-semibold text-gray-700 sm:text-lg md:text-3xl dark:text-gray-200">Users Table</p>
    </div>
    
    <div class="container p-4 mx-auto shadow-lg">
      <!-- Search Input -->
      <search-input v-model="searchQuery" />

      <!-- Responsive Table Wrapper -->
      <div class="overflow-x-auto rounded shadow dark:bg-[#181a1b]">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-[#181a1b]">
            <tr>
              <th class="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                ID
              </th>
              <th class="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                Name
              </th>
              <th class="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 capitalize text-start dark:text-gray-100">
                Email
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-[#181a1b] divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="item in paginatedData" :key="item.id">
              <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ item.id }}</td>
              <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ item.name }}</td>
              <td class="px-4 py-2 whitespace-nowrap dark:text-gray-200">{{ item.email }}</td>
            </tr>
            <tr v-if="paginatedData.length === 0">
              <td colspan="3" class="px-4 py-2 text-center">No results found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <pagination v-model:currentPage="currentPage" :totalPages="totalPages" />

    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
}

// Sample data: an array of 50 users
const data = ref<User[]>([]);
for (let i = 1; i <= 50; i++) {
  data.value.push({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`
  });
}

const searchQuery = ref('');
const currentPage = ref(1);
const rowsPerPage = 10;

// Computed property to filter data based on search query
const filteredData = computed(() => {
  if (!searchQuery.value.trim()) {
    return data.value;
  }
  return data.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Total number of pages computed from the filtered data
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

// Functions to navigate between pages
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
</script>