import Logo from '../ui/Logo';
import { ShieldIcon, GlobeIcon, KeyIcon } from '../ui/Icons';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-surface-400 leading-relaxed">
              Quantum-resistant decentralized identity for the post-email internet.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Protocol</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors flex items-center gap-2">
                  <ShieldIcon size={14} /> Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors flex items-center gap-2">
                  <KeyIcon size={14} /> Crypto-Agility
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors flex items-center gap-2">
                  <GlobeIcon size={14} /> Federation
                </a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Developers</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">
                  OAuth Integration
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">
                  Self-Hosting Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/RealHaywoodJ/uhp-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-surface-400 hover:text-white transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-500">
            Universal Handle Protocol &middot; Reference Implementation v0.1.0
          </p>
          <div className="flex items-center gap-2 text-xs text-surface-500">
            <span className="status-dot-active" />
            <span>Ed25519 (upgradeable to ML-DSA-87)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
