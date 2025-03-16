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

interface AuthData {
  user: User;
  token: string;
  expires: number;
}

export const useAuth = () => {
  const currentUser = ref<User | null>(null);

  const generateToken = (email: string): string => {
    // Mock token generation (use JWT in real app)
    return btoa(`${email}:${Date.now() + 300000}`); // 5 minutes expiration
  };

  const login = (email: string, password: string) => {
    try {
      const user = allowedUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) return null;

      const { password: _, ...safeUser } = user;
      const token = generateToken(email);

      const authData: AuthData = {
        user: safeUser,
        token,
        expires: Date.now() + 300000, // 5 minutes
      };

      localStorage.setItem("currentUser", JSON.stringify(authData));
      currentUser.value = safeUser;
      return safeUser;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const validateToken = () => {
    const authString = localStorage.getItem("currentUser");
    if (!authString) return false;

    const authData: AuthData = JSON.parse(authString);
    if (Date.now() > authData.expires) {
      logout();
      return false;
    }
    // Verify mock token (replace with real validation in production)
    const [email, expires] = atob(authData.token).split(":");
    if (
      email !== authData.user.email ||
      parseInt(expires) !== authData.expires
    ) {
      logout();
      return false;
    }

    currentUser.value = authData.user;
    return true;
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem("currentUser");
  };

  // Initialize auth state
  const initializeAuth = () => {
    const authString = localStorage.getItem("currentUser");
    if (authString) {
      try {
        const authData: AuthData = JSON.parse(authString);
        currentUser.value = authData.user;
      } catch (error) {
        logout();
      }
    }
  };
  initializeAuth();

  return {
    currentUser,
    login,
    validateToken,
    logout,
  };
};
