import type { User, Role } from "@/user.model";

const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "User",
}));

const roles: Role[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "User" },
];

const simulateLatency = (fn: () => any) => {
  return new Promise((resolve, reject) => {
    const latency = Math.random() * (800 - 300) + 300; // 300-800ms delay
    setTimeout(() => {
      if (Math.random() < 0.1) {
        // 10% chance of failure
        reject("Server error");
      } else {
        resolve(fn());
      }
    }, latency);
  });
};

// Get all users with pagination and filtering
export const getUsers = (
  page: number = 1,
  limit: number = 10,
  role?: string
) => {
  return simulateLatency(() => {
    let filteredUsers = role ? users.filter((u) => u.role === role) : users;
    const start = (page - 1) * limit;
    return filteredUsers.slice(start, start + limit);
  });
};

// Get a specific user by ID
export const getUserById = (id: number) => {
  return simulateLatency(() => users.find((user) => user.id === id) || null);
};

// Create a new user
export const createUser = (user: Omit<User, "id">) => {
  return simulateLatency(() => {
    const newUser = { id: users.length + 1, ...user };
    users.push(newUser);
    return newUser;
  });
};

// Update user details
export const updateUser = (id: number, userData: Partial<User>) => {
  return simulateLatency(() => {
    const user = users.find((u) => u.id === id);
    if (user) {
      Object.assign(user, userData);
      return user;
    }
    return null;
  });
};

// Delete a user
export const deleteUser = (id: number) => {
  return simulateLatency(() => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      return users.splice(index, 1);
    }
    return null;
  });
};

// Get available roles
export const getRoles = () => {
  return simulateLatency(() => roles);
};
