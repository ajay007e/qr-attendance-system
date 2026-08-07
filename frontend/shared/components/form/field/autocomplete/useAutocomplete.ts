import React from "react";

import type { FieldAutocompleteProps } from "./autocomplete.types";

export function useAutocomplete<T>({
  value,
  onChange,

  options,

  selectedOption,

  onSelect,

  getOptionLabel,

  filterOptions,

  open: controlledOpen,

  onOpenChange,
}: Pick<
  FieldAutocompleteProps<T>,
  | "value"
  | "onChange"
  | "options"
  | "selectedOption"
  | "onSelect"
  | "getOptionLabel"
  | "filterOptions"
  | "open"
  | "onOpenChange"
>) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const open = controlledOpen ?? internalOpen;

  const setOpen = (state: boolean) => {
    setInternalOpen(state);

    onOpenChange?.(state);

    if (!state) {
      setHighlightedIndex(-1);
    }
  };

  const openDropdown = () => {
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const filteredOptions = React.useMemo(() => {
    if (filterOptions) {
      return filterOptions(options, value);
    }

    const search = value.trim().toLowerCase();

    if (!search) {
      return options;
    }

    return options.filter((option) => getOptionLabel(option).toLowerCase().includes(search));
  }, [options, value, getOptionLabel, filterOptions]);

  const selectOption = (option: T) => {
    onSelect(option);

    onChange(getOptionLabel(option));

    closeDropdown();
  };

  const highlightNext = () => {
    setHighlightedIndex((current) => {
      const next = current + 1;

      if (next >= filteredOptions.length) {
        return 0;
      }

      return next;
    });
  };

  const highlightPrevious = () => {
    setHighlightedIndex((current) => {
      const previous = current - 1;

      if (previous < 0) {
        return filteredOptions.length - 1;
      }

      return previous;
    });
  };

  const highlightedOption = highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : undefined;

  return {
    options,

    value,

    getOptionLabel,

    open,

    filteredOptions,

    selectedOption,

    highlightedIndex,

    highlightedOption,

    setHighlightedIndex,

    selectOption,

    openDropdown,

    closeDropdown,

    highlightNext,

    highlightPrevious,
  };
}
