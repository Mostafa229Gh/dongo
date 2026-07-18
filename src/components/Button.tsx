import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
};

export function Button({ children, className = '', variant = 'primary', ...props }: Props) {
  const style = variant === 'primary'
    ? 'bg-[#3449c7] text-white shadow-[0_10px_24px_rgba(52,73,199,.22)] hover:bg-[#293bab] active:bg-[#26369e]'
    : 'border border-indigo-100 bg-white text-[#3449c7] hover:bg-indigo-50 active:bg-indigo-100';

  return (
    <button
      className={`min-h-[48px] cursor-pointer rounded-2xl px-4 py-3 font-bold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
