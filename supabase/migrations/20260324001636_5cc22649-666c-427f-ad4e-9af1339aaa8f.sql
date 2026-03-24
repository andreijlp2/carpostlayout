DROP POLICY IF EXISTS "Audit: authenticated can insert" ON public.cms_audit_logs;

CREATE POLICY "Audit: admins and editors can insert"
  ON public.cms_audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  );