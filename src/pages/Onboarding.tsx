import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Activity, Bluetooth, ShieldCheck, Heart, Brain } from 'lucide-react';
import { cn } from '../lib/utils';

const slides = [
  {
    id: 1,
    tag: 'Próxima Generación',
    title: 'Tecnología que conecta',
    description: 'Tu perro ahora tiene voz. Nuestro arnés inteligente interpreta cada latido y movimiento para que entiendas lo que siente.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcHzCT7RKcvhrWrCn1PcU4RRXuOwjHKGuUtfNZOeZ3AmtmVBukIYL-xRN8Cz4Lmg_p-mCu_XiSYbsQe4CdSs84qtBvYv01BUNu8gsySBmfwGCU3Ca60vh2ZzcpCtXkoR3o4FYaR1hhVJnkSQI5k7O34_T7TK19e4izC--u-Hli-nInA-rbIRzMGgyzb9ykS-HZzINava_ebwiBd07rGPeU63YshEQn7-2RDqcwbO0W3YEythMtTAKzojZoY6ZYMf9C44RTN8uFfoE',
    features: [
      { icon: Activity, label: 'Biometría Real' },
      { icon: Bluetooth, label: 'Sync Instantánea' }
    ],
    accent: 'primary'
  },
  {
    id: 2,
    tag: 'IA Avanzada',
    title: 'Entiende sus emociones',
    description: 'Detectamos alegría, estrés o calma en tiempo real mediante IA avanzada.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZQuQYDEuy85PtAPSTHQPOs-k8O7MgDVUhBJLdtm8jGtOx1XE-kx93FeceTSwIpMW8iixWRNGK80LeHLl--vMq_cKFmHlwSOsg73TkJ2Bz9wRIS0LkZQM3DeRWmZW1Ig1IVCg9js2YS_zsC_13PZPeAhKuL-tVy5iUIVi54IK94gP0yTFBLS6NJkniJ4zBv4-h0L2mqZDsaOMCvcEJ-zdQ3mmXLxf70HxymdaRXHbCZZiw6bYtzuF5Qq4PnxLdfvO_u1wVuSdmLQg',
    features: [
      { icon: Heart, label: 'Estado de Ánimo' },
      { icon: Brain, label: 'Análisis IA' }
    ],
    accent: 'secondary'
  },
  {
    id: 3,
    tag: 'Seguridad Total',
    title: 'Understanding every heartbeat',
    description: 'Our intelligent harness tracks biométricos and translates them into emotions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ZneBAgB5lVfAZav7oJ4HpyQCiJIiJZHPBvwhAePWiHqj0vD9gG9kIPskIX27tPL8dlav-GkBGO7RSYS3cQBj5VjotnBKhmiSQ6yCdztjaPdtUHaP8lmRrDbt2Q9sznV0dNhKb332BQzEWWvz35cCGVWbjnJKeuUPrPNmtP6O9mz0utCQbrvUJrYnc1CCEUkuQK_rhEqFBnktc96pERP6iQcSHo1vV9EZ2UytvQHh3jizfKr_YfCanqNMRzngQhuhOGli_C0BwGk',
    features: [
      { icon: ShieldCheck, label: 'Safe & Encrypted' }
    ],
    accent: 'tertiary'
  }
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-grow flex flex-col relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-fixed/30 blur-[100px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary-fixed/20 blur-[80px] -z-10 rounded-full -translate-x-1/2"></div>

        <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 pt-20 pb-12 max-w-7xl mx-auto w-full flex-grow">
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={slide.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-md aspect-square"
              >
                <div className="absolute inset-0 bg-surface-container-low asymmetric-shape animate-pulse"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center scale-110">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-contain drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  {currentSlide === 0 && (
                    <div className="absolute top-1/4 right-0 glass-effect p-4 rounded-xl border border-outline-variant/15 shadow-sm transform translate-x-4 md:translate-x-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">Heart Rate Live</span>
                      </div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-on-surface">72</span>
                        <span className="text-[10px] text-on-surface-variant font-medium">BPM</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start space-y-8 order-2 md:order-1 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div 
                key={slide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4 w-full"
              >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-sm font-semibold tracking-wide uppercase">
                  {slide.tag}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1]">
                  {slide.title.split(' ').map((word, i) => (
                    word.toLowerCase() === 'conecta' || word.toLowerCase() === 'emociones' || word.toLowerCase() === 'heartbeat'
                      ? <span key={i} className="text-primary italic"> {word} </span>
                      : <span key={i}> {word} </span>
                  ))}
                </h1>
                <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-lg mx-auto md:mx-0">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 w-full justify-center md:justify-start">
              {slide.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3 bg-surface-container-low rounded-full">
                  <f.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 w-full md:w-auto">
              <button 
                onClick={nextSlide}
                className="w-full md:w-auto px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {currentSlide === slides.length - 1 ? 'Empezar' : 'Siguiente'}
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        <footer className="px-6 py-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentSlide === i ? "w-8 bg-primary" : "w-2 bg-outline-variant"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={onComplete}
                className="text-on-surface-variant font-medium hover:text-on-surface transition-colors"
              >
                Saltar
              </button>
              <div className="h-4 w-[1px] bg-outline-variant"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-on-surface-variant">Powered by</span>
                <span className="font-extrabold text-primary tracking-tight">Pawsitive</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
