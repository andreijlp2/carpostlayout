import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SettingItem {
  id: string;
  key: string;
  label: string | null;
  value: any;
  category: string | null;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const load = async () => {
    const { data } = await supabase.from("cms_settings").select("*").order("category");
    if (data) {
      setSettings(data);
      const vals: Record<string, string> = {};
      data.forEach((s) => { vals[s.key] = typeof s.value === "string" ? s.value : JSON.stringify(s.value ?? ""); });
      setValues(vals);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    for (const setting of settings) {
      const newVal = values[setting.key];
      if (newVal !== undefined) {
        await supabase.from("cms_settings").update({ value: newVal }).eq("id", setting.id);
      }
    }
    setSaving(false);
    toast({ title: "Configurações salvas" });
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ variant: "destructive", description: "A senha deve ter pelo menos 6 caracteres" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ variant: "destructive", description: error.message });
    } else {
      toast({ title: "Senha alterada com sucesso" });
      setNewPassword("");
    }
  };

  const grouped = settings.reduce<Record<string, SettingItem[]>>((acc, s) => {
    const cat = s.category ?? "geral";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Configurações</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="capitalize">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((s) => (
              <div key={s.id} className="space-y-1">
                <Label>{s.label ?? s.key}</Label>
                <Input
                  value={values[s.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {settings.length > 0 && (
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      )}

      {settings.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Nenhuma configuração encontrada. Adicione configurações ao banco de dados.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Logado como: {user?.email}</p>
          <div className="flex gap-2 max-w-md">
            <Input
              type="password"
              placeholder="Nova senha (mín. 6 caracteres)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleChangePassword}>Alterar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;