import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Navigation, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { searchPetPlaces } from '../services/geminiService';
import { useUser } from '../contexts/UserContext';

export function Tracking() {
  const { user } = useUser();
  const petName = user?.petName || 'Tu Mascota';

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ text: string; places: any[] }>({ text: '', places: [] });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const res = await searchPetPlaces({ lat: 41.3851, lng: 2.1734 }, query); // Default to Barcelona as per screenshot
    setResults(res);
    setLoading(false);
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen pb-32">
      <Header />
      
      <main className="relative min-h-screen pt-20">
        {/* Interactive Map Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#E0E5DF] opacity-40"></div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCna9uTjkoZkmfwBU94Txp0bAtnmgF_nTLNZV_ZnOv_DWTWJ9fogdUCfSiS90wpqbwRiGzwNijgjt_xIuiMLzgCemn75PZ27Q9H9gXv-joZW4dKWJAGwVj7akL3mQjHqYRZXS0AskfMb33YDz2O-5XmrXnkv4faraA8CJV_fSoCjAzPeO21V3oyePUWSqhL9AAFEY-IYvdLS8ITgO9zsLz4iqo_fsUOoDf_1IHkuzvJQGahlOcc-fNciO9aJ8Zz6g5XdxzeyhNcKl4" 
            alt="Map" 
            className="w-full h-full object-cover grayscale-[20%] contrast-[90%] brightness-[105%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F5]/90 via-transparent to-[#FAF9F5] pointer-events-none"></div>
          
          {/* Cooper's Real-time Marker */}
          <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative w-10 h-10 bg-white rounded-full p-1 shadow-lg border-2 border-primary overflow-hidden">
                <img 
                  src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuA56AssqY4dIKDuvroAa6NrDC-EeR__AIYaHt046MAgJgWyExIrnmYeo_qs5b_fOTycdCUGgNY0bWyiBh0n7RB5mfGydmSgB6jP4lAiLPYc4jNK0tWADDTUHN-sPzp7iqLnjRfMIRaXqKx_j2zqnl5XWKGncuV6suwfVyZc7J13niG259QlDbVRqQiZBjDKn-RxgCpGs-CKrGoXFDVCGitXeZXYY-DSeNRZoRSa9_5c50p7fl7jxHuFE_a3Htk1vv2sPXBl8XLDtEE"} 
                  alt={petName} 
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="mt-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-center">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{petName} • En Casa</span>
            </div>
          </div>
        </div>

        {/* Floating UI Elements */}
        <div className="relative z-10 px-6 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar veterinarias, parques, tiendas..."
              className="relative w-full bg-surface-container-lowest/90 backdrop-blur-xl border-2 border-transparent focus:border-primary/20 rounded-full px-6 py-4 shadow-xl text-on-surface outline-none transition-all"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </form>

          {/* AI Search Insights & Results */}
          {(results.text || results.places.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-6 space-y-4 shadow-2xl border border-white/20"
            >
              {results.text && (
                <div className="flex gap-3 items-start bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <Sparkles className="w-5 h-5 text-secondary fill-current shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-on-surface leading-relaxed italic">
                    {results.text}
                  </p>
                </div>
              )}

              {results.places.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2 mb-2">Sugerencias Cercanas</p>
                  <div className="grid gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                    {results.places.map((p: any, i: number) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="flex items-center gap-4 p-3 hover:bg-surface-container-low rounded-2xl transition-all border border-transparent hover:border-outline-variant/10 group cursor-pointer"
                        onClick={() => window.open(p.uri, '_blank')}
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-on-surface">{p.title}</p>
                          <p className="text-[10px] text-on-surface-variant font-medium tracking-wide uppercase truncate mt-0.5">Ubicación verificada</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Actividad de Hoy</span>
                <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">{petName} ({user?.petAge || 3}a)</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-on-surface">3.4 <span className="text-lg font-medium text-on-surface-variant">km</span></p>
                  <p className="text-sm text-on-surface-variant">Distancia total</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold tracking-tight text-on-surface">45 <span className="text-lg font-medium text-on-surface-variant">min</span></p>
                  <p className="text-sm text-on-surface-variant">Tiempo activo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safe Zone Alert Card */}
          <div className="bg-primary/5 border border-primary/10 backdrop-blur-md p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Zona Segura Activa</h3>
                <p className="text-sm text-on-surface-variant">Perímetro: 200m alrededor de Casa</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs font-bold text-primary uppercase">Protegido</span>
            </div>
          </div>

          {/* Walk History */}
          <div className="bg-surface-container-lowest shadow-sm rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Último Recorrido</h2>
                <button className="text-secondary text-sm font-bold hover:underline">Ver todo</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbvPiaEgNdmIOqQHA36fDVQzxcWjGZGmx8ZgVdPUE12CAggNSpjZ7wdpDPAK0xww-Q5QvyQhMpU5DepRpzpS5NlByLJiD5JGQzS3wJyd-XfNxWFvR8iG7ip84FbfG7MFuigBOQeIdXrh3okYgwSLGLFMk6bhSLvLDvYkE49_hbmTPdu2TATEGHHXI5QlzdMxH6Fmgeu75FHF0D2wEAkA1S81MNOt7A5GSNlFsPdeuWvuO3o2-OPBLkhQ9So8axQisNv-PpGOem1ww" 
                      alt="Walk Map" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Paseo Matutino</p>
                    <p className="text-xs text-on-surface-variant">Hoy, 08:30 AM • 1.2 km</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-on-surface-variant" />
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full bg-gradient-to-br from-[#506352] to-[#8DA18D] text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform">
                  <Navigation className="w-5 h-5" />
                  MODO PASEO
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
