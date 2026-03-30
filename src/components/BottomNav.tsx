import { Link, useLocation } from 'react-router-dom';
import { Home, HeartPulse, ShoppingBag, User, Stethoscope } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav_home'),    icon: Home,         path: '/home' },
    { label: t('nav_health'),  icon: HeartPulse,   path: '/health' },
    { label: t('nav_vets'),    icon: Stethoscope,  path: '/vets' },
    { label: t('nav_store'),   icon: ShoppingBag,  path: '/store' },
    { label: t('nav_profile'), icon: User,         path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-[#FAF9F5]/70 backdrop-blur-3xl rounded-t-[3rem] z-50 shadow-[0_-4px_48px_0_rgba(27,28,26,0.04)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 ease-out active:scale-90",
              isActive
                ? "bg-[#8DA18D]/20 text-[#506352] rounded-full"
                : "text-[#1B1C1A]/40 hover:text-[#506352]"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="font-body text-[10px] font-semibold uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
