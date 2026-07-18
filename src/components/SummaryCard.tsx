import { Crown, Users, WalletCards } from 'lucide-react';
import type { CalculationResult } from '../types/person';
import { formatCurrency } from '../utils/currency';

export function SummaryCard({ result }: { result: CalculationResult }) {
  const mainName = result.mainPayer
    ? result.mainPayer.name.trim() || `شرکت‌کننده ${result.people.findIndex(p => p.id === result.mainPayer?.id) + 1}`
    : '—';

  return (
    <section aria-labelledby="summary-title" className="overflow-hidden rounded-3xl bg-[#263788] p-5 text-white shadow-[0_14px_30px_rgba(38,55,136,.24)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p id="summary-title" className="text-sm font-bold text-indigo-100">خلاصه محاسبه</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
            <strong className="text-3xl font-extrabold tracking-tight tabular-nums">{formatCurrency(result.total)}</strong>
            <span className="text-sm font-medium text-indigo-200">تومان</span>
          </div>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-indigo-100"><WalletCards size={21}/></div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/15 pt-4 text-right">
        <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-2.5">
          <Users size={17} className="shrink-0 text-indigo-200"/>
          <div><p className="text-[11px] text-indigo-200">شرکت‌کنندگان</p><p className="mt-0.5 text-sm font-medium">{result.people.length} نفر</p></div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-2.5">
          <Crown size={17} className="shrink-0 text-amber-300"/>
          <div className="min-w-0"><p className="text-[11px] text-indigo-200"> مادر خرج</p><p className="mt-0.5 truncate text-sm font-medium">{mainName}</p></div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-indigo-200">سهم عادی هر نفر: <span className="font-bold tabular-nums text-white">{formatCurrency(result.normalShare)} تومان</span></p>
    </section>
  );
}
