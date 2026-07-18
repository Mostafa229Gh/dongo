const formatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 });
const normalizeDigits = (value: string) => value.replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
export const formatCurrency = (value: number) => formatter.format(Math.round(value));
export const parseCurrency = (value: string) => Number(normalizeDigits(value).replace(/[^0-9]/g, '')) || 0;
