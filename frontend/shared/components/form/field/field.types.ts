import * as React from "react";

export type FieldSize = "sm" | "md" | "lg";

export type FieldVariant = "outline" | "filled" | "ghost";

export interface FieldContextValue {
  id: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  success?: boolean;
  describedBy?: string;
  size: FieldSize;
  variant: FieldVariant;
  floating?: boolean;
}

export interface FieldProps {
  id?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  size?: FieldSize;
  variant?: FieldVariant;
  floating?: boolean;
  counter?: number;
  maxLength?: number;
  className?: string;
  labelClassName?: string;
  messageClassName?: string;
  helperClassName?: string;
}
