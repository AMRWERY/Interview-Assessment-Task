export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  dateJoined: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export type NewUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  dateJoined: string;
};
