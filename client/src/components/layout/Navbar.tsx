import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import Dropdown, { MobileDropdownGroup } from '../ui/Dropdown';
import { MenuIcon, XIcon, LogOutIcon, UserIcon } from '../ui/Icons';

const resourcesItems = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Roadmap', href: 'https://github.com/RealHaywoodJ/uhp-protocol/blob/main/ROADMAP.md', external: true },
  { label: 'Whitepaper', href: 'https://github.com/RealHaywoodJ/uhp-protocol/blob/main/UHP-Whitepaper.md', external: true },
];

const developersItems = [
  { label: 'API Reference', href: '/.well-known/uhp-configuration', external: true },
  { label: 'OAuth Integration', href: '/docs/oauth' },
  { label: 'Self-Hosting Guide', href: '/docs/self-hosting' },
  { label: 'Contribute', href: 'https://github.com/RealHaywoodJ/uhp-protocol', external: true },
];

const communityItems = [
  { label: 'GitHub', href: 'https://github.com/RealHaywoodJ/uhp-protocol', external: true },
  { label: 'Discord', href: '#' },
  { label: 'PitchHut', href: 'https://pitchhut.com/project/uhp-protocol', external: true },
  { label: 'Suggestions', href: 'https://github.com/RealHaywoodJ/uhp-protocol/issues', external: true },
];

export default function Navbar() {
  const { isAuthenticated, handle, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-uhp-600 dark:text-uhp-400'
        : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
    }`;

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-lg border-b border-surface-200/60 dark:border-[#2e3347]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Dropdown label="Resources" items={resourcesItems} />
            <Dropdown label="Developers" items={developersItems} />
            <Dropdown label="Community" items={communityItems} />
            <Link to="/partners" className={navLinkClass('/partners')}>
              Partners
            </Link>

            <div className="flex items-center gap-3 pl-4 border-l border-surface-200 dark:border-[#2e3347]">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                    Dashboard
                  </Link>
                  <div className="handle-badge text-xs">
                    @{handle?.handle?.replace(/@/g, '') || '...'}
                  </div>
                  <button
                    onClick={logout}
                    className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                    title="Logout"
                  >
                    <LogOutIcon size={18} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-200 dark:border-[#2e3347] bg-white dark:bg-[#0f1117] animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/') ? 'bg-uhp-50 dark:bg-uhp-950/50 text-uhp-600 dark:text-uhp-400' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'}`}
              onClick={closeMobile}
            >
              Home
            </Link>

            <MobileDropdownGroup label="Resources" items={resourcesItems} onNavigate={closeMobile} />
            <MobileDropdownGroup label="Developers" items={developersItems} onNavigate={closeMobile} />
            <MobileDropdownGroup label="Community" items={communityItems} onNavigate={closeMobile} />

            <Link
              to="/partners"
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/partners') ? 'bg-uhp-50 dark:bg-uhp-950/50 text-uhp-600 dark:text-uhp-400' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'}`}
              onClick={closeMobile}
            >
              Partners
            </Link>

            {isAuthenticated ? (
              <div className="pt-2 mt-2 border-t border-surface-200 dark:border-[#2e3347] space-y-1">
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/dashboard') ? 'bg-uhp-50 dark:bg-uhp-950/50 text-uhp-600 dark:text-uhp-400' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'}`}
                  onClick={closeMobile}
                >
                  <span className="flex items-center gap-2">
                    <UserIcon size={16} /> Dashboard
                  </span>
                </Link>
                <Link
                  to="/admin"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/admin') ? 'bg-uhp-50 dark:bg-uhp-950/50 text-uhp-600 dark:text-uhp-400' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'}`}
                  onClick={closeMobile}
                >
                  Admin
                </Link>
                <div className="px-3 py-2">
                  <span className="handle-badge text-xs">
                    @{handle?.handle?.replace(/@/g, '') || '...'}
                  </span>
                </div>
                <button
                  onClick={() => { logout(); closeMobile(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                >
                  <LogOutIcon size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-surface-200 dark:border-[#2e3347]">
                <Link to="/login" onClick={closeMobile}>
                  <Button variant="secondary" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMobile}>
                  <Button size="md" className="w-full">
                    Register Handle
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
