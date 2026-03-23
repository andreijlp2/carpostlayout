
-- Fix 1: Add RESTRICTIVE policy on user_roles to prevent privilege escalation
DROP POLICY IF EXISTS "Roles: only admins can insert" ON public.user_roles;
DROP POLICY IF EXISTS "Roles: admins can manage all" ON public.user_roles;

-- Recreate admin manage policy scoped to authenticated only
CREATE POLICY "Roles: admins can manage all"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Restrict cms_settings public read to safe categories only
DROP POLICY IF EXISTS "Settings: public can read" ON public.cms_settings;

CREATE POLICY "Settings: public can read safe categories"
  ON public.cms_settings
  FOR SELECT
  TO public
  USING (category IN ('general', 'theme'));
