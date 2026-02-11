import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { UsersIcon, ShieldIcon, GlobeIcon, KeyIcon, AlertCircleIcon } from '../components/ui/Icons';

interface HandleRecord {
  id: string;
  handle: string;
  display_name?: string;
  algorithm: string;
  status: string;
  created_at: string;
}

interface InstanceInfo {
  instance: string;
  version: string;
  algorithms: string[];
  endpoints: Record<string, string>;
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [handles, setHandles] = useState<HandleRecord[]>([]);
  const [instanceInfo, setInstanceInfo] = useState<InstanceInfo | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const fetchData = useCallback(async () => {
    try {
      const [handlesRes, instanceRes] = await Promise.all([
        fetch('/api/v1/handles'),
        fetch('/.well-known/uhp-configuration'),
      ]);

      if (handlesRes.ok) {
        const data = await handlesRes.json();
        setHandles(Array.isArray(data) ? data : data.handles || []);
      }

      if (instanceRes.ok) {
        setInstanceInfo(await instanceRes.json());
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  if (isLoading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading admin panel..." />
      </div>
    );
  }

  const filteredHandles = handles.filter(
    (h) =>
      h.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.display_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeHandles = handles.filter((h) => h.status === 'active').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Admin Panel</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Instance management and handle administration</p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
          <AlertCircleIcon size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<UsersIcon size={20} className="text-uhp-600 dark:text-uhp-400" />}
          label="Total Handles"
          value={handles.length.toString()}
          bg="bg-uhp-50 dark:bg-uhp-950/50"
        />
        <StatCard
          icon={<ShieldIcon size={20} className="text-emerald-600 dark:text-emerald-400" />}
          label="Active"
          value={activeHandles.toString()}
          bg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          icon={<KeyIcon size={20} className="text-quantum-600 dark:text-quantum-400" />}
          label="Algorithm"
          value={instanceInfo?.algorithms?.[0] || 'Ed25519'}
          bg="bg-quantum-50 dark:bg-quantum-950/50"
        />
        <StatCard
          icon={<GlobeIcon size={20} className="text-amber-600 dark:text-amber-400" />}
          label="Instance"
          value={instanceInfo?.instance || 'localhost'}
          bg="bg-amber-50 dark:bg-amber-950/50"
        />
      </div>

      {/* Instance Info */}
      {instanceInfo && (
        <Card padding="md" className="mb-8">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Instance Configuration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-surface-500 dark:text-surface-400">Instance Domain:</span>
              <span className="ml-2 font-mono text-surface-900 dark:text-white">{instanceInfo.instance}</span>
            </div>
            <div>
              <span className="text-surface-500 dark:text-surface-400">Version:</span>
              <span className="ml-2 font-mono text-surface-900 dark:text-white">{instanceInfo.version}</span>
            </div>
            <div>
              <span className="text-surface-500 dark:text-surface-400">Algorithms:</span>
              <span className="ml-2 font-mono text-surface-900 dark:text-white">{instanceInfo.algorithms?.join(', ')}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Handles Table */}
      <Card padding="none">
        <div className="p-4 border-b border-surface-200 dark:border-[#2e3347] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Registered Handles</h2>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search handles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredHandles.length === 0 ? (
          <div className="p-12 text-center">
            <UsersIcon size={32} className="text-surface-300 dark:text-surface-600 mx-auto mb-3" />
            <p className="text-surface-500 dark:text-surface-400">
              {searchQuery ? 'No handles match your search' : 'No handles registered yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-[#2e3347] bg-surface-50 dark:bg-surface-800/50">
                  <th className="text-left px-4 py-3 font-medium text-surface-500 dark:text-surface-400">Handle</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500 dark:text-surface-400">Display Name</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500 dark:text-surface-400">Algorithm</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500 dark:text-surface-400">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500 dark:text-surface-400">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredHandles.map((h) => (
                  <tr key={h.id} className="border-b border-surface-100 dark:border-[#2e3347]/50 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="handle-badge text-xs">@{h.handle}</span>
                    </td>
                    <td className="px-4 py-3 text-surface-700 dark:text-surface-300">{h.display_name || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-surface-600 dark:text-surface-400">{h.algorithm}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`status-dot${h.status === 'active' ? '-active' : '-inactive'}`} />
                        <span className={`text-xs font-medium ${h.status === 'active' ? 'text-emerald-700 dark:text-emerald-400' : 'text-surface-500 dark:text-surface-400'}`}>
                          {h.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400 text-xs">
                      {new Date(h.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-surface-200 dark:border-[#2e3347] flex items-center justify-between">
          <span className="text-xs text-surface-500 dark:text-surface-400">
            {filteredHandles.length} of {handles.length} handles
          </span>
          <Button variant="ghost" size="sm" onClick={fetchData}>
            Refresh
          </Button>
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  icon, label, value, bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <Card hover padding="md">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <div>
          <div className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">{label}</div>
          <div className="text-lg font-bold text-surface-900 dark:text-white mt-0.5">{value}</div>
        </div>
      </div>
    </Card>
  );
}
