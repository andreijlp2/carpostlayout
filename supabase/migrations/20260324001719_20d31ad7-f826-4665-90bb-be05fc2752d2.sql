CREATE POLICY "Roles: restrict insert to admins only"
  ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Audit: deny update"
  ON public.cms_audit_logs
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (false);

CREATE POLICY "Audit: deny delete"
  ON public.cms_audit_logs
  AS RESTRICTIVE
  FOR DELETE
  TO authenticated
  USING (false);