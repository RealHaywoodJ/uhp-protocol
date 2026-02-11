import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, suffix, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
              {prefix}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-2.5 text-sm
              bg-white dark:bg-[#0a0d14] border rounded-xl
              text-surface-900 dark:text-[#e8e6f0]
              transition-all duration-200
              placeholder:text-surface-400 dark:placeholder:text-surface-600
              ${prefix ? 'pl-10' : ''}
              ${suffix ? 'pr-10' : ''}
              ${error
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-surface-200 dark:border-[#2e3347] hover:border-surface-300 dark:hover:border-surface-600 focus:border-uhp-500 focus:ring-2 focus:ring-uhp-500/20'
              }
              outline-none
              ${className}
            `.trim()}
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400">
              {suffix}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {hint && !error && <p className="text-sm text-surface-500 dark:text-surface-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
