import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Tables } from "@/integrations/supabase/types";

type Page = Tables<"cms_pages">;

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", status: "draft", meta_title: "", meta_description: "" });
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("cms_pages").select("*").order("created_at", { ascending: false });
    setPages(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", description: "", status: "draft", meta_title: "", meta_description: "" });
    setEditing(null);
  };

  const openEdit = (page: Page) => {
    setEditing(page);
    setForm({
      title: page.title,
      slug: page.slug,
      description: page.description ?? "",
      status: page.status,
      meta_title: page.meta_title ?? "",
      meta_description: page.meta_description ?? "",
    });
    setOpen(true);
  };

  const handleSave = async () => {
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const payload = { ...form, slug };

    if (editing) {
      const { error } = await supabase.from("cms_pages").update(payload).eq("id", editing.id);
      if (error) { toast({ variant: "destructive", title: "Erro", description: error.message }); return; }
      toast({ title: "Página atualizada" });
    } else {
      const { error } = await supabase.from("cms_pages").insert(payload);
      if (error) { toast({ variant: "destructive", title: "Erro", description: error.message }); return; }
      toast({ title: "Página criada" });
    }
    setOpen(false);
    resetForm();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta página?")) return;
    await supabase.from("cms_pages").delete().eq("id", id);
    toast({ title: "Página excluída" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Páginas</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Nova Página</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Editar Página" : "Nova Página"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-gerado" />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Meta Title (SEO)</Label>
                <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Meta Description (SEO)</Label>
                <Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancelar</Button>
                <Button onClick={handleSave} className="gap-2"><Save className="h-4 w-4" /> Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-3">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-foreground">{page.title}</p>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={page.status === "published" ? "default" : "secondary"}>
                  {page.status === "published" ? "Publicado" : "Rascunho"}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => openEdit(page)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(page.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {pages.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Nenhuma página criada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default Pages;