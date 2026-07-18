import { Calculator, Plus, ReceiptText, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/Button';
import { PersonRow } from './components/PersonRow';
import { SettlementCard } from './components/SettlementCard';
import { SummaryCard } from './components/SummaryCard';
import { defaultPeople, newPerson } from './data/defaultPeople';
import type { CalculationResult, Person } from './types/person';
import { calculateSettlement } from './utils/calculateSettlement';

const minimumPeople = 2;
const displayName = (person: Person, index: number) => person.name.trim() || `شرکت‌کننده ${index + 1}`;

export default function App() {
  const [people, setPeople] = useState<Person[]>(defaultPeople);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const updatePerson = (person: Person) => { setPeople(current => current.map(item => item.id === person.id ? person : item)); setResult(null); };
  const deletePerson = (id: string) => { setPeople(current => current.length > minimumPeople ? current.filter(person => person.id !== id) : current); setResult(null); };
  const calculate = () => { const named = people.map((person, index) => ({ ...person, name: displayName(person, index) })); setPeople(named); setResult(calculateSettlement(named)); };

  return (
    <main className="min-h-dvh pb-10 text-slate-800">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <header className="flex items-center gap-3 pb-7 pt-[max(1.75rem,env(safe-area-inset-top))]">
          {/* <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#3449c7] text-white shadow-[0_8px_20px_rgba(52,73,199,.22)]"><ReceiptText size={23}/></div> */}
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#3449c7] text-white shadow-[0_8px_20px_rgba(52,73,199,.22)]"><svg width="23" height="30" viewBox="0 0 23 30" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M21.5238 23.1265C20.1902 25.6365 17.9607 27.6362 15.3661 28.7867C12.73 29.9549 9.58987 30.2709 6.76089 29.772C5.32151 29.5173 3.89354 29.0216 2.70409 28.1527C1.32174 27.1445 0.519096 25.6916 0.166511 24.0099C-0.0595586 22.9373 -0.0626732 21.8138 0.201766 20.7475C0.717163 18.674 2.57446 16.3417 4.81649 16.0206C7.33021 15.661 9.63343 18.0493 12.1565 17.1368C13.7514 16.56 13.3397 14.7723 12.5765 13.6623C11.3103 11.8206 9.36484 11.1087 7.3748 10.325C6.624 10.0299 5.86076 9.70662 5.20848 9.22333C4.72108 8.86061 4.29591 8.3981 4.04702 7.84206C3.78466 7.25379 3.73073 6.58758 3.79814 5.94735C4.0045 3.9986 5.02804 2.12157 6.53794 0.880604C7.27111 0.277791 8.28842 0.0210736 9.2207 0.0013263C9.5795 -0.00594903 9.93312 0.0169179 10.2795 0.0647273C12.4406 0.368213 14.3456 1.69232 15.9271 3.1609C16.7121 3.88947 17.4442 4.67313 18.1691 5.46198C20.0648 7.52922 21.5757 9.981 22.3763 12.6822C23.3946 16.1162 23.2038 19.9638 21.5238 23.1265Z"/></svg></div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#3449c7]"> دنگـو</h1>
            <p className="mt-0.5 text-xs font-medium text-slate-500">تقسیم منصفانه هزینه‌های گروهی</p>
          </div>
        </header>

        <section aria-labelledby="people-title" className="rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,.045)] sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-[#3449c7]"><UsersRound size={17}/></div><h2 id="people-title" className="font-extrabold text-slate-900">شرکت‌کنندگان</h2></div>
              <p className="mt-2 text-sm leading-6 text-slate-500">نام و مبلغ پرداختی هر نفر را وارد کنید.</p>
            </div>
            <span className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">{people.length} نفر</span>
          </div>
          <div className="space-y-3">{people.map((person, index) => <PersonRow key={person.id} person={person} index={index} canDelete={people.length > minimumPeople} onChange={updatePerson} onDelete={() => deletePerson(person.id)}/>)}</div>
          <Button variant="ghost" className="mt-4 flex w-full items-center justify-center gap-2 border-dashed" onClick={() => { setPeople(current => [...current, newPerson()]); setResult(null); }}><Plus size={19}/>افزودن شرکت‌کننده</Button>
        </section>

        <Button className="mt-5 flex w-full items-center justify-center gap-2 py-4 text-base" onClick={calculate}><Calculator size={20}/>محاسبه سهم‌ها</Button>

        {result && <section aria-labelledby="settlement-title" className="mt-7 space-y-5"><SummaryCard result={result}/><div><div className="mb-3 flex items-center justify-between"><h2 id="settlement-title" className="font-extrabold text-slate-900">تسویه‌حساب</h2><span className="text-xs font-medium text-slate-500">{result.settlements.length} پرداخت</span></div>{result.settlements.length ? <div className="space-y-2.5">{result.settlements.map(settlement => <SettlementCard key={settlement.id} settlement={settlement}/>)}</div> : <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 text-center text-sm font-medium leading-6 text-emerald-800">همه‌چیز متعادل است؛ پرداختی برای تسویه وجود ندارد.</div>}</div></section>}
      </div>
    </main>
  );
}
