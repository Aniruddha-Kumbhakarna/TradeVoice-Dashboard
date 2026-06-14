import { LogOut, User, ShieldCheck, Eye, UserCog } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleIcon = () => {
    switch (user.role) {
      case 'Super User':
        return <ShieldCheck className="w-4 h-4 text-[#d52685]" />;
      case 'Administrator':
        return <UserCog className="w-4 h-4 text-[#553a99]" />;
      case 'Observer (Read-only)':
        return <Eye className="w-4 h-4 text-[#08538c]" />;
      default:
        return <User className="w-4 h-4 text-slate-600" />;
    }
  };

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'Super User':
        return 'bg-[#d52685] text-white';
      case 'Administrator':
        return 'bg-[#553a99] text-white';
      case 'Observer (Read-only)':
        return 'bg-[#08538c] text-white';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d52685] to-[#553a99] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-semibold text-slate-900">{user.name}</div>
              <div className="text-xs text-slate-500">{user.email}</div>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${getRoleBadgeColor()}`}>
            {getRoleIcon()}
            <span>{user.role}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-slate-700"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}
