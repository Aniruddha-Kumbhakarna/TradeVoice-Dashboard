import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'Super User' | 'Administrator' | 'Observer (Read-only)' | 'Operator';
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock logged-in user - in real app, this would come from authentication
  const [user] = useState<User>({
    name: 'John Smith',
    email: 'john.smith@bt.com',
    role: 'Super User',
  });

  const logout = () => {
    // In real app, this would clear session and redirect to login
    console.log('Logging out...');
    alert('Logout functionality would redirect to login page');
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
