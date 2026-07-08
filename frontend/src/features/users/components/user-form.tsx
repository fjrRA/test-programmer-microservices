import {
  Save,
  UserPlus,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import type {
  User,
  UserRole,
} from "../../../types/user";

import {
  getUserFormValues,
  validateUserForm,
} from "../user-form.model";

import type {
  UserFormErrors,
  UserFormMode,
  UserFormValues,
} from "../user-form.model";

type UserFormProps = {
  mode: UserFormMode;
  user: User | null;
  isSubmitting: boolean;

  onSubmit: (
    values: UserFormValues,
  ) => Promise<void>;

  onCancel: () => void;
};

export function UserForm({
  mode,
  user,
  isSubmitting,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [
    values,
    setValues,
  ] = useState<UserFormValues>(
    () => getUserFormValues(user),
  );

  const [
    errors,
    setErrors,
  ] = useState<UserFormErrors>({});

  function updateValue<
    Key extends keyof UserFormValues,
  >(
    key: Key,
    value: UserFormValues[Key],
  ): void {
    setValues(
      (currentValues) => ({
        ...currentValues,
        [key]: value,
      }),
    );

    setErrors(
      (currentErrors) => ({
        ...currentErrors,
        [key]: undefined,
      }),
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const validationErrors =
      validateUserForm(
        values,
        mode,
      );

    if (
      Object.keys(
        validationErrors,
      ).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit(values);
  }

  const title =
    mode === "create"
      ? "Tambah User"
      : "Edit User";

  return (
    <section
      className="
        rounded-xl border border-blue-200
        bg-white p-6 shadow-sm
      "
    >
      <div
        className="
          mb-6 flex items-start
          justify-between gap-4
        "
      >
        <div>
          <h2
            className="
              text-xl font-bold
              text-slate-950
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1 text-sm
              text-slate-500
            "
          >
            Kelola identitas, status,
            dan role user.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-lg p-2
            text-slate-500
            hover:bg-slate-100
          "
          aria-label="Tutup form"
        >
          <X size={20} />
        </button>
      </div>

      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        className="
          grid gap-5
          lg:grid-cols-2
        "
      >
        <FormField
          label="Nama"
          error={errors.name}
        >
          <input
            value={values.name}
            onChange={(event) => {
              updateValue(
                "name",
                event.target.value,
              );
            }}
            className={inputClassName}
            placeholder="Nama lengkap"
          />
        </FormField>

        <FormField
          label="Email"
          error={errors.email}
        >
          <input
            type="email"
            value={values.email}
            onChange={(event) => {
              updateValue(
                "email",
                event.target.value,
              );
            }}
            className={inputClassName}
            placeholder="user@example.com"
          />
        </FormField>

        {mode === "create" && (
          <FormField
            label="Password"
            error={errors.password}
          >
            <input
              type="password"
              value={values.password}
              onChange={(event) => {
                updateValue(
                  "password",
                  event.target.value,
                );
              }}
              className={inputClassName}
              placeholder="Minimal 8 karakter"
            />
          </FormField>
        )}

        <FormField label="Role">
          <select
            value={values.role}
            onChange={(event) => {
              updateValue(
                "role",
                event.target
                  .value as UserRole,
              );
            }}
            className={inputClassName}
          >
            <option value="PEMBELI">
              PEMBELI
            </option>

            <option value="ADMIN">
              ADMIN
            </option>
          </select>
        </FormField>

        <label
          className="
            flex items-center gap-3
            self-end rounded-lg
            border border-slate-200
            px-4 py-3
          "
        >
          <input
            type="checkbox"
            checked={values.status}
            onChange={(event) => {
              updateValue(
                "status",
                event.target.checked,
              );
            }}
            className="
              h-4 w-4
              accent-blue-700
            "
          />

          <span
            className="
              text-sm font-semibold
              text-slate-800
            "
          >
            User aktif
          </span>
        </label>

        <div
          className="
            flex gap-3
            lg:col-span-2
          "
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              inline-flex items-center
              gap-2 rounded-lg
              bg-blue-700 px-5 py-3
              font-semibold text-white
              hover:bg-blue-800
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {mode === "create" ? (
              <UserPlus size={18} />
            ) : (
              <Save size={18} />
            )}

            {isSubmitting
              ? "Menyimpan..."
              : "Simpan"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="
              rounded-lg border
              border-slate-300
              px-5 py-3
              font-semibold
              text-slate-800
              hover:bg-slate-50
            "
          >
            Batal
          </button>
        </div>
      </form>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <label className="block">
      <span
        className="
          mb-2 block text-sm
          font-semibold text-slate-800
        "
      >
        {label}
      </span>

      {children}

      {error && (
        <span
          className="
            mt-1 block text-sm
            text-red-600
          "
        >
          {error}
        </span>
      )}
    </label>
  );
}

const inputClassName = `
  w-full rounded-lg
  border border-slate-300
  bg-white px-4 py-3
  text-slate-950 outline-none
  focus:border-blue-600
  focus:ring-2
  focus:ring-blue-100
`;