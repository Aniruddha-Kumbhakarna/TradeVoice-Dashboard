import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, AlertTriangle, Calendar as CalendarIcon } from 'lucide-react';

interface Change {
  id: string;
  title: string;
  type: 'Service Request' | 'TSS Upgrade' | 'TradeSense Upgrade' | 'Maintenance' | 'Change Freeze';
  startDate: string;
  endDate: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
}

export function ChangeCalendar() {
  const [changes, setChanges] = useState<Change[]>([
    {
      id: '1',
      title: 'TSS Platform Upgrade',
      type: 'TSS Upgrade',
      startDate: '2026-03-13 22:00',
      endDate: '2026-03-14 06:00',
      description: 'Upgrading TSS platform to version 5.2.1',
      status: 'Planned',
    },
    {
      id: '2',
      title: 'TradeSense System Update',
      type: 'TradeSense Upgrade',
      startDate: '2026-03-13 23:00',
      endDate: '2026-03-14 04:00',
      description: 'TradeSense upgrade to latest release',
      status: 'Planned',
    },
    {
      id: '3',
      title: 'Recording Server Maintenance',
      type: 'Maintenance',
      startDate: '2026-03-20 20:00',
      endDate: '2026-03-21 02:00',
      description: 'Scheduled maintenance for recording servers',
      status: 'Planned',
    },
    {
      id: '4',
      title: 'Year-End Change Freeze',
      type: 'Change Freeze',
      startDate: '2026-12-20 00:00',
      endDate: '2027-01-05 00:00',
      description: 'No changes allowed during year-end period',
      status: 'Planned',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: 'Service Request' as Change['type'],
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleAddChange = (e: React.FormEvent) => {
    e.preventDefault();
    const newChange: Change = {
      id: Date.now().toString(),
      ...formData,
      status: 'Planned',
    };
    setChanges([...changes, newChange]);
    setFormData({
      title: '',
      type: 'Service Request',
      startDate: '',
      endDate: '',
      description: '',
    });
    setShowAddModal(false);
  };

  const handleDeleteChange = (id: string) => {
    setChanges(changes.filter((change) => change.id !== id));
  };

  // Check for overlapping changes
  const getOverlappingChanges = () => {
    const overlaps: string[] = [];
    for (let i = 0; i < changes.length; i++) {
      for (let j = i + 1; j < changes.length; j++) {
        const change1 = changes[i];
        const change2 = changes[j];
        const start1 = new Date(change1.startDate);
        const end1 = new Date(change1.endDate);
        const start2 = new Date(change2.startDate);
        const end2 = new Date(change2.endDate);

        if (
          (start1 >= start2 && start1 < end2) ||
          (start2 >= start1 && start2 < end1)
        ) {
          if (!overlaps.includes(change1.id)) overlaps.push(change1.id);
          if (!overlaps.includes(change2.id)) overlaps.push(change2.id);
        }
      }
    }
    return overlaps;
  };

  const overlappingChanges = getOverlappingChanges();
  const hasOverlaps = overlappingChanges.length > 0;

  const filteredChanges = changes.filter(
    (change) =>
      change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedChanges = [...filteredChanges].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const getTypeColor = (type: Change['type']) => {
    switch (type) {
      case 'TSS Upgrade':
        return 'bg-[#553a99] text-white';
      case 'TradeSense Upgrade':
        return 'bg-[#08538c] text-white';
      case 'Service Request':
        return 'bg-[#6cbc35] text-white';
      case 'Maintenance':
        return 'bg-[#fd9f3e] text-white';
      case 'Change Freeze':
        return 'bg-[#d52685] text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Change Calendar</h1>
          <p className="text-slate-600 mt-2">
            Manage planned changes, maintenance windows, and change freezes
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#d52685] text-white px-4 py-2 rounded-lg hover:bg-[#b51f6f] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Change
        </button>
      </div>

      {/* Overlap Warning */}
      {hasOverlaps && (
        <div className="mb-6 bg-red-50 border-2 border-red-400 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">
              Warning: Overlapping Changes Detected!
            </p>
            <p className="text-sm text-red-700 mt-1">
              {overlappingChanges.length} change(s) have overlapping time windows.
              Please review and adjust schedules to avoid conflicts.
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search changes by title, type, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
          />
        </div>
      </div>

      {/* Changes List */}
      <div className="space-y-4">
        {sortedChanges.map((change) => {
          const isOverlapping = overlappingChanges.includes(change.id);
          return (
            <div
              key={change.id}
              className={`bg-white rounded-lg shadow p-6 ${
                isOverlapping ? 'border-2 border-red-400' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {change.title}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                        change.type
                      )}`}
                    >
                      {change.type}
                    </span>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        change.status === 'Planned'
                          ? 'bg-blue-100 text-blue-800'
                          : change.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : change.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {change.status}
                    </span>
                    {isOverlapping && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        <AlertTriangle className="w-3 h-3" />
                        Overlap
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-3">{change.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700">
                        <span className="font-semibold">Start:</span>{' '}
                        {new Date(change.startDate).toLocaleString('en-GB', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700">
                        <span className="font-semibold">End:</span>{' '}
                        {new Date(change.endDate).toLocaleString('en-GB', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-[#553a99] hover:bg-purple-50 rounded transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteChange(change.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Change Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Add Planned Change
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddChange} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Change Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                  placeholder="e.g., TSS Platform Upgrade"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Change Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as Change['type'],
                    })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                >
                  <option value="Service Request">Service Request</option>
                  <option value="TSS Upgrade">TSS Upgrade</option>
                  <option value="TradeSense Upgrade">TradeSense Upgrade</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Change Freeze">Change Freeze</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  placeholder="Provide details about the planned change..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#d52685] text-white rounded-lg hover:bg-[#b51f6f] transition-colors font-semibold"
                >
                  Add Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
