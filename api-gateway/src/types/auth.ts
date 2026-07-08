export type Role =
  | "ADMIN"
  | "PEMBELI";

export type AuthenticatedUser = {
  user_id: number;
  email: string;
  role: Role;
};