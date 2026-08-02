export type Tab = "details" | "password" | "delete";

export type User = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  role: string;
};

export type UpdateUserPayload = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type ChangePasswordPayload = {
  id: number;
  password: string;
};

export type EditUserFormProps = {
  user: User;
  onUpdate: (data: UpdateUserPayload) => void;
  onPasswordChange: (data: ChangePasswordPayload) => void;
  onStatusChange: (active: boolean) => void;
};
