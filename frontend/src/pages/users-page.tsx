import {
  RefreshCw,
  UserPlus,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  UserForm,
} from "../features/users/components/user-form";

import {
  UserTable,
} from "../features/users/components/user-table";

import {
  useUsers,
} from "../features/users/hooks/use-users";

import type {
  UserFormValues,
} from "../features/users/user-form.model";

import {
  getErrorMessage,
} from "../lib/get-error-message";

import type {
  User,
} from "../types/user";

type FormState =
  | {
    mode: "create";
    user: null;
  }
  | {
    mode: "edit";
    user: User;
  };

export function UsersPage() {
  const {
    users,
    isLoading,
    error,
    setError,
    loadUsers,
    addUser,
    editUser,
    removeUser,
  } = useUsers();

  const [
    formState,
    setFormState,
  ] = useState<FormState | null>(
    null,
  );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  async function handleSubmit(
    values: UserFormValues,
  ): Promise<void> {
    if (!formState) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (
        formState.mode === "create"
      ) {
        await addUser({
          name: values.name.trim(),
          email:
            values.email.trim(),
          password: values.password,
          status: values.status,
          role: values.role,
        });
      } else {
        await editUser(
          formState.user.id,
          {
            name:
              values.name.trim(),
            email:
              values.email.trim(),
            status: values.status,
            role: values.role,
          },
        );
      }

      setFormState(null);
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal menyimpan user.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(
    user: User,
  ): Promise<void> {
    const confirmed =
      window.confirm(
        `Hapus user "${user.name}"?`,
      );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await removeUser(user.id);
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal menghapus user.",
        ),
      );
    }
  }

  const formKey =
    formState?.mode === "edit"
      ? `edit-${formState.user.id}`
      : "create";

  return (
    <section
      className="
        mx-auto max-w-7xl
        space-y-6
      "
    >
      <header
        className="
          flex flex-col gap-4
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs font-bold
              uppercase tracking-[0.2em]
              text-blue-800
            "
          >
            Management
          </p>

          <h1
            className="
              mt-2 text-4xl
              font-bold text-slate-950
            "
          >
            Data Users
          </h1>

          <p
            className="
              mt-2 text-slate-600
            "
          >
            Kelola user, status,
            dan role akses.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              void loadUsers();
            }}
            className="
              inline-flex items-center
              gap-2 rounded-lg
              border border-slate-300
              bg-white px-4 py-3
              font-semibold
              text-slate-900
              hover:bg-slate-50
            "
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => {
              setFormState({
                mode: "create",
                user: null,
              });
            }}
            className="
              inline-flex items-center
              gap-2 rounded-lg
              bg-blue-700 px-4 py-3
              font-semibold text-white
              hover:bg-blue-800
            "
          >
            <UserPlus size={18} />
            Tambah User
          </button>
        </div>
      </header>

      {error && (
        <div
          className="
            rounded-lg border
            border-red-200
            bg-red-50 px-4 py-3
            text-sm text-red-700
          "
        >
          {error}
        </div>
      )}

      {formState && (
        <UserForm
          key={formKey}
          mode={formState.mode}
          user={formState.user}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormState(null);
          }}
        />
      )}

      <UserTable
        users={users}
        isLoading={isLoading}
        onEdit={(user) => {
          setFormState({
            mode: "edit",
            user,
          });
        }}
        onDelete={(user) => {
          void handleDelete(user);
        }}
      />
    </section>
  );
}