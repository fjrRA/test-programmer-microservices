import {
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import type {
  User,
} from "../../../types/user";

type UserTableProps = {
  users: User[];
  isLoading: boolean;

  onEdit: (
    user: User,
  ) => void;

  onDelete: (
    user: User,
  ) => void;
};

const dateFormatter =
  new Intl.DateTimeFormat(
    "id-ID",
  );

export function UserTable({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <section
      className="
        overflow-hidden rounded-xl
        border border-slate-200
        bg-white shadow-sm
      "
    >
      <header
        className="
          flex items-center gap-3
          border-b border-slate-200
          px-6 py-5
        "
      >
        <div
          className="
            rounded-lg bg-blue-100
            p-3 text-blue-700
          "
        >
          <Users size={21} />
        </div>

        <div>
          <h2
            className="
              font-bold text-slate-950
            "
          >
            Daftar User
          </h2>

          <p
            className="
              text-sm text-slate-500
            "
          >
            {users.length} user ditemukan
          </p>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table
          className="
            w-full min-w-212.5
            border-collapse
          "
        >
          <thead
            className="
              bg-slate-50 text-left
              text-xs uppercase
              text-slate-600
            "
          >
            <tr>
              <TableHeading>ID</TableHeading>
              <TableHeading>Nama</TableHeading>
              <TableHeading>Email</TableHeading>
              <TableHeading>Role</TableHeading>
              <TableHeading>Status</TableHeading>
              <TableHeading>Dibuat</TableHeading>
              <TableHeading>Aksi</TableHeading>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-6 py-12
                    text-center
                    text-slate-500
                  "
                >
                  Memuat data user...
                </td>
              </tr>
            )}

            {!isLoading &&
              users.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      px-6 py-12
                      text-center
                      text-slate-500
                    "
                  >
                    Belum ada user.
                  </td>
                </tr>
              )}

            {!isLoading &&
              users.map((user) => (
                <tr
                  key={user.id}
                  className="
                    border-t
                    border-slate-200
                  "
                >
                  <TableCell>
                    #{user.id}
                  </TableCell>

                  <TableCell strong>
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>

                  <TableCell>
                    <RoleBadge
                      role={user.role}
                    />
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      isActive={
                        user.status
                      }
                    />
                  </TableCell>

                  <TableCell>
                    {dateFormatter.format(
                      new Date(
                        user.createdAt,
                      ),
                    )}
                  </TableCell>

                  <TableCell>
                    <div
                      className="
                        flex gap-2
                      "
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(user);
                        }}
                        className="
                          rounded-lg
                          bg-blue-50 p-2
                          text-blue-700
                          hover:bg-blue-100
                        "
                        aria-label={
                          `Edit ${user.name}`
                        }
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDelete(user);
                        }}
                        className="
                          rounded-lg
                          bg-red-50 p-2
                          text-red-600
                          hover:bg-red-100
                        "
                        aria-label={
                          `Hapus ${user.name}`
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RoleBadge({
  role,
}: {
  role: User["role"];
}) {
  return (
    <span
      className="
        inline-flex rounded-full
        bg-blue-100 px-3 py-1
        text-xs font-bold
        text-blue-800
      "
    >
      {role}
    </span>
  );
}

function StatusBadge({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <span
      className={
        isActive
          ? activeStatusClassName
          : inactiveStatusClassName
      }
    >
      {isActive
        ? "AKTIF"
        : "NONAKTIF"}
    </span>
  );
}

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-6 py-4">
      {children}
    </th>
  );
}

function TableCell({
  children,
  strong = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <td
      className={`
        px-6 py-4
        text-sm text-slate-700
        ${strong
          ? "font-bold text-slate-950"
          : ""}
      `}
    >
      {children}
    </td>
  );
}

const activeStatusClassName = `
  inline-flex rounded-full
  bg-emerald-100 px-3 py-1
  text-xs font-bold
  text-emerald-700
`;

const inactiveStatusClassName = `
  inline-flex rounded-full
  bg-slate-200 px-3 py-1
  text-xs font-bold
  text-slate-600
`;