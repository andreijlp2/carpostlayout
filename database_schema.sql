-- ==============================================================================
-- CARPOST CMS - SCHEMA DE BANCO DE DADOS (MIGRAÇÃO LOVABLE -> SUPABASE)
-- ==============================================================================

-- 1. EXTENSÕES & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- 2. TABELAS BASE (Auth e Roles)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role public.app_role DEFAULT 'user'::app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABELAS DO CMS (Páginas, Blocos, Menus)
CREATE TABLE public.cms_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft',
  description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_home BOOLEAN DEFAULT false NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.cms_blocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_id UUID REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb NOT NULL,
  styles JSONB DEFAULT '{}'::jsonb NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  label TEXT,
  is_visible BOOLEAN DEFAULT true NOT NULL,
  is_reusable BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.cms_menus (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  items JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.cms_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  category TEXT DEFAULT 'general' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. MEDIA & LOGS
CREATE TABLE public.cms_media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  mime_type TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  folder TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.cms_audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. FUNÇÕES DE SUPORTE (RPCs)
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT role FROM user_roles WHERE user_id = _user_id LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- 6. GATILHO INTELIGENTE: PRIMEIRO USUÁRIO (VOCÊ) VIRA ADMIN AUTOMATICAMENTE
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  is_first_user boolean;
BEGIN
  INSERT INTO public.profiles (id, user_id, full_name, avatar_url)
  VALUES (new.id, new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  SELECT count(*) = 0 INTO is_first_user FROM public.user_roles;
  
  IF is_first_user THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'user');
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. RLS SECURITY (Liberação Completa Inicial para Agilizar seu Setup)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_audit_logs ENABLE ROW LEVEL SECURITY;

-- Permitir Select para Todos e ALL (Edição Total) para Admins ou Usuários Logados
CREATE POLICY "Livre Leitura" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admins alteram" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Ler Roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Admins Roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Ver Paginas" ON public.cms_pages FOR SELECT USING (true);
CREATE POLICY "Admin Paginas" ON public.cms_pages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Ver Blocos" ON public.cms_blocks FOR SELECT USING (true);
CREATE POLICY "Admin Blocos" ON public.cms_blocks FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Ver Menus" ON public.cms_menus FOR SELECT USING (true);
CREATE POLICY "Admin Menus" ON public.cms_menus FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Ver Settings" ON public.cms_settings FOR SELECT USING (true);
CREATE POLICY "Admin Settings" ON public.cms_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Ver Media" ON public.cms_media FOR SELECT USING (true);
CREATE POLICY "Admin Media" ON public.cms_media FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Ver Logs" ON public.cms_audit_logs FOR SELECT USING (true);
CREATE POLICY "Admin Logs" ON public.cms_audit_logs FOR ALL USING (auth.role() = 'authenticated');
