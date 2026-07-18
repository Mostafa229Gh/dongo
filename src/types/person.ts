export interface Person { id: string; name: string; cost: number; hasCar: boolean; carPercent: number; share: number; balance: number; isMainPayer: boolean; }
export interface Settlement { id: string; from: string; to: string; amount: number; kind: 'pay' | 'receive'; }
export interface CalculationResult { people: Person[]; total: number; normalShare: number; mainPayer: Person | null; settlements: Settlement[]; }
