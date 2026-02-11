interface PartnerLogo {
  name: string;
  icon: React.ReactNode;
  color: string;
  darkColor?: string;
}

const PARTNERS: PartnerLogo[] = [
  {
    name: 'QRL',
    color: '#13b5ea',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="8" cy="14" r="3" fill="#13b5ea" opacity="0.9" />
        <circle cx="20" cy="14" r="3" fill="#13b5ea" opacity="0.7" />
        <circle cx="14" cy="7" r="2.5" fill="#13b5ea" opacity="0.5" />
        <circle cx="14" cy="21" r="2.5" fill="#13b5ea" opacity="0.6" />
        <line x1="10.5" y1="12.5" x2="17.5" y2="12.5" stroke="#13b5ea" strokeWidth="1" opacity="0.4" />
        <line x1="10.5" y1="15.5" x2="17.5" y2="15.5" stroke="#13b5ea" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    color: '#24292f',
    darkColor: '#ffffff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 2C7.373 2 2 7.373 2 14c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0114 7.556c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C22.566 23.797 26 19.3 26 14c0-6.627-5.373-12-12-12z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'PitchHut',
    color: '#ff6b35',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L5 22h18L14 4z" fill="#ff6b35" opacity="0.8" />
        <path d="M14 4L5 22h18L14 4z" stroke="#ff6b35" strokeWidth="1.5" fill="none" />
        <line x1="14" y1="14" x2="14" y2="22" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'FIDO',
    color: '#003d7a',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="12" rx="2" fill="#003d7a" opacity="0.15" />
        <text x="14" y="17" textAnchor="middle" fill="#003d7a" fontSize="8" fontWeight="700" fontFamily="system-ui">FIDO</text>
      </svg>
    ),
  },
  {
    name: "Let's Encrypt",
    color: '#003a70',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="9" y="12" width="10" height="10" rx="2" fill="#003a70" opacity="0.85" />
        <path d="M11 12V9a3 3 0 016 0v3" stroke="#003a70" strokeWidth="2" fill="none" />
        <circle cx="14" cy="17" r="1.5" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Dell',
    color: '#007db8',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#007db8" strokeWidth="1.5" fill="none" />
        <text x="14" y="18" textAnchor="middle" fill="#007db8" fontSize="10" fontWeight="700" fontFamily="system-ui">D</text>
      </svg>
    ),
  },
  {
    name: 'PKI Consortium',
    color: '#2c5f8a',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l-8 5v6c0 5.25 3.4 10.74 8 12 4.6-1.26 8-6.75 8-12V8l-8-5z" fill="#2c5f8a" opacity="0.2" />
        <path d="M14 3l-8 5v6c0 5.25 3.4 10.74 8 12 4.6-1.26 8-6.75 8-12V8l-8-5z" stroke="#2c5f8a" strokeWidth="1.5" fill="none" />
        <text x="14" y="17" textAnchor="middle" fill="#2c5f8a" fontSize="7" fontWeight="700" fontFamily="system-ui">PKI</text>
      </svg>
    ),
  },
  {
    name: 'Monero',
    color: '#ff6600',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" fill="#ff6600" opacity="0.15" />
        <circle cx="14" cy="14" r="11" stroke="#ff6600" strokeWidth="1.5" fill="none" />
        <text x="14" y="19" textAnchor="middle" fill="#ff6600" fontSize="14" fontWeight="500" fontFamily="serif">&#x0271;</text>
      </svg>
    ),
  },
  {
    name: 'Geometry Labs',
    color: '#6c63ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L4 24h20L14 4z" fill="#6c63ff" opacity="0.2" />
        <path d="M14 4L4 24h20L14 4z" stroke="#6c63ff" strokeWidth="1.5" fill="none" />
        <path d="M14 10L9 20h10L14 10z" fill="#6c63ff" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'MerkleTree',
    color: '#00d4aa',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="6" r="3" fill="#00d4aa" opacity="0.8" />
        <circle cx="8" cy="16" r="2.5" fill="#00d4aa" opacity="0.6" />
        <circle cx="20" cy="16" r="2.5" fill="#00d4aa" opacity="0.6" />
        <circle cx="5" cy="24" r="2" fill="#00d4aa" opacity="0.4" />
        <circle cx="11" cy="24" r="2" fill="#00d4aa" opacity="0.4" />
        <circle cx="17" cy="24" r="2" fill="#00d4aa" opacity="0.4" />
        <circle cx="23" cy="24" r="2" fill="#00d4aa" opacity="0.4" />
        <line x1="14" y1="9" x2="8" y2="13.5" stroke="#00d4aa" strokeWidth="1" opacity="0.5" />
        <line x1="14" y1="9" x2="20" y2="13.5" stroke="#00d4aa" strokeWidth="1" opacity="0.5" />
        <line x1="8" y1="18.5" x2="5" y2="22" stroke="#00d4aa" strokeWidth="1" opacity="0.4" />
        <line x1="8" y1="18.5" x2="11" y2="22" stroke="#00d4aa" strokeWidth="1" opacity="0.4" />
        <line x1="20" y1="18.5" x2="17" y2="22" stroke="#00d4aa" strokeWidth="1" opacity="0.4" />
        <line x1="20" y1="18.5" x2="23" y2="22" stroke="#00d4aa" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'Singularity',
    color: '#8b5cf6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M4 14c0-3 2.5-6 5.5-6S14 10 14 14s-2 6-5 6-5.5-3-5.5-6z"
          stroke="#8b5cf6"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M14 14c0-3 2.5-6 5.5-6S24 10 24 14s-2 6-5 6-5.5-3-5.5-6z"
          stroke="#8b5cf6"
          strokeWidth="1.8"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: 'Linux Foundation',
    color: '#333333',
    darkColor: '#fcc624',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="16" rx="7" ry="9" fill="currentColor" opacity="0.15" />
        <ellipse cx="14" cy="16" rx="7" ry="9" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="11.5" cy="13" r="1" fill="currentColor" />
        <circle cx="16.5" cy="13" r="1" fill="currentColor" />
        <path d="M11 17c1 1.5 5 1.5 6 0" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M10 8c1-3 7-3 8 0" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    name: 'IBM',
    color: '#0f62fe',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <g fill="#0f62fe">
          <rect x="4" y="7" width="20" height="2" rx="0.5" opacity="0.9" />
          <rect x="4" y="10" width="20" height="2" rx="0.5" opacity="0.7" />
          <rect x="4" y="13" width="20" height="2" rx="0.5" opacity="0.9" />
          <rect x="4" y="16" width="20" height="2" rx="0.5" opacity="0.7" />
          <rect x="4" y="19" width="20" height="2" rx="0.5" opacity="0.9" />
        </g>
        <rect x="6" y="6" width="16" height="16" rx="1" fill="none" stroke="#0f62fe" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'Protocol Labs',
    color: '#0090ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="3" fill="#0090ff" opacity="0.8" />
        <circle cx="6" cy="8" r="2" fill="#0090ff" opacity="0.5" />
        <circle cx="22" cy="8" r="2" fill="#0090ff" opacity="0.5" />
        <circle cx="6" cy="20" r="2" fill="#0090ff" opacity="0.5" />
        <circle cx="22" cy="20" r="2" fill="#0090ff" opacity="0.5" />
        <line x1="14" y1="11" x2="7.5" y2="9" stroke="#0090ff" strokeWidth="1" opacity="0.4" />
        <line x1="14" y1="11" x2="20.5" y2="9" stroke="#0090ff" strokeWidth="1" opacity="0.4" />
        <line x1="14" y1="17" x2="7.5" y2="19" stroke="#0090ff" strokeWidth="1" opacity="0.4" />
        <line x1="14" y1="17" x2="20.5" y2="19" stroke="#0090ff" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'LEDGER',
    color: '#000000',
    darkColor: '#ffffff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="17" y="11" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="14" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Red4Sec',
    color: '#e63946',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 10v8c0 5 4 8.5 9 10 5-1.5 9-5 9-10v-8L14 3z" fill="#e63946" opacity="0.15" />
        <path d="M14 3L5 10v8c0 5 4 8.5 9 10 5-1.5 9-5 9-10v-8L14 3z" stroke="#e63946" strokeWidth="1.5" fill="none" />
        <text x="14" y="18" textAnchor="middle" fill="#e63946" fontSize="8" fontWeight="700" fontFamily="system-ui">4</text>
      </svg>
    ),
  },
  {
    name: 'Fox Crypto',
    color: '#ff9500',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 5l4 8-4 4h4l4 5 4-5h4l-4-4 4-8-7 3-1-3-1 3-7-3z" fill="#ff9500" opacity="0.8" />
        <circle cx="11" cy="14" r="1" fill="white" />
        <circle cx="17" cy="14" r="1" fill="white" />
      </svg>
    ),
  },
  {
    name: 'VOLT',
    color: '#ffd700',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M16 3L8 16h5l-2 9 10-13h-5L16 3z" fill="#ffd700" opacity="0.85" />
        <path d="M16 3L8 16h5l-2 9 10-13h-5L16 3z" stroke="#d4a800" strokeWidth="0.8" fill="none" />
      </svg>
    ),
  },
  {
    name: 'PQCA',
    color: '#1a73e8',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" fill="#1a73e8" opacity="0.12" />
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#1a73e8" strokeWidth="1.5" fill="none" />
        <text x="14" y="17.5" textAnchor="middle" fill="#1a73e8" fontSize="7" fontWeight="800" fontFamily="system-ui">PQ</text>
      </svg>
    ),
  },
  {
    name: 'League of Entropy',
    color: '#7c3aed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="5" width="18" height="18" rx="3" fill="#7c3aed" opacity="0.15" />
        <rect x="5" y="5" width="18" height="18" rx="3" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
        <circle cx="10" cy="10" r="1.5" fill="#7c3aed" />
        <circle cx="18" cy="10" r="1.5" fill="#7c3aed" />
        <circle cx="14" cy="14" r="1.5" fill="#7c3aed" />
        <circle cx="10" cy="18" r="1.5" fill="#7c3aed" />
        <circle cx="18" cy="18" r="1.5" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    name: 'MEXC',
    color: '#2dd4bf',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L9 8l5 8 5-8 5 12" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'BitMart',
    color: '#00c8b3',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" fill="#00c8b3" opacity="0.12" />
        <circle cx="14" cy="14" r="11" stroke="#00c8b3" strokeWidth="1.5" fill="none" />
        <path d="M10 10h8v3h-5v2h4v3h-4v3h-3V10z" fill="#00c8b3" opacity="0.7" />
      </svg>
    ),
  },
];

function PartnerLogoItem({ partner }: { partner: PartnerLogo }): JSX.Element {
  return (
    <div
      className="
        flex items-center gap-2 w-[140px] h-[48px] shrink-0 select-none
        grayscale opacity-40 dark:opacity-30
        hover:grayscale-0 hover:opacity-70 dark:hover:opacity-60
        transition-all duration-300
      "
    >
      <div className="shrink-0 w-7 h-7 flex items-center justify-center">
        {partner.icon}
      </div>
      <span
        className="text-xs font-semibold tracking-tight truncate text-surface-700 dark:text-surface-300"
      >
        {partner.name}
      </span>
    </div>
  );
}

export default function PartnerBanner(): JSX.Element {
  return (
    <section className="py-16 overflow-hidden">
      {/* Section Header with Chasing Border */}
      <div className="flex justify-center mb-12">
        <div className="relative inline-block px-8 py-3">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="12"
              ry="12"
              fill="none"
              stroke="url(#chase-gradient)"
              strokeWidth="2"
              strokeDasharray="80 320"
              className="animate-chase"
            />
            <defs>
              <linearGradient id="chase-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <h2 className="text-lg font-semibold text-surface-600 dark:text-surface-400 tracking-tight">
            Trusted by the Builders of Tomorrow
          </h2>
        </div>
      </div>

      {/* Scrolling Logo Carousel */}
      <div className="relative">
        {/* Left Fade */}
        <div
          className="
            absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none
            bg-gradient-to-r from-surface-50 dark:from-[#0f1117] to-transparent
          "
        />

        {/* Right Fade */}
        <div
          className="
            absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none
            bg-gradient-to-l from-surface-50 dark:from-[#0f1117] to-transparent
          "
        />

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-scroll-left hover:[animation-play-state:paused]">
            {/* First set of logos */}
            {PARTNERS.map((partner) => (
              <PartnerLogoItem key={`a-${partner.name}`} partner={partner} />
            ))}

            {/* Duplicate set for seamless loop */}
            {PARTNERS.map((partner) => (
              <PartnerLogoItem key={`b-${partner.name}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
