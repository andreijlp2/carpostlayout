import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Image, Users, Settings, TrendingUp, Clock, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  totalMedia: number;
  totalUsers: number;
  recentPages: Array<{ id: string; title: string; status: string; updated_at: string }>;
  recentAudit: Array<{ id: string; action: string; entity_type: string; created_at: string }>;
}

const AdminDashboard = () => {
  const { user, role, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    totalMedia: 0,
    totalUsers: 0,
    recentPages: [],
    recentAudit: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pages, media, users, audit] = await Promise.all([
          supabase.from('cms_pages').select('id, title, status, updated_at').order('updated_at', { ascending: false }),
          supabase.from('cms_media').select('id', { count: 'exact', head: true }),
          isAdmin ? supabase.from('profiles').select('id', { count: 'exact', head: true }) : Promise.resolve({ count: 0 }),
          isAdmin ? supabase.from('cms_audit_logs').select('id, action, entity_type, created_at').order('created_at', { ascending: false }).limit(5) : Promise.resolve({ data: [] }),
        ]);

        setStats({
          totalPages: pages.data?.length ?? 0,
          publishedPages: pages.data?.filter(p => p.status === 'published').length ?? 0,
          totalMedia: media.count ?? 0,
          totalUsers: (users as { count: number }).count ?? 0,
          recentPages: pages.data?.slice(0, 5) ?? [],
          recentAudit: (audit as { data: DashboardStats['recentAudit'] }).data ?? [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isAdmin]);

  const statCards = [
    { icon: FileText, label: 'Total de Páginas', value: stats.totalPages, sub: `${stats.publishedPages} publicadas`, color: 'text-blue-600 bg-blue-50', to: '/admin/pages' },
    { icon: Eye, label: 'Publicadas', value: stats.publishedPages, sub: 'páginas ao vivo', color: 'text-green-600 bg-green-50', to: '/admin/pages' },
    { icon: Image, label: 'Arquivos de Mídia', value: stats.totalMedia, sub: 'na biblioteca', color: 'text-purple-600 bg-purple-50', to: '/admin/media' },
    ...(isAdmin ? [{ icon: Users, label: 'Usuários', value: stats.totalUsers, sub: 'cadastrados', color: 'text-orange-600 bg-orange-50', to: '/admin/users' }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bem-vindo de volta! Aqui está um resumo do seu site.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-card rounded-xl border border-border animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(card => (
            <Link key={card.label} to={card.to} className="group bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all duration-200 hover:border-primary/30">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-sm font-medium text-foreground mt-0.5">{card.label}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Páginas Recentes</h2>
            <Link to="/admin/pages" className="text-xs text-primary hover:underline">Ver todas</Link>
          </div>
          {loading ? (
            <div className="space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-10 bg-muted rounded animate-pulse" />)}
            </div>
          ) : stats.recentPages.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Nenhuma página criada.</p>
              <Link to="/admin/pages" className="text-xs text-primary hover:underline mt-1 block">Criar primeira página</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.recentPages.map(page => (
                <div key={page.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{page.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(page.updated_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                    <Link to={`/admin/editor/${page.id}`} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FileText, label: 'Nova Página', to: '/admin/pages', desc: 'Criar página' },
              { icon: Image, label: 'Upload Mídia', to: '/admin/media', desc: 'Enviar arquivos' },
              { icon: Settings, label: 'Configurações', to: '/admin/settings', desc: 'Editar site' },
              { icon: TrendingUp, label: 'Editor Visual', to: '/admin/editor', desc: 'Drag & drop' },
            ].map(action => (
              <Link
                key={action.label}
                to={action.to}
                className="flex flex-col gap-2 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
              >
                <action.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Log */}
      {isAdmin && stats.recentAudit.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Últimas Atividades
            </h2>
            <Link to="/admin/audit" className="text-xs text-primary hover:underline">Ver tudo</Link>
          </div>
          <div className="space-y-2">
            {stats.recentAudit.map(log => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground capitalize">{log.action}</span>
                  <span className="text-sm text-muted-foreground">{log.entity_type}</span>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
