import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

const fieldVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300";

  return (
    <section id="contato-form" className="py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Fale Conosco</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tem alguma dúvida? Nossa equipe está pronta para ajudar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-hero-gradient rounded-2xl p-6 sm:p-8 text-white h-full">
              <h3 className="text-lg sm:text-xl font-bold font-heading mb-4 sm:mb-6">Informações de Contato</h3>
              <p className="text-white/70 text-sm mb-6 sm:mb-8 leading-relaxed">
                Preencha o formulário ou entre em contato diretamente. Responderemos em até 24 horas.
              </p>

              <div className="space-y-5 sm:space-y-6">
                {[
                  { icon: Phone, label: "Telefone", value: "(49) 99999-9999", href: "tel:+5549999999999" },
                  { icon: Mail, label: "E-mail", value: "contato@carpost.com.br", href: "mailto:contato@carpost.com.br" },
                  { icon: MapPin, label: "Endereço", value: "Chapecó, SC - Brasil" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-white/50 mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white font-medium text-sm sm:text-base hover:text-white/80 transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-white font-medium text-sm sm:text-base">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8 sm:mt-10">
                {["FB", "IG", "YT", "LI"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300 text-xs font-bold"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card space-y-5 sm:space-y-6 relative overflow-hidden">
              {/* Success overlay */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold font-heading text-foreground mb-2">Mensagem Enviada!</h3>
                    <p className="text-muted-foreground text-sm">Retornaremos em breve.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                >
                  <label className="text-sm font-medium text-foreground mb-2 block">Nome</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" maxLength={100} className={inputClass} required />
                </motion.div>
                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                >
                  <label className="text-sm font-medium text-foreground mb-2 block">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" maxLength={255} className={inputClass} required />
                </motion.div>
              </div>

              <motion.div variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                <label className="text-sm font-medium text-foreground mb-2 block">Assunto</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Assunto da mensagem" maxLength={200} className={inputClass} required />
              </motion.div>

              <motion.div variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensagem</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Escreva sua mensagem..." rows={5} maxLength={1000} className={`${inputClass} resize-none`} required />
              </motion.div>

              <motion.div
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 font-semibold shadow-lg hover:shadow-hero transition-all disabled:opacity-70"
                >
                  {submitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {submitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
