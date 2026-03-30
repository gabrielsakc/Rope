import React, { useState } from 'react';
import { ChevronLeft, BellRing, HeartPulse, Sparkles, Megaphone } from 'lucide-react';

import { useUser } from '../../contexts/UserContext';

export function NotificationSettings({ onBack }: { onBack: () => void }) {
  const { user, updateProfile } = useUser();
  const [settings, setSettings] = useState(user?.notificationPreferences || {
    push: true,
    health: true,
    activity: false,
    promos: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    updateProfile({ notificationPreferences: settings });
    onBack();
  };

  const ToggleSwitch = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${active ? 'bg-primary' : 'bg-surface-container-highest'}`}
    >
      <div 
      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${active ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  );

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-on-surface" />
        </button>
        <h2 className="text-2xl font-extrabold font-headline">Notificaciones</h2>
      </div>

      <div className="space-y-4 pb-8">
        <div className="bg-surface-container-lowest border-2 border-outline-variant/20 rounded-3xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BellRing className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-lg">Notificaciones Push</h3>
              <p className="text-sm text-on-surface-variant mt-0.5">Permitir envíos al dispositivo</p>
            </div>
          </div>
          <ToggleSwitch active={settings.push} onClick={() => toggle('push')} />
        </div>

        <div className={`transition-opacity duration-300 ${!settings.push ? 'opacity-50 pointer-events-none' : ''}`}>
          <h4 className="font-bold text-on-surface-variant uppercase text-xs tracking-wider ml-4 mb-3 mt-6">Preferencias</h4>
          
          <div className="space-y-3">
            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-error/10 p-2.5 rounded-full">
                  <HeartPulse className="w-5 h-5 text-error" />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Alertas de Salud</h3>
                  <p className="text-sm text-on-surface-variant">Avisos urgentes sobre bienestar</p>
                </div>
              </div>
              <ToggleSwitch active={settings.health} onClick={() => toggle('health')} />
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-2.5 rounded-full">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Actividad y Paseos</h3>
                  <p className="text-sm text-on-surface-variant">Resúmenes diarios y metas</p>
                </div>
              </div>
              <ToggleSwitch active={settings.activity} onClick={() => toggle('activity')} />
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-tertiary/10 p-2.5 rounded-full">
                  <Megaphone className="w-5 h-5 text-tertiary" />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Correos Promocionales</h3>
                  <p className="text-sm text-on-surface-variant">Ofertas especiales y novedades</p>
                </div>
              </div>
              <ToggleSwitch active={settings.promos} onClick={() => toggle('promos')} />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button 
            onClick={handleSave}
            className="w-full bg-primary text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors active:scale-95 shadow-lg shadow-primary/20"
          >
            Guardar Preferencias
          </button>
        </div>
      </div>
    </div>
  );
}
