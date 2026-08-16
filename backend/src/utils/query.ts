export function parseQueryString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const parsed = value.trim();

  return parsed || undefined;
}

export function parseQueryNumber(value: unknown, defaultValue: number): number {
  if (typeof value !== "string" || !value.trim()) {
    return defaultValue;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
}
