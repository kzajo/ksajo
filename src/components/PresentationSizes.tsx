import { DrumIcon } from "@/components/icons";

/** Recibe el spec "Presentación" y lo separa por comas: "55 GAL, 15 GAL, 1 GAL" */
export function PresentationSizes({ value }: { value: string }) {
  const sizes = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (sizes.length < 2) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1 text-steel">
          <DrumIcon className="h-8 w-8" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">{size}</span>
        </div>
      ))}
    </div>
  );
}
