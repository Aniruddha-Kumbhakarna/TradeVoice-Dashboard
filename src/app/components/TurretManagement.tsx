import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';

interface Turret {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  model: string;
  status: 'online' | 'offline' | 'maintenance';
  connectedLines: number;
}

export function TurretManagement() {
  const [turrets, setTurrets] = useState<Turret[]>([
    { id: '1', name: 'TRT-A1-001', location: 'Fx dollar Desk', ipAddress: '10.0.1.101', model: 'BT T4', status: 'online', connectedLines: 24 },
    { id: '2', name: 'TRT-A1-002', location: 'Energy sales Desk', ipAddress: '10.0.1.102', model: 'BT Flex', status: 'online', connectedLines: 18 },
    { id: '3', name: 'TRT-B1-001', location: 'coal Futures Desk', ipAddress: '10.0.2.101', model: 'BT SIP Netrix', status: 'offline', connectedLines: 0 },
    { id: '4', name: 'TRT-C1-001', location: 'Fx Equity Desk', ipAddress: '10.0.3.101', model: 'BT T4 Mini', status: 'offline', connectedLines: 16 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ipAddress: '',
    model: 'BT T4',
  });

  const handleAddTurret = (e: React.FormEvent) => {
    e.preventDefault();
    const newTurret: Turret = {
      id: Date.now().toString(),
      ...formData,
      status: 'online',
      connectedLines: 0,
    };
    setTurrets([...turrets, newTurret]);
    setFormData({ name: '', location: '', ipAddress: '', model: 'IPC Trader 6000' });
    setShowAddModal(false);
  };

  const handleDeleteTurret = (id: string) => {
    setTurrets(turrets.filter((turret) => turret.id !== id));
  };

  const filteredTurrets = turrets.filter((turret) =>
    turret.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turret.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turret.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add & Configure Turrets</h1>
          <p className="text-slate-600 mt-2">Add new turrets and modify existing configurations</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#d52685] text-white px-4 py-2 rounded-lg hover:bg-[#b51f6f] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Turret
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search turrets by name, location, or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
          />
        </div>
      </div>

      {/* Turrets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTurrets.map((turret) => (
          <div key={turret.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{turret.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{turret.location}</p>
              </div>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  turret.status === 'online'
                    ? 'bg-green-100 text-green-800'
                    : turret.status === 'offline'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {turret.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Model</span>
                <span className="font-semibold">{turret.model}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">IP Address</span>
                <span className="font-mono font-semibold">{turret.ipAddress}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Connected Lines</span>
                <span className="font-semibold">{turret.connectedLines}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTurret(turret.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Turret Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Add New Turret</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTurret} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Turret Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., TRT-A1-003"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Trading Floor A - Desk 3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">IP Address</label>
                <input
                  type="text"
                  required
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10.0.1.103"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Model</label>
                <select
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="IPC Trader 6000">BT T4</option>
                  <option value="IPC Trader 8000">BT Flex</option>
                  <option value="BT Trader 9000">BT T4 Mini</option>
                  <option value="Speakerbus SB-48">BT SIP Netrix</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Turret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}