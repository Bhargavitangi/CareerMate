import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, User, ArrowRight, GraduationCap, X, Building2, Target } from 'lucide-react';
import { StudentProfile } from '../../types';

interface WelcomeNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSaveName: (name: string, college?: string, targetRole?: string) => void;
  isInitialPrompt?: boolean;
}

export const WelcomeNameModal: React.FC<WelcomeNameModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveName,
  isInitialPrompt = false,
}) => {
  const [name, setName] = useState(currentProfile.name || '');
  const [targetRole, setTargetRole] = useState(currentProfile.targetRole || '');
  const [college, setCollege] = useState(currentProfile.college || '');
  const [error, setError] = useState('');

  // Sync inputs with currentProfile whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setName(currentProfile.name || '');
      setTargetRole(currentProfile.targetRole || '');
      setCollege(currentProfile.college || '');
      setError('');
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name to continue!');
      return;
    }

    // Trigger cheerful confetti celebration!
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#3b82f6', '#f43f5e', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Ignore if confetti fails
    }

    onSaveName(trimmed, college.trim(), targetRole.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 dark:border-purple-900/40 text-slate-900 dark:text-slate-100 overflow-hidden">
        {/* Playful background gradient accents */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-linear-to-br from-purple-400/20 via-pink-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-linear-to-tr from-sky-400/20 via-emerald-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          {/* Friendly Icon Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isInitialPrompt ? 'Welcome to CareerMate!' : 'Update Your Profile'}</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                {isInitialPrompt ? 'Set Up Your Profile' : 'Edit Profile Details'}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Update your name, university, and career target to personalize your dashboard, resume, and practice toolkit.
          </p>

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Your Name <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Bhargavi, Alex, Priyansh..."
                autoFocus
                className={`w-full pl-10 pr-4 py-3 text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/90 border transition-all ${
                  error
                    ? 'border-rose-400 ring-2 ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                } text-slate-900 dark:text-white placeholder-slate-400 font-medium`}
              />
            </div>
            {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
          </div>

          {/* University / College Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              University / College
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Stanford University, National Institute of Technology..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Career Target / Desired Role Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Career Target / Desired Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Target className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Development Engineer, Frontend Dev..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-linear-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-600 text-white font-bold text-sm shadow-md shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Save Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
