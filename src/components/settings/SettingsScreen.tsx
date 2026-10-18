import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Settings,
  Moon,
  Sun,
  Laptop,
  Palette,
  User,
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Plus,
  X,
  Sparkles,
  Save,
  Check,
} from 'lucide-react';
import { StudentProfile, AppSettings, ThemeMode, AccentColor } from '../../types';

interface SettingsScreenProps {
  profile: StudentProfile;
  settings: AppSettings;
  onUpdateProfile: (updated: StudentProfile) => void;
  onUpdateSettings: (updated: AppSettings) => void;
  onExportAllData: () => void;
  onImportAllData: (jsonStr: string) => boolean;
  onResetAllData: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  profile,
  settings,
  onUpdateProfile,
  onUpdateSettings,
  onExportAllData,
  onImportAllData,
  onResetAllData,
}) => {
  const [newCompany, setNewCompany] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleThemeChange = (mode: ThemeMode) => {
    onUpdateSettings({ ...settings, themeMode: mode });
  };

  const handleAccentChange = (accent: AccentColor) => {
    onUpdateSettings({ ...settings, accentColor: accent });
  };

  const handleNameChange = (newName: string) => {
    onUpdateProfile({ ...profile, name: newName });
    triggerSavePulse();
  };

  const triggerSavePulse = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const addDreamCompany = () => {
    if (!newCompany.trim()) return;
    if (profile.dreamCompanies.includes(newCompany.trim())) return;
    onUpdateProfile({
      ...profile,
      dreamCompanies: [...profile.dreamCompanies, newCompany.trim()],
    });
    setNewCompany('');
    triggerSavePulse();
  };

  const removeDreamCompany = (company: string) => {
    onUpdateProfile({
      ...profile,
      dreamCompanies: profile.dreamCompanies.filter((c) => c !== company),
    });
    triggerSavePulse();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = onImportAllData(content);
      if (success) {
        setImportStatus('Data successfully restored!');
        try {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 },
          });
        } catch {
          // Ignore
        }
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Failed to parse backup JSON. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-linear-to-r from-purple-500/15 to-pink-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
              Preferences & Data
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">Persistent Storage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Settings & Profile Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Customize your personalized name, theme mode, target placement tracks, and manage offline data.
          </p>
        </div>

        {savedFeedback && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-xs font-bold shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile saved automatically!</span>
          </div>
        )}
      </div>

      {/* 1. Student Profile Name & Academic Track (PRIMARY REQUIREMENT) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Personalized Student Name & Greeting
              </h3>
              <p className="text-xs text-slate-500">
                This name is displayed dynamically on your Home Dashboard (&quot;Hi, {profile.name.trim() || 'Student'}! 👋&quot;)
              </p>
            </div>
          </div>

          {profile.name.trim() ? (
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
              <Check className="w-3.5 h-3.5" />
              <span>Active: {profile.name}</span>
            </span>
          ) : (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200">
              No name set (shows &quot;Welcome to CareerMate!&quot;)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Bhargavi"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Change this anytime. It updates your home greeting immediately and saves to browser storage.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              College / University
            </label>
            <input
              type="text"
              value={profile.college}
              onChange={(e) => {
                onUpdateProfile({ ...profile, college: e.target.value });
                triggerSavePulse();
              }}
              placeholder="e.g. National Institute of Technology"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Target Role
            </label>
            <input
              type="text"
              value={profile.targetRole}
              onChange={(e) => {
                onUpdateProfile({ ...profile, targetRole: e.target.value });
                triggerSavePulse();
              }}
              placeholder="e.g. Software Development Engineer"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Graduation Year
            </label>
            <input
              type="text"
              value={profile.graduationYear}
              onChange={(e) => {
                onUpdateProfile({ ...profile, graduationYear: e.target.value });
                triggerSavePulse();
              }}
              placeholder="e.g. 2026"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Dream Companies Editor */}
        <div className="pt-2 border-t border-purple-50 dark:border-purple-950/60">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Dream Companies Target List
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {profile.dreamCompanies.map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60"
              >
                <span>{comp}</span>
                <button
                  onClick={() => removeDreamCompany(comp)}
                  className="hover:text-rose-500 transition-colors p-0.5"
                  title="Remove company"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addDreamCompany()}
              placeholder="Add dream company..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
            />
            <button
              onClick={addDreamCompany}
              className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Theme & Visual Appearance */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Theme Mode & Dynamic Color Accent
            </h3>
            <p className="text-xs text-slate-500">
              Customize light and dark appearance according to your study environment.
            </p>
          </div>
        </div>

        {/* Theme mode: Light, Dark, System */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Theme Mode
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light' as ThemeMode, label: 'Light Theme', icon: Sun },
              { id: 'dark' as ThemeMode, label: 'Dark Theme', icon: Moon },
              { id: 'system' as ThemeMode, label: 'System Default', icon: Laptop },
            ].map((th) => {
              const Icon = th.icon;
              const isActive = settings.themeMode === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => handleThemeChange(th.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{th.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color Palette */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Accent Palette
          </label>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'indigo' as AccentColor, label: 'Electric Purple / Indigo', color: 'bg-purple-600' },
              { id: 'emerald' as AccentColor, label: 'Mint / Emerald Green', color: 'bg-emerald-500' },
              { id: 'amber' as AccentColor, label: 'Sunny Yellow / Amber', color: 'bg-amber-500' },
              { id: 'rose' as AccentColor, label: 'Coral / Vibrant Rose', color: 'bg-rose-500' },
            ].map((acc) => {
              const isActive = settings.accentColor === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => handleAccentChange(acc.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'border-purple-600 bg-purple-50/80 dark:bg-slate-800 text-purple-900 dark:text-purple-200 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${acc.color}`}></span>
                  <span>{acc.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Local Storage & Data Management */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Offline Local Storage & Backups
            </h3>
            <p className="text-xs text-slate-500">
              All your resumes, quiz scores, interview notes, and portfolio are securely stored in your local browser storage.
            </p>
          </div>
        </div>

        {importStatus && (
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-2 border border-purple-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{importStatus}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onExportAllData}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup (JSON)</span>
          </button>

          <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all data? This will clear custom resumes and quiz scores.')) {
                onResetAllData();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default</span>
          </button>
        </div>
      </div>
    </div>
  );
};
