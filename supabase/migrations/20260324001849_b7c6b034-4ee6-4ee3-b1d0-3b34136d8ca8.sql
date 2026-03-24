-- Remove ip_address from user control; set it to NULL via trigger (server-side only)
CREATE OR REPLACE FUNCTION public.audit_sanitize_ip()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.ip_address := NULL;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_audit_sanitize_ip
  BEFORE INSERT ON public.cms_audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_sanitize_ip();