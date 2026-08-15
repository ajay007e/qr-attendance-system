import type { ChangePasswordRequest, UpdateUserRequest } from "@/features/users";
import type { User } from "@/shared";

export type Tab = "details" | "password" | "delete";

export type UpdateUserPayload = UpdateUserRequest & { id: User["id"] };

export type ChangePasswordPayload = ChangePasswordRequest & { id: User["id"] };

export type EditUserFormProps = {
  user: User;
  onUpdate: (data: UpdateUserPayload) => void;
  onPasswordChange: (data: ChangePasswordPayload) => void;
  onStatusChange: (active: boolean) => void;
};

export interface DetailsFormProps {
  user: User;
  onSubmit: (data: UpdateUserPayload) => Promise<void> | void;
}

export interface PasswordFormProps {
  userId: User["id"];
  onSubmit: (data: ChangePasswordPayload) => Promise<void> | void;
}
