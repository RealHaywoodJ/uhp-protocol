import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PartnerBanner from '../components/home/PartnerBanner';
import { ShieldIcon, FingerprintIcon, GlobeIcon, KeyIcon, ArrowRightIcon } from '../components/ui/Icons';

const features = [
  {
    icon: ShieldIcon,
    title: 'Quantum-Resistant',
    description: 'Ed25519 signatures today, with a crypto-agile interface ready for ML-DSA-87 and SLH-DSA post-quantum algorithms.',
    color: 'text-uhp-600 bg-uhp-50 dark:bg-uhp-950/50',
  },
  {
    icon: FingerprintIcon,
    title: 'Passwordless Auth',
    description: 'WebAuthn/FIDO2 biometric authentication. Use Face ID, fingerprint, or hardware security keys. No passwords ever.',
    color: 'text-quantum-600 bg-quantum-50 dark:bg-quantum-950/50',
  },
  {
    icon: GlobeIcon,
    title: 'Decentralized & Federated',
    description: 'Like email, anyone can run an instance. Your handle is portable: @you@your-instance.com works everywhere.',
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50',
  },
  {
    icon: KeyIcon,
    title: 'OAuth 2.0 Provider',
    description: '"Sign in with UHP" for any website. Standard OAuth 2.0 + PKCE flow that developers already know.',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50',
  },
];

const stats = [
  { label: 'Signature Algorithm', value: 'Ed25519' },
  { label: 'Auth Standard', value: 'FIDO2/WebAuthn' },
  { label: 'OAuth Version', value: '2.0 + PKCE' },
  { label: 'Post-Quantum Ready', value: 'ML-DSA-87' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-uhp-mesh" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-uhp-50 dark:bg-uhp-950/50 border border-uhp-200 dark:border-uhp-800 text-uhp-700 dark:text-uhp-300 text-sm font-medium mb-8 animate-slide-down">
              <span className="status-dot-active" />
              Phase 1 Reference Implementation
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="text-surface-900 dark:text-white">Identity for the</span>
              <br />
              <span className="text-gradient">Post-Email Internet</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl mx-auto">
              The Universal Handle Protocol replaces email-based identity with
              quantum-resistant, passwordless, decentralized handles that you truly own.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" icon={<ArrowRightIcon size={18} />}>
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg">
                      Claim Your Handle
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary" size="lg">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Handle preview */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-[#1a1d27] shadow-uhp border border-surface-200 dark:border-[#2e3347]">
                <span className="font-mono text-sm text-surface-400">@</span>
                <span className="font-mono text-lg font-semibold text-gradient">alice</span>
                <span className="font-mono text-sm text-surface-400">@uhp.org</span>
                <span className="ml-2 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-2xs font-medium uppercase tracking-wide">
                  verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-surface-200 dark:border-[#2e3347] bg-white dark:bg-[#1a1d27]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</div>
                <div className="mt-1 text-base font-semibold font-mono text-surface-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
            Built for the Future
          </h2>
          <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
            Every component is designed for crypto-agility. When quantum computers arrive,
            your identity upgrades seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <Card key={feature.title} hover className={`animate-slide-up stagger-${i + 1}`} padding="lg">
              <div className="flex gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <feature.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Partner Banner */}
      <PartnerBanner />

      {/* How it works */}
      <section className="bg-surface-900 dark:bg-surface-800 text-white py-20 dark:border-y dark:border-[#2e3347]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-lg text-surface-400 max-w-2xl mx-auto">
              Three steps to sovereign identity. No email, no passwords, no central authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Claim a Handle',
                description: 'Choose your unique identifier like @alice. This becomes your universal login across all UHP-compatible services.',
              },
              {
                step: '02',
                title: 'Register Biometrics',
                description: 'Set up WebAuthn authentication with Face ID, fingerprint, or a hardware security key. No password needed.',
              },
              {
                step: '03',
                title: 'Sign In Everywhere',
                description: 'Use "Sign in with UHP" on any website that supports the protocol. One handle, infinite services.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-black text-surface-800 dark:text-surface-700 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-surface-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card padding="lg" className="text-center bg-uhp-gradient-subtle dark:!bg-uhp-950/30 dark:!border-uhp-900">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
            Ready to Own Your Identity?
          </h2>
          <p className="mt-3 text-surface-500 dark:text-surface-400 max-w-lg mx-auto">
            This is the Phase 1 reference implementation. Claim a handle on this instance
            and be among the first to experience the future of identity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" icon={<ArrowRightIcon size={18} />}>
                Register Your Handle
              </Button>
            </Link>
            <a
              href="https://github.com/RealHaywoodJ/uhp-protocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
