import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Shield, CreditCard, LogOut, ChevronRight, Camera, Edit2, Check, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Header } from '../components/Header';
const dogAvatar = '/images/razasperro-30.jpeg';
import { AccountSettings } from '../components/profile/AccountSettings';
import { NotificationSettings } from '../components/profile/NotificationSettings';
import { PrivacySettings } from '../components/profile/PrivacySettings';
import { PaymentSettings } from '../components/profile/PaymentSettings';

export function Profile() {
  const { user, updateProfile, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'main' | 'account' | 'notifications' | 'privacy' | 'payment'>('main');
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    petName: user?.petName || '',
    petBreed: user?.petBreed || '',
    petAge: user?.petAge?.toString() || '',
    photoURL: user?.photoURL || ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setFormData(prev => ({ ...prev, photoURL: url }));
        updateProfile({ photoURL: url });
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: 'account', icon: Settings, label: 'Configuración de Cuenta', color: 'text-primary' },
    { id: 'notifications', icon: Bell, label: 'Notificaciones', color: 'text-secondary' },
    { id: 'privacy', icon: Shield, label: 'Privacidad y Seguridad', color: 'text-tertiary' },
    { id: 'payment', icon: CreditCard, label: 'Métodos de Pago', color: 'text-primary' },
  ] as const;

  const handleSave = () => {
    updateProfile({
      displayName: formData.displayName,
      petName: formData.petName,
      petBreed: formData.petBreed,
      petAge: Number(formData.petAge),
      photoURL: formData.photoURL
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  const defaultPhoto = dogAvatar;

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <Header 
        petName={isEditing ? formData.petName : (user?.petName || "Tu Mascota")} 
        petPhoto={isEditing ? formData.photoURL : (user?.photoURL || defaultPhoto)} 
      />
      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-10">
        {activeSection === 'main' ? (
          <>
            <motion.section 
          layout
          className="flex flex-col items-center text-center space-y-6 relative"
        >
          <div className="relative group">
            <motion.label 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/20 p-1 overflow-hidden relative cursor-pointer block hover:ring-4 hover:ring-primary/30 transition-all shadow-lg"
            >
              <img 
                src={isEditing ? (formData.photoURL || defaultPhoto) : (user?.photoURL || defaultPhoto)} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoUpload} 
              />
            </motion.label>
          </div>

          {!isEditing ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  {user?.displayName || 'Dueño'} & {user?.petName || 'Tu Mascota'}
                </h2>
                <p className="text-on-surface-variant font-medium text-lg leading-none">
                  {user?.petBreed ? `${user.petBreed} • ` : ''}{user?.petAge ? `${user.petAge} años` : 'Configuración pendiente'}
                </p>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold rounded-full transition-all active:scale-95 border border-outline-variant/20 shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full space-y-5 max-w-sm text-left bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xl"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Tu Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Escribe tu nombre"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    className="w-full mt-1.5 bg-surface-container-low border-2 border-transparent focus:border-primary/30 rounded-2xl px-5 py-3.5 text-on-surface font-bold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Nombre del Perro</label>
                  <input 
                    type="text" 
                    placeholder="Nombre de tu mascota"
                    value={formData.petName}
                    onChange={(e) => setFormData({...formData, petName: e.target.value})}
                    className="w-full mt-1.5 bg-surface-container-low border-2 border-transparent focus:border-primary/30 rounded-2xl px-5 py-3.5 text-on-surface font-bold outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Raza</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Golden"
                      value={formData.petBreed}
                      onChange={(e) => setFormData({...formData, petBreed: e.target.value})}
                      className="w-full mt-1.5 bg-surface-container-low border-2 border-transparent focus:border-primary/30 rounded-2xl px-5 py-3.5 text-on-surface font-bold outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Edad</label>
                    <input 
                      type="number" 
                      placeholder="Años"
                      value={formData.petAge}
                      onChange={(e) => setFormData({...formData, petAge: e.target.value})}
                      className="w-full mt-1.5 bg-surface-container-low border-2 border-transparent focus:border-primary/30 rounded-2xl px-5 py-3.5 text-on-surface font-bold outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-4 bg-surface-container-high text-on-surface font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
                >
                  <X className="w-5 h-5" /> Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                  <Check className="w-5 h-5" /> Guardar
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {!isEditing && (
          <>
            <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
              {menuItems.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-on-surface">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-on-surface-variant" />
                </button>
              ))}
            </section>

            <section className="space-y-4">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-5 bg-error/10 text-error rounded-full font-bold text-lg active:scale-95 transition-transform">
                <LogOut className="w-6 h-6" />
                Cerrar Sesión
              </button>
              <p className="text-center text-xs font-bold text-on-surface-variant uppercase tracking-widest">Versión 1.0.0 (Beta)</p>
            </section>
          </>
        )}
        </>
      ) : (
          <div className="pt-2">
            {activeSection === 'account' && <AccountSettings onBack={() => setActiveSection('main')} />}
            {activeSection === 'notifications' && <NotificationSettings onBack={() => setActiveSection('main')} />}
            {activeSection === 'privacy' && <PrivacySettings onBack={() => setActiveSection('main')} />}
            {activeSection === 'payment' && <PaymentSettings onBack={() => setActiveSection('main')} />}
          </div>
        )}
      </main>
    </div>
  );
}

