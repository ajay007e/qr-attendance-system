import type {
  CreateUserData,
  CreateUserRequest,
  DatabaseLecturerListItem,
  DatabaseUserWithoutPassword,
  LecturerListItem,
  UpdateUserData,
  UpdateUserRequest,
  User,
} from "./user.types";

export function toUser(user: DatabaseUserWithoutPassword): User {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

export function toLecturerListItem(user: DatabaseLecturerListItem): LecturerListItem {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  };
}

export function toCreateUserData(data: CreateUserRequest): CreateUserData {
  return {
    first_name: data.firstName,
    last_name: data.lastName ?? null,
    email: data.email,
    password: data.password,
    role: data.role,
  };
}

export function toUpdateUserData(data: UpdateUserRequest): UpdateUserData {
  return {
    first_name: data.firstName,
    last_name: data.lastName ?? null,
    email: data.email,
    role: data.role,
  };
}
