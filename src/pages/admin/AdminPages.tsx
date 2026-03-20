import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Globe, FileText, Eye, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Page {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: 'draft' | 'published';
  is_home: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

const AdminPages = () => {
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', description: '', status: 'draft' as 'draft' | 'published',
    meta_title: '', meta_description: '', meta_keywords: '', is_home: false,
  });

  const fetchPages = async () => {
    setLoading(true);
    const { data } = await supabase.from('cms_pages').select('*').order('updated_at', { ascending: false });
    setPages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const openNew = () => {
    setEditingPage(null);
    setForm({ title: '', slug: '', description: '', status: 'draft', meta_title: '', meta_description: '', meta_keywords: '', is_home: false });
    setShowModal(true);
  };

  const openEdit = (page: Page) => {
    setEditingPage(page);
    setForm({
      title: page.title,
      slug: page.slug,
      description: page.description ?? '',
      status: page.status,
      meta_title: page.meta_title ?? '',
      meta_description: page.meta_description ?? '',
      meta_keywords: '',
      is_home: page.is_home,
    });
    setShowModal(true);
  };

  const handleSlugify = (title: string) =>
    title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  const handleTitleChange = (val: string) => {
    setForm(f => ({ ...f, title: val, slug: editingPage ? f.slug : handleSlugify(val) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) return;
    setSaving(true);
    try {
      if (editingPage) {
        await supabase.from('cms_pages').update({
          ...form, updated_by: user?.id
        }).eq('id', editingPage.id);
      } else {
        await supabase.from('cms_pages').insert({
          ...form, created_by: user?.id, updated_by: user?.id
        });
      }
      setShowModal(false);
      fetchPages();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta página?')) return;
    await supabase.from('cms_pages').delete().eq('id', id);
    fetchPages();
  };

  const handleDuplicate = async (page: Page) => {
    const newSlug = `${page.slug}-copia`;
    await supabase.from('cms_pages').insert({
      title: `${page.title} (Cópia)`,
      slug: newSlug,
      description: page.description,
      status: 'draft',
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      created_by: user?.id,
      updated_by: user?.id,
    });
    fetchPages();
  };

  const toggleStatus = async (page: Page) => {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    await supabase.from('cms_pages').update({ status: newStatus, updated_by: user?.id }).eq('id', page.id);
    fetchPages();
  };

  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Páginas</h1>
          <p className="text-muted-foreground text-sm mt-1">{pages.length} página(s) no total</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="w-4 h-4" /> Nova Página
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar páginas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma página encontrada.</p>
            <Button variant="outline" onClick={openNew} className="mt-3 gap-2">
              <Plus className="w-4 h-4" /> Criar primeira página
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Título</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Atualizado</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(page => (
                  <tr key={page.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {page.is_home && <Globe className="w-3.5 h-3.5 text-primary" />}
                        <span className="font-medium text-foreground">{page.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">/{page.slug}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(page)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          page.status === 'published'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(page.updated_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/editor/${page.id}`}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Editar conteúdo"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEdit(page)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Editar propriedades"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(page)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Duplicar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPage ? 'Editar Página' : 'Nova Página'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label>Título *</Label>
                <Input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Nome da página" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Slug (URL) *</Label>
                <div className="flex items-center border border-input rounded-md overflow-hidden">
                  <span className="px-3 py-2 bg-muted text-muted-foreground text-sm border-r border-input">/</span>
                  <input
                    className="flex-1 px-3 py-2 text-sm bg-background outline-none font-mono"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="url-da-pagina"
                  />
                </div>
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Descrição</Label>
                <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Breve descrição da página" />
              </div>
            </div>

            {/* SEO */}
            <div className="border border-border rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">SEO</p>
              <div className="space-y-1.5">
                <Label className="text-xs">Meta Título</Label>
                <Input value={form.meta_title} onChange={e => setForm(f => ({ ...f, meta_title: e.target.value }))} placeholder="Título para motores de busca" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Meta Descrição</Label>
                <Input value={form.meta_description} onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))} placeholder="Descrição para motores de busca" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Status:</Label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as 'draft' | 'published' }))}
                  className="text-sm border border-input rounded-md px-2 py-1 bg-background"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_home}
                  onChange={e => setForm(f => ({ ...f, is_home: e.target.checked }))}
                  className="rounded"
                />
                Página inicial
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.slug}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPages;
