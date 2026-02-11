import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 hover:bg-surface-100 dark:hover:bg-surface-800"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label="Toggle theme"
    >
      <span className={`absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}>
        <SunIcon size={18} className="text-surface-600" />
      </span>
      <span className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}>
        <MoonIcon size={18} className="text-surface-300" />
      </span>
    </button>
  );
}
