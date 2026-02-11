import Card from '../components/ui/Card';
import { ShieldIcon } from '../components/ui/Icons';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-uhp-50 dark:bg-uhp-950/50 mb-6">
          <ShieldIcon size={28} className="text-uhp-600 dark:text-uhp-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400">
          Coming Soon
        </p>
      </div>

      {/* Placeholder Card */}
      <Card padding="lg" className="text-center">
        <div className="py-8">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            Terms of Service — Coming Soon
          </h2>
          <p className="text-sm text-surface-500 dark:text-surface-400 max-w-md mx-auto">
            UHP is an open-source protocol licensed under MIT. Terms of service for this
            reference implementation will be published here as the project progresses toward
            production readiness.
          </p>
        </div>
      </Card>
    </div>
  );
}
