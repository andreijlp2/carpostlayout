import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VideoSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-primary">Veja na prática</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Conheça o sistema e coloque sua loja no futuro!
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Veja como o CarPost pode transformar a gestão da sua loja de veículos.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-hero"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <AspectRatio ratio={16 / 9}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YAFUyPp_238"
              title="Conheça o CarPost"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
