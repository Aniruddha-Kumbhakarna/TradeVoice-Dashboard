import { useState } from 'react';
import { Plus, Search, Trash2, X } from 'lucide-react';

interface Line {
  id: string;
  lineNumber: string;
  userName: string;
  userId: string;
  lineType: 'Direct' | 'Hotline' | 'Intercom' | 'External';
  status: 'active' | 'inactive';
  destination?: string;
}

export function LineManagement() {
  const [lines, setLines] = useState<Line[]>([
    { id: '1', lineNumber: '101', userName: 'Tony Stark', userId: '1', lineType: 'Direct', status: 'active', destination: '+1-212-555-0101' },
    { id: '2', lineNumber: '102', userName: 'John Wick', userId: '1', lineType: 'Hotline', status: 'active', destination: 'Trading Desk 2' },
    { id: '3', lineNumber: '103', userName: 'Jarvis', userId: '2', lineType: 'External', status: 'active', destination: '+1-212-555-0202' },
    { id: '4', lineNumber: '104', userName: 'Steve Rogers', userId: '3', lineType: 'Intercom', status: 'active', destination: 'Operations' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    lineNumber: '',
    userName: 'John Smith',
    lineType: 'Direct' as Line['lineType'],
    destination: '',
  });

  // Mock users for dropdown
  const users = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Michael Chen' },
    { id: '4', name: 'Emily Davis' },
  ];

  const handleAddLine = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = users.find((u) => u.name === formData.userName);
    const newLine: Line = {
      id: Date.now().toString(),
      lineNumber: formData.lineNumber,
      userName: formData.userName,
      userId: selectedUser?.id || '1',
      lineType: formData.lineType,
      status: 'active',
      destination: formData.destination,
    };
    setLines([...lines, newLine]);
    setFormData({ lineNumber: '', userName: 'John Smith', lineType: 'Direct', destination: '' });
    setShowAddModal(false);
  };

  const handleDeleteLine = (id: string) => {
    setLines(lines.filter((line) => line.id !== id));
  };

  const filteredLines = lines.filter((line) =>
    line.lineNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.lineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage My Lines</h1>
          <p className="text-slate-600 mt-2">Assign and manage phone lines for users</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#d52685] text-white px-4 py-2 rounded-lg hover:bg-[#b51f6f] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Line
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search lines by number, user, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
          />
        </div>
      </div>

      {/* Lines Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Line Number</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">User</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Line Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Destination</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredLines.map((line) => (
              <tr key={line.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono">{line.lineNumber}</td>
                <td className="px-6 py-4">{line.userName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      line.lineType === 'Direct'
                        ? 'bg-blue-100 text-blue-800'
                        : line.lineType === 'Hotline'
                        ? 'bg-red-100 text-red-800'
                        : line.lineType === 'Intercom'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {line.lineType}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{line.destination}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      line.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {line.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteLine(line.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Line Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Add New Line</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddLine} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Line Number</label>
                <input
                  type="text"
                  required
                  value={formData.lineNumber}
                  onChange={(e) => setFormData({ ...formData, lineNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 105"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Assign to User</label>
                <select
                  required
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Line Type</label>
                <select
                  required
                  value={formData.lineType}
                  onChange={(e) => setFormData({ ...formData, lineType: e.target.value as Line['lineType'] })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Direct">Direct</option>
                  <option value="Hotline">Hotline</option>
                  <option value="Intercom">Intercom</option>
                  <option value="External">External</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Destination</label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., +1-212-555-0123 or Desk Name"
                />
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
                  Add Line
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}