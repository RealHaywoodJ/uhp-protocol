import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { GlobeIcon, ExternalLinkIcon } from '../components/ui/Icons';

export default function DocsSelfHosting() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 mb-6">
          <GlobeIcon size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
          Self-Hosting Guide
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
          Run your own UHP instance and federate with the rest of the network.
        </p>
      </div>

      {/* Placeholder Card */}
      <Card padding="lg" className="text-center">
        <div className="py-8">
          <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-6">
            <svg
              className="text-surface-400"
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            Documentation Coming Soon
          </h2>
          <p className="text-sm text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
            Self-hosting documentation is being written. UHP is designed to be federated — like
            email — so anyone can run their own instance. Explore the source code to get started.
          </p>
          <a
            href="https://github.com/RealHaywoodJ/uhp-protocol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" icon={<ExternalLinkIcon size={16} />}>
              View on GitHub
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
