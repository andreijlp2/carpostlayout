import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "@/lib/api-config";

const testimonialStyles = `
  * { box-sizing: border-box; }
  @keyframes spin { to { transform: rotate(360deg); } }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

  .ts-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0f1a 0%, #1a0d2e 50%, #0d1b2a 100%);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    font-family: 'Inter', -apple-system, sans-serif;
    position: relative; overflow: hidden;
  }
  .ts-orb1 {
    position: absolute; top: -15%; right: -10%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .ts-orb2 {
    position: absolute; bottom: -15%; left: -10%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%);
    pointer-events: none;
  }
  .ts-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 40px 40px; pointer-events: none;
  }
  .ts-container {
    position: relative; width: 100%; max-width: 500px;
    display: flex; flex-direction: column; gap: 1rem;
  }
  .ts-header { text-align: center; margin-bottom: 0.5rem; }
  .ts-brand-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    margin-bottom: 0.75rem;
    box-shadow: 0 0 30px rgba(139,92,246,0.4);
  }
  .ts-brand-name { color: white; font-size: 1.3rem; font-weight: 800; margin: 0 0 0.25rem; letter-spacing: -0.02em; }
  .ts-badge {
    background: rgba(139,92,246,0.2); color: #c4b5fd;
    font-size: 0.72rem; font-weight: 600; padding: 0.2rem 0.7rem;
    border-radius: 20px; border: 1px solid rgba(139,92,246,0.3);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .ts-welcome {
    background: rgba(139,92,246,0.08);
    border: 1px solid rgba(139,92,246,0.2);
    border-radius: 14px; padding: 1.25rem 1.5rem;
  }
  .ts-welcome-title { color: rgba(255,255,255,0.9); font-weight: 600; font-size: 1rem; margin: 0 0 0.6rem; }
  .ts-welcome-text { color: rgba(255,255,255,0.55); font-size: 0.875rem; line-height: 1.7; margin: 0 0 0.75rem; }
  .ts-welcome-cta {
    margin-top: 0.75rem; padding: 0.6rem 1rem;
    background: rgba(139,92,246,0.15); border-radius: 8px;
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .ts-welcome-cta-text { color: #c4b5fd; font-weight: 600; font-size: 0.85rem; }
  .ts-form-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 18px; padding: 1.75rem;
  }
  .ts-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .ts-field-label {
    color: rgba(255,255,255,0.55); font-size: 0.78rem; font-weight: 600;
    display: block; margin-bottom: 0.5rem;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .ts-input, .ts-textarea {
    width: 100%; padding: 0.75rem 1rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; color: white; font-size: 0.9rem;
    outline: none; transition: border-color 0.2s; font-family: inherit;
  }
  .ts-input:focus, .ts-textarea:focus { border-color: rgba(139,92,246,0.6); }
  .ts-textarea { resize: none; }
  .ts-stars-wrap {
    display: flex; gap: 0.75rem; justify-content: center;
    padding: 1rem; background: rgba(255,255,255,0.03);
    border-radius: 12px; border: 1px solid rgba(255,255,255,0.07);
  }
  .ts-star-btn {
    font-size: 2rem; background: none; border: none; cursor: pointer;
    transition: all 0.15s; padding: 0.1rem; line-height: 1;
  }
  .ts-char-count { text-align: right; color: rgba(255,255,255,0.2); font-size: 0.72rem; margin-top: 0.25rem; }
  .ts-star-label { text-align: center; color: rgba(255,255,255,0.3); font-size: 0.78rem; margin-top: 0.5rem; min-height: 1.2em; }
  .ts-submit-btn {
    width: 100%; padding: 0.9rem;
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    border: none; border-radius: 12px; color: white;
    font-size: 1rem; font-weight: 700; cursor: pointer;
    box-shadow: 0 4px 25px rgba(139,92,246,0.4);
    transition: opacity 0.2s; letter-spacing: 0.01em;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    font-family: inherit;
  }
  .ts-submit-btn:hover { opacity: 0.9; }
  .ts-footer { text-align: center; color: rgba(255,255,255,0.2); font-size: 0.75rem; }

  /* State screens */
  .ts-state-wrap { position: relative; text-align: center; width: 100%; max-width: 420px; }
  .ts-spinner {
    width: 44px; height: 44px; border: 3px solid rgba(139,92,246,0.25);
    border-top-color: #8b5cf6; border-radius: 50%;
    animation: spin 0.8s linear infinite; margin: 0 auto 1rem;
  }
  .ts-state-p { color: rgba(255,255,255,0.4); font-size: 0.875rem; }
  .ts-error-icon {
    width: 70px; height: 70px; border-radius: 50%;
    background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem; font-size: 2rem;
  }
  .ts-success-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.2));
    border: 1px solid rgba(139,92,246,0.4);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 2rem; font-size: 2.5rem;
    box-shadow: 0 0 40px rgba(139,92,246,0.3);
  }
  .ts-state-h2 { color: white; font-size: 1.4rem; font-weight: 700; margin: 0 0 0.5rem; }
  .ts-state-sub { color: rgba(255,255,255,0.4); font-size: 0.9rem; line-height: 1.6; margin: 0; }
  .ts-success-h2 { color: white; font-size: 1.8rem; font-weight: 800; margin: 0 0 1rem; letter-spacing: -0.025em; }
  .ts-success-msg {
    color: rgba(255,255,255,0.55); font-size: 1rem; line-height: 1.7; margin: 0;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 1.25rem 1.5rem;
  }
  .ts-success-stars { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
  .ts-stars-yellow { color: #fbbf24; font-size: 1.2rem; }
  .ts-stars-note { color: rgba(255,255,255,0.3); font-size: 0.8rem; }
  .ts-error-note { color: rgba(255,255,255,0.25); font-size: 0.8rem; margin-top: 1.5rem; }

  /* ── MOBILE ── */
  @media (max-width: 480px) {
    .ts-root { padding: 1rem; align-items: flex-start; padding-top: 1.5rem; }
    .ts-form-card { padding: 1.25rem; border-radius: 14px; }
    .ts-welcome { padding: 1rem 1.1rem; }
    .ts-welcome-cta { flex-wrap: wrap; }
    .ts-brand-icon { width: 44px; height: 44px; }
    .ts-brand-name { font-size: 1.1rem; }
    .ts-star-btn { font-size: 1.75rem; }
    .ts-stars-wrap { gap: 0.4rem; padding: 0.75rem; }
    .ts-submit-btn { font-size: 0.95rem; padding: 0.8rem; }
    .ts-success-h2 { font-size: 1.4rem; }
    .ts-success-msg { font-size: 0.9rem; padding: 1rem; }
  }
`;

const TestimonialSubmit = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [form, setForm] = useState({ client_name: "", stars: 5, content: "" });

  useEffect(() => { validateLink(); }, [token]);

  const validateLink = async () => {
    try {
      const res = await fetch(`${API_URL}/testimonial-link?action=validate&token=${token}`);
      const data = await res.json();
      if (!data.valid) setError("Link expirado ou inválido");
    } catch { setError("Link inválido"); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/testimonial-link?action=submit&token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else setError("Erro ao enviar. Tente novamente.");
    } catch { setError("Erro de conexão. Tente novamente."); }
  };

  const starLabels = ["", "Ruim", "Regular", "Bom", "Muito Bom", "Excelente!"];

  const Bg = () => (
    <>
      <div className="ts-orb1" />
      <div className="ts-orb2" />
      <div className="ts-grid" />
    </>
  );

  if (loading) return (
    <div className="ts-root">
      <style>{testimonialStyles}</style>
      <Bg />
      <div className="ts-state-wrap" style={{ maxWidth: "300px" }}>
        <div className="ts-spinner" />
        <p className="ts-state-p">Validando link...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="ts-root">
      <style>{testimonialStyles}</style>
      <Bg />
      <div className="ts-state-wrap" style={{ maxWidth: "380px" }}>
        <div className="ts-error-icon">⛔</div>
        <h2 className="ts-state-h2">Link Inválido</h2>
        <p className="ts-state-sub">{error}</p>
        <p className="ts-error-note">Solicite um novo link ao responsável.</p>
      </div>
    </div>
  );

  if (submitted) return (
    <div className="ts-root">
      <style>{testimonialStyles}</style>
      <Bg />
      <div className="ts-state-wrap">
        <div className="ts-success-icon">🙏</div>
        <h2 className="ts-success-h2">Muito obrigado!</h2>
        <p className="ts-success-msg">Agradeço demais pela parceria e confiança! 🤝</p>
        <div className="ts-success-stars">
          <span className="ts-stars-yellow">★★★★★</span>
          <span className="ts-stars-note">sua avaliação foi registrada</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ts-root">
      <style>{testimonialStyles}</style>
      <Bg />

      <div className="ts-container">
        {/* Header */}
        <div className="ts-header">
          <div className="ts-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="ts-brand-name">CarPost</h1>
          <span className="ts-badge">Formulário de Depoimento</span>
        </div>

        {/* Welcome card */}
        <div className="ts-welcome">
          <p className="ts-welcome-title">Olá! Tudo bem? 😊</p>
          <p className="ts-welcome-text">
            Quero te pedir um pequeno favor — sua opinião é muito importante pra gente! Você poderia deixar um depoimento rápido sobre a sua experiência com nosso serviço?
          </p>
          <p className="ts-welcome-text" style={{ marginBottom: 0 }}>
            Isso ajuda outras pessoas a conhecerem nosso trabalho e também nos ajuda a melhorar cada vez mais.
          </p>
          <div className="ts-welcome-cta">
            <span>👇</span>
            <span className="ts-welcome-cta-text">É bem rápido, leva menos de 1 minutinho!</span>
          </div>
        </div>

        {/* Form card */}
        <div className="ts-form-card">
          <form onSubmit={handleSubmit} className="ts-form">

            {/* Name */}
            <div>
              <label className="ts-field-label">Seu Nome</label>
              <input
                type="text"
                className="ts-input"
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                placeholder="Como você se chama?"
                required
              />
            </div>

            {/* Stars */}
            <div>
              <label className="ts-field-label">Sua Avaliação</label>
              <div className="ts-stars-wrap">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hoveredStar || form.stars);
                  return (
                    <button
                      key={star}
                      type="button"
                      className="ts-star-btn"
                      onClick={() => setForm({ ...form, stars: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      style={{
                        color: isActive ? "#fbbf24" : "rgba(255,255,255,0.15)",
                        transform: isActive ? "scale(1.15)" : "scale(1)",
                        filter: isActive ? "drop-shadow(0 0 8px rgba(251,191,36,0.5))" : "none",
                      }}
                    >★</button>
                  );
                })}
              </div>
              <p className="ts-star-label">{starLabels[hoveredStar || form.stars]}</p>
            </div>

            {/* Content */}
            <div>
              <label className="ts-field-label">Seu Depoimento</label>
              <textarea
                className="ts-textarea"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Conte como foi sua experiência com a CarPost..."
                required
                rows={4}
              />
              <p className="ts-char-count">{form.content.length} caracteres</p>
            </div>

            {/* Submit */}
            <button type="submit" className="ts-submit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Enviar Depoimento
            </button>

          </form>
        </div>

        <p className="ts-footer">CarPost © {new Date().getFullYear()} · Seu depoimento é muito importante para nós ❤️</p>
      </div>
    </div>
  );
};

export default TestimonialSubmit;
