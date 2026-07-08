export type Role =
  | "ADMIN"
  | "PEMBELI";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};