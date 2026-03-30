import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PawPrint, Apple, ArrowRight, Camera, User, Mail, Lock } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Login({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { updateProfile } = useUser();
  const { t, lang, setLang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    petPhoto: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, petPhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, photoURL } = result.user;
      updateProfile({ displayName: displayName || '', photoURL: photoURL || '' });
      onLogin();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-in failed');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      if (formData.email === 'usuario' && formData.password === '1111') {
        onLogin();
      } else {
        setError(t('login_error'));
      }
      return;
    }

    if (mode === 'signup') {
      updateProfile({
        displayName: formData.name,
        photoURL: formData.petPhoto
      });
      onLogin();
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-on-surface min-h-screen flex items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(80,99,82,0.12)] border border-white/40">
        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <section className="hidden lg:flex flex-col justify-between p-12 bg-[#F2F4F2] relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <PawPrint className="text-white w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-primary">Dogs Feels</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-black text-on-surface leading-[1.05] tracking-tight">
                {mode === 'login' ? (
                  lang === 'es' ? (
                    <>Tu perro, <br/><span className="text-primary italic">su bienestar,</span> <br/>nuestra prioridad.</>
                  ) : (
                    <>Your dog, <br/><span className="text-primary italic">their wellbeing,</span> <br/>our priority.</>
                  )
                ) : (
                  lang === 'es' ? (
                    <>Comienza <br/><span className="text-primary italic">el viaje</span> <br/>con tu mejor amigo.</>
                  ) : (
                    <>Start <br/><span className="text-primary italic">the journey</span> <br/>with your best friend.</>
                  )
                )}
              </h1>
              <p className="text-on-surface-variant text-lg max-w-sm leading-relaxed font-medium">
                {mode === 'login' ? t('login_p_login') : t('login_p_signup')}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <img
              src={mode === 'login'
                ? "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800"
                : "/images/razasperro-30.jpeg"}
              alt="Dog Branding"
              className="w-full h-72 rounded-2xl object-cover shadow-2xl border-4 border-white"
            />
          </div>
        </section>

        {/* Right Side: Interaction/Forms */}
        <section className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Language toggle */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center bg-[#F2F4F2] rounded-full overflow-hidden border border-outline-variant/20 text-[11px] font-black uppercase tracking-widest">
                <button
                  onClick={() => setLang('es')}
                  className={`px-3 py-1.5 transition-colors ${lang === 'es' ? 'bg-primary text-white rounded-full' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-primary text-white rounded-full' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  EN
                </button>
              </div>
            </div>

            <header className="mb-8 text-center">
              <div className="lg:hidden flex justify-center mb-6">
                <PawPrint className="text-primary w-10 h-10 fill-current" />
              </div>
              <h2 className="text-3xl font-black text-on-surface mb-2 tracking-tight">
                {mode === 'login' ? t('login_h_login') : t('login_h_signup')}
              </h2>
              <p className="text-on-surface-variant font-medium">
                {mode === 'login' ? t('login_sub_login') : t('login_sub_signup')}
              </p>
            </header>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    {error}
                  </motion.div>
                )}

                {mode === 'signup' && (
                  <div className="flex flex-col items-center mb-6">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                      className="group relative w-24 h-24 bg-[#F2F4F2] rounded-3xl flex items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary transition-all overflow-hidden cursor-pointer"
                    >
                      {formData.petPhoto ? (
                        <img src={formData.petPhoto} alt="Pet" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-outline group-hover:text-primary">
                          <Camera className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-center px-2 whitespace-pre-line">{t('login_photo_label')}</span>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        aria-label={t('login_photo_label')}
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-bold text-outline uppercase tracking-widest">{t('login_optional')}</p>
                  </div>
                )}

                {mode === 'signup' && (
                  <div>
                    <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1">{t('login_name_label')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t('login_name_placeholder')}
                        className="w-full bg-[#F2F4F2] border-transparent focus:border-primary/20 focus:ring-0 rounded-2xl px-12 py-4 text-on-surface font-medium placeholder:text-outline/50 transition-all"
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1">{t('login_email_label')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="usuario"
                      className="w-full bg-[#F2F4F2] border-transparent focus:border-primary/20 focus:ring-0 rounded-2xl px-12 py-4 text-on-surface font-medium placeholder:text-outline/50 transition-all"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1">{t('login_password_label')}</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••"
                      className="w-full bg-[#F2F4F2] border-transparent focus:border-primary/20 focus:ring-0 rounded-2xl px-12 py-4 text-on-surface font-medium placeholder:text-outline/50 transition-all"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-3 group"
                >
                  {mode === 'login' ? t('login_btn_login') : t('login_btn_signup')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.form>
            </AnimatePresence>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/10"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-4 bg-white text-outline font-black uppercase tracking-widest">{t('login_or')}</span></div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-[#F2F4F2] hover:bg-surface-container-low transition-colors rounded-2xl border border-outline-variant/5">
                <Apple className="w-5 h-5 fill-current" />
                <span className="text-sm font-bold">Apple</span>
              </button>
              <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 py-4 bg-[#F2F4F2] hover:bg-surface-container-low transition-colors rounded-2xl border border-outline-variant/5 active:scale-95">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span className="text-sm font-bold">Google</span>
              </button>
            </div>

            <footer className="mt-12 text-center">
              <p className="text-on-surface-variant font-bold text-sm">
                {mode === 'login' ? t('login_no_account') : t('login_have_account')}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-primary ml-2 hover:underline decoration-2 underline-offset-4"
                >
                  {mode === 'login' ? t('login_create') : t('login_signin')}
                </button>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
