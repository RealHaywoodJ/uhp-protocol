import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { GlobeIcon, KeyIcon, ExternalLinkIcon } from '../components/ui/Icons';

export default function Partners() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-uhp-50 dark:bg-uhp-950/50 mb-6">
          <GlobeIcon size={28} className="text-uhp-600 dark:text-uhp-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
          Partner with UHP
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
          Bring quantum-resistant authentication to your platform
        </p>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* For Organizations */}
        <Card padding="lg" hover>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-uhp-50 dark:bg-uhp-950/50 flex items-center justify-center">
              <GlobeIcon size={20} className="text-uhp-600 dark:text-uhp-400" />
            </div>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              For Organizations
            </h2>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4">
            Integrate "Sign in with UHP" into your platform using our standard OAuth 2.0 + PKCE flow.
            Give your users passwordless, quantum-resistant authentication without building it from scratch.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-uhp-500 flex-shrink-0" />
              Standard OAuth 2.0 + PKCE integration
            </li>
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-uhp-500 flex-shrink-0" />
              WebAuthn/FIDO2 biometric authentication
            </li>
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-uhp-500 flex-shrink-0" />
              Crypto-agile: Ed25519 today, ML-DSA-87 ready
            </li>
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-uhp-500 flex-shrink-0" />
              No email dependency or central authority
            </li>
          </ul>
        </Card>

        {/* For Developers */}
        <Card padding="lg" hover>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-quantum-50 dark:bg-quantum-950/50 flex items-center justify-center">
              <KeyIcon size={20} className="text-quantum-600 dark:text-quantum-400" />
            </div>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              For Developers
            </h2>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4">
            UHP is open source and community-driven. Contribute to the protocol, build integrations,
            run your own federated instance, or help shape the future of decentralized identity.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-quantum-500 flex-shrink-0" />
              MIT licensed — fully open source
            </li>
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-quantum-500 flex-shrink-0" />
              TypeScript + Node.js reference implementation
            </li>
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-quantum-500 flex-shrink-0" />
              Federation protocol for self-hosted instances
            </li>
            <li className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-quantum-500 flex-shrink-0" />
              Active roadmap with post-quantum migration plan
            </li>
          </ul>
        </Card>
      </div>

      {/* CTA Section */}
      <Card padding="lg" className="text-center bg-uhp-gradient-subtle dark:!bg-uhp-950/30 dark:!border-uhp-900">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
          Ready to Get Involved?
        </h2>
        <p className="text-surface-500 dark:text-surface-400 max-w-lg mx-auto mb-8">
          Whether you want to integrate UHP into your product or contribute to the protocol,
          we would love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:partnerships@uhp.org">
            <Button size="lg">
              Get in Touch
            </Button>
          </a>
          <a
            href="https://pitchhut.com/project/uhp-protocol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" icon={<ExternalLinkIcon size={16} />}>
              See our pitch on PitchHut
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
