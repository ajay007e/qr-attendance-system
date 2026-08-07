import React from "react";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface FieldSelectProps<T> extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  /**
   * Current selected value
   */
  value?: T | null;

  /**
   * Available options
   */
  options: readonly SelectOption<T>[];

  /**
   * Selection callback
   */
  onChange: (value: T) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Optional custom option renderer
   */
  renderOption?: (option: SelectOption<T>, selected: boolean) => React.ReactNode;
}
