
-- =============================================
-- CMS Schema: Roles, Profiles, Pages, Blocks, 
-- Media, Settings, Menus, Audit Logs
-- =============================================

-- 1. Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- 2. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles: users can view all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles: users can update own" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Profiles: users can insert own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. User Roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY CASE role 
    WHEN 'admin' THEN 1 
    WHEN 'editor' THEN 2 
    WHEN 'user' THEN 3 
  END
  LIMIT 1;
$$;

CREATE POLICY "Roles: admins can manage all" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Roles: users can view own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- 4. CMS Pages table
CREATE TABLE public.cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_home BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pages: published are public" ON public.cms_pages FOR SELECT USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Pages: admins/editors can manage" ON public.cms_pages FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- 5. CMS Blocks / Content Blocks (for drag-and-drop editor)
CREATE TABLE public.cms_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL CHECK (block_type IN ('hero', 'text', 'image', 'banner', 'button', 'video', 'gallery', 'cards', 'testimonials', 'faq', 'contact', 'divider', 'spacer')),
  label TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}',
  styles JSONB NOT NULL DEFAULT '{}',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_reusable BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blocks: admins/editors can manage" ON public.cms_blocks FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Blocks: public can read visible blocks" ON public.cms_blocks FOR SELECT USING (is_visible = true);

-- 6. Media Library
CREATE TABLE public.cms_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  alt_text TEXT,
  folder TEXT DEFAULT '/',
  width INTEGER,
  height INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media: admins/editors can manage" ON public.cms_media FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Media: public can view" ON public.cms_media FOR SELECT USING (true);

-- 7. Global Site Settings
CREATE TABLE public.cms_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  category TEXT DEFAULT 'general',
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings: public can read" ON public.cms_settings FOR SELECT USING (true);
CREATE POLICY "Settings: only admins can modify" ON public.cms_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 8. Navigation Menus
CREATE TABLE public.cms_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT DEFAULT 'header',
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_menus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menus: public can read" ON public.cms_menus FOR SELECT USING (true);
CREATE POLICY "Menus: only admins can modify" ON public.cms_menus FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 9. Audit / Change Log
CREATE TABLE public.cms_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audit: only admins can view" ON public.cms_audit_logs FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Audit: authenticated can insert" ON public.cms_audit_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Triggers for updated_at
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cms_pages_updated_at BEFORE UPDATE ON public.cms_pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cms_blocks_updated_at BEFORE UPDATE ON public.cms_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cms_settings_updated_at BEFORE UPDATE ON public.cms_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cms_menus_updated_at BEFORE UPDATE ON public.cms_menus FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- Trigger: auto-create profile + role on signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Storage bucket for CMS media
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true);

CREATE POLICY "CMS Media: public read" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "CMS Media: auth users upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'cms-media' AND auth.role() = 'authenticated'
);
CREATE POLICY "CMS Media: auth users update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'cms-media' AND auth.role() = 'authenticated'
);
CREATE POLICY "CMS Media: auth users delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'cms-media' AND auth.role() = 'authenticated'
);

-- =============================================
-- Initial site settings seed data
-- =============================================
INSERT INTO public.cms_settings (key, value, category, label) VALUES
('site_name', '"CarPost"', 'general', 'Nome do Site'),
('site_description', '"Sistema de gestão para lojas de veículos"', 'general', 'Descrição do Site'),
('primary_color', '"#f37020"', 'theme', 'Cor Primária'),
('secondary_color', '"#f78f1e"', 'theme', 'Cor Secundária'),
('font_heading', '"Inter"', 'theme', 'Fonte de Títulos'),
('font_body', '"Inter"', 'theme', 'Fonte do Corpo');
