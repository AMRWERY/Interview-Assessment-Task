import { defineStore } from "pinia";
import type { User } from "@/user.model";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    SingleUser: {} as User,
    total: 0,
    skip: 0,
    limit: 0,
    loading: false,
    error: null as string | null,
  }),

  actions: {},
});
