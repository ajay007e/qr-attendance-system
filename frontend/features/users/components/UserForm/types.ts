import { CreateUserRequest } from "@/features/users";

export interface UserFormProps {
  onSubmit: (data: CreateUserRequest) => Promise<void> | void;
}
