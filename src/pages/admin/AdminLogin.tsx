import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/lib/api-config";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Credenciais inválidas");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a0533 50%, #0d1b2a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated Orbs */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", left: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Grid Pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "60px", height: "60px", borderRadius: "16px",
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            marginBottom: "1rem",
            boxShadow: "0 0 40px rgba(139,92,246,0.4)",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 style={{ color: "white", fontSize: "1.75rem", fontWeight: 700, margin: 0, letterSpacing: "-0.025em" }}>
            CarPost <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admin</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", marginTop: "0.375rem" }}>
            Painel de controle
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {error && (
              <div style={{
                background: "rgba(239,68,68,0.15)", color: "#fca5a5",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px", padding: "0.75rem 1rem",
                fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>
                E-mail
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@carpost.com.br"
                  required
                  style={{
                    width: "100%", padding: "0.75rem 1rem 0.75rem 2.75rem",
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px", color: "white", fontSize: "0.9rem",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(139,92,246,0.6)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
            </div>

            <div>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>
                Senha
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", padding: "0.75rem 1rem 0.75rem 2.75rem",
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px", color: "white", fontSize: "0.9rem",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(139,92,246,0.6)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "0.85rem",
                background: loading ? "rgba(139,92,246,0.5)" : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                border: "none", borderRadius: "10px", color: "white",
                fontSize: "0.95rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                marginTop: "0.5rem", transition: "all 0.2s",
                boxShadow: loading ? "none" : "0 4px 20px rgba(139,92,246,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Entrando...
                </>
              ) : "Entrar no Admin"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <a
              href="https://app.carpost.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                width: "100%", padding: "0.75rem",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px", color: "rgba(255,255,255,0.6)",
                fontSize: "0.85rem", fontWeight: 500, textDecoration: "none",
                transition: "all 0.2s", boxSizing: "border-box",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Acessar CarPost App
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
};

export default AdminLogin;
