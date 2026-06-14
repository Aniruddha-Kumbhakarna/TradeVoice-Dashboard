import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  desk: string;
  status: 'active' | 'inactive';
  lines: number;
}

type SortField = 'name' | 'email' | 'department' | 'desk' | 'lines' | 'status';
type SortDirection = 'asc' | 'desc' | null;

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Wick', email: 'john.wick@company.com', department: 'Trading', desk: 'Equity', status: 'active', lines: 100 },
    { id: '2', name: 'Peter Bateman', email: 'peter.b@company.com', department: 'Sales', desk: 'FX sales', status: 'active', lines: 75 },
    { id: '3', name: 'Jarvis', email: 'Jarvis@company.com', department: 'Trading', desk: 'Fut coal', status: 'active', lines: 50 },
    { id: '4', name: 'Tony Stark', email: 'Tony.Stark@company.com', department: 'Operations', desk: 'Fut Crude', status: 'inactive', lines: 200 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    desk: '',
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      ...formData,
      status: 'active',
      lines: 0,
    };
    setUsers([...users, newUser]);
    setFormData({ name: '', email: '', department: '', desk: '' });
    setShowAddModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-slate-400" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-4 h-4 text-[#d52685]" />;
    }
    return <ArrowDown className="w-4 h-4 text-[#d52685]" />;
  };

  let filteredAndSortedUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortField && sortDirection) {
    filteredAndSortedUsers = [...filteredAndSortedUsers].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      
      if (sortDirection === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage My Users</h1>
          <p className="text-slate-600 mt-2">Add and manage trading voice users</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#d52685] text-white px-4 py-2 rounded-lg hover:bg-[#b51f6f] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th 
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Name
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-2">
                  Email
                  {getSortIcon('email')}
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center gap-2">
                  Department
                  {getSortIcon('department')}
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('desk')}
              >
                <div className="flex items-center gap-2">
                  Desk
                  {getSortIcon('desk')}
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('lines')}
              >
                <div className="flex items-center gap-2">
                  Lines
                  {getSortIcon('lines')}
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredAndSortedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">{user.department}</td>
                <td className="px-6 py-4 text-slate-600">{user.desk}</td>
                <td className="px-6 py-4 text-slate-600">{user.lines}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#553a99] hover:bg-purple-50 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                >
                  <option value="">Select department</option>
                  <option value="Trading">Trading</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="IT">IT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Desk</label>
                <input
                  type="text"
                  required
                  value={formData.desk}
                  onChange={(e) => setFormData({ ...formData, desk: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
                  placeholder="e.g., Desk A1"
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
                  className="flex-1 px-4 py-2 bg-[#d52685] text-white rounded-lg hover:bg-[#b51f6f] transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}