import { ref } from "vue";
import type { User } from "@/user.model";

interface AllowedUser extends User {
  password: string;
}

const allowedUsers: AllowedUser[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    role: "Admin",
    dateJoined: new Date().toISOString(),
    password: "1234567",
  },
  {
    id: 2,
    name: "Manager",
    email: "manager@example.com",
    role: "Manager",
    dateJoined: new Date().toISOString(),
    password: "1234567",
  },
  {
    id: 3,
    name: "Viewer",
    email: "viewer@example.com",
    role: "Viewer",
    dateJoined: new Date().toISOString(),
    password: "1234567",
  },
];

export const useAuth = () => {
  const currentUser = ref<User | null>(null);

  const login = (email: string, password: string) => {
    const user = allowedUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password, ...safeUser } = user;
      currentUser.value = safeUser;
      localStorage.setItem("currentUser", JSON.stringify(safeUser));
    }
    return user;
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem("currentUser");
  };

  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser);
  }

  return {
    currentUser,
    login,
    logout,
  };
};
