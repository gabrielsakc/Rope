import React, { useState } from 'react';
import { ArrowRight, Dog, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

export function SetupProfile({ onComplete }: { onComplete: () => void }) {
  const { user, updateProfile } = useUser();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    petName: user?.petName || '',
    petBreed: user?.petBreed || '',
    petAge: user?.petAge || '',
    photoURL: user?.photoURL || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoURL: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName: formData.displayName,
      petName: formData.petName,
      petBreed: formData.petBreed,
      petAge: Number(formData.petAge),
      photoURL: formData.photoURL
    });
    onComplete();
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl p-8"
      >
        <div className="flex justify-center mb-6">
          <label className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer border-2 border-dashed border-primary/30 hover:bg-primary/20 transition-all overflow-hidden">
            {formData.photoURL ? (
              <img src={formData.photoURL} alt="Pet" className="w-full h-full object-cover" />
            ) : (
              <Dog className="w-10 h-10" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t('setup_title')}</h2>
          <p className="text-on-surface-variant text-sm">{t('setup_subtitle')}</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase border-b border-outline-variant/20 pb-2">{t('setup_your_data')}</h3>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">{t('your_name')}</label>
              <div className="relative">
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder={t('login_name_placeholder')}
                  required
                  className="w-full bg-surface-container-low border-transparent focus:border-primary/20 focus:ring-0 rounded-xl px-10 py-3 text-on-surface placeholder:text-outline transition-all"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-secondary uppercase border-b border-outline-variant/20 pb-2">{t('setup_dog_data')}</h3>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">{t('dog_name')}</label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                placeholder={t('pet_name_placeholder')}
                required
                className="w-full bg-surface-container-low border-transparent focus:border-primary/20 focus:ring-0 rounded-xl px-4 py-3 text-on-surface placeholder:text-outline transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">{t('breed')}</label>
                <input
                  type="text"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleChange}
                  placeholder={t('breed_placeholder')}
                  className="w-full bg-surface-container-low border-transparent focus:border-primary/20 focus:ring-0 rounded-xl px-4 py-3 text-on-surface placeholder:text-outline transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">{t('age')} ({t('age_placeholder')})</label>
                <input
                  type="number"
                  name="petAge"
                  value={formData.petAge}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full bg-surface-container-low border-transparent focus:border-primary/20 focus:ring-0 rounded-xl px-4 py-3 text-on-surface placeholder:text-outline transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            {t('setup_start_btn')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
