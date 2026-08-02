import { InputHTMLAttributes, ReactNode } from "react";

export interface FormInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export type SubmitButtonProps = {
  children: ReactNode;
  disabled?: boolean;
};
