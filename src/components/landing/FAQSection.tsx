import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O CarPost funciona para qualquer tipo de loja de veículos?",
    a: "Sim! O CarPost foi desenvolvido para lojas de todos os portes — desde revendas pequenas com poucos veículos até grandes concessionárias multimarcas. A plataforma se adapta às necessidades do seu negócio.",
  },
  {
    q: "Preciso ter conhecimento técnico para usar a plataforma?",
    a: "Não. A interface do CarPost é intuitiva e fácil de usar. Qualquer membro da sua equipe consegue operar sem treinamento técnico. Além disso, oferecemos tutoriais e suporte para ajudar.",
  },
  {
    q: "Como funciona a geração de anúncios com IA?",
    a: "A inteligência artificial analisa os dados e fotos do veículo e gera automaticamente descrições profissionais, legendas para redes sociais e textos otimizados para conversão. Você pode editar e personalizar antes de publicar.",
  },
  {
    q: "Quais redes sociais e marketplaces são compatíveis?",
    a: "O CarPost integra com Facebook, Instagram, OLX e outros portais automotivos. A publicação é automática e você pode gerenciar tudo em um único painel centralizado.",
  },
  {
    q: "Existe um período de teste gratuito?",
    a: "Sim! Oferecemos 7 dias gratuitos para você testar todas as funcionalidades da plataforma sem compromisso. Não é necessário cartão de crédito para começar.",
  },
  {
    q: "Posso cancelar minha assinatura a qualquer momento?",
    a: "Claro. Não há contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento diretamente pela plataforma, sem burocracia ou taxas adicionais.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Dúvidas Frequentes</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre a plataforma CarPost.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-card-hover"
                >
                  <AccordionTrigger className="text-left font-semibold font-heading text-foreground hover:text-primary transition-colors py-5 text-base [&[data-state=open]]:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
