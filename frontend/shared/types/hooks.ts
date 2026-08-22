export type UseFormStateOptions<TValues, TPayload> = {
  initialValues: TValues;
  transform: (values: TValues) => TPayload;
  onSubmit: (payload: TPayload) => void | Promise<void>;
  validate?: (values: TValues) => string | null;
  successMessage?: string;
  errorMessage?: string;
};
