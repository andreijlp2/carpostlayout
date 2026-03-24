import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, FileText, Image, Settings, Menu as MenuIcon,
  LogOut, ChevronLeft, List, Shield, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/pages", icon: FileText, label: "Páginas" },
  { to: "/admin/media", icon: Image, label: "Mídia" },
  { to: "/admin/menus", icon: List, label: "Menus" },
  { to: "/admin/settings", icon: Settings, label: "Configurações" },
  { to: "/admin/audit", icon: Shield, label: "Logs", adminOnly: true },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, role, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside
        className={cn(
          "bg-card border-r border-border flex flex-col transition-all duration-200",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && <span className="font-bold text-foreground text-lg">CMS</span>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems
            .filter((item) => !item.adminOnly || role === "admin")
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.to, item.end)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
        </nav>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground shrink-0" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-start gap-2 text-destructive hover:text-destructive"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Sair"}
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;