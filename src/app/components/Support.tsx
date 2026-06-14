import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface Ticket {
  id: string;
  ticketNumber: string;
  type: 'Service Request' | 'Incident';
  issue: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export function Support() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      ticketNumber: 'TKT-2024-001',
      type: 'Incident',
      issue: 'Line Down',
      description: 'Extension 102 is not receiving incoming calls',
      status: 'In Progress',
      createdAt: '2024-02-28 14:30',
    },
    {
      id: '2',
      ticketNumber: 'TKT-2024-002',
      type: 'Service Request',
      issue: 'New Line Request',
      description: 'Need to add 3 new lines to Desk A4',
      status: 'Open',
      createdAt: '2024-02-27 10:15',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Service Request' as 'Service Request' | 'Incident',
    issue: '',
    description: '',
  });

  const issueCategories = [
    'Turret Issue',
    'Call Quality',
    'Line Down',
    'Phone Not Working',
    'Recording Issue',
    'Gateway Problem',
    'New Line Request',
    'User Access Issue',
    'Configuration Change',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ticketNumber: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      type: formData.type,
      issue: formData.issue,
      description: formData.description,
      status: 'Open',
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTickets([newTicket, ...tickets]);
    setFormData({ type: 'Service Request', issue: '', description: '' });
    setShowForm(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Support Centre</h1>
          <p className="text-slate-600 mt-2">Raise tickets and track support requests</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#d52685] text-white px-6 py-3 rounded-lg hover:bg-[#b51f6f] transition-colors"
        >
          <AlertCircle className="w-5 h-5" />
          Raise New Ticket
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-semibold">Ticket raised successfully! Support team will respond shortly.</p>
        </div>
      )}

      {/* Ticket Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Raise Support Ticket</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ticket Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Ticket Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.type === 'Service Request'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value="Service Request"
                      checked={formData.type === 'Service Request'}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as 'Service Request' | 'Incident' })
                      }
                      className="sr-only"
                    />
                    <div className="font-semibold text-slate-900">Service Request</div>
                    <div className="text-sm text-slate-600 mt-1">
                      For new configurations, changes, or additions
                    </div>
                  </label>

                  <label
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.type === 'Incident'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value="Incident"
                      checked={formData.type === 'Incident'}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as 'Service Request' | 'Incident' })
                      }
                      className="sr-only"
                    />
                    <div className="font-semibold text-slate-900">Incident</div>
                    <div className="text-sm text-slate-600 mt-1">
                      For issues, outages, or urgent problems
                    </div>
                  </label>
                </div>
              </div>

              {/* Issue Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Issue Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an issue category</option>
                  {issueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  placeholder="Please provide detailed information about the issue or request..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Include relevant details such as desk number, extension, turret name, or affected users
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ type: 'Service Request', issue: '', description: '' });
                  }}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#d52685] text-white rounded-lg hover:bg-[#b51f6f] transition-colors font-semibold"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Recent Tickets</h2>
        </div>
        
        <div className="divide-y divide-slate-200">
          {tickets.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No tickets raised yet</p>
              <p className="text-sm text-slate-500 mt-1">Click "Raise New Ticket" to create your first support ticket</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="px-6 py-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-semibold text-slate-900">{ticket.ticketNumber}</span>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          ticket.type === 'Incident'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {ticket.type}
                      </span>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          ticket.status === 'Open'
                            ? 'bg-yellow-100 text-yellow-800'
                            : ticket.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{ticket.issue}</h3>
                    <p className="text-slate-600 text-sm mb-2">{ticket.description}</p>
                    <p className="text-xs text-slate-500">Created: {ticket.createdAt}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}