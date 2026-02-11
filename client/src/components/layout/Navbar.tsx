import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { MenuIcon, XIcon, LogOutIcon, UserIcon } from '../ui/Icons';

export default function Navbar() {
  const { isAuthenticated, handle, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-uhp-600'
        : 'text-surface-600 hover:text-surface-900'
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-surface-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                  Dashboard
                </Link>
                <Link to="/admin" className={navLinkClass('/admin')}>
                  Admin
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-surface-200">
                  <div className="handle-badge text-xs">
                    @{handle?.handle?.replace(/@/g, '') || '...'}
                  </div>
                  <button
                    onClick={logout}
                    className="text-surface-400 hover:text-surface-600 transition-colors p-1.5 rounded-lg hover:bg-surface-100"
                    title="Logout"
                  >
                    <LogOutIcon size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
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
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/') ? 'bg-uhp-50 text-uhp-600' : 'text-surface-700 hover:bg-surface-50'}`}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/dashboard') ? 'bg-uhp-50 text-uhp-600' : 'text-surface-700 hover:bg-surface-50'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <UserIcon size={16} /> Dashboard
                  </span>
                </Link>
                <Link
                  to="/admin"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive('/admin') ? 'bg-uhp-50 text-uhp-600' : 'text-surface-700 hover:bg-surface-50'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </Link>
                <div className="pt-2 border-t border-surface-200">
                  <div className="px-3 py-2">
                    <span className="handle-badge text-xs">
                      @{handle?.handle?.replace(/@/g, '') || '...'}
                    </span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOutIcon size={16} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-surface-200">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
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
