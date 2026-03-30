import React, { useState } from 'react';
import { ChevronLeft, Mail, Phone, Lock, Save } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function AccountSettings({ onBack }: { onBack: () => void }) {
  const { user, updateProfile } = useUser();
  const { t } = useLanguage();
  const [email] = useState(user?.email || 'usuario@ejemplo.com');
  const [phone, setPhone] = useState(user?.phone || '+34 600 000 000');

  const handleSave = () => {
    updateProfile({ phone });
    onBack();
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-on-surface" />
        </button>
        <h2 className="text-2xl font-extrabold font-headline">{t('account_settings')}</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant uppercase ml-1">{t('acc_email_label')}</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 text-on-surface-variant font-medium opacity-70 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-on-surface-variant ml-1">{t('acc_email_note')}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant uppercase ml-1">{t('acc_phone_label')}</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 focus:border-primary rounded-2xl py-4 pl-12 pr-4 text-on-surface font-medium outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <button className="w-full bg-surface-container-high flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-highest transition-colors active:scale-95">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-on-surface">{t('acc_change_password')}</span>
            </div>
            <ChevronLeft className="w-5 h-5 text-on-surface-variant rotate-180" />
          </button>
        </div>

        <div className="pt-8">
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors active:scale-95 shadow-lg shadow-primary/20"
          >
            <Save className="w-5 h-5" />
            {t('acc_save_changes')}
          </button>
        </div>
      </div>
    </div>
  );
}
