import { useState } from 'react';
import { Globe, Settings } from 'lucide-react';
import { GlobalTurretDeployment } from './GlobalTurretDeployment';
import { TurretManagement } from './TurretManagement';

export function TurretsWrapper() {
  const [activeTab, setActiveTab] = useState<'global' | 'manage'>('global');

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="flex gap-1 px-8 pt-4">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold transition-colors ${
              activeTab === 'global'
                ? 'bg-slate-50 text-[#d52685] border-b-2 border-[#d52685]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span>Global Deployment</span>
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold transition-colors ${
              activeTab === 'manage'
                ? 'bg-slate-50 text-[#d52685] border-b-2 border-[#d52685]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Manage Turrets</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'global' ? <GlobalTurretDeployment /> : <TurretManagement />}
      </div>
    </div>
  );
}
