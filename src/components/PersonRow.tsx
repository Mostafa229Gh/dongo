import { Car, Trash2 } from "lucide-react";
import type { Person } from "../types/person";
import { formatCurrency, parseCurrency } from "../utils/currency";
import { CarSlider } from "./CarSlider";

interface Props {
  person: Person;
  index: number;
  canDelete: boolean;
  onChange: (person: Person) => void;
  onDelete: () => void;
}

export function PersonRow({
  person,
  index,
  canDelete,
  onChange,
  onDelete,
}: Props) {
  const fallbackName = `شرکت‌کننده ${index + 1}`;
  const nameId = `person-name-${person.id}`;
  const costId = `person-cost-${person.id}`;

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_3px_12px_rgba(15,23,42,.035)]">
      <div className="grid grid-cols-1 gap-3">
        {/* Header of card */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-sm font-extrabold text-[#3449c7]">
              {index + 1}
            </div>
            <p className="truncate text-sm font-bold text-slate-800">
              {person.name.trim() || fallbackName}
            </p>
          </div>
          <button
            aria-label={`حذف ${person.name.trim() || fallbackName}`}
            title="حذف شرکت‌کننده"
            disabled={!canDelete}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl text-slate-400 transition-colors duration-150 hover:bg-rose-50 hover:text-rose-600 active:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={onDelete}
          >
            <Trash2 size={19} strokeWidth={2} />
          </button>
        </div>

        <input
          id={nameId}
          className="h-12 w-full opacity-60 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-slate-800 transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none"
          value={person.name}
          placeholder={fallbackName}
          onChange={(e) => onChange({ ...person, name: e.target.value })}
        />

        <div>
          <label
            htmlFor={costId}
            className="mb-1.5 block text-xs font-bold text-slate-600"
          >
            هزینه پرداختی{" "}
            <span className="font-normal text-slate-400">(تومان)</span>
          </label>
          <div className="flex gap-2">
            <input
              id={costId}
              dir="ltr"
              className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-right text-sm font-bold tabular-nums text-slate-800 transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none"
              inputMode="numeric"
              value={person.cost ? formatCurrency(person.cost) : ""}
              placeholder="۰"
              onChange={(e) =>
                onChange({ ...person, cost: parseCurrency(e.target.value) })
              }
            />
            <button
              type="button"
              aria-pressed={person.hasCar}
              aria-label={`هزینه خودرو برای ${person.name.trim() || fallbackName}${person.hasCar ? " فعال است" : " غیرفعال است"}`}
              title="فعال‌سازی سهم خودرو"
              className={`grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-xl transition-colors duration-150 ${person.hasCar ? "bg-[#3449c7] text-white shadow-sm shadow-indigo-200" : "border border-slate-200 bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-[#3449c7]"} active:opacity-80`}
              onClick={() => onChange({ ...person, hasCar: !person.hasCar })}
            >
              <Car size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      <CarSlider
        value={person.carPercent}
        disabled={!person.hasCar}
        onChange={(carPercent) => onChange({ ...person, carPercent })}
      />
    </article>
  );
}
