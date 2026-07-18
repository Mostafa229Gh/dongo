import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Settlement } from '../types/person';
import { formatCurrency } from '../utils/currency';

export function SettlementCard({ settlement }: { settlement: Settlement }) {
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_3px_12px_rgba(15,23,42,.035)]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700"><ArrowUpRight size={20}/></div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-sm font-bold text-slate-800">
          <span className="truncate">{settlement.from}</span><ArrowLeft className="shrink-0 text-slate-400" size={16}/><span className="truncate">{settlement.to}</span>
        </p>
        <p className="mt-1 text-xs text-slate-500">باید پرداخت شود</p>
      </div>
      <p className="shrink-0 text-left text-sm font-extrabold tabular-nums text-[#3449c7]">{formatCurrency(settlement.amount)}<span className="mr-1 text-[11px] font-medium text-slate-500">تومان</span></p>
    </article>
  );
}
