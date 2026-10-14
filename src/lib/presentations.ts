/** Separa el spec "Presentación" ("55 GAL, 15 GAL, 1 GAL") en un array de tamaños. */
export function parsePresentations(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
