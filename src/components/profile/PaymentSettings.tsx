import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Plus, CheckCircle2, Trash2, ShieldCheck } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { PaymentMethod } from '../../types';

export function PaymentSettings({ onBack }: { onBack: () => void }) {
  const { user, updateProfile } = useUser();
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: 'VISA' as const,
    last4: '',
    expiry: '12/28',
    holder: user?.displayName || ''
  });

  const cards = user?.paymentMethods || [
    {
      id: 'default-1',
      type: 'VISA',
      last4: '4242',
      expiry: '12/28',
      holder: user?.displayName?.toUpperCase() || 'GABRIEL V.',
      isDefault: true
    }
  ];

  const handleAddCard = () => {
    if (newCard.last4.length !== 4) {
      alert(t('pay_last4_placeholder'));
      return;
    }

    const method: PaymentMethod = {
      id: Math.random().toString(36).substr(2, 9),
      ...newCard,
      isDefault: false
    };

    const updatedMethods = [...(user?.paymentMethods || []), method];
    updateProfile({ paymentMethods: updatedMethods });
    setShowAddForm(false);
  };

  const removeCard = (id: string) => {
    const updated = cards.filter(c => c.id !== id);
    updateProfile({ paymentMethods: updated });
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-on-surface" />
        </button>
        <h2 className="text-2xl font-black font-headline tracking-tight">{t('pay_title')}</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="font-black text-on-surface-variant uppercase text-[10px] tracking-[0.2em]">{t('pay_cards')}</h4>
          <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">{t('pay_secure_badge')}</span>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-container p-7 shadow-xl shadow-primary/20 text-white min-h-[200px] flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <CreditCard className="w-40 h-40 -rotate-12 translate-x-12 -translate-y-12" />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
                    <span className="font-black text-sm italic tracking-tighter">{card.type}</span>
                  </div>
                  {card.isDefault && <CheckCircle2 className="w-6 h-6 text-white" />}
                  {!card.isDefault && (
                    <button
                      onClick={() => removeCard(card.id)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white/70" />
                    </button>
                  )}
                </div>

                <div className="relative z-10 space-y-6">
                  <p className="font-mono text-2xl tracking-[0.3em] font-medium drop-shadow-md">
                    •••• •••• •••• {card.last4}
                  </p>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-1">{t('pay_holder')}</p>
                      <p className="font-bold tracking-wide uppercase text-sm">{card.holder}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-1 text-right">{t('pay_expires')}</p>
                      <p className="font-bold tracking-wide text-sm">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAddForm ? (
          <button
            className="w-full bg-surface-container-lowest border-2 border-dashed border-primary/30 text-primary font-black py-6 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary transition-all active:scale-95 group"
            onClick={() => setShowAddForm(true)}
          >
            <div className="bg-primary/10 p-4 rounded-full group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest">{t('pay_add_card')}</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-[2.5rem] p-6 border-2 border-primary/20 shadow-lg space-y-4"
          >
            <h3 className="font-black text-on-surface uppercase text-xs tracking-widest ml-2">{t('pay_new_card_title')}</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="bg-surface-container-low p-4 rounded-2xl font-bold text-sm outline-none"
                  value={newCard.type}
                  onChange={(e) => setNewCard({...newCard, type: e.target.value as any})}
                >
                  <option value="VISA">VISA</option>
                  <option value="MASTERCARD">MASTERCARD</option>
                </select>
                <input
                  type="text"
                  maxLength={4}
                  placeholder={t('pay_last4_placeholder')}
                  className="bg-surface-container-low p-4 rounded-2xl font-bold text-sm outline-none"
                  value={newCard.last4}
                  onChange={(e) => setNewCard({...newCard, last4: e.target.value.replace(/\D/g, '')})}
                />
              </div>
              <input
                type="text"
                placeholder={t('pay_holder_name_placeholder')}
                className="w-full bg-surface-container-low p-4 rounded-2xl font-bold text-sm outline-none"
                value={newCard.holder}
                onChange={(e) => setNewCard({...newCard, holder: e.target.value})}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-4 bg-surface-container-high text-on-surface font-bold rounded-2xl text-sm"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleAddCard}
                className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl text-sm shadow-lg shadow-primary/20"
              >
                {t('pay_confirm')}
              </button>
            </div>
          </motion.div>
        )}

        <div className="bg-surface-container-low rounded-[2rem] p-5 flex items-center gap-4 border border-outline-variant/10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-[11px] text-on-surface-variant font-medium leading-tight">
            {t('pay_security_note')} <span className="text-primary font-bold">{t('pay_learn_more')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
