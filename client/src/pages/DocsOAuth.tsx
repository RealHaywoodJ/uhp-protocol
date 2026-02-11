import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { KeyIcon, ExternalLinkIcon } from '../components/ui/Icons';

export default function DocsOAuth() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 mb-6">
          <KeyIcon size={28} className="text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
          OAuth Integration Guide
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
          Learn how to add "Sign in with UHP" to your application using OAuth 2.0 + PKCE.
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
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            Documentation Coming Soon
          </h2>
          <p className="text-sm text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
            Detailed OAuth integration documentation is being written. In the meantime,
            you can explore the reference implementation and demo relying party on GitHub.
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
