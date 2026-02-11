import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-uhp-600 text-white hover:bg-uhp-700 active:bg-uhp-800 shadow-uhp hover:shadow-uhp-lg',
  secondary:
    'bg-surface-100 text-surface-800 hover:bg-surface-200 active:bg-surface-300 border border-surface-200',
  ghost:
    'text-surface-600 hover:text-surface-900 hover:bg-surface-100 active:bg-surface-200',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  outline:
    'border-2 border-uhp-600 text-uhp-600 hover:bg-uhp-50 active:bg-uhp-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-200 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `.trim()}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
