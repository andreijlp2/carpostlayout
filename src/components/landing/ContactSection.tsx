import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  return (
    <section id="contato-form" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Fale Conosco</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground text-lg">
            Tem alguma dúvida? Nossa equipe está pronta para ajudar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
          >
            <div className="bg-hero-gradient rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold font-heading mb-6">Informações de Contato</h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Preencha o formulário ou entre em contato diretamente. Responderemos em até 24 horas.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Telefone</div>
                    <a href="tel:+5549999999999" className="text-white font-medium hover:text-white/80 transition-colors">(49) 99999-9999</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">E-mail</div>
                    <a href="mailto:contato@carpost.com.br" className="text-white font-medium hover:text-white/80 transition-colors">contato@carpost.com.br</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Endereço</div>
                    <span className="text-white font-medium">Chapecó, SC - Brasil</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 mt-10">
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 shadow-card space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    maxLength={255}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Assunto</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Assunto da mensagem"
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem..."
                  rows={5}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 font-semibold shadow-lg hover:shadow-hero transition-shadow"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
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
