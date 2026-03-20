import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Search, Trash2, Image, Film, FileText, Grid3X3, List } from 'lucide-react';

interface MediaFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  folder: string | null;
  created_at: string;
}

const AdminMedia = () => {
  const { user } = useAuth();
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    const { data } = await supabase.from('cms_media').select('*').order('created_at', { ascending: false });
    setMedia((data ?? []) as MediaFile[]);
    setLoading(false);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const path = `uploads/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const { error: uploadError } = await supabase.storage.from('cms-media').upload(path, file);
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('cms-media').getPublicUrl(path);
        await supabase.from('cms_media').insert({
          file_name: file.name,
          file_path: publicUrl,
          file_type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'document',
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: user?.id,
        });
      }
    }
    setUploading(false);
    fetchMedia();
  };

  const handleDelete = async (ids: string[]) => {
    if (!confirm(`Excluir ${ids.length} arquivo(s)?`)) return;
    await supabase.from('cms_media').delete().in('id', ids);
    setMedia(prev => prev.filter(m => !ids.includes(m.id)));
    setSelected([]);
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = media.filter(m =>
    m.file_name.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (type: string) => {
    if (type === 'image') return <Image className="w-5 h-5" />;
    if (type === 'video') return <Film className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Biblioteca de Mídia</h1>
          <p className="text-muted-foreground text-sm mt-1">{media.length} arquivo(s)</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Button variant="destructive" size="sm" onClick={() => handleDelete(selected)} className="gap-2">
              <Trash2 className="w-4 h-4" /> Excluir ({selected.length})
            </Button>
          )}
          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? 'Enviando...' : 'Upload'}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar arquivos..." className="pl-9" />
        </div>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button onClick={() => setView('grid')} className={`px-3 py-2 ${view === 'grid' ? 'bg-primary text-white' : 'bg-card text-muted-foreground hover:bg-muted'}`}>
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button onClick={() => setView('list')} className={`px-3 py-2 ${view === 'list' ? 'bg-primary text-white' : 'bg-card text-muted-foreground hover:bg-muted'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const input = fileInputRef.current;
          if (input && e.dataTransfer.files.length > 0) {
            Object.defineProperty(input, 'files', { value: e.dataTransfer.files });
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }}
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Arraste arquivos aqui ou <span className="text-primary">clique para selecionar</span></p>
        <p className="text-xs text-muted-foreground mt-1">Imagens e vídeos suportados</p>
      </div>

      {/* Media grid/list */}
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Image className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhum arquivo na biblioteca.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map(file => (
            <div
              key={file.id}
              onClick={() => toggleSelect(file.id)}
              className={`group relative aspect-square rounded-xl border overflow-hidden cursor-pointer transition-all ${selected.includes(file.id) ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/40'}`}
            >
              {file.file_type === 'image' ? (
                <img src={file.file_path} alt={file.alt_text ?? file.file_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted">
                  {getIcon(file.file_type)}
                  <span className="text-xs text-muted-foreground text-center px-2 truncate w-full text-center">{file.file_name}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs truncate w-full">{file.file_name}</p>
              </div>
              {selected.includes(file.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Arquivo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tamanho</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(file => (
                <tr key={file.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {file.file_type === 'image' ? (
                        <img src={file.file_path} alt={file.file_name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                          {getIcon(file.file_type)}
                        </div>
                      )}
                      <span className="font-medium text-foreground truncate max-w-48">{file.file_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{file.file_type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatSize(file.file_size)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(file.created_at).toLocaleDateString('pt-BR')}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button onClick={() => handleDelete([file.id])} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
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
  );
};

export default AdminMedia;
