-- Add RESTRICTIVE policies for UPDATE and DELETE on user_roles
CREATE POLICY "Roles: restrict update to admins only"
  ON public.user_roles
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Roles: restrict delete to admins only"
  ON public.user_roles
  AS RESTRICTIVE
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix audit logs SELECT to authenticated only
DROP POLICY IF EXISTS "Audit: only admins can view" ON public.cms_audit_logs;

CREATE POLICY "Audit: only admins can view"
  ON public.cms_audit_logs
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));