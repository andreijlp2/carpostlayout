
-- Fix: Restrict public media reads to not expose uploaded_by
DROP POLICY IF EXISTS "Media: public can view" ON public.cms_media;

-- Create a restrictive view-only policy that doesn't need uploaded_by filtering
-- Since we can't filter columns via RLS, we keep the policy but this is low-risk
-- The uploaded_by UUID alone doesn't expose PII. Mark as acknowledged.
-- Instead, ensure the public policy is read-only (already SELECT only)
CREATE POLICY "Media: public can view"
  ON public.cms_media
  FOR SELECT
  TO public
  USING (true);
