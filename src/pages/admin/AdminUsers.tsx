import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Shield, Mail } from 'lucide-react';
import type { AppRole } from '@/contexts/AuthContext';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
}

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [editUser, setEditUser] = useState<UserWithRole | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<AppRole>('editor');
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data: profiles } = await supabase.from('profiles').select('user_id, full_name, created_at');
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');

    if (profiles && roles) {
      const merged: UserWithRole[] = profiles.map(p => {
        const userRole = roles.find(r => r.user_id === p.user_id);
        return {
          id: p.user_id,
          email: p.user_id, // We only have user_id from profiles
          full_name: p.full_name,
          role: (userRole?.role ?? 'user') as AppRole,
          created_at: p.created_at,
        };
      });
      setUsers(merged);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdateRole = async (userId: string, newRole: AppRole) => {
    setSaving(true);
    // Update or insert role
    const { data: existing } = await supabase.from('user_roles').select('id').eq('user_id', userId).single();
    if (existing) {
      await supabase.from('user_roles').update({ role: newRole }).eq('user_id', userId);
    } else {
      await supabase.from('user_roles').insert({ user_id: userId, role: newRole });
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setEditUser(null);
    setSaving(false);
  };

  const filtered = users.filter(u =>
    (u.full_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<AppRole, string> = {
    admin: 'bg-red-100 text-red-700',
    editor: 'bg-blue-100 text-blue-700',
    user: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
          <p className="text-muted-foreground text-sm mt-1">{users.length} usuário(s) cadastrado(s)</p>
        </div>
        <Button onClick={() => setShowInvite(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Convidar Usuário
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuários..." className="pl-9" />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Usuário</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Função</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Desde</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-primary text-xs font-bold">
                          {(u.full_name ?? u.id).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{u.full_name ?? 'Sem nome'}</p>
                        <p className="text-xs text-muted-foreground font-mono">{u.id.slice(0, 16)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${roleColors[u.role]}`}>
                      {u.role === 'admin' ? 'Admin' : u.role === 'editor' ? 'Editor' : 'Usuário'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => setEditUser(u)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Role Modal */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Alterar Função</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">Usuário: <span className="font-medium text-foreground">{editUser.full_name ?? editUser.id}</span></p>
              <div className="space-y-2">
                <Label>Nova função</Label>
                {(['admin', 'editor', 'user'] as AppRole[]).map(r => (
                  <label key={r} className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={editUser.role === r}
                      onChange={() => setEditUser({ ...editUser, role: r })}
                    />
                    <div>
                      <p className="text-sm font-medium capitalize">{r === 'admin' ? 'Admin' : r === 'editor' ? 'Editor' : 'Usuário'}</p>
                      <p className="text-xs text-muted-foreground">
                        {r === 'admin' ? 'Acesso total ao painel' : r === 'editor' ? 'Edita conteúdo e mídia' : 'Acesso básico apenas'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>Cancelar</Button>
            <Button onClick={() => editUser && handleUpdateRole(editUser.id, editUser.role)} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Modal */}
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Convidar Usuário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">O usuário deve se cadastrar com este email para receber a função.</p>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="email@exemplo.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Função</Label>
              <select value={inviteRole} onChange={e => setInviteRole(e.target.value as AppRole)} className="w-full text-sm border border-input rounded-md px-3 py-2 bg-background">
                <option value="editor">Editor</option>
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvite(false)}>Cancelar</Button>
            <Button onClick={() => setShowInvite(false)}>Compartilhar link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
