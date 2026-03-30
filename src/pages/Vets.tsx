import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, MapPin, Phone, Navigation, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

interface Vet {
  id: number;
  name: string;
  lat: number;
  lon: number;
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  distance?: number;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

async function fetchNearbyVets(lat: number, lon: number, addressFallback: string): Promise<Vet[]> {
  const radius = 6000; // 6 km
  const query = `[out:json][timeout:30];(node["amenity"="veterinary"](around:${radius},${lat},${lon});way["amenity"="veterinary"](around:${radius},${lat},${lon}););out body center;`;

  let lastError: unknown;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      const res = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`http_${res.status}`);
      const data = await res.json();

      return data.elements
        .map((el: any) => {
          const elLat = el.lat ?? el.center?.lat;
          const elLon = el.lon ?? el.center?.lon;
          const tags = el.tags ?? {};
          const street  = tags['addr:street'] ?? '';
          const num     = tags['addr:housenumber'] ?? '';
          const city    = tags['addr:city'] ?? tags['addr:town'] ?? '';
          const address = [street && `${street} ${num}`.trim(), city].filter(Boolean).join(', ') || addressFallback;
          return {
            id: el.id,
            name: tags.name ?? 'Veterinaria',
            lat: elLat,
            lon: elLon,
            address,
            phone: tags.phone ?? tags['contact:phone'],
            website: tags.website ?? tags['contact:website'],
            openingHours: tags.opening_hours,
            distance: haversineKm(lat, lon, elLat, elLon),
          } as Vet;
        })
        .filter((v: Vet) => v.lat && v.lon)
        .sort((a: Vet, b: Vet) => (a.distance ?? 99) - (b.distance ?? 99));
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

function formatDistance(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function mapsUrl(lat: number, lon: number, name: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&destination_place_id=${encodeURIComponent(name)}`;
}

export function Vets() {
  const { t, lang } = useLanguage();
  const [vets, setVets] = useState<Vet[]>([]);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'locating' | 'loading' | 'done' | 'geo_error' | 'fetch_error'>('idle');

  const load = () => {
    setStatus('locating');
    setVets([]);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lon } = coords;
        setUserCoords({ lat, lon });
        setStatus('loading');
        try {
          const results = await fetchNearbyVets(lat, lon, t('address_unavailable'));
          setVets(results);
          setStatus('done');
        } catch {
          setStatus('fetch_error');
        }
      },
      () => setStatus('geo_error'),
      { timeout: 10000 }
    );
  };

  useEffect(() => { load(); }, []);

  const vetsFoundText = (n: number) => {
    if (lang === 'en') {
      return `${n} veterinarian${n !== 1 ? 's' : ''} found near you`;
    }
    return `${n} veterinario${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''} cerca de ti`;
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <Header />

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-6">

        {/* Title */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">{t('vets_title')}</h1>
            <p className="text-on-surface-variant font-medium mt-1">{t('vets_subtitle')}</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Stethoscope className="w-6 h-6" />
          </div>
        </section>

        {/* Location pill */}
        {userCoords && (
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 w-fit">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {t('location_detected')}
            </span>
            <button onClick={load} className="ml-1 text-primary hover:text-primary/70 transition-colors" aria-label="Actualizar">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* States */}
        {(status === 'locating' || status === 'loading') && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <p className="font-bold text-on-surface-variant">
              {status === 'locating' ? t('detecting_location') : t('searching_vets')}
            </p>
          </div>
        )}

        {status === 'geo_error' && (
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
            <AlertCircle className="w-8 h-8 text-error" />
            <p className="font-bold">{t('geo_error_title')}</p>
            <p className="text-sm text-on-surface-variant">{t('geo_error_hint')}</p>
            <button onClick={load} className="mt-2 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm">
              {t('try_again')}
            </button>
          </div>
        )}

        {status === 'fetch_error' && (
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
            <AlertCircle className="w-8 h-8 text-error" />
            <p className="font-bold">{t('fetch_error_title')}</p>
            <p className="text-sm text-on-surface-variant">{t('fetch_error_hint')}</p>
            <button onClick={load} className="mt-2 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm">
              {t('retry')}
            </button>
          </div>
        )}

        {status === 'done' && vets.length === 0 && (
          <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col items-center gap-3 text-center">
            <Stethoscope className="w-10 h-10 text-on-surface-variant/40" />
            <p className="font-bold text-on-surface-variant">{t('no_vets')}</p>
            <button onClick={load} className="mt-2 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm">
              {t('search_again')}
            </button>
          </div>
        )}

        {/* Results count */}
        {status === 'done' && vets.length > 0 && (
          <p className="text-sm font-bold text-on-surface-variant px-1">
            {vetsFoundText(vets.length)}
          </p>
        )}

        {/* Vet cards */}
        <section className="flex flex-col gap-4">
          {vets.map((vet, i) => (
            <motion.article
              key={vet.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Name + distance */}
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-lg leading-tight truncate">{vet.name}</h3>
                    {vet.distance !== undefined && (
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0",
                        vet.distance < 1
                          ? "bg-primary/10 text-primary"
                          : vet.distance < 3
                          ? "bg-secondary/20 text-secondary"
                          : "bg-surface-container-highest text-on-surface-variant"
                      )}>
                        {formatDistance(vet.distance)}
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-1.5 text-sm text-on-surface-variant mb-2">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{vet.address}</span>
                  </div>

                  {/* Opening hours */}
                  {vet.openingHours && (
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-2">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{vet.openingHours}</span>
                    </div>
                  )}

                  {/* Phone */}
                  {vet.phone && (
                    <a
                      href={`tel:${vet.phone}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {vet.phone}
                    </a>
                  )}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <a
                  href={mapsUrl(vet.lat, vet.lon, vet.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-full font-bold text-sm active:scale-95 transition-transform"
                >
                  <Navigation className="w-4 h-4" />
                  {t('get_directions')}
                </a>
                {vet.phone && (
                  <a
                    href={`tel:${vet.phone}`}
                    className="flex items-center justify-center gap-2 bg-surface-container-highest px-5 py-2.5 rounded-full font-bold text-sm active:scale-95 transition-transform"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </section>

      </main>
    </div>
  );
}
