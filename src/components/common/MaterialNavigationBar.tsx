import React from 'react';
import {
  Home,
  FileText,
  HelpCircle,
  BrainCircuit,
  Briefcase,
} from 'lucide-react';
import { NavDestination } from '../../types';

interface MaterialNavigationBarProps {
  currentNav: NavDestination;
  onNavigate: (destination: NavDestination) => void;
}

export const MaterialNavigationBar: React.FC<MaterialNavigationBarProps> = ({
  currentNav,
  onNavigate,
}) => {
  const navItems = [
    {
      id: 'home' as NavDestination,
      label: 'Home',
      icon: Home,
      activeColor: 'from-purple-600 to-indigo-600',
    },
    {
      id: 'resume' as NavDestination,
      label: 'Resume ATS',
      icon: FileText,
      activeColor: 'from-indigo-600 to-blue-600',
    },
    {
      id: 'quiz' as NavDestination,
      label: 'Aptitude',
      icon: BrainCircuit,
      activeColor: 'from-amber-500 to-orange-500',
    },
    {
      id: 'interview' as NavDestination,
      label: 'Interview',
      icon: HelpCircle,
      activeColor: 'from-rose-500 to-pink-500',
    },
    {
      id: 'portfolio' as NavDestination,
      label: 'Portfolio',
      icon: Briefcase,
      activeColor: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-purple-100 dark:border-purple-950/50 px-2 py-2 transition-colors shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-items-center">
        {navItems.map((item) => {
          const isActive = currentNav === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center w-full min-h-[50px] py-0.5 transition-all group select-none cursor-pointer focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Material 3 Pill Highlight with vibrant gradient when active */}
              <div
                className={`w-14 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? `bg-linear-to-r ${item.activeColor} text-white shadow-md shadow-purple-500/20`
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 group-hover:bg-slate-100 dark:group-hover:bg-slate-800/60'
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
              </div>

              {/* Navigation Label */}
              <span
                className={`text-[11px] font-bold tracking-tight mt-1 transition-colors whitespace-nowrap truncate max-w-full ${
                  isActive
                    ? 'text-purple-600 dark:text-purple-400 font-extrabold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
