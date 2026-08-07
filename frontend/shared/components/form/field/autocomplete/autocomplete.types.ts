import React from "react";

export interface FieldAutocompleteProps<T> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "onSelect"
> {
  /**
   * Current text inside the input.
   */
  value: string;

  /**
   * Called when user types.
   */
  onChange: (value: string) => void;

  /**
   * Available autocomplete options.
   */
  options: T[];

  /**
   * Currently selected item.
   */
  selectedOption?: T | null;

  /**
   * Called when an option is selected.
   */
  onSelect: (option: T) => void;

  /**
   * Converts option into display text.
   */
  getOptionLabel: (option: T) => string;

  /**
   * Custom filtering logic.
   *
   * Default:
   * filters by getOptionLabel()
   */
  filterOptions?: (options: T[], inputValue: string) => T[];

  /**
   * Compare options.
   *
   * Useful when options are objects.
   */
  isOptionEqual?: (option: T, value: T) => boolean;

  /**
   * Dropdown open state.
   */
  open?: boolean;

  /**
   * Called when dropdown opens/closes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Loading indicator.
   */
  loading?: boolean;

  /**
   * Allow clearing input.
   */
  clearable?: boolean;

  /**
   * Clear callback.
   */
  onClear?: () => void;

  /**
   * Input decorations.
   */
  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  prefix?: React.ReactNode;

  suffix?: React.ReactNode;

  /**
   * Full width input.
   */
  fullWidth?: boolean;

  /**
   * Custom dropdown UI.
   *
   * Rendering is controlled by consumer.
   */
  children?: React.ReactNode;
}

export interface AutocompleteContextValue<T> {
  options: T[];

  filteredOptions: T[];

  value: string;

  selectedOption?: T | null;

  open: boolean;

  highlightedIndex: number;

  highlightedOption?: T;

  loading?: boolean;

  getOptionLabel: (option: T) => string;

  selectOption: (option: T) => void;

  openDropdown: () => void;

  closeDropdown: () => void;

  setHighlightedIndex: (index: number) => void;

  highlightNext: () => void;

  highlightPrevious: () => void;
}
