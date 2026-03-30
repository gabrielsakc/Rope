import { ShoppingBag, Search, Filter, Star, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { useUser } from '../contexts/UserContext';

const products = [
  { id: 1,  name: 'Arnés Snoopy Premium',         price: '$34.90',  rating: 4.9, image: '/images/arnes.png',           category: 'Accesorios' },
  { id: 2,  name: 'Set Arnés Café con Correa',     price: '$49.90',  rating: 4.8, image: '/images/Screenshot_111.png',  category: 'Accesorios' },
  { id: 3,  name: 'Set Arnés Cuadros Marrón',      price: '$44.90',  rating: 4.7, image: '/images/Screenshot_112.png',  category: 'Accesorios' },
  { id: 4,  name: 'Arnés + Correa Cuero Premium',  price: '$79.00',  rating: 4.9, image: '/images/Screenshot_115.png',  category: 'Accesorios' },
  { id: 5,  name: 'Arnés Cuero Táctico',           price: '$112.00', rating: 5.0, image: '/images/Screenshot_116.png',  category: 'Accesorios' },
  { id: 6,  name: 'Set Green Collection',          price: '$89.00',  rating: 4.9, image: '/images/Screenshot_113.png',  category: 'Kit Completo' },
  { id: 7,  name: 'Set Pastel Collection',         price: '$94.00',  rating: 4.8, image: '/images/Screenshot_114.png',  category: 'Kit Completo' },
  { id: 8,  name: 'Bolso Carrier Classic',         price: '$59.00',  rating: 4.8, image: '/images/Screenshot_109.png',  category: 'Transporte' },
  { id: 9,  name: 'Carrier Canvas Tan',            price: '$67.00',  rating: 4.7, image: '/images/Screenshot_117.png',  category: 'Transporte' },
  { id: 10, name: 'Carrier Acolchado Beige',       price: '$72.00',  rating: 4.9, image: '/images/Screenshot_118.png',  category: 'Transporte' },
  { id: 11, name: 'Carrier Verde Pastel',          price: '$68.00',  rating: 4.8, image: '/images/Screenshot_119.png',  category: 'Transporte' },
  { id: 12, name: 'Tote Carrier Luxury',           price: '$75.00',  rating: 4.9, image: '/images/Screenshot_120.png',  category: 'Transporte' },
  { id: 13, name: 'Carrier Amarillo Premium',      price: '$63.00',  rating: 4.7, image: '/images/Screenshot_121.png',  category: 'Transporte' },
  { id: 14, name: 'Tote Marrón con Perro',         price: '$71.00',  rating: 4.8, image: '/images/Screenshot_122.png',  category: 'Transporte' },
  { id: 15, name: 'Tote Canvas Blanco Vino',       price: '$85.00',  rating: 4.9, image: '/images/Screenshot_123.png',  category: 'Transporte' },
  { id: 16, name: 'Carrier Puffer Verde',          price: '$82.00',  rating: 4.8, image: '/images/Screenshot_124.png',  category: 'Transporte' },
  { id: 17, name: 'Cama Stripe Premium',           price: '$74.50',  rating: 5.0, image: '/images/Screenshot_110.png',  category: 'Descanso' },
  { id: 18, name: 'Abrigo Sherpa Beige',           price: '$38.00',  rating: 4.7, image: '/images/Screenshot_126.png',  category: 'Ropa' },
  { id: 19, name: 'Rodillo Quitapelos Pro',        price: '$18.90',  rating: 4.9, image: '/images/Screenshot_125.png',  category: 'Cuidado' },
];

export function Store() {
  const { user } = useUser();
  const petName = user?.petName || 'Tu Mascota';

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <Header />
      
      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold tracking-tight">Marketplace</h1>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar productos..."
              className="w-full bg-surface-container-low border-none focus:ring-primary/20 rounded-full px-6 py-4 pl-12 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        <section className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {['Todos', 'Accesorios', 'Transporte', 'Kit Completo', 'Descanso', 'Ropa', 'Cuidado'].map((cat, i) => (
            <button 
              key={i} 
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                i === 0 ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="w-full md:w-48 aspect-square bg-surface-container-low p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
                    <div className="flex items-center gap-1 text-secondary">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                  <p className="text-2xl font-extrabold text-on-surface">{product.price}</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-primary text-white py-3 rounded-full font-bold text-sm active:scale-95 transition-transform">
                    Añadir al carrito
                  </button>
                  <button className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
