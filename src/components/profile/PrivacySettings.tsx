import React, { useState } from 'react';
import { ChevronLeft, MapPin, Globe, Trash2, Shield, Lock, Bell, Check, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { getPrivacyAudit } from '../../services/geminiService';

export function PrivacySettings({ onBack }: { onBack: () => void }) {
  const { user, updateProfile, setUser } = useUser();
  const [saved, setSaved] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const toggle = (key: 'location' | 'publicProfile') => {
    const current = user?.privacySettings || { location: true, publicProfile: false };
    updateProfile({
      privacySettings: {
        ...current,
        [key]: !current[key]
      }
    });
    showSaved();
    // Reset audit if settings change
    setAuditResult(null);
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const runAudit = async () => {
    setIsAuditing(true);
    try {
      const result = await getPrivacyAudit(user?.privacySettings || { location: true, publicProfile: false });
      setAuditResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuditing(false);
    }
  };

  const menuItems = [
    { 
      key: 'location', 
      icon: MapPin, 
      title: 'Compartir Ubicación', 
      desc: 'Historial de paseos y rastreo en tiempo real.',
      color: 'text-primary'
    },
    { 
      key: 'publicProfile', 
      icon: Globe, 
      title: 'Perfil Público', 
      desc: 'Hacer visible el progreso de tu mascota.',
      color: 'text-secondary' 
    }
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 pb-10"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          title="Volver"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-on-surface" />
        </button>
        <h2 className="text-2xl font-black font-headline tracking-tight">Privacidad</h2>
      </div>

      {/* Trust Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Shield className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-on-surface">Protección Extrema</p>
          <p className="text-[10px] uppercase font-black text-primary tracking-widest opacity-70">Datos Encriptados</p>
        </div>
      </div>

      {/* Gemini AI Audit */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] p-6 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Sparkles className="w-20 h-20 text-primary rotate-12" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-extrabold text-sm text-on-surface uppercase tracking-wider">Auditoría Gemini AI</h3>
          </div>
          
          <AnimatePresence mode="wait">
            {!auditResult ? (
              <motion.div 
                key="audit-cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  Analiza tus ajustes actuales con inteligencia artificial para recibir recomendaciones de seguridad personalizadas.
                </p>
                <button 
                  onClick={runAudit}
                  disabled={isAuditing}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {isAuditing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Ejecutar Auditoría
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="audit-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/5 rounded-2xl p-4 border border-primary/10"
              >
                <p className="text-xs text-on-surface font-bold leading-relaxed italic">
                  "{auditResult}"
                </p>
                <button 
                  onClick={() => setAuditResult(null)}
                  className="mt-3 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                >
                  Volver a analizar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-2 mb-2">Visibilidad</p>
        <div className="bg-surface-container-lowest rounded-[2.5rem] p-2 border border-outline-variant/10 shadow-sm space-y-1">
          {menuItems.map((item, i) => (
            <div key={item.key}>
              <div className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors rounded-[2rem]">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-on-surface">{item.title}</p>
                    <p className="text-[11px] text-on-surface-variant leading-tight max-w-[150px]">{item.desc}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggle(item.key as any)}
                  title={`Alternar ${item.title}`}
                  className={`w-12 h-7 rounded-full transition-all relative flex items-center px-1 ${user?.privacySettings?.[item.key] ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <motion.div 
                    animate={{ x: user?.privacySettings?.[item.key] ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
              {i < menuItems.length - 1 && <div className="h-px bg-outline-variant/5 mx-6" />}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-outline-variant/10">
        <h4 className="font-black text-error uppercase text-xs tracking-widest ml-2 mb-4">Zona Crítica</h4>
        <button 
          onClick={() => {
            if (window.confirm("¿Seguro que deseas eliminar tus datos? Esta acción te desconectará.")) {
              localStorage.clear();
              setUser(null);
              window.location.reload();
            }
          }}
          className="w-full bg-error/5 border border-error/10 text-error font-bold py-5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-error/10 transition-colors active:scale-95 group"
        >
          <Trash2 className="w-5 h-5 group-hover:shake" />
          ELIMINAR DATOS LOCALES
        </button>
      </div>

      {/* Toast for saving */}
      <AnimatePresence>
        {saved && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-[100]"
          >
            <Check className="w-4 h-4 text-primary-fixed" />
            <span className="text-sm font-bold">Configuración guardada</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
