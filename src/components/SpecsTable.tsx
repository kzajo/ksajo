export function SpecsTable({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <table className="w-full overflow-hidden rounded-xl border border-border text-sm">
      <tbody>
        {entries.map(([key, value], i) => (
          <tr key={key} className={i % 2 === 0 ? "bg-surface" : "bg-canvas"}>
            <th
              scope="row"
              className="w-1/3 border-b border-border px-4 py-3 text-left font-medium text-steel last:border-b-0"
            >
              {key}
            </th>
            <td className="border-b border-border px-4 py-3 font-mono text-ink last:border-b-0">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
