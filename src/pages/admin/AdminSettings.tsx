import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Palette, Globe, Save } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: unknown;
  category: string | null;
  label: string | null;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    const { data } = await supabase.from('cms_settings').select('*').order('category');
    setSettings((data ?? []) as Setting[]);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  };

  const getSetting = (key: string) => {
    const s = settings.find(s => s.key === key);
    return typeof s?.value === 'string' ? s.value.replace(/^"|"$/g, '') : '';
  };

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(settings.map(s =>
      supabase.from('cms_settings').update({ value: JSON.stringify(s.value) }).eq('id', s.id)
    ));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const grouped = settings.reduce((acc, s) => {
    const cat = s.category ?? 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {} as Record<string, Setting[]>);

  const categoryMeta: Record<string, { icon: React.ElementType; label: string }> = {
    general: { icon: Globe, label: 'Geral' },
    theme: { icon: Palette, label: 'Tema & Cores' },
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Carregando...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações do Site</h1>
          <p className="text-muted-foreground text-sm mt-1">Personalize as configurações globais do seu site.</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-green-600 font-medium">✓ Salvo!</span>}
          <Button onClick={saveAll} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Salvando...' : 'Salvar Tudo'}
          </Button>
        </div>
      </div>

      {Object.entries(grouped).map(([cat, items]) => {
        const meta = categoryMeta[cat] ?? { icon: Settings, label: cat };
        return (
          <div key={cat} className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <meta.icon className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">{meta.label}</h2>
            </div>
            <div className="space-y-4">
              {items.map(setting => (
                <div key={setting.key} className="space-y-1.5">
                  <Label className="text-sm">{setting.label ?? setting.key}</Label>
                  {setting.key.includes('color') ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={getSetting(setting.key)}
                        onChange={e => updateSetting(setting.key, e.target.value)}
                        className="w-10 h-10 rounded-lg border border-input cursor-pointer bg-background"
                      />
                      <Input
                        value={getSetting(setting.key)}
                        onChange={e => updateSetting(setting.key, e.target.value)}
                        placeholder="#000000"
                        className="font-mono text-sm max-w-xs"
                      />
                    </div>
                  ) : (
                    <Input
                      value={getSetting(setting.key)}
                      onChange={e => updateSetting(setting.key, e.target.value)}
                      placeholder={setting.label ?? setting.key}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSettings;
