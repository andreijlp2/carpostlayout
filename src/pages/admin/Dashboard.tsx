import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, List, Settings } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ pages: 0, media: 0, menus: 0, settings: 0 });

  useEffect(() => {
    const load = async () => {
      const [pages, media, menus, settings] = await Promise.all([
        supabase.from("cms_pages").select("id", { count: "exact", head: true }),
        supabase.from("cms_media").select("id", { count: "exact", head: true }),
        supabase.from("cms_menus").select("id", { count: "exact", head: true }),
        supabase.from("cms_settings").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        pages: pages.count ?? 0,
        media: media.count ?? 0,
        menus: menus.count ?? 0,
        settings: settings.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Páginas", value: stats.pages, icon: FileText, color: "text-blue-500" },
    { label: "Mídias", value: stats.media, icon: Image, color: "text-green-500" },
    { label: "Menus", value: stats.menus, icon: List, color: "text-orange-500" },
    { label: "Configurações", value: stats.settings, icon: Settings, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;