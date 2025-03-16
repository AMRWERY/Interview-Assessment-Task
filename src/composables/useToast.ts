import { ref } from "vue";
import type { Ref } from "vue";

interface ToastOptions {
  message?: string;
  type?: string;
  icon?: string;
}

export function useToast() {
  const showToast: Ref<boolean> = ref(false);
  const toastMessage: Ref<string> = ref("");
  const toastType: Ref<string> = ref("");
  const toastIcon: Ref<string> = ref("");

  const triggerToast = (options: ToastOptions): void => {
    toastMessage.value = options.message || "";
    toastType.value = options.type || "";
    toastIcon.value = options.icon || "";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  };

  return {
    showToast,
    toastMessage,
    toastType,
    toastIcon,
    triggerToast,
  };
}

export type { ToastOptions };
