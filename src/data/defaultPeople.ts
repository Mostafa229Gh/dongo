import type { Person } from '../types/person'; import { createId } from '../utils/random';
export const newPerson = (): Person => ({ id: createId(), name: '', cost: 0, hasCar: false, carPercent: 100, share: 0, balance: 0, isMainPayer: false }); export const defaultPeople = (): Person[] => [newPerson(), newPerson()];
