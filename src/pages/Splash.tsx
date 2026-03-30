import { motion } from 'motion/react';
import { PawPrint } from 'lucide-react';
const dogAvatar = '/images/razasperro-30.jpeg';

export function Splash({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative cursor-pointer"
      onClick={onComplete}
    >
      {/* Full Screen Photographic Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          className="w-full h-full object-cover" 
          src={dogAvatar} 
          alt="Dogs"
        />
        {/* Subtle Dark Overlay for Brand Contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      </motion.div>

      {/* Floating Brand Section */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-md px-12 text-center text-white">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center mb-4">
            <motion.div 
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="bg-white/20 backdrop-blur-xl p-4 rounded-3xl border border-white/30 shadow-2xl"
            >
              <PawPrint className="text-white w-10 h-10 fill-current" />
            </motion.div>
          </div>
          
          <h1 className="text-7xl font-black tracking-tighter font-headline drop-shadow-2xl">
            Dogs Feels
          </h1>
          <p className="text-xl font-bold tracking-tight opacity-90 drop-shadow-md">
            Entiende lo que tu <br/> mejor amigo siente.
          </p>
        </motion.div>

        {/* Loading Progress at the bottom */}
        <div className="absolute bottom-24 left-12 right-12 space-y-4">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: "easeInOut" }}
              onAnimationComplete={onComplete}
              className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 animate-pulse">
            Iniciando Experiencia
          </p>
        </div>
      </main>

      <footer className="fixed bottom-8 w-full text-center z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">
          Powered by Science & Soul
        </span>
      </footer>
    </motion.div>
  );
}
