import React from "react";

export interface FieldInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
  inputClassName?: string;
  fullWidth?: boolean;
}
