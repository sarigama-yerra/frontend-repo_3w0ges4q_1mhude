import { useMemo } from "react";

export default function HistoryPanel({ items, onSelect }) {
  const ordered = useMemo(() => [...items].reverse(), [items]);

  if (!items?.length) return null;

  return (
    <aside className="w-full rounded-lg border border-gray-200 p-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Cronologia generazioni</h3>
      <div className="grid gap-2">
        {ordered.map((it, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(it)}
            className="flex items-start justify-between rounded-md bg-white p-3 text-left shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
          >
            <div>
              <div className="text-sm font-medium text-gray-900">{it.pageName}</div>
              <div className="text-xs text-gray-500 line-clamp-2">{it.description}</div>
            </div>
            <span className="ml-3 shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
              {it.framework}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
