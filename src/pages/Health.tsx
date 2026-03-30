import { Heart, Activity, Moon as Bedtime, Brain as Psychology, Thermometer as Thermostat } from 'lucide-react';
import { Header } from '../components/Header';
import { cn } from '../lib/utils';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Health() {
  const { user } = useUser();
  const { t, lang } = useLanguage();
  const petName = user?.petName || t('your_pet');

  const metrics = [
    { icon: Heart,      value: '72',          unit: 'BPM',      label: t('heart_rate'),    color: 'text-error',     bg: 'bg-error/10' },
    { icon: Activity,   value: '4.5k',        unit: t('steps'), label: t('activity'),      color: 'text-primary',   bg: 'bg-primary/10' },
    { icon: Bedtime,    value: '8.5h',        unit: '',         label: t('sleep_quality'), color: 'text-secondary', bg: 'bg-secondary/10' },
    { icon: Psychology, value: t('low'),      unit: '',         label: t('stress_level'),  color: 'text-tertiary',  bg: 'bg-tertiary/10' },
  ];

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <Header />

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">
              {lang === 'es' ? `Estado de ${petName}` : `${petName} Status`}
            </h1>
            <p className="text-on-surface-variant font-medium">
              {t('optimal_health')} • {user?.petBreed || 'Golden Retriever'} • {user?.petAge || 3} {t('years')}
            </p>
          </div>
          <div className="flex gap-3">
            <span className="bg-surface-container-highest px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">{t('nutrition')}</span>
            <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">{t('live')}</span>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-lg p-5 flex flex-col justify-between h-36">
              <m.icon className={cn("w-6 h-6", m.color)} />
              <div>
                <p className="text-2xl font-extrabold">{m.value} <span className="text-sm font-medium opacity-50">{m.unit}</span></p>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-60">{m.label}</p>
              </div>
            </div>
          ))}

          <div className="col-span-2 bg-surface-container-lowest rounded-lg p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center">
                <Thermostat className="text-secondary w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-60">{t('temperature')}</p>
                <p className="text-xl font-extrabold">38.2°C</p>
              </div>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{t('normal')}</div>
          </div>
        </section>

        <section className="bg-surface-container-low p-8 rounded-lg space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">{t('sleep_quality')}</h2>
            <Bedtime className="text-on-surface-variant w-6 h-6" />
          </div>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[60, 45, 70, 85, 95, 100, 50].map((h, i) => (
              <div
                key={i}
                className={cn(
                  "w-full rounded-t-full",
                  i === 5 ? "bg-primary" : "bg-secondary/40"
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl">
            <div className="text-center">
              <p className="text-2xl font-extrabold">9.2h</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('average')}</p>
            </div>
            <div className="h-8 w-px bg-outline-variant/30"></div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-primary">88%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('quality')}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
