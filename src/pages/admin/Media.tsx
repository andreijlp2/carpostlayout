import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type MediaItem = Tables<"cms_media">;

const Media = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("cms_media").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("cms-media").upload(path, file);
      if (uploadError) {
        toast({ variant: "destructive", title: "Erro", description: uploadError.message });
        continue;
      }
      const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "file";
      await supabase.from("cms_media").insert({
        file_name: file.name,
        file_path: path,
        file_type: fileType,
        mime_type: file.type,
        file_size: file.size,
      });
    }
    setUploading(false);
    toast({ title: "Upload concluído" });
    load();
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm("Excluir este arquivo?")) return;
    await supabase.storage.from("cms-media").remove([item.file_path]);
    await supabase.from("cms_media").delete().eq("id", item.id);
    toast({ title: "Arquivo excluído" });
    load();
  };

  const copyUrl = (path: string) => {
    navigator.clipboard.writeText(getPublicUrl(path));
    toast({ title: "URL copiada!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Biblioteca de Mídia</h1>
        <div>
          <Input ref={fileRef} type="file" multiple className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf,.doc,.docx" />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading} className="gap-2">
            <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : "Upload"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="aspect-square bg-muted flex items-center justify-center relative">
              {item.file_type === "image" ? (
                <img src={getPublicUrl(item.file_path)} alt={item.alt_text ?? item.file_name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => copyUrl(item.file_path)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(item)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-2">
              <p className="text-xs text-muted-foreground truncate">{item.file_name}</p>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">Nenhum arquivo. Faça upload para começar.</p>
        )}
      </div>
    </div>
  );
};

export default Media;