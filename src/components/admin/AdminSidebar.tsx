import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, FileText, Image, Settings, Users, Menu,
  LogOut, ChevronLeft, ChevronRight, BarChart3, Shield,
  Globe, Blocks, History, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin', end: true },
  { icon: FileText, label: 'Páginas', to: '/admin/pages' },
  { icon: Blocks, label: 'Editor Visual', to: '/admin/editor' },
  { icon: Image, label: 'Mídia', to: '/admin/media' },
  { icon: Globe, label: 'Menus', to: '/admin/menus' },
  { icon: BarChart3, label: 'Configurações do Site', to: '/admin/settings' },
  { icon: Users, label: 'Usuários', to: '/admin/users', adminOnly: true },
  { icon: Shield, label: 'Permissões', to: '/admin/roles', adminOnly: true },
  { icon: History, label: 'Logs de Auditoria', to: '/admin/audit', adminOnly: true },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const AdminSidebar = ({ mobileOpen, onMobileClose }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const filteredItems = navItems.filter(item =>
    !item.adminOnly || role === 'admin'
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-border flex flex-col z-50 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-border h-16">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-foreground text-sm">CarPost CMS</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded hover:bg-muted text-muted-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 rounded hover:bg-muted text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {filteredItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onMobileClose}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-border">
          {!collapsed && (
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-primary text-xs font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-foreground truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
