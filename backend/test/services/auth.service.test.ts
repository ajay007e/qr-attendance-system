import assert from "node:assert/strict";
import test from "node:test";

import { AuthService } from "../../src/api/v1/modules/auth/auth.service";
import { UserRepository } from "../../src/api/v1/modules/users/user.repository";
import type { DatabaseUser } from "../../src/api/v1/modules/users/user.types";
import { comparePassword, hashPassword } from "../../src/utils";

import { isAppError } from "../helpers/assertions";
import { databaseUser } from "../helpers/fixtures";

function createService() {
  const state = {
    superAdmin: null as DatabaseUser | null,
    user: null as DatabaseUser | null,
    createCalls: [] as Array<Record<string, unknown>>,
  };

  const repository = {
    async findSuperAdmin() {
      return state.superAdmin;
    },
    async findByEmail() {
      return state.user;
    },
    async create(data: Record<string, unknown>) {
      state.createCalls.push(data);
      return 1;
    },
  } as unknown as UserRepository;

  return { service: new AuthService(repository), state };
}

test("bootstraps the first super admin", async () => {
  const { service, state } = createService();

  const result = await service.bootstrap({
    firstName: " Ada ",
    lastName: " Admin ",
    email: " ADA.ADMIN@EXAMPLE.COM ",
    password: "Password1!",
  });

  assert.deepEqual(result, {
    success: true,
    message: "Super Admin created successfully",
  });
  assert.equal(state.createCalls[0]?.first_name, "Ada");
  assert.equal(state.createCalls[0]?.last_name, "Admin");
  assert.equal(state.createCalls[0]?.email, "ada.admin@example.com");
  assert.equal(state.createCalls[0]?.role, "super_admin");
  assert.equal(await comparePassword("Password1!", String(state.createCalls[0]?.password)), true);
});

test("rejects bootstrap when a super admin already exists", async () => {
  const { service, state } = createService();
  state.superAdmin = { ...databaseUser, role: "super_admin" };

  await assert.rejects(
    service.bootstrap({
      firstName: "Ada",
      email: "ada.admin@example.com",
      password: "Password1!",
    }),
    isAppError(409, "Super Admin already exists"),
  );
  assert.deepEqual(state.createCalls, []);
});

test("logs in an active user with valid credentials", async () => {
  const { service, state } = createService();
  state.user = {
    ...databaseUser,
    password: await hashPassword("Password1!"),
  };

  const result = await service.login({
    email: " MOBEEN.STUDENT@EXAMPLE.COM ",
    password: "Password1!",
  });

  assert.deepEqual(result, {
    id: databaseUser.id,
    firstName: databaseUser.first_name,
    lastName: databaseUser.last_name,
    email: databaseUser.email,
    role: databaseUser.role,
  });
});

test("rejects login for an unknown email", async () => {
  const { service } = createService();

  await assert.rejects(
    service.login({ email: "missing@example.com", password: "Password1!" }),
    isAppError(401, "Invalid email or password"),
  );
});

test("rejects login for a disabled account", async () => {
  const { service, state } = createService();
  state.user = { ...databaseUser, is_active: false };

  await assert.rejects(
    service.login({ email: databaseUser.email, password: "Password1!" }),
    isAppError(403, "Account disabled"),
  );
});

test("rejects login for an incorrect password", async () => {
  const { service, state } = createService();
  state.user = {
    ...databaseUser,
    password: await hashPassword("Password1!"),
  };

  await assert.rejects(
    service.login({ email: databaseUser.email, password: "WrongPassword1!" }),
    isAppError(401, "Invalid email or password"),
  );
});
