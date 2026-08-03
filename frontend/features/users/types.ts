import { UserRole, User } from "@/shared";

export type CreateUserRequest = Pick<
  User,
  "first_name" | "last_name" | "email" | "role"
> & {
  password: string;
};

export type UpdateUserRequest = Pick<
  User,
  "first_name" | "last_name" | "email" | "role"
>;

export interface ChangeUserStatusRequest {
  is_active: boolean;
}

export interface ChangePasswordRequest {
  password: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search: string;
  role: UserRole | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
}

export interface UserToolbarProps {
  filters: UserQuery;
  onFiltersChange: (filters: UserQuery) => void;
}

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export interface UserActionProps {
  user: User;
  onEdit: (user: User) => void;
}

export interface UserPaginationProps {
  total: number;
  page?: number;
  totalPages?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  disabled?: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export interface UserFormProps {
  onSubmit: (data: CreateUserRequest) => Promise<void> | void;
}

export interface EmptyUserStateProps {
  onCreate: () => void;
}

export type Tab = "details" | "password" | "delete";

export interface TabItem {
  key: Tab;
  label: string;
}

export interface TabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}
export type UpdateUserPayload = Pick<
  User,
  "id" | "first_name" | "last_name" | "email" | "role"
>;

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

export interface DetailsFormProps {
  user: User;
  onSubmit: (data: UpdateUserPayload) => Promise<void> | void;
}

export interface PasswordFormProps {
  userId: User["id"];
  onSubmit: (data: ChangePasswordPayload) => Promise<void> | void;
}
