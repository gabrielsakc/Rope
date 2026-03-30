import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HeartPulse, Lightbulb, Thermometer, Volume2, Sun, ArrowRight, ShieldCheck, MapPin, ChevronRight, ShoppingBag, Star, Camera, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { getWellnessTip } from '../services/geminiService';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
const dogAvatar = '/images/razasperro-30.jpeg';

export function Home() {
  const { user, updateProfile } = useUser();
  const navigate = useNavigate();
  const [tip, setTip] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ photoURL: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic values or fallbacks
  const petName = user?.petName || 'Tu Mascota';
  const petAge = user?.petAge || 3;
  const petBreed = user?.petBreed || 'Golden Retriever';

  const petInfo = { name: petName, breed: petBreed, age: petAge };
  const metrics = { bpm: 72, steps: 4250, sleep: 8.5, stress: 'Bajo', temp: 38.2 };

  useEffect(() => {
    async function fetchTip() {
      const result = await getWellnessTip(petInfo, metrics);
      setTip(result || '');
      setLoading(false);
    }
    fetchTip();
  }, [petInfo.name, petInfo.breed, petInfo.age]);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed min-h-screen pb-32">
      <Header />
      
      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-12">
        {/* Hero Mood Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col items-center text-center space-y-6"
        >
          <div className="absolute inset-0 -z-10 aura-gradient opacity-60 scale-150 blur-3xl"></div>
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-primary-fixed/30 rounded-full"
            ></motion.div>
            <div className="absolute inset-4 bg-primary-fixed/40 rounded-full blur-xl"></div>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="group relative z-10 w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-surface shadow-2xl overflow-hidden cursor-pointer"
            >
              <img 
                src={user?.photoURL || dogAvatar} 
                alt={`${petName} Actual Mood`} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full shadow-lg">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
              </div>
            </button>
            
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              aria-label="Subir foto de tu mascota"
              className="hidden" 
              onChange={handlePhotoUpload} 
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Estado en Realidad Aumentada</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">Calma Profunda</h2>
            <p className="text-on-surface-variant max-w-xs mx-auto text-lg leading-relaxed">
              {petName} se siente seguro y relajado en su entorno actual.
            </p>
          </div>
        </motion.section>

        {/* Dashboard Unified: Health & Mood */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Salud y Ánimo</h3>
            <button onClick={() => navigate('/health')} className="text-primary text-sm font-bold flex items-center gap-1 group">
              Ver Todo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/health')}
              className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col justify-between space-y-4 border border-outline-variant/30 shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center">
                  <HeartPulse className="text-secondary w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold tracking-tight text-on-surface">{metrics.bpm}</p>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">BPM</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full w-max uppercase tracking-wide">Ritmo Estable</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/health')}
              className="bg-surface-container-low rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-transparent hover:border-primary/20 cursor-pointer transition-all shadow-sm"
            >
              <h3 className="font-bold text-lg leading-tight mb-2">Flujo Emocional</h3>
              <div className="h-16 w-full flex items-end">
                <svg className="w-full h-full text-primary-container" viewBox="0 0 200 60">
                  <path className="wave-path" d="M0 45 C20 45, 30 15, 50 15 S80 45, 100 45 S130 15, 150 15 S180 45, 200 45" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                  <path d="M0 45 C20 45, 30 15, 50 15 S80 45, 100 45 S130 15, 150 15 S180 45, 200 45 V60 H0 Z" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Health Insights Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 opacity-100 rounded-[2.5rem] shadow-xl shadow-primary/20 transition-all duration-500 group-hover:scale-[1.02]"></div>
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 p-8 text-on-primary">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary fill-current" />
              </div>
              <h2 className="text-xs font-black text-white/90 uppercase tracking-[0.25em]">Sugerencia AI de {petName}</h2>
            </div>
            
            {loading ? (
              <div className="space-y-3">
                <div className="h-5 bg-white/10 rounded-full w-full animate-shimmer" />
                <div className="h-5 bg-white/10 rounded-full w-3/4 animate-shimmer" />
              </div>
            ) : (
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-white">
                "{tip}"
              </p>
            )}
            
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-primary bg-white/10 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-surface-container-high" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">+12 dueños de {petBreed}s</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-tight">En Tiempo Real</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Dashboard Unified: Location & Tracking */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Ubicación Segura</h3>
            <button onClick={() => navigate('/tracking')} className="text-primary text-sm font-bold flex items-center gap-1 group">
              Abrir Mapa <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <motion.div 
            whileHover={{ backgroundColor: 'rgb(var(--color-primary) / 0.08)' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/tracking')}
            className="bg-primary/5 border-2 border-primary/10 p-5 rounded-3xl flex items-center justify-between cursor-pointer transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-on-surface text-lg">Zona Segura Activa</h3>
                <p className="text-sm text-on-surface-variant font-medium">Protegido en perímetro de Casa</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
            </div>
          </motion.div>
        </section>

        {/* Dashboard Unified: Store Highlights */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Recomendados para {petName}</h3>
            <button onClick={() => navigate('/store')} className="text-primary text-sm font-bold">Ver Tienda</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-1">
            {/* Recommended Items */}
            {[
              { id: 2, name: 'Snacks Relajantes', price: '$24.50', category: 'Alimentación', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZQuQYDEuy85PtAPSTHQPOs-k8O7MgDVUhBJLdtm8jGtOx1XE-kx93FeceTSwIpMW8iixWRNGK80LeHLl--vMq_cKFmHlwSOsg73TkJ2Bz9wRIS0LkZQM3DeRWmZW1Ig1IVCg9js2YS_zsC_13PZPeAhKuL-tVy5iUIVi54IK94gP0yTFBLS6NJkniJ4zBv4-h0L2mqZDsaOMCvcEJ-zdQ3mmXLxf70HxymdaRXHbCZZiw6bYtzuF5Qq4PnxLdfvO_u1wVuSdmLQg' },
              { id: 3, name: 'Cama Ortopédica', price: '$89.00', category: 'Descanso', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ZneBAgB5lVfAZav7oJ4HpyQCiJIiJZHPBvwhAePWiHqj0vD9gG9kIPskIX27tPL8dlav-GkBGO7RSYS3cQBj5VjotnBKhmiSQ6yCdztjaPdtUHaP8lmRrDbt2Q9sznV0dNhKb332BQzEWWvz35cCGVWbjnJKeuUPrPNmtP6O9mz0utCQbrvUJrYnc1CCEUkuQK_rhEqFBnktc96pERP6iQcSHo1vV9EZ2UytvQHh3jizfKr_YfCanqNMRzngQhuhOGli_C0BwGk' }
            ].map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/store')}
                className="min-w-[180px] md:min-w-[220px] bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/20 p-5 shrink-0 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="w-full aspect-square bg-surface-container-low rounded-2xl p-3 mb-4 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{p.category}</span>
                <h4 className="font-bold mt-1 text-on-surface leading-tight truncate">{p.name}</h4>
                <p className="font-black text-primary mt-2">{p.price}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Secondary Insights */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight px-2">Factores de Entorno</h3>
          <div className="flex flex-wrap gap-3 px-2">
            {[
              { icon: Thermometer, label: '22°C Óptimo' },
              { icon: Volume2, label: 'Ruido Bajo' },
              { icon: Sun, label: 'Luz Suave' }
            ].map((factor, i) => (
              <div key={i} className="bg-surface-container-high/50 backdrop-blur-sm border border-outline-variant/10 px-5 py-3 rounded-2xl flex items-center gap-3">
                <factor.icon className="text-primary w-5 h-5" />
                <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">{factor.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

