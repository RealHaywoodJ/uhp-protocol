import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ExternalLinkIcon } from '../components/ui/Icons';

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
          Blog
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400">
          Coming soon
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
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            Posts Are on the Way
          </h2>
          <p className="text-sm text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
            We are working on articles about quantum-resistant cryptography, decentralized identity,
            and the future of the UHP protocol. Follow us on GitHub to be notified when we publish.
          </p>
          <a
            href="https://github.com/RealHaywoodJ/uhp-protocol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" icon={<ExternalLinkIcon size={16} />}>
              Follow on GitHub
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
