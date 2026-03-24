import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "editor" | "user")[];
}

const ProtectedRoute = ({ children, allowedRoles = ["admin", "editor"] }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (role && !allowedRoles.includes(role)) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;