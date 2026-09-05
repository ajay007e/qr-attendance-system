const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

export function isDuplicateEntryError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === DUPLICATE_ENTRY;
}
