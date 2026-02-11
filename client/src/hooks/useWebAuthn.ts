import { useState, useCallback } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

interface WebAuthnState {
  loading: boolean;
  error: string | null;
  step: 'idle' | 'requesting' | 'authenticating' | 'verifying' | 'complete' | 'error';
}

interface RegisterResult {
  verified: boolean;
  handle: {
    id: string;
    handle: string;
    display_name?: string;
    algorithm: string;
    status: string;
    created_at: string;
  };
}

interface LoginResult {
  verified: boolean;
  session_token: string;
  handle: {
    handle: string;
    display_name?: string;
  };
}

export function useWebAuthn() {
  const [state, setState] = useState<WebAuthnState>({
    loading: false,
    error: null,
    step: 'idle',
  });

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, step: 'idle' }));
  }, []);

  const register = useCallback(async (handle: string, displayName?: string): Promise<RegisterResult | null> => {
    setState({ loading: true, error: null, step: 'requesting' });

    try {
      // Step 1: Get registration options
      const optionsRes = await fetch('/api/v1/auth/register/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, display_name: displayName }),
      });

      if (!optionsRes.ok) {
        const err = await optionsRes.json();
        throw new Error(err.error || 'Failed to get registration options');
      }

      const options = await optionsRes.json();
      setState((prev) => ({ ...prev, step: 'authenticating' }));

      // Step 2: WebAuthn ceremony
      const attResp = await startRegistration(options);
      setState((prev) => ({ ...prev, step: 'verifying' }));

      // Step 3: Verify
      const verifyRes = await fetch('/api/v1/auth/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, response: attResp }),
      });

      if (!verifyRes.ok) {
        const err = await verifyRes.json();
        throw new Error(err.error || 'Registration verification failed');
      }

      const result: RegisterResult = await verifyRes.json();

      if (!result.verified) {
        throw new Error('Registration verification failed');
      }

      setState({ loading: false, error: null, step: 'complete' });
      return result;
    } catch (err: any) {
      const message = err.name === 'NotAllowedError'
        ? 'Biometric authentication was cancelled or not available'
        : err.message || 'Registration failed';
      setState({ loading: false, error: message, step: 'error' });
      return null;
    }
  }, []);

  const login = useCallback(async (handle: string): Promise<LoginResult | null> => {
    setState({ loading: true, error: null, step: 'requesting' });

    try {
      // Step 1: Get authentication options
      const optionsRes = await fetch('/api/v1/auth/login/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
      });

      if (!optionsRes.ok) {
        const err = await optionsRes.json();
        throw new Error(err.error || 'Failed to get authentication options');
      }

      const options = await optionsRes.json();
      setState((prev) => ({ ...prev, step: 'authenticating' }));

      // Step 2: WebAuthn ceremony
      const asrtResp = await startAuthentication(options);
      setState((prev) => ({ ...prev, step: 'verifying' }));

      // Step 3: Verify
      const verifyRes = await fetch('/api/v1/auth/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, response: asrtResp }),
      });

      if (!verifyRes.ok) {
        const err = await verifyRes.json();
        throw new Error(err.error || 'Authentication verification failed');
      }

      const result: LoginResult = await verifyRes.json();

      if (!result.verified) {
        throw new Error('Authentication verification failed');
      }

      setState({ loading: false, error: null, step: 'complete' });
      return result;
    } catch (err: any) {
      const message = err.name === 'NotAllowedError'
        ? 'Biometric authentication was cancelled or not available'
        : err.message || 'Login failed';
      setState({ loading: false, error: message, step: 'error' });
      return null;
    }
  }, []);

  return {
    ...state,
    register,
    login,
    clearError,
  };
}
