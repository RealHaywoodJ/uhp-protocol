import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './Icons';

interface DropdownItem {
  label: string;
  href: string;
  external?: boolean;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
}

export default function Dropdown({ label, items, isActive }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const openTimeout = useRef<ReturnType<typeof setTimeout>>();
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current);
    openTimeout.current = setTimeout(() => setOpen(true), 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(openTimeout.current);
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(openTimeout.current);
      clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
          open || isActive
            ? 'text-uhp-600 dark:text-uhp-400'
            : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
        }`}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDownIcon
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-white/95 dark:bg-[#1a1d27]/95 backdrop-blur-xl border border-surface-200 dark:border-surface-700 shadow-xl rounded-xl p-1 animate-scale-in z-50">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

// Mobile collapsible group for hamburger menu
export function MobileDropdownGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: DropdownItem[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
      >
        {label}
        <ChevronDownIcon
          size={14}
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-4 py-1 space-y-1">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white rounded-lg transition-colors"
                onClick={onNavigate}
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white rounded-lg transition-colors"
                onClick={onNavigate}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
