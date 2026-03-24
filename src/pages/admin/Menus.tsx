import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Tables } from "@/integrations/supabase/types";

type MenuItem = { label: string; url: string; children?: MenuItem[] };
type CmsMenu = Tables<"cms_menus">;

const Menus = () => {
  const [menus, setMenus] = useState<CmsMenu[]>([]);
  const [open, setOpen] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuLocation, setMenuLocation] = useState("header");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("cms_menus").select("*").order("created_at");
    setMenus(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openMenu = (menu?: CmsMenu) => {
    if (menu) {
      setEditingId(menu.id);
      setMenuName(menu.name);
      setMenuLocation(menu.location ?? "header");
      setMenuItems(Array.isArray(menu.items) ? (menu.items as unknown as MenuItem[]) : []);
    } else {
      setEditingId(null);
      setMenuName("");
      setMenuLocation("header");
      setMenuItems([]);
    }
    setOpen(true);
  };

  const addItem = () => setMenuItems([...menuItems, { label: "", url: "" }]);

  const updateItem = (idx: number, field: keyof MenuItem, value: string) => {
    const updated = [...menuItems];
    (updated[idx] as any)[field] = value;
    setMenuItems(updated);
  };

  const removeItem = (idx: number) => setMenuItems(menuItems.filter((_, i) => i !== idx));

  const handleSave = async () => {
    const payload = { name: menuName, location: menuLocation, items: menuItems as any };
    if (editingId) {
      const { error } = await supabase.from("cms_menus").update(payload).eq("id", editingId);
      if (error) { toast({ variant: "destructive", description: error.message }); return; }
      toast({ title: "Menu atualizado" });
    } else {
      const { error } = await supabase.from("cms_menus").insert(payload);
      if (error) { toast({ variant: "destructive", description: error.message }); return; }
      toast({ title: "Menu criado" });
    }
    setOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este menu?")) return;
    await supabase.from("cms_menus").delete().eq("id", id);
    toast({ title: "Menu excluído" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Menus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => openMenu()}><Plus className="h-4 w-4" /> Novo Menu</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Menu" : "Novo Menu"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={menuName} onChange={(e) => setMenuName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input value={menuLocation} onChange={(e) => setMenuLocation(e.target.value)} placeholder="header, footer, sidebar" />
              </div>
              <div className="space-y-2">
                <Label>Itens do Menu</Label>
                {menuItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Input placeholder="Label" value={item.label} onChange={(e) => updateItem(idx, "label", e.target.value)} />
                    <Input placeholder="URL" value={item.url} onChange={(e) => updateItem(idx, "url", e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeItem(idx)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addItem} className="gap-1">
                  <Plus className="h-3 w-3" /> Adicionar item
                </Button>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave} className="gap-2"><Save className="h-4 w-4" /> Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-3">
        {menus.map((menu) => (
          <Card key={menu.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => openMenu(menu)}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-foreground">{menu.name}</p>
                <p className="text-sm text-muted-foreground">{menu.location} · {(menu.items as unknown as MenuItem[])?.length ?? 0} itens</p>
              </div>
              <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(menu.id); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {menus.length === 0 && <p className="text-center text-muted-foreground py-12">Nenhum menu criado.</p>}
      </div>
    </div>
  );
};

export default Menus;