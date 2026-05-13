"use client";

import { useStyle } from "@/hooks/use-style";
import { supportedStyles, styleLabels } from "@/lib/style-registry";

export function StyleSwitcher() {
  const { style, setStyle } = useStyle();

  return (
    <select
      value={style}
      onChange={(e) => setStyle(e.target.value as typeof style)}
      className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm cursor-pointer"
    >
      {supportedStyles.map((s) => (
        <option key={s} value={s}>
          {styleLabels[s]}
        </option>
      ))}
    </select>
  );
}
