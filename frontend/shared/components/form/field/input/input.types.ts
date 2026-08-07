import React from "react";

export interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  prefix?: React.ReactNode;

  suffix?: React.ReactNode;

  loading?: boolean;

  clearable?: boolean;

  showPasswordToggle?: boolean;

  onClear?: () => void;

  inputClassName?: string;
}
