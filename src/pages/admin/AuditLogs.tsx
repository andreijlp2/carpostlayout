import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Tables } from "@/integrations/supabase/types";

type AuditLog = Tables<"cms_audit_logs">;

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("cms_audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      setLogs(data ?? []);
    };
    load();
  }, []);

  const actionColor = (action: string) => {
    if (action.includes("create") || action.includes("insert")) return "default";
    if (action.includes("update")) return "secondary";
    if (action.includes("delete")) return "destructive";
    return "outline";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Logs de Auditoria</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Entidade</TableHead>
                <TableHead>ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(log.created_at).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={actionColor(log.action) as any}>{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.entity_type}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {log.entity_id?.slice(0, 8)}...
                  </TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    Nenhum log encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;