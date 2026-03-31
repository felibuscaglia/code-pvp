export function formatValue(value: unknown): string {
  if (value === undefined) return "undefined"
  return JSON.stringify(value)
}
