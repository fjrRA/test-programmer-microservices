import type {
  User,
  UserRole,
} from "../../types/user";

export type UserFormMode =
  | "create"
  | "edit";

export type UserFormValues = {
  name: string;
  email: string;
  password: string;
  status: boolean;
  role: UserRole;
};

export type UserFormErrors =
  Partial<
    Record<
      keyof UserFormValues,
      string
    >
  >;

export const emptyUserFormValues:
  UserFormValues = {
  name: "",
  email: "",
  password: "",
  status: true,
  role: "PEMBELI",
};

export function getUserFormValues(
  user: User | null,
): UserFormValues {
  if (!user) {
    return {
      ...emptyUserFormValues,
    };
  }

  return {
    name: user.name,
    email: user.email,
    password: "",
    status: user.status,
    role: user.role,
  };
}

export function validateUserForm(
  values: UserFormValues,
  mode: UserFormMode,
): UserFormErrors {
  const errors: UserFormErrors = {};

  if (values.name.trim().length < 3) {
    errors.name =
      "Nama minimal 3 karakter.";
  }

  if (
    !values.email
      .trim()
      .includes("@")
  ) {
    errors.email =
      "Format email tidak valid.";
  }

  if (
    mode === "create" &&
    values.password.length < 8
  ) {
    errors.password =
      "Password minimal 8 karakter.";
  }

  return errors;
}