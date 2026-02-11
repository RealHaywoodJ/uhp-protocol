interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

const textSizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Shield icon representing identity protection */}
      <div className={`${sizes[size]} relative`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="uhp-shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* Shield shape */}
          <path
            d="M20 3L5 10v10c0 9.39 6.4 18.17 15 20.38C28.6 38.17 35 29.39 35 20V10L20 3z"
            fill="url(#uhp-shield-gradient)"
            opacity="0.9"
          />
          {/* Inner diamond / handle symbol */}
          <path
            d="M20 12l-6 8 6 8 6-8-6-8z"
            fill="white"
            opacity="0.9"
          />
          {/* Connection dots */}
          <circle cx="14" cy="20" r="1.5" fill="white" opacity="0.6" />
          <circle cx="26" cy="20" r="1.5" fill="white" opacity="0.6" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-bold tracking-tight text-gradient`}>
            UHP
          </span>
          {size !== 'sm' && (
            <span className="text-2xs font-medium text-surface-500 tracking-wider uppercase -mt-0.5">
              Universal Handle Protocol
            </span>
          )}
        </div>
      )}
    </div>
  );
}
