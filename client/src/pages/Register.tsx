import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWebAuthn } from '../hooks/useWebAuthn';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { ShieldIcon, FingerprintIcon, CheckCircleIcon, AtSignIcon } from '../components/ui/Icons';

const stepLabels = ['Enter Handle', 'Biometric Setup', 'Complete'];

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading, error, step, register, clearError } = useWebAuthn();
  const [handle, setHandle] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [validationError, setValidationError] = useState('');

  const currentStep = step === 'idle' || step === 'requesting'
    ? 0
    : step === 'authenticating'
    ? 1
    : step === 'complete'
    ? 2
    : step === 'verifying'
    ? 1
    : 0;

  const validateHandle = (value: string): string => {
    if (value.length < 3) return 'Handle must be at least 3 characters';
    if (value.length > 20) return 'Handle must be 20 characters or less';
    if (!/^[a-z0-9_]+$/.test(value)) return 'Only lowercase letters, numbers, and underscores';
    if (value.startsWith('_') || value.endsWith('_')) return 'Cannot start or end with underscore';
    if (value.includes('__')) return 'Cannot have consecutive underscores';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validation = validateHandle(handle);
    if (validation) {
      setValidationError(validation);
      return;
    }
    setValidationError('');

    const result = await register(handle, displayName || undefined);
    if (result) {
      toast('success', `Handle @${result.handle.handle} registered successfully!`);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex animate-fade-in">
      {/* Left panel - Info */}
      <div className="hidden lg:flex lg:w-5/12 bg-uhp-gradient p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-4">
            Claim Your Identity
          </h1>
          <p className="text-uhp-200 text-lg leading-relaxed">
            Register a unique handle that becomes your universal login across the decentralized web.
            No email required.
          </p>
        </div>

        <div className="relative space-y-6">
          <InfoCard
            icon={<AtSignIcon size={20} className="text-white" />}
            title="Unique Handle"
            description="Your @handle is your identity. Like email, but you truly own it."
          />
          <InfoCard
            icon={<FingerprintIcon size={20} className="text-white" />}
            title="Biometric Security"
            description="Secured with WebAuthn. Face ID, fingerprint, or hardware keys."
          />
          <InfoCard
            icon={<ShieldIcon size={20} className="text-white" />}
            title="Quantum-Ready"
            description="Ed25519 now, upgradeable to post-quantum algorithms."
          />
        </div>

        <p className="relative text-uhp-300 text-sm">
          Phase 1 Reference Implementation
        </p>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Progress steps */}
          <div className="flex items-center justify-between mb-10">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      i <= currentStep
                        ? 'bg-uhp-600 text-white'
                        : 'bg-surface-200 text-surface-500'
                    }`}
                  >
                    {i < currentStep ? (
                      <CheckCircleIcon size={16} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`mt-1.5 text-2xs font-medium ${
                    i <= currentStep ? 'text-uhp-600' : 'text-surface-400'
                  }`}>
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                    i < currentStep ? 'bg-uhp-600' : 'bg-surface-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card padding="lg">
            <h2 className="text-2xl font-bold text-surface-900 mb-2">Register Handle</h2>
            <p className="text-sm text-surface-500 mb-8">
              Choose your unique handle and set up biometric authentication.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Handle"
                prefix={<AtSignIcon size={16} />}
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value.toLowerCase());
                  setValidationError('');
                  clearError();
                }}
                placeholder="alice"
                error={validationError}
                hint="3-20 characters: lowercase letters, numbers, underscores"
                required
                minLength={3}
                maxLength={20}
                disabled={loading}
              />

              <Input
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Alice Johnson (optional)"
                maxLength={100}
                disabled={loading}
              />

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {step === 'authenticating' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-uhp-50 border border-uhp-200 animate-pulse-slow">
                  <FingerprintIcon size={20} className="text-uhp-600" />
                  <div>
                    <p className="text-sm font-medium text-uhp-800">
                      Waiting for biometric...
                    </p>
                    <p className="text-xs text-uhp-600 mt-0.5">
                      Follow the prompt from your browser to register your credential
                    </p>
                  </div>
                </div>
              )}

              {step === 'complete' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 animate-scale-in">
                  <CheckCircleIcon size={20} className="text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      Handle registered successfully!
                    </p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Redirecting to login...
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
                  : 'Register with Biometrics'
                }
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-surface-500">
              Already have a handle?{' '}
              <Link to="/login" className="text-uhp-600 hover:text-uhp-700 font-medium">
                Login here
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <h4 className="font-medium text-white text-sm">{title}</h4>
        <p className="text-uhp-200 text-sm mt-0.5">{description}</p>
      </div>
    </div>
  );
}
