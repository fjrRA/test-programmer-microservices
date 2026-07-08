export type UserRole =
  | "ADMIN"
  | "PEMBELI";

export type User = {
  id: number;
  name: string;
  email: string;
  status: boolean;
  role: UserRole;
  createdAt: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  status: boolean;
  role: UserRole;
};

export type UpdateUserInput = {
  name: string;
  email: string;
  status: boolean;
  role: UserRole;
};