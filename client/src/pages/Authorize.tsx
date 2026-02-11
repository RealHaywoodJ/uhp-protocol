import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ShieldIcon, CheckCircleIcon, AlertCircleIcon } from '../components/ui/Icons';

interface AuthorizeParams {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
  code_challenge?: string;
  code_challenge_method?: string;
}

const scopeLabels: Record<string, { label: string; description: string }> = {
  handle: {
    label: 'Handle',
    description: 'Read your handle identifier (@username@instance)',
  },
  profile: {
    label: 'Profile',
    description: 'Read your display name and public key info',
  },
};

export default function Authorize() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, isLoading, handle } = useAuth();
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState('');

  const params: AuthorizeParams = {
    client_id: searchParams.get('client_id') || '',
    redirect_uri: searchParams.get('redirect_uri') || '',
    response_type: searchParams.get('response_type') || 'code',
    scope: searchParams.get('scope') || 'handle profile',
    state: searchParams.get('state') || '',
    code_challenge: searchParams.get('code_challenge') || undefined,
    code_challenge_method: searchParams.get('code_challenge_method') || undefined,
  };

  const scopes = params.scope.split(' ').filter(Boolean);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login with return URL
      const returnUrl = `/authorize?${searchParams.toString()}`;
      window.location.href = `/login?return_to=${encodeURIComponent(returnUrl)}`;
    }
  }, [isLoading, isAuthenticated, searchParams]);

  const handleApprove = async () => {
    setApproving(true);
    setError('');

    try {
      // Submit approval to the server's OAuth authorize endpoint
      const res = await fetch(`/api/v1/oauth/authorize?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Cookie': `session=${localStorage.getItem('uhp_session')}`,
        },
        redirect: 'manual',
      });

      if (res.type === 'opaqueredirect' || res.status === 302) {
        // Server redirected - follow it
        const location = res.headers.get('Location');
        if (location) {
          window.location.href = location;
          return;
        }
      }

      // Try to get redirect URL from response
      if (res.ok) {
        const data = await res.json();
        if (data.redirect_uri) {
          window.location.href = data.redirect_uri;
          return;
        }
      }

      // Fallback: construct redirect with error info
      throw new Error('Authorization flow could not complete');
    } catch (err: any) {
      setError(err.message || 'Authorization failed');
      setApproving(false);
    }
  };

  const handleDeny = () => {
    // Redirect back with error
    const url = new URL(params.redirect_uri);
    url.searchParams.set('error', 'access_denied');
    url.searchParams.set('error_description', 'User denied the authorization request');
    if (params.state) url.searchParams.set('state', params.state);
    window.location.href = url.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-uhp-mesh animate-fade-in">
      <div className="w-full max-w-md">
        <Card padding="none" className="overflow-hidden">
          {/* Header */}
          <div className="bg-surface-900 p-6 text-center">
            <Logo size="md" />
            <p className="text-surface-400 text-sm mt-3">
              Authorization Request
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* App info */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-3">
                <ShieldIcon size={24} className="text-surface-500" />
              </div>
              <p className="text-sm text-surface-500">
                <span className="font-semibold text-surface-900">
                  {params.client_id || 'An application'}
                </span>
                {' '}wants to access your UHP identity
              </p>
            </div>

            {/* Authenticated as */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-uhp-50 border border-uhp-200">
              <CheckCircleIcon size={18} className="text-uhp-600 flex-shrink-0" />
              <div className="text-sm">
                <span className="text-surface-500">Signed in as </span>
                <span className="font-mono font-semibold text-uhp-700">
                  @{handle?.handle?.replace(/@/g, '') || ''}
                </span>
              </div>
            </div>

            {/* Scopes */}
            <div>
              <h3 className="text-sm font-semibold text-surface-900 mb-3">
                This app will be able to:
              </h3>
              <div className="space-y-2">
                {scopes.map((scope) => {
                  const info = scopeLabels[scope] || { label: scope, description: `Access your ${scope} data` };
                  return (
                    <div key={scope} className="flex items-start gap-3 p-3 rounded-xl bg-surface-50 border border-surface-100">
                      <CheckCircleIcon size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-surface-900">{info.label}</div>
                        <div className="text-xs text-surface-500">{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Redirect info */}
            <div className="text-xs text-surface-400 text-center">
              Will redirect to: <span className="font-mono">{params.redirect_uri}</span>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircleIcon size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                size="lg"
                onClick={handleDeny}
                disabled={approving}
              >
                Deny
              </Button>
              <Button
                className="flex-1"
                size="lg"
                onClick={handleApprove}
                loading={approving}
              >
                Authorize
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-surface-400 mt-4">
          Only authorize applications you trust. UHP never shares your biometric data.
        </p>
      </div>
    </div>
  );
}
