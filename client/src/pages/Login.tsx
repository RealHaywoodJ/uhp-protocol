import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useWebAuthn } from '../hooks/useWebAuthn';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { FingerprintIcon, ShieldIcon, CheckCircleIcon, AtSignIcon, KeyIcon, GlobeIcon } from '../components/ui/Icons';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login: authLogin } = useAuth();
  const { toast } = useToast();
  const { loading, error, step, login, clearError } = useWebAuthn();
  const [handle, setHandle] = useState('');

  const returnTo = searchParams.get('return_to');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const result = await login(handle);
    if (result) {
      await authLogin(result.session_token, result.handle.handle);
      toast('success', `Welcome back, ${result.handle.display_name || result.handle.handle}!`);

      setTimeout(() => {
        navigate(returnTo || '/dashboard');
      }, 800);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex animate-fade-in">
      {/* Left panel - Info */}
      <div className="hidden lg:flex lg:w-5/12 bg-surface-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-uhp-mesh opacity-40" />
          <div className="absolute top-40 right-10 w-32 h-32 rounded-full bg-uhp-600/10 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-quantum-600/10 blur-3xl" />
        </div>

        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome Back
          </h1>
          <p className="text-surface-400 text-lg leading-relaxed">
            Authenticate with your biometrics. No password to remember, no email to verify.
          </p>
        </div>

        <div className="relative space-y-6">
          <LoginInfoCard
            icon={<FingerprintIcon size={20} className="text-uhp-400" />}
            title="Touch to Authenticate"
            description="Use the same biometric you registered with."
          />
          <LoginInfoCard
            icon={<ShieldIcon size={20} className="text-uhp-400" />}
            title="Zero-Knowledge"
            description="Your biometric never leaves your device."
          />
          <LoginInfoCard
            icon={<KeyIcon size={20} className="text-uhp-400" />}
            title="Phishing Resistant"
            description="WebAuthn credentials are bound to this domain."
          />
        </div>

        <div className="relative flex items-center gap-2 text-surface-500 text-sm">
          <GlobeIcon size={14} />
          <span>Federated identity &middot; Own your data</span>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-surface-50 dark:bg-[#0f1117]">
        <div className="w-full max-w-md">
          <Card padding="lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-uhp-50 dark:bg-uhp-950/50 mb-4">
                <FingerprintIcon size={28} className="text-uhp-600 dark:text-uhp-400" />
              </div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Login</h2>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                Authenticate with your registered biometric
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Handle"
                prefix={<AtSignIcon size={16} />}
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value.toLowerCase());
                  clearError();
                }}
                placeholder="alice"
                required
                disabled={loading}
              />

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
                  <div className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              {step === 'authenticating' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-uhp-50 dark:bg-uhp-950/30 border border-uhp-200 dark:border-uhp-800 animate-pulse-slow">
                  <FingerprintIcon size={20} className="text-uhp-600 dark:text-uhp-400" />
                  <div>
                    <p className="text-sm font-medium text-uhp-800 dark:text-uhp-300">
                      Waiting for biometric...
                    </p>
                    <p className="text-xs text-uhp-600 dark:text-uhp-400 mt-0.5">
                      Follow the prompt from your browser to authenticate
                    </p>
                  </div>
                </div>
              )}

              {step === 'complete' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 animate-scale-in">
                  <CheckCircleIcon size={20} className="text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                      Authenticated successfully!
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Redirecting to dashboard...
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                loading={loading}
                disabled={loading || step === 'complete'}
                className="w-full"
                size="lg"
                icon={!loading ? <FingerprintIcon size={18} /> : undefined}
              >
                {loading
                  ? step === 'requesting'
                    ? 'Preparing...'
                    : step === 'verifying'
                    ? 'Verifying...'
                    : 'Processing...'
                  : 'Login with Biometrics'
                }
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
              Don't have a handle?{' '}
              <Link to="/register" className="text-uhp-600 dark:text-uhp-400 hover:text-uhp-700 dark:hover:text-uhp-300 font-medium">
                Register here
              </Link>
            </p>
          </Card>

          {/* Info note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-surface-400 leading-relaxed max-w-sm mx-auto">
              Your biometric data never leaves your device. UHP uses the WebAuthn/FIDO2
              standard for phishing-resistant passwordless authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginInfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-800/80 border border-surface-700/50">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <h4 className="font-medium text-surface-200 text-sm">{title}</h4>
        <p className="text-surface-400 text-sm mt-0.5">{description}</p>
      </div>
    </div>
  );
}
