import { Bell } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
const dogAvatar = '/images/razasperro-30.jpeg';

interface HeaderProps {
  petName?: string;
  petPhoto?: string;
}

export function Header({ petName, petPhoto }: HeaderProps) {
  const { user } = useUser();
  const defaultPhoto = dogAvatar;
  
  const displayPhoto = petPhoto || user?.photoURL || defaultPhoto;
  const displayName = petName || user?.petName || "Rope Pet";

  return (
    <header className="fixed top-0 w-full z-50 bg-[#FAF9F5]/40 backdrop-blur-2xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high ring-2 ring-primary-container/20 shadow-sm transition-transform active:scale-95">
          <img 
            src={displayPhoto} 
            alt={displayName} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col -space-y-1">
          <h1 className="text-lg font-black text-primary tracking-tighter font-headline">
            Dogs Feels
          </h1>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{displayName}</span>
        </div>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low/50 hover:bg-surface-container-high transition-all active:scale-90 border border-outline-variant/10 group">
        <Bell className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
      </button>
    </header>
  );
}

