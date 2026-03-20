import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'admin' | 'editor';
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { user, loading, isAdmin, isEditor } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (requireRole === 'admin' && !isAdmin) return <Navigate to="/admin" replace />;
  if (requireRole === 'editor' && !isEditor) return <Navigate to="/admin" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
