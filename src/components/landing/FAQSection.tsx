import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "O CarPost funciona para qualquer tipo de loja de veículos?", a: "Sim! O CarPost foi desenvolvido para atender desde pequenas lojas até grandes concessionárias multimarcas. A plataforma se adapta ao tamanho e necessidades do seu negócio." },
  { q: "Preciso de conhecimento técnico para usar a plataforma?", a: "Não. O CarPost foi projetado para ser intuitivo e fácil de usar. Qualquer pessoa da sua equipe consegue operar o sistema sem treinamento técnico." },
  { q: "Como funciona a geração de anúncios com IA?", a: "Nossa inteligência artificial analisa as informações e fotos do veículo cadastrado e gera automaticamente descrições profissionais, textos de venda e legendas para redes sociais." },
  { q: "Posso cancelar meu plano a qualquer momento?", a: "Sim, você pode cancelar seu plano quando quiser, sem multa ou fidelidade. Além disso, oferecemos 30 dias de teste gratuito para você experimentar todas as funcionalidades." },
  { q: "O CarPost integra com quais plataformas?", a: "Integramos com Facebook, Instagram, OLX e outros portais de veículos. Estamos constantemente adicionando novas integrações para ampliar o alcance da sua loja." },
  { q: "Quanto tempo leva para configurar minha loja?", a: "Em menos de 10 minutos você já tem sua loja configurada e pronta para começar a cadastrar veículos e gerar anúncios automáticos." },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-card transition-shadow duration-300"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
      >
        <span className="font-bold text-foreground text-sm sm:text-base pr-4 group-hover:text-primary transition-colors">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-primary">Perguntas frequentes</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Dúvidas? Nós respondemos
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tudo que você precisa saber sobre o CarPost antes de começar.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
