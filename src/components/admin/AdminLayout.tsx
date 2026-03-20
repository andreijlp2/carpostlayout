import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Main content — offset for sidebar */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium capitalize">
              {role}
            </span>
            <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground relative">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
