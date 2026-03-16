import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VideoSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Conheça o sistema e coloque sua loja no futuro!
          </h2>
          <p className="text-muted-foreground text-lg">
            Veja como o CarPost pode transformar a gestão da sua loja de veículos.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-hero border border-border"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
