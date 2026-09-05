import assert from "node:assert/strict";
import test from "node:test";

import { UserRepository } from "../../src/api/v1/modules/users/user.repository";
import { UserService } from "../../src/api/v1/modules/users/user.service";
import type { DatabaseUser } from "../../src/api/v1/modules/users/user.types";
import { comparePassword } from "../../src/utils";

import { isAppError } from "../helpers/assertions";
import { databaseUser, paginationMeta } from "../helpers/fixtures";

function createService() {
  const state = {
    user: databaseUser as DatabaseUser | null,
    duplicate: null as DatabaseUser | null,
    superAdminCount: 1,
    createCalls: [] as Array<Record<string, unknown>>,
    updateCalls: [] as unknown[],
    statusCalls: [] as unknown[],
    passwordCalls: [] as unknown[],
  };

  const repository = {
    async findAll() {
      return { items: state.user ? [state.user] : [], meta: paginationMeta };
    },
    async findById() {
      return state.user;
    },
    async findByEmail() {
      return state.duplicate;
    },
    async create(data: Record<string, unknown>) {
      state.createCalls.push(data);
      return databaseUser.id;
    },
    async update(id: number, data: unknown) {
      state.updateCalls.push([id, data]);
    },
    async updateStatus(id: number, isActive: boolean) {
      state.statusCalls.push([id, isActive]);
    },
    async countSuperAdmins() {
      return state.superAdminCount;
    },
    async updatePassword(id: number, password: string) {
      state.passwordCalls.push([id, password]);
    },
    async searchLecturers() {
      return [
        {
          id: 31,
          first_name: "Ada",
          last_name: "Lecturer",
          email: "ada.lecturer@example.com",
          role: "lecturer",
        },
      ];
    },
  } as unknown as UserRepository;

  return { service: new UserService(repository), state };
}

test("lists mapped users with pagination", async () => {
  const { service } = createService();

  const result = await service.list({ page: 1, limit: 20 });

  assert.equal(result.items[0]?.firstName, databaseUser.first_name);
  assert.deepEqual(result.meta, paginationMeta);
});

test("gets and maps an existing user", async () => {
  const { service } = createService();

  const user = await service.get(databaseUser.id);

  assert.equal(user.email, databaseUser.email);
  assert.equal(user.isActive, true);
});

test("rejects a missing user", async () => {
  const { service, state } = createService();
  state.user = null;

  await assert.rejects(service.get(999), isAppError(404, "User not found"));
});

test("creates a user with a hashed password", async () => {
  const { service, state } = createService();

  await service.create({
    firstName: " Grace ",
    lastName: " Hopper ",
    email: " GRACE.HOPPER@EXAMPLE.COM ",
    password: "Password1!",
    role: "lecturer",
  });

  assert.equal(state.createCalls[0]?.first_name, "Grace");
  assert.equal(state.createCalls[0]?.last_name, "Hopper");
  assert.equal(state.createCalls[0]?.email, "grace.hopper@example.com");
  assert.equal(state.createCalls[0]?.role, "lecturer");
  assert.equal(await comparePassword("Password1!", String(state.createCalls[0]?.password)), true);
});

test("rejects creation with an invalid role", async () => {
  const { service, state } = createService();

  await assert.rejects(
    service.create({
      firstName: "Grace",
      email: "grace@example.com",
      password: "Password1!",
      role: "owner" as "student",
    }),
    isAppError(400, "Invalid role"),
  );
  assert.deepEqual(state.createCalls, []);
});

test("rejects creation with a duplicate email", async () => {
  const { service, state } = createService();
  state.duplicate = databaseUser;

  await assert.rejects(
    service.create({
      firstName: "Mobeen",
      email: databaseUser.email,
      password: "Password1!",
      role: "student",
    }),
    isAppError(409, "Email already exists"),
  );
});

test("updates an existing user", async () => {
  const { service, state } = createService();

  await service.update(databaseUser.id, {
    firstName: "Updated",
    lastName: null,
    email: "updated@example.com",
    role: "student",
  });

  assert.deepEqual(state.updateCalls, [
    [
      databaseUser.id,
      {
        first_name: "Updated",
        last_name: null,
        email: "updated@example.com",
        role: "student",
      },
    ],
  ]);
});

test("rejects update with another user's email", async () => {
  const { service, state } = createService();
  state.duplicate = { ...databaseUser, id: 99 };

  await assert.rejects(
    service.update(databaseUser.id, {
      firstName: "Updated",
      lastName: null,
      email: "duplicate@example.com",
      role: "student",
    }),
    isAppError(409, "Email already exists"),
  );
});

test("changes another user's active status", async () => {
  const { service, state } = createService();

  await service.setActive(databaseUser.id, false, 99);

  assert.deepEqual(state.statusCalls, [[databaseUser.id, false]]);
});

test("rejects self-deactivation", async () => {
  const { service } = createService();

  await assert.rejects(
    service.setActive(databaseUser.id, false, databaseUser.id),
    isAppError(400, "You cannot deactivate your own account"),
  );
});

test("keeps at least one active super admin", async () => {
  const { service, state } = createService();
  state.user = { ...databaseUser, role: "super_admin" };

  await assert.rejects(
    service.setActive(databaseUser.id, false, 99),
    isAppError(400, "At least one Super Admin must remain active"),
  );
});

test("allows deactivation when another super admin remains", async () => {
  const { service, state } = createService();
  state.user = { ...databaseUser, role: "super_admin" };
  state.superAdminCount = 2;

  await service.setActive(databaseUser.id, false, 99);

  assert.deepEqual(state.statusCalls, [[databaseUser.id, false]]);
});

test("updates a user's password with a hash", async () => {
  const { service, state } = createService();

  await service.updatePassword(databaseUser.id, "NewPassword1!");

  const password = String((state.passwordCalls[0] as [number, string] | undefined)?.[1]);
  assert.equal(await comparePassword("NewPassword1!", password), true);
});

test("searches and maps lecturers", async () => {
  const { service } = createService();

  const lecturers = await service.searchLecturers({ search: "Ada", limit: 5 });

  assert.deepEqual(lecturers[0], {
    id: 31,
    firstName: "Ada",
    lastName: "Lecturer",
    email: "ada.lecturer@example.com",
    role: "lecturer",
  });
});
