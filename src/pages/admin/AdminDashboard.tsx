import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { API_URL, IMAGE_BASE_URL } from "@/lib/api-config";

interface GeneratedLink { link: string; expiresAt: string; id: string; }
type TabId = "settings" | "testimonials" | "link" | "logos";

const Icon = {
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>,
  Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Link: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Image: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Copy: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  External: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Clock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Plus: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Refresh: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("settings");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ google_analytics_id: "", google_tag_manager_id: "", meta_pixel_id: "", youtube_video_id: "" });
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ client_name: "", stars: 5, content: "" });
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [newLogo, setNewLogo] = useState({ name: "", image: null });
  const [linkHours, setLinkHours] = useState(72);
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    const saved = sessionStorage.getItem("carpost_generated_links");
    if (saved) setGeneratedLinks(JSON.parse(saved));
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/admin"); return; }
    await loadData();
  };

  const loadData = async () => {
    const token = localStorage.getItem("token");
    try {
      const [settingsRes, testimonialsRes, logosRes] = await Promise.all([
        fetch(`${API_URL}/settings`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/testimonials/all`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/partner-logos/all`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setSettings(await settingsRes.json());
      setTestimonials(await testimonialsRes.json());
      setPartnerLogos(await logosRes.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const saveSettings = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/settings`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(settings) });
    if (res.ok) toast({ title: "✅ Configurações salvas!" });
    else toast({ title: "Erro ao salvar", variant: "destructive" });
  };

  const generateLink = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/testimonial-link/generate`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ hours: linkHours }) });
      const data = await res.json();
      if (!data.link) throw new Error();
      const entry: GeneratedLink = { link: data.link, expiresAt: data.expiresAt, id: Math.random().toString(36).substr(2, 9) };
      const updated = [entry, ...generatedLinks];
      setGeneratedLinks(updated);
      sessionStorage.setItem("carpost_generated_links", JSON.stringify(updated));
      toast({ title: "🔗 Link gerado com sucesso!" });
    } catch { toast({ title: "Erro ao gerar link", variant: "destructive" }); }
  };

  const deleteLink = async (id: string, linkUrl: string) => {
    const token = localStorage.getItem("token");
    const linkToken = linkUrl.split("/").pop();
    if (!linkToken) return;
    try {
      const res = await fetch(`${API_URL}/testimonial-link/${linkToken}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const updated = generatedLinks.filter(l => l.id !== id);
        setGeneratedLinks(updated);
        sessionStorage.setItem("carpost_generated_links", JSON.stringify(updated));
        toast({ title: "Link excluído" });
      }
    } catch { toast({ title: "Erro de conexão", variant: "destructive" }); }
  };

  const createTestimonial = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/testimonials`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(newTestimonial) });
    if (res.ok) { toast({ title: "✅ Depoimento criado!" }); setNewTestimonial({ client_name: "", stars: 5, content: "" }); loadData(); }
    else toast({ title: "Erro ao criar depoimento", variant: "destructive" });
  };

  const deleteTestimonial = async (id: any) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/testimonials/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    toast({ title: "Depoimento excluído" }); loadData();
  };

  const createLogo = async () => {
    if (!newLogo.name || !newLogo.image) { toast({ title: "Nome e imagem são obrigatórios", variant: "destructive" }); return; }
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/partner-logos`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: newLogo.name, image_base64: newLogo.image }) });
    if (res.ok) { toast({ title: "✅ Logo adicionado!" }); setNewLogo({ name: "", image: null }); loadData(); }
    else toast({ title: "Erro ao criar logo", variant: "destructive" });
  };

  const deleteLogo = async (id: any) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/partner-logos/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    toast({ title: "Logo excluído" }); loadData();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onloadend = () => setNewLogo({ ...newLogo, image: r.result as any }); r.readAsDataURL(file); }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopyStatus(id); toast({ title: "Link copiado!" }); setTimeout(() => setCopyStatus(null), 2000); });
  };

  const formatDate = (d: string) => {
    try {
      if (!d) return "—";
      const dt = new Date(d.includes("T") ? d : d + "Z");
      return isNaN(dt.getTime()) ? "—" : dt.toLocaleString("pt-BR");
    } catch { return "—"; }
  };
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/admin"); };

  const handleTabChange = (tab: TabId) => { setActiveTab(tab); setSidebarOpen(false); };

  const tabs = [
    { id: "settings" as TabId, label: "Configurações", icon: <Icon.Settings /> },
    { id: "testimonials" as TabId, label: "Depoimentos", icon: <Icon.Star /> },
    { id: "link" as TabId, label: "Gerar Link", icon: <Icon.Link /> },
    { id: "logos" as TabId, label: "Logos Parceiros", icon: <Icon.Image /> },
  ];

  const tabSubtitle = {
    settings: "Google Analytics, GTM, Meta Pixel, YouTube",
    testimonials: `${testimonials.length} depoimento${testimonials.length !== 1 ? "s" : ""} cadastrado${testimonials.length !== 1 ? "s" : ""}`,
    link: `${generatedLinks.length} link${generatedLinks.length !== 1 ? "s" : ""} gerado${generatedLinks.length !== 1 ? "s" : ""} nesta sessão`,
    logos: `${partnerLogos.length} logo${partnerLogos.length !== 1 ? "s" : ""} cadastrado${partnerLogos.length !== 1 ? "s" : ""}`,
  };

  if (loading) return (
    <div className="admin-loading">
      <div className="admin-spinner" />
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginTop: "1rem" }}>Carregando...</p>
      <style>{adminStyles}</style>
    </div>
  );

  const inputCls = "admin-input";
  const textareaCls = "admin-textarea";

  return (
    <div className="admin-root">
      <style>{adminStyles}</style>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div className="brand-name">CarPost</div>
            <div className="brand-sub">Admin Panel</div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}><Icon.X /></button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Menu</div>
          {tabs.map((tab) => (
            <button key={tab.id} className={`nav-item ${activeTab === tab.id ? "active" : ""}`} onClick={() => handleTabChange(tab.id)}>
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">A</div>
            <div>
              <div className="user-name">Administrador</div>
              <div className="user-role">Super Admin</div>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            <Icon.Logout />
            Sair do Admin
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}><Icon.Menu /></button>
            <div>
              <h1 className="topbar-title">{tabs.find(t => t.id === activeTab)?.label}</h1>
              <p className="topbar-sub">{tabSubtitle[activeTab]}</p>
            </div>
          </div>
          <button className="refresh-btn" onClick={loadData}><Icon.Refresh /><span className="refresh-label"> Atualizar</span></button>
        </div>

        {/* Content */}
        <div className="admin-content">

          {/* ─── SETTINGS ─────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="content-max">
              <div className="admin-card">
                <h2 className="card-title">Integrações e Configurações</h2>
                <p className="card-sub">IDs de rastreamento e configurações de mídia do site</p>
                <div className="form-grid-1">
                  {[
                    { key: "google_analytics_id", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX" },
                    { key: "google_tag_manager_id", label: "Google Tag Manager ID", placeholder: "GTM-XXXXXXX" },
                    { key: "meta_pixel_id", label: "Meta Pixel ID", placeholder: "1234567890" },
                    { key: "youtube_video_id", label: "YouTube Video ID", placeholder: "dQw4w9WgXcQ" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="form-label">{label}</label>
                      <input className={inputCls} value={settings[key] || ""} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} placeholder={placeholder} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <button className="btn-primary" onClick={saveSettings}>Salvar Configurações</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── TESTIMONIALS ─────────────────────────── */}
          {activeTab === "testimonials" && (
            <div className="content-max-lg">
              <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
                <h2 className="card-title">Novo Depoimento</h2>
                <p className="card-sub">Adicione um depoimento manualmente</p>
                <div className="form-grid-2" style={{ marginBottom: "1rem" }}>
                  <div>
                    <label className="form-label">Nome do Cliente</label>
                    <input className={inputCls} value={newTestimonial.client_name} onChange={(e) => setNewTestimonial({ ...newTestimonial, client_name: e.target.value })} placeholder="João Silva" />
                  </div>
                  <div>
                    <label className="form-label">Estrelas (1–5)</label>
                    <select className={inputCls} value={newTestimonial.stars} onChange={(e) => setNewTestimonial({ ...newTestimonial, stars: parseInt(e.target.value) })}>
                      {[1,2,3,4,5].map(n => <option key={n} value={n} style={{ background: "#1a1a2e" }}>{"⭐".repeat(n)} ({n})</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className="form-label">Depoimento</label>
                  <textarea className={textareaCls} value={newTestimonial.content} onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })} placeholder="Experiência incrível..." />
                </div>
                <button className="btn-primary" onClick={createTestimonial}><Icon.Plus />Criar Depoimento</button>
              </div>

              <div className="admin-card">
                <h2 className="card-title">Depoimentos ({testimonials.length})</h2>
                <p className="card-sub">Todos os depoimentos cadastrados</p>
                {testimonials.length === 0 ? (
                  <div className="empty-state">Nenhum depoimento cadastrado</div>
                ) : (
                  <div className="list-stack">
                    {testimonials.map((t: any) => (
                      <div key={t.id} className="list-item">
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                            <span style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{t.client_name}</span>
                            <span style={{ color: "#fbbf24", fontSize: "0.8rem" }}>{"★".repeat(t.stars)}</span>
                          </div>
                          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", margin: 0, lineHeight: 1.5 }}>{t.content?.substring(0, 120)}{t.content?.length > 120 ? "..." : ""}</p>
                        </div>
                        <button className="btn-danger" onClick={() => deleteTestimonial(t.id)}><Icon.Trash /><span className="btn-label">Excluir</span></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── GENERATE LINK ────────────────────────── */}
          {activeTab === "link" && (
            <div className="content-max-lg">
              <div className="admin-card">
                <h2 className="card-title">Gerar Link de Depoimento</h2>
                <p className="card-sub">Crie links temporários para clientes enviarem depoimentos</p>

                <div className="link-gen-row">
                  <div style={{ flex: "0 0 180px", minWidth: "120px" }}>
                    <label className="form-label">Validade (horas)</label>
                    <input type="number" className={inputCls} value={linkHours} onChange={(e) => setLinkHours(parseInt(e.target.value))} placeholder="72" />
                  </div>
                  <button className="btn-primary" onClick={generateLink} style={{ alignSelf: "flex-end" }}><Icon.Link />Gerar Link</button>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <h3 className="section-label">Histórico desta Sessão</h3>
                    <span className="badge-purple">{generatedLinks.length} links</span>
                  </div>

                  {generatedLinks.length === 0 ? (
                    <div className="empty-state">
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔗</div>
                      <p style={{ margin: 0, fontSize: "0.85rem" }}>Nenhum link gerado nesta sessão.</p>
                    </div>
                  ) : (
                    <div className="list-stack">
                      {generatedLinks.map((item) => (
                        <div key={item.id} className="link-item">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                              <code className="link-code">{item.link}</code>
                              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, display: "flex" }}><Icon.External /></a>
                            </div>
                            <div className="link-expiry"><Icon.Clock />Expira: {formatDate(item.expiresAt)}</div>
                          </div>
                          <div className="link-actions">
                            <button className={`btn-ghost ${copyStatus === item.id ? "copied" : ""}`} onClick={() => copyToClipboard(item.link, item.id)}>
                              {copyStatus === item.id ? <><Icon.Check />Copiado!</> : <><Icon.Copy />Copiar</>}
                            </button>
                            <button className="btn-danger icon-only" onClick={() => deleteLink(item.id, item.link)}><Icon.Trash /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── LOGOS ────────────────────────────────── */}
          {activeTab === "logos" && (
            <div className="content-max-xl">
              <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
                <h2 className="card-title">Novo Logo Parceiro</h2>
                <p className="card-sub">Faça upload de logos que aparecem no carrossel do site</p>
                <div className="form-grid-1">
                  <div>
                    <label className="form-label">Nome da Empresa</label>
                    <input className={inputCls} value={newLogo.name} onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })} placeholder="Ex: Toyota" />
                  </div>
                  <div>
                    <label className="form-label">Arquivo de Imagem</label>
                    <label className="file-upload-label">
                      <Icon.Image />
                      <span>{newLogo.image ? "✓ Imagem carregada" : "Clique para selecionar imagem..."}</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                    </label>
                    {newLogo.image && (
                      <div className="image-preview">
                        <img src={newLogo.image} alt="Preview" style={{ height: "50px", objectFit: "contain" }} />
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: "1.25rem" }}>
                  <button className="btn-primary" onClick={createLogo}><Icon.Plus />Adicionar Logo</button>
                </div>
              </div>

              <div className="admin-card">
                <h2 className="card-title">Logos Existentes ({partnerLogos.length})</h2>
                <p className="card-sub">Logos exibidos no carrossel de parceiros do site</p>
                {partnerLogos.length === 0 ? (
                  <div className="empty-state">Nenhum logo cadastrado</div>
                ) : (
                  <div className="logos-grid">
                    {partnerLogos.map((logo: any) => (
                      <div key={logo.id} className="logo-card">
                        <div className="logo-img-wrap">
                          <img src={`${IMAGE_BASE_URL}${logo.image_url}`} alt={logo.name} style={{ maxWidth: "80px", maxHeight: "50px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
                        </div>
                        <span className="logo-name">{logo.name}</span>
                        <button className="btn-danger" onClick={() => deleteLogo(logo.id)}><Icon.Trash /><span className="btn-label">Excluir</span></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const adminStyles = `
  * { box-sizing: border-box; }
  @keyframes spin { to { transform: rotate(360deg); } }
  
  .admin-root {
    display: flex;
    min-height: 100vh;
    background: #0d0d18;
    font-family: 'Inter', -apple-system, sans-serif;
  }

  .admin-loading {
    min-height: 100vh;
    background: #0d0d18;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .admin-spinner {
    width: 40px; height: 40px;
    border: 3px solid rgba(139,92,246,0.3);
    border-top-color: #8b5cf6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* ── SIDEBAR ── */
  .admin-sidebar {
    width: 240px;
    background: linear-gradient(180deg, #0f0f1a 0%, #1a0d2e 100%);
    border-right: 1px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 50;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 49;
    backdrop-filter: blur(4px);
  }

  .sidebar-close-btn {
    display: none;
    margin-left: auto;
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    padding: 0.25rem;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1.25rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .brand-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 0 20px rgba(139,92,246,0.4);
  }

  .brand-name { color: white; font-weight: 700; font-size: 0.95rem; letter-spacing: -0.01em; }
  .brand-sub { color: rgba(255,255,255,0.35); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

  .sidebar-nav { flex: 1; padding: 1rem 0.75rem; overflow-y: auto; }
  .nav-label { color: rgba(255,255,255,0.25); font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0 0.5rem; margin-bottom: 0.5rem; }

  .nav-item {
    width: 100%; display: flex; align-items: center;
    gap: 0.75rem; padding: 0.65rem 0.75rem;
    border-radius: 10px; border: none; cursor: pointer;
    margin-bottom: 2px; transition: all 0.2s; text-align: left;
    background: transparent;
    color: rgba(255,255,255,0.45);
    font-weight: 400; font-size: 0.875rem;
    font-family: inherit;
  }
  .nav-item.active {
    background: linear-gradient(135deg, rgba(139,92,246,0.25), rgba(109,40,217,0.15));
    color: #c4b5fd; font-weight: 600;
    box-shadow: inset 0 0 0 1px rgba(139,92,246,0.3);
  }
  .nav-icon { color: rgba(255,255,255,0.3); transition: color 0.2s; }
  .nav-item.active .nav-icon { color: #a78bfa; }
  .nav-dot { margin-left: auto; width: 6px; height: 6px; border-radius: 50%; background: #8b5cf6; }

  .sidebar-footer { padding: 1rem 0.75rem; border-top: 1px solid rgba(255,255,255,0.07); }

  .user-card {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem; background: rgba(255,255,255,0.04);
    border-radius: 10px; border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 0.75rem;
  }
  .user-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
  }
  .user-name { color: rgba(255,255,255,0.8); font-size: 0.8rem; font-weight: 600; }
  .user-role { color: rgba(255,255,255,0.35); font-size: 0.7rem; }

  .logout-btn {
    width: 100%; display: flex; align-items: center; justify-content: center;
    gap: 0.5rem; padding: 0.6rem;
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
    border-radius: 8px; color: rgba(252,165,165,0.8);
    font-size: 0.8rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; font-family: inherit;
  }
  .logout-btn:hover { background: rgba(239,68,68,0.18); }

  /* ── MAIN ── */
  .admin-main {
    margin-left: 240px;
    min-height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .admin-topbar {
    height: 64px; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 1.5rem;
    background: rgba(255,255,255,0.02);
    position: sticky; top: 0; z-index: 30;
    gap: 1rem;
  }

  .topbar-left { display: flex; align-items: center; gap: 0.875rem; min-width: 0; }

  .hamburger-btn {
    display: none;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 0.45rem;
    color: rgba(255,255,255,0.6); cursor: pointer;
    flex-shrink: 0; line-height: 0;
  }

  .topbar-title { color: white; font-size: 1.05rem; font-weight: 700; margin: 0; white-space: nowrap; }
  .topbar-sub { color: rgba(255,255,255,0.35); font-size: 0.72rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .refresh-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 0.5rem 0.9rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; color: rgba(255,255,255,0.6);
    font-size: 0.8rem; cursor: pointer; white-space: nowrap;
    flex-shrink: 0; font-family: inherit;
  }

  .refresh-label { display: inline; }

  .admin-content { padding: 1.5rem; }

  .content-max { max-width: 700px; }
  .content-max-lg { max-width: 800px; }
  .content-max-xl { max-width: 900px; }

  /* ── CARDS ── */
  .admin-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 1.5rem;
  }

  .card-title { color: white; font-size: 1.05rem; font-weight: 600; margin: 0 0 0.25rem; }
  .card-sub { color: rgba(255,255,255,0.4); font-size: 0.82rem; margin: 0 0 1.25rem; }
  .form-label { color: rgba(255,255,255,0.55); font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.04em; }

  .form-grid-1 { display: grid; gap: 1rem; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 140px; gap: 1rem; }

  .admin-input, .admin-textarea {
    width: 100%; padding: 0.65rem 0.9rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; color: white; font-size: 0.875rem;
    outline: none; box-sizing: border-box; transition: border-color 0.2s;
    font-family: inherit;
  }
  .admin-input:focus, .admin-textarea:focus { border-color: rgba(139,92,246,0.5); }
  .admin-input::placeholder, .admin-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .admin-textarea { min-height: 90px; resize: vertical; }
  select.admin-input { cursor: pointer; }
  select.admin-input option { background: #1a1a2e; }

  /* ── BUTTONS ── */
  .btn-primary {
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    border: none; border-radius: 8px; color: white;
    font-size: 0.85rem; font-weight: 600; cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    transition: opacity 0.2s; box-shadow: 0 4px 15px rgba(139,92,246,0.3);
    font-family: inherit;
  }
  .btn-primary:hover { opacity: 0.9; }

  .btn-danger {
    padding: 0.45rem 0.85rem;
    background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
    border-radius: 7px; color: #fca5a5;
    font-size: 0.78rem; font-weight: 500; cursor: pointer;
    display: inline-flex; align-items: center; gap: 5px;
    transition: all 0.2s; font-family: inherit; flex-shrink: 0;
  }
  .btn-danger.icon-only { padding: 0.45rem; }
  .btn-ghost {
    padding: 0.45rem 0.85rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px; color: rgba(255,255,255,0.7);
    font-size: 0.78rem; font-weight: 500; cursor: pointer;
    display: inline-flex; align-items: center; gap: 5px; transition: all 0.2s;
    font-family: inherit; white-space: nowrap;
  }
  .btn-ghost.copied { background: rgba(34,197,94,0.15); color: #86efac; border-color: rgba(34,197,94,0.3); }

  .section-label { color: rgba(255,255,255,0.7); font-size: 0.85rem; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 0.05em; }
  .badge-purple { background: rgba(139,92,246,0.2); color: #a78bfa; font-size: 0.72rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; border: 1px solid rgba(139,92,246,0.3); }
  
  /* ── LIST ITEMS ── */
  .list-stack { display: flex; flex-direction: column; gap: 0.75rem; }
  .list-item {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 1rem; padding: 1rem;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
  }

  .empty-state {
    text-align: center; padding: 2rem;
    color: rgba(255,255,255,0.3);
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 10px; font-size: 0.875rem;
  }

  /* ── LINKS ── */
  .link-gen-row { display: flex; align-items: flex-end; gap: 1rem; flex-wrap: wrap; }
  .link-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; flex-wrap: wrap;
  }
  .link-code {
    color: #a78bfa; font-size: 0.75rem;
    background: rgba(139,92,246,0.1); padding: 0.2rem 0.6rem;
    border-radius: 5px; white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis; max-width: 100%; display: block;
  }
  .link-expiry { display: flex; align-items: center; gap: 0.4rem; color: rgba(255,255,255,0.3); font-size: 0.75rem; margin-top: 0.35rem; }
  .link-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

  /* ── LOGOS ── */
  .logos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
  .logo-card {
    padding: 1.25rem; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
    text-align: center; display: flex; flex-direction: column;
    align-items: center; gap: 0.75rem;
  }
  .logo-img-wrap { width: 80px; height: 50px; display: flex; align-items: center; justify-content: center; }
  .logo-name { color: rgba(255,255,255,0.6); font-size: 0.8rem; font-weight: 500; }

  .file-upload-label {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(255,255,255,0.04); border: 1px dashed rgba(255,255,255,0.15);
    border-radius: 8px; cursor: pointer;
    color: rgba(255,255,255,0.5); font-size: 0.85rem; transition: all 0.2s;
  }
  .file-upload-label:hover { border-color: rgba(139,92,246,0.4); color: rgba(255,255,255,0.7); }

  .image-preview {
    margin-top: 0.75rem; padding: 0.75rem;
    background: rgba(255,255,255,0.03); border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.07); display: inline-block;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

  /* ─────────── RESPONSIVE ─────────── */
  @media (max-width: 768px) {
    .admin-sidebar {
      transform: translateX(-100%);
      width: 280px;
    }
    .admin-sidebar.open {
      transform: translateX(0);
      box-shadow: 4px 0 30px rgba(0,0,0,0.5);
    }
    .sidebar-overlay { display: block; }
    .sidebar-close-btn { display: flex; }
    .admin-main { margin-left: 0; }
    .hamburger-btn { display: flex; }
    .admin-content { padding: 1rem; }
    .admin-topbar { padding: 0 1rem; }
    .form-grid-2 { grid-template-columns: 1fr; }
    .logos-grid { grid-template-columns: repeat(2, 1fr); }
    .link-item { flex-direction: column; align-items: flex-start; }
    .link-code { max-width: 100%; }
    .link-actions { width: 100%; }
    .link-gen-row { flex-direction: column; align-items: flex-start; }
    .refresh-label { display: none; }
    .btn-label { display: none; }
    .list-item { flex-wrap: wrap; }
    .topbar-sub { display: none; }
  }

  @media (max-width: 480px) {
    .logos-grid { grid-template-columns: 1fr 1fr; }
    .admin-card { padding: 1.1rem; }
    .topbar-title { font-size: 0.95rem; }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .admin-sidebar { width: 200px; }
    .admin-main { margin-left: 200px; }
    .brand-name { font-size: 0.875rem; }
    .nav-item { font-size: 0.82rem; padding: 0.6rem 0.65rem; }
    .admin-content { padding: 1.25rem; }
  }
`;

export default AdminDashboard;
