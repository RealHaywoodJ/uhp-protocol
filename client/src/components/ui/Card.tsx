interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-surface-200 shadow-card
        ${hover ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5' : ''}
        ${paddingStyles[padding]}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
