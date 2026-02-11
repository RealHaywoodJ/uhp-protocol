import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import {
  ShieldIcon, KeyIcon, GlobeIcon, FingerprintIcon,
  ExternalLinkIcon, CheckCircleIcon,
} from '../components/ui/Icons';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, handle } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading your identity..." />
      </div>
    );
  }

  if (!handle) return null;

  const handleName = handle.handle?.replace(/@/g, '') || '';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-surface-500 mt-1">Manage your UHP identity and connections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Card - Full width on mobile, spans 2 cols on desktop */}
        <div className="lg:col-span-2">
          <Card padding="none" className="overflow-hidden">
            <div className="bg-uhp-gradient p-8 relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white/20 blur-3xl" />
              </div>
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="status-dot-active" />
                    <span className="text-xs font-medium text-uhp-200 uppercase tracking-wider">
                      Active Handle
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-mono">
                    @{handleName}
                  </h2>
                  {handle.display_name && (
                    <p className="text-uhp-200 mt-1">{handle.display_name}</p>
                  )}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <ShieldIcon size={28} className="text-white" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <InfoTile
                  label="Algorithm"
                  value={handle.algorithm}
                  icon={<KeyIcon size={16} className="text-uhp-500" />}
                />
                <InfoTile
                  label="Status"
                  value={handle.status}
                  icon={<CheckCircleIcon size={16} className="text-emerald-500" />}
                />
                <InfoTile
                  label="Created"
                  value={new Date(handle.created_at).toLocaleDateString()}
                  icon={<GlobeIcon size={16} className="text-surface-400" />}
                />
                <InfoTile
                  label="Security"
                  value="WebAuthn"
                  icon={<FingerprintIcon size={16} className="text-quantum-500" />}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="text-sm font-semibold text-surface-900 mb-4 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <a
                href="http://localhost:4000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="w-full justify-start" size="md" icon={<ExternalLinkIcon size={16} />}>
                  Try Demo App
                </Button>
              </a>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="md"
                icon={<KeyIcon size={16} />}
                onClick={() => navigator.clipboard.writeText(handle.public_key || '')}
              >
                Copy Public Key
              </Button>
            </div>
          </Card>

          {/* Algorithm info */}
          <Card padding="md" className="bg-uhp-gradient-subtle border-uhp-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-uhp-100 flex items-center justify-center flex-shrink-0">
                <ShieldIcon size={18} className="text-uhp-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-surface-900">Crypto-Agile</h4>
                <p className="text-xs text-surface-500 mt-1 leading-relaxed">
                  Your identity uses {handle.algorithm} signatures. When post-quantum algorithms
                  (ML-DSA-87) are ready, your handle upgrades seamlessly.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* OAuth Integrations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-surface-900 mb-4">Connected Applications</h2>
        <Card padding="lg" className="text-center">
          <div className="py-6">
            <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
              <GlobeIcon size={28} className="text-surface-400" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">
              No Connected Apps Yet
            </h3>
            <p className="text-sm text-surface-500 max-w-md mx-auto mb-6">
              When you use "Sign in with UHP" on third-party websites, they'll appear here.
              Try the demo relying party to see the OAuth flow in action.
            </p>
            <a
              href="http://localhost:4000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                icon={<ExternalLinkIcon size={16} />}
              >
                Try Demo Relying Party
              </Button>
            </a>
          </div>
        </Card>
      </div>

      {/* Security Features */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-surface-900 mb-4">Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SecurityFeature
            icon={<FingerprintIcon size={20} className="text-uhp-600" />}
            title="Passwordless Auth"
            description="WebAuthn/FIDO2 biometric authentication. No passwords to steal."
            status="active"
          />
          <SecurityFeature
            icon={<ShieldIcon size={20} className="text-quantum-600" />}
            title="Quantum-Resistant"
            description={`${handle.algorithm} signatures with crypto-agile upgrade path.`}
            status="active"
          />
          <SecurityFeature
            icon={<GlobeIcon size={20} className="text-emerald-600" />}
            title="Decentralized"
            description="Federated identity. No single point of failure."
            status="active"
          />
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="text-2xs font-medium text-surface-500 uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-semibold text-surface-900">{value}</span>
    </div>
  );
}

function SecurityFeature({
  icon, title, description, status,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'active' | 'inactive';
}) {
  return (
    <Card hover padding="md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-surface-900">{title}</h4>
            <span className={`status-dot${status === 'active' ? '-active' : '-inactive'}`} />
          </div>
          <p className="text-xs text-surface-500 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
