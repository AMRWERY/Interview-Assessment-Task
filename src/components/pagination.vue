<template>
    <div>
        <div class="px-4 py-3 mt-8 bg-white sm:px-6">
            <!-- Mobile: Previous / Next Links -->
            <div class="flex justify-between flex-1 sm:hidden">
                <button @click="goToPrevPage" :class="mobileButtonClass(props.currentPage === 1)"
                    :disabled="props.currentPage === 1">
                    Previous
                </button>
                <button @click="goToNextPage" :class="mobileButtonClass(props.currentPage === props.totalPages)"
                    :disabled="props.currentPage === props.totalPages">
                    Next
                </button>
            </div>

            <!-- Desktop: Pagination -->
            <div class="hidden sm:flex sm:items-center sm:justify-end">
                <div>
                    <nav class="inline-flex rounded-md shadow-xs -space-s-px isolate">
                        <!-- Previous Button -->
                        <button @click="goToPrevPage" :class="buttonClass('prev')" :disabled="props.currentPage === 1">
                            <span class="sr-only">Previous</span>
                            <iconify-icon icon="material-symbols:keyboard-arrow-left" width="24" height="24" />
                        </button>

                        <!-- Page Numbers -->
                        <template v-for="(page, index) in displayPages" :key="index">
                            <template v-if="typeof page === 'number'">
                                <button @click="changePage(page)"
                                    :aria-current="page === props.currentPage ? 'page' : undefined"
                                    :class="page === props.currentPage ? activePageClass : inactivePageClass">
                                    {{ page }}
                                </button>
                            </template>
                            <template v-else>
                                <span
                                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset">
                                    {{ page }}
                                </span>
                            </template>
                        </template>

                        <!-- Next Button -->
                        <button @click="goToNextPage" :class="buttonClass('next')"
                            :disabled="props.currentPage === props.totalPages">
                            <span class="sr-only">Next</span>
                            <iconify-icon icon="material-symbols:keyboard-arrow-right" width="24" height="24" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    currentPage: number;
    totalPages: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:currentPage', newPage: number): void;
}>();

const displayPages = computed<(number | string)[]>(() => {
    const total = props.totalPages;
    const current = props.currentPage;
    const pages: (number | string)[] = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        if (current <= 4) {
            pages.push(1, 2, 3, 4, '...', total);
        } else if (current >= total - 3) {
            pages.push(1, '...', total - 3, total - 2, total - 1, total);
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', total);
        }
    }
    return pages;
});

function changePage(page: number) {
    if (page !== props.currentPage) {
        emit('update:currentPage', page);
    }
}

function goToPrevPage() {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
}

function goToNextPage() {
    if (props.currentPage < props.totalPages) {
        emit('update:currentPage', props.currentPage + 1);
    }
}

// Styling classes for activePage & inactivePage pages
const activePageClass = 'relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
const inactivePageClass = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

function buttonClass(type: 'prev' | 'next') {
    const base = 'relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
    return type === 'prev' ? `${base} rounded-s-md` : `${base} rounded-e-md`;
}

// mobileButton pagination classes
function mobileButtonClass(disabled: boolean) {
    const base = 'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50';
    return disabled ? `${base} opacity-50 cursor-not-allowed` : base;
}
</script>