
-- Fix 1: Restrict profiles SELECT to authenticated users viewing their own profile
DROP POLICY IF EXISTS "Profiles: users can view all" ON public.profiles;
CREATE POLICY "Profiles: users can view own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to view all profiles
CREATE POLICY "Profiles: admins can view all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Explicitly restrict INSERT on user_roles to admins only
CREATE POLICY "Roles: only admins can insert"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
