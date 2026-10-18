import React from 'react';
import {
  Flame,
  Settings,
  Code2,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  User,
  Sparkles,
} from 'lucide-react';
import { NavDestination, ThemeMode } from '../../types';

interface MaterialTopAppBarProps {
  title: string;
  subtitle?: string;
  currentNav: NavDestination;
  onNavigate: (destination: NavDestination) => void;
  streakDays: number;
  userName: string;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenNameModal: () => void;
  isDeviceMode: boolean;
  onToggleDeviceMode: () => void;
}

export const MaterialTopAppBar: React.FC<MaterialTopAppBarProps> = ({
  title,
  subtitle,
  currentNav,
  onNavigate,
  streakDays,
  userName,
  themeMode,
  onToggleTheme,
  onOpenNameModal,
  isDeviceMode,
  onToggleDeviceMode,
}) => {
  const userInitial = userName.trim() ? userName.trim().charAt(0).toUpperCase() : null;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-purple-100 dark:border-purple-950/40 transition-colors shadow-xs">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            title="CareerMate Home"
          >
            CM
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white truncate tracking-tight leading-tight">
                {title}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                Student Toolkit
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions & Student Profile Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Daily Streak Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-300/40 dark:border-amber-700/40 shadow-xs"
            title={`${streakDays} Day Preparation Streak! Keep going!`}
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="tabular-nums">{streakDays}d Streak</span>
          </div>

          {/* Quick Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
            title={themeMode === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle theme mode"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600" />
            )}
          </button>

          {/* Device Frame View Toggle (Simulate Android Phone vs Full Canvas) */}
          <button
            onClick={onToggleDeviceMode}
            className="hidden sm:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDeviceMode ? 'Switch to Full Web View' : 'Simulate Android Device View'}
            aria-label="Toggle device view"
          >
            {isDeviceMode ? (
              <Monitor className="w-4 h-4 text-indigo-500" />
            ) : (
              <Smartphone className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Android Kotlin & Compose Architecture Hub */}
          <button
            onClick={() => onNavigate('kotlin_hub')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentNav === 'kotlin_hub'
                ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Inspect Kotlin Jetpack Compose Code & AAB Guide"
          >
            <Code2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span className="hidden md:inline">Kotlin & AAB</span>
          </button>

          {/* User Name / Profile Avatar Pill */}
          <button
            onClick={onOpenNameModal}
            className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-linear-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-950/60 dark:to-pink-950/60 border border-purple-200 dark:border-purple-800/60 hover:shadow-xs transition-all cursor-pointer group"
            title="Edit student profile name"
          >
            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-purple-600 to-pink-500 text-white text-xs font-bold flex items-center justify-center">
              {userInitial || <User className="w-3 h-3" />}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate group-hover:text-purple-600 dark:group-hover:text-purple-400">
              {userName.trim() ? userName.split(' ')[0] : 'Set Name'}
            </span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              currentNav === 'settings'
                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40'
                : ''
            }`}
            title="Settings & Appearance"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
