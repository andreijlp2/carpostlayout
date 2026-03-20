import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus, GripVertical, Trash2, Eye, EyeOff, ChevronUp, ChevronDown,
  Type, Image, Layout, Video, Grid, MessageSquare, HelpCircle, Phone, Minus, Square
} from 'lucide-react';

type BlockType = 'hero' | 'text' | 'image' | 'banner' | 'button' | 'video' | 'gallery' | 'cards' | 'testimonials' | 'faq' | 'contact' | 'divider' | 'spacer';

interface Block {
  id: string;
  block_type: BlockType;
  label: string | null;
  sort_order: number;
  content: Record<string, unknown>;
  styles: Record<string, unknown>;
  is_visible: boolean;
}

const blockMeta: Record<BlockType, { icon: React.ElementType; label: string; color: string }> = {
  hero: { icon: Layout, label: 'Hero', color: 'bg-blue-50 text-blue-600' },
  text: { icon: Type, label: 'Texto', color: 'bg-gray-50 text-gray-600' },
  image: { icon: Image, label: 'Imagem', color: 'bg-purple-50 text-purple-600' },
  banner: { icon: Layout, label: 'Banner', color: 'bg-pink-50 text-pink-600' },
  button: { icon: Square, label: 'Botão', color: 'bg-orange-50 text-orange-600' },
  video: { icon: Video, label: 'Vídeo', color: 'bg-red-50 text-red-600' },
  gallery: { icon: Grid, label: 'Galeria', color: 'bg-indigo-50 text-indigo-600' },
  cards: { icon: Grid, label: 'Cards', color: 'bg-cyan-50 text-cyan-600' },
  testimonials: { icon: MessageSquare, label: 'Depoimentos', color: 'bg-green-50 text-green-600' },
  faq: { icon: HelpCircle, label: 'FAQ', color: 'bg-yellow-50 text-yellow-600' },
  contact: { icon: Phone, label: 'Contato', color: 'bg-teal-50 text-teal-600' },
  divider: { icon: Minus, label: 'Divisor', color: 'bg-gray-50 text-gray-400' },
  spacer: { icon: Minus, label: 'Espaço', color: 'bg-gray-50 text-gray-400' },
};

const BlockEditor = ({ block, onUpdate }: { block: Block; onUpdate: (b: Partial<Block>) => void }) => {
  const content = block.content as Record<string, string>;
  const styles = block.styles as Record<string, string>;

  return (
    <div className="space-y-3 p-4 border-t border-border">
      <div className="grid grid-cols-2 gap-3">
        {/* Common content fields */}
        {block.block_type === 'text' && (
          <>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Título</label>
              <Input value={content.title ?? ''} onChange={e => onUpdate({ content: { ...content, title: e.target.value } })} placeholder="Título do bloco" className="h-8 text-sm" />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Conteúdo</label>
              <textarea
                value={content.body ?? ''}
                onChange={e => onUpdate({ content: { ...content, body: e.target.value } })}
                placeholder="Digite o conteúdo..."
                className="w-full min-h-[80px] text-sm border border-input rounded-md px-3 py-2 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </>
        )}
        {block.block_type === 'hero' && (
          <>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Título Principal</label>
              <Input value={content.headline ?? ''} onChange={e => onUpdate({ content: { ...content, headline: e.target.value } })} placeholder="Título do hero" className="h-8 text-sm" />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Subtítulo</label>
              <Input value={content.subtext ?? ''} onChange={e => onUpdate({ content: { ...content, subtext: e.target.value } })} placeholder="Subtítulo" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Texto do Botão</label>
              <Input value={content.cta_text ?? ''} onChange={e => onUpdate({ content: { ...content, cta_text: e.target.value } })} placeholder="Ex: Começar" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Link do Botão</label>
              <Input value={content.cta_link ?? ''} onChange={e => onUpdate({ content: { ...content, cta_link: e.target.value } })} placeholder="/pagina" className="h-8 text-sm" />
            </div>
          </>
        )}
        {block.block_type === 'image' && (
          <>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">URL da Imagem</label>
              <Input value={content.src ?? ''} onChange={e => onUpdate({ content: { ...content, src: e.target.value } })} placeholder="https://..." className="h-8 text-sm" />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Texto Alternativo</label>
              <Input value={content.alt ?? ''} onChange={e => onUpdate({ content: { ...content, alt: e.target.value } })} placeholder="Descrição da imagem" className="h-8 text-sm" />
            </div>
          </>
        )}
        {block.block_type === 'video' && (
          <div className="col-span-2 space-y-1">
            <label className="text-xs font-medium text-muted-foreground">URL do Vídeo (YouTube/Vimeo)</label>
            <Input value={content.url ?? ''} onChange={e => onUpdate({ content: { ...content, url: e.target.value } })} placeholder="https://youtube.com/embed/..." className="h-8 text-sm" />
          </div>
        )}
        {!['text', 'hero', 'image', 'video'].includes(block.block_type) && (
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground">Bloco de tipo <strong>{blockMeta[block.block_type]?.label}</strong> — configure o conteúdo via propriedades avançadas.</p>
          </div>
        )}
      </div>

      {/* Styles */}
      <div className="border-t border-border pt-3">
        <p className="text-xs font-semibold text-muted-foreground mb-2">Estilos</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Cor de fundo</label>
            <div className="flex items-center gap-1.5">
              <input type="color" value={styles.bg_color ?? '#ffffff'} onChange={e => onUpdate({ styles: { ...styles, bg_color: e.target.value } })} className="w-7 h-7 rounded border border-input cursor-pointer" />
              <span className="text-xs text-muted-foreground">{styles.bg_color ?? '#ffffff'}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Cor do texto</label>
            <div className="flex items-center gap-1.5">
              <input type="color" value={styles.text_color ?? '#000000'} onChange={e => onUpdate({ styles: { ...styles, text_color: e.target.value } })} className="w-7 h-7 rounded border border-input cursor-pointer" />
              <span className="text-xs text-muted-foreground">{styles.text_color ?? '#000000'}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Padding</label>
            <select
              value={styles.padding ?? 'normal'}
              onChange={e => onUpdate({ styles: { ...styles, padding: e.target.value } })}
              className="text-xs border border-input rounded px-2 py-1 w-full bg-background"
            >
              <option value="none">Nenhum</option>
              <option value="small">Pequeno</option>
              <option value="normal">Normal</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisualEditor = () => {
  const { pageId } = useParams();
  const { user } = useAuth();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [pageName, setPageName] = useState('');
  const [addingBlock, setAddingBlock] = useState(false);
  const [savedIndicator, setSavedIndicator] = useState(false);

  useEffect(() => {
    if (!pageId) { setLoading(false); return; }
    const fetchData = async () => {
      const [blocksRes, pageRes] = await Promise.all([
        supabase.from('cms_blocks').select('*').eq('page_id', pageId).order('sort_order'),
        supabase.from('cms_pages').select('title').eq('id', pageId).single(),
      ]);
      setBlocks((blocksRes.data ?? []) as Block[]);
      setPageName(pageRes.data?.title ?? '');
      setLoading(false);
    };
    fetchData();
  }, [pageId]);

  const addBlock = async (type: BlockType) => {
    if (!pageId) return;
    const newBlock = {
      page_id: pageId,
      block_type: type,
      label: blockMeta[type].label,
      sort_order: blocks.length,
      content: {} as Record<string, string>,
      styles: {} as Record<string, string>,
      is_visible: true,
    };
    const { data } = await supabase.from('cms_blocks').insert(newBlock).select().single();
    if (data) {
      setBlocks(prev => [...prev, data as Block]);
      setExpandedBlock(data.id);
    }
    setAddingBlock(false);
  };

  const updateBlock = async (id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    await supabase.from('cms_blocks').update(updates as Record<string, unknown>).eq('id', id);
  };

  const deleteBlock = async (id: string) => {
    if (!confirm('Excluir este bloco?')) return;
    await supabase.from('cms_blocks').delete().eq('id', id);
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const moveBlock = async (id: string, dir: 'up' | 'down') => {
    const idx = blocks.findIndex(b => b.id === id);
    const newBlocks = [...blocks];
    if (dir === 'up' && idx > 0) [newBlocks[idx], newBlocks[idx-1]] = [newBlocks[idx-1], newBlocks[idx]];
    else if (dir === 'down' && idx < blocks.length - 1) [newBlocks[idx], newBlocks[idx+1]] = [newBlocks[idx+1], newBlocks[idx]];
    else return;
    const updated = newBlocks.map((b, i) => ({ ...b, sort_order: i }));
    setBlocks(updated);
    await Promise.all(updated.map(b => supabase.from('cms_blocks').update({ sort_order: b.sort_order }).eq('id', b.id)));
  };

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(blocks.map(b =>
      supabase.from('cms_blocks').update({ content: b.content as Record<string, string>, styles: b.styles as Record<string, string>, is_visible: b.is_visible }).eq('id', b.id)
    ));
    if (pageId) {
      await supabase.from('cms_pages').update({ updated_by: user?.id }).eq('id', pageId);
    }
    setSaving(false);
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 2000);
  };

  if (!pageId) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Editor Visual</h1>
          <p className="text-muted-foreground text-sm mt-1">Selecione uma página para editar seus blocos.</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Layout className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Vá para <strong>Páginas</strong> e clique no ícone de edição para abrir uma página aqui.</p>
          <Button variant="outline" asChild>
            <a href="/admin/pages">Ir para Páginas</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Editor Visual</p>
          <h1 className="text-xl font-bold text-foreground">{pageName || 'Carregando...'}</h1>
        </div>
        <div className="flex items-center gap-2">
          {savedIndicator && <span className="text-xs text-primary font-medium">✓ Salvo!</span>}
          <Button variant="outline" onClick={() => setAddingBlock(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Adicionar Bloco
          </Button>
          <Button onClick={saveAll} disabled={saving} className="gap-2">
            {saving ? 'Salvando...' : 'Salvar Página'}
          </Button>
        </div>
      </div>

      {/* Add Block Panel */}
      {addingBlock && (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Escolha um tipo de bloco</h3>
            <button onClick={() => setAddingBlock(false)} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {(Object.entries(blockMeta) as [BlockType, typeof blockMeta[BlockType]][]).map(([type, meta]) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${meta.color}`}>
                  <meta.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-foreground">{meta.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blocks list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-card rounded-xl border border-border animate-pulse" />)}
        </div>
      ) : blocks.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Layout className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Esta página não tem blocos ainda.</p>
          <Button onClick={() => setAddingBlock(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Adicionar primeiro bloco
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {blocks.map((block, idx) => {
            const meta = blockMeta[block.block_type] ?? { icon: Square, label: block.block_type, color: 'bg-gray-50 text-gray-600' };
            const isExpanded = expandedBlock === block.id;
            return (
              <div key={block.id} className={`bg-card rounded-xl border transition-all duration-200 ${isExpanded ? 'border-primary/30 shadow-sm' : 'border-border'} ${!block.is_visible ? 'opacity-50' : ''}`}>
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer select-none"
                  onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}>
                    <meta.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{block.label ?? meta.label}</p>
                    <p className="text-xs text-muted-foreground">{meta.label} · Ordem {idx + 1}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => moveBlock(block.id, 'up')} disabled={idx === 0} className="p-1.5 rounded hover:bg-muted text-muted-foreground disabled:opacity-30">
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveBlock(block.id, 'down')} disabled={idx === blocks.length - 1} className="p-1.5 rounded hover:bg-muted text-muted-foreground disabled:opacity-30">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => updateBlock(block.id, { is_visible: !block.is_visible })}
                      className="p-1.5 rounded hover:bg-muted text-muted-foreground"
                    >
                      {block.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteBlock(block.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <BlockEditor
                    block={block}
                    onUpdate={(updates) => updateBlock(block.id, updates)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VisualEditor;
