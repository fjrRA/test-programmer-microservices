import bcrypt from "bcryptjs";

import type {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import {
  database,
} from "../config/database";

type Role =
  | "ADMIN"
  | "PEMBELI";

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

type UserIdRow =
  RowDataPacket & {
    id: number;
  };

const users: SeedUser[] = [
  {
    name: "Administrator",
    email: "admin@example.com",
    password: "Admin123!",
    role: "ADMIN",
  },
  {
    name: "Pembeli",
    email: "buyer@example.com",
    password: "Buyer123!",
    role: "PEMBELI",
  },
];

async function seedUser(
  user: SeedUser,
): Promise<void> {
  const passwordHash =
    await bcrypt.hash(
      user.password,
      12,
    );

  await database.execute<ResultSetHeader>(
    `
      INSERT INTO users (
        name,
        email,
        password,
        status
      )
      VALUES (?, ?, ?, TRUE)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        password = VALUES(password),
        status = TRUE
    `,
    [
      user.name,
      user.email,
      passwordHash,
    ],
  );

  const [rows] =
    await database.query<UserIdRow[]>(
      `
        SELECT id
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [user.email],
    );

  const userId = rows[0]?.id;

  if (!userId) {
    throw new Error(
      `Unable to seed ${user.email}`,
    );
  }

  await database.execute<ResultSetHeader>(
    `
      INSERT INTO users_role (
        user_id,
        role
      )
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
        role = VALUES(role)
    `,
    [
      userId,
      user.role,
    ],
  );
}

async function main(): Promise<void> {
  for (const user of users) {
    await seedUser(user);
  }

  console.log(
    "Auth seed completed successfully",
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await database.end();
  });