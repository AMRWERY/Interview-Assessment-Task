import { ref } from "vue";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
} from "@/mockApi";
import type { User, Role, UsersResponse } from "@/user.model";

export function useMockApiService() {
  const users = ref<User[]>([]);
  const roles = ref<Role[]>([]);
  const totalUsers = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = (page = 1, limit = 10, role?: string) => {
    loading.value = true;
    error.value = null;
    getUsers(page, limit, role)
      .then((result) => {
        const response = result as UsersResponse;
        users.value = response.users;
        totalUsers.value = response.total; // Update total
      })
      .catch((err) => {
        error.value = err as string;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const fetchUserById = (id: number) => {
    loading.value = true;
    error.value = null;
    return getUserById(id)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        error.value = err as string;
        return null;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const addUser = (user: Omit<User, "id">) => {
    loading.value = true;
    error.value = null;
    return createUser(user)
      .then((newUser) => {
        users.value.push(newUser as User);
        fetchUsers(1);
        return newUser;
      })
      .catch((err) => {
        error.value = err as string;
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // const addUser = (user: { id: number, name: string; email: string; role: string; dateJoined: string }) => {
  //   loading.value = true;
  //   error.value = null;
  //   createUser({ ...user, dateJoined: new Date().toISOString() })
  //     .then((newUser) => {
  //       users.value.push(newUser as User);
  //     })
  //     .catch((err) => {
  //       error.value = err as string;
  //     })
  //     .finally(() => {
  //       loading.value = false;
  //     });
  // };

  const editUser = (
    id: number,
    data: Partial<{ name: string; email: string; role: string }>
  ) => {
    loading.value = true;
    error.value = null;
    updateUser(id, data)
      .then((updatedUser) => {
        if (updatedUser) {
          const index = users.value.findIndex((u: User) => u.id === id);
          if (index !== -1) {
            users.value[index] = updatedUser as User;
          }
        }
      })
      .catch((err) => {
        error.value = err as string;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const removeUser = (id: number) => {
    loading.value = true;
    error.value = null;
    deleteUser(id)
      .then((deletedUser) => {
        if (deletedUser) {
          users.value = users.value.filter((u: User) => u.id !== id);
        }
      })
      .catch((err) => {
        error.value = err as string;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const fetchRoles = () => {
    loading.value = true;
    error.value = null;
    getRoles()
      .then((result) => {
        roles.value = result as Role[];
      })
      .catch((err) => {
        error.value = err as string;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    users,
    roles,
    totalUsers,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    addUser,
    editUser,
    removeUser,
    fetchRoles,
  };
}
