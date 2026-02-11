import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface HandleInfo {
  id: string;
  handle: string;
  display_name?: string;
  algorithm: string;
  public_key?: string;
  status: string;
  created_at: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionToken: string | null;
  handle: HandleInfo | null;
}

interface AuthContextType extends AuthState {
  login: (sessionToken: string, handleString: string) => Promise<void>;
  logout: () => void;
  refreshHandle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function extractHandle(handleString: string): string {
  const match = handleString.match(/@([^@]+)@/);
  return match ? match[1] : handleString.replace(/@/g, '');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    sessionToken: null,
    handle: null,
  });

  const fetchHandleInfo = useCallback(async (handleString: string): Promise<HandleInfo | null> => {
    const handle = extractHandle(handleString);
    try {
      const res = await fetch(`/api/v1/handles/${handle}`);
      if (!res.ok) return null;
      const data = await res.json();
      return {
        id: data.id || 'unknown',
        handle: data.handle,
        display_name: data.display_name,
        algorithm: data.algorithm,
        public_key: data.public_key,
        status: data.status,
        created_at: data.created_at,
      };
    } catch {
      return null;
    }
  }, []);

  // Initialize from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('uhp_session');
    const handleString = localStorage.getItem('uhp_handle');

    if (token && handleString) {
      fetchHandleInfo(handleString).then((info) => {
        if (info) {
          setState({
            isAuthenticated: true,
            isLoading: false,
            sessionToken: token,
            handle: info,
          });
        } else {
          // Invalid session, clear it
          localStorage.removeItem('uhp_session');
          localStorage.removeItem('uhp_handle');
          setState({ isAuthenticated: false, isLoading: false, sessionToken: null, handle: null });
        }
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [fetchHandleInfo]);

  const login = useCallback(async (sessionToken: string, handleString: string) => {
    localStorage.setItem('uhp_session', sessionToken);
    localStorage.setItem('uhp_handle', handleString);

    const info = await fetchHandleInfo(handleString);
    setState({
      isAuthenticated: true,
      isLoading: false,
      sessionToken,
      handle: info,
    });
  }, [fetchHandleInfo]);

  const logout = useCallback(() => {
    localStorage.removeItem('uhp_session');
    localStorage.removeItem('uhp_handle');
    setState({ isAuthenticated: false, isLoading: false, sessionToken: null, handle: null });
  }, []);

  const refreshHandle = useCallback(async () => {
    const handleString = localStorage.getItem('uhp_handle');
    if (!handleString) return;
    const info = await fetchHandleInfo(handleString);
    if (info) {
      setState((prev) => ({ ...prev, handle: info }));
    }
  }, [fetchHandleInfo]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshHandle }}>
      {children}
    </AuthContext.Provider>
  );
}
