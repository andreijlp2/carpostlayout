-- Fix: Only expose blocks of published pages to public
DROP POLICY IF EXISTS "Blocks: public can read visible blocks" ON public.cms_blocks;

CREATE POLICY "Blocks: public can read visible published"
  ON public.cms_blocks
  FOR SELECT
  TO public
  USING (
    is_visible = true
    AND (
      page_id IS NULL
      OR EXISTS (
        SELECT 1 FROM public.cms_pages
        WHERE cms_pages.id = cms_blocks.page_id
        AND cms_pages.status = 'published'
      )
    )
  );