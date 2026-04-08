import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api-config";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState("YAFUyPp_238");

  useEffect(() => {
    fetchVideoId();
  }, []);

  const fetchVideoId = async () => {
    try {
      const response = await fetch(`${API_URL}/settings`);
      if (response.ok) {
        const data = await response.json();
        if (data.youtube_video_id) {
          setVideoId(data.youtube_video_id);
        }
      }
    } catch (error) {
      console.log("Usando vídeo padrão");
    }
  };

  return (
    <section id="demonstracao" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(240,90%,14%)] via-[hsl(250,80%,18%)] to-[hsl(215,100%,20%)]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-400/15 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 -z-10 opacity-10" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Veja em Ação
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white mb-4 leading-tight">
            Conheça o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Sistema CarPost
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Veja como o CarPost transforma a gestão e o marketing da sua loja de veículos em minutos.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto group"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 via-blue-400/30 to-cyan-400/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-[#1a1a2e] border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="flex-1 mx-4 bg-white/5 rounded-md px-3 py-1 text-center">
                <span className="text-[11px] text-white/30 font-mono">CarPost — Demonstração do Sistema</span>
              </div>
            </div>

            <AspectRatio ratio={16 / 9}>
              {!playing ? (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0f0f1e] to-[#1a1a3e] cursor-pointer"
                  onClick={() => setPlaying(true)}
                >
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(135deg, hsl(250,85%,30%) 0%, hsl(215,100%,30%) 100%)"
                  }} />

                  <motion.div
                    className="relative z-10 flex flex-col items-center gap-5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/10"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                      />
                      <div className="relative w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-xl">
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    <span className="text-white/70 text-sm font-semibold tracking-wide">Assistir demonstração</span>
                  </motion.div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Conheça o CarPost"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </AspectRatio>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
