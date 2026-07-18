interface Props { value: number; disabled: boolean; onChange: (value: number) => void; }

export function CarSlider({ value, disabled, onChange }: Props) {
  if (disabled) return null;

  return (
    <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-3">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <label className="text-xs font-medium text-indigo-950">درصد سهم خودرو</label>
        <output className="rounded-lg bg-white px-2 py-1 text-xs font-extrabold tabular-nums text-[#3449c7]">{value}٪</output>
      </div>
      <input
        aria-label="درصد سهم خودرو"
        className="h-5 w-full cursor-pointer accent-[#3449c7]"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}
