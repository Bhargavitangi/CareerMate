import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  BrainCircuit,
  HelpCircle,
  Briefcase,
  CheckCircle2,
  Circle,
  Calendar,
  Building2,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Target,
  ArrowRight,
  Flame,
  Zap,
  Star,
  Edit2,
  Rocket,
  Smile,
} from 'lucide-react';
import { NavDestination, StudentProfile, ResumeData, QuizAttemptRecord } from '../../types';

interface HomeDashboardProps {
  profile: StudentProfile;
  resume: ResumeData;
  quizAttempts: QuizAttemptRecord[];
  onNavigate: (destination: NavDestination) => void;
  onUpdateProfile: (updated: StudentProfile) => void;
  onOpenNameModal: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  resume,
  quizAttempts,
  onNavigate,
  onUpdateProfile,
  onOpenNameModal,
}) => {
  // Placement prep daily goals
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, text: 'Review 3 Behavioral STAR interview questions', done: true },
    { id: 2, text: 'Complete 1 Quantitative Aptitude Quiz (Work & Time)', done: false },
    { id: 3, text: 'Quantify 2 project bullet points on Resume ATS', done: true },
    { id: 4, text: 'Verify GitHub repository links on student portfolio', done: false },
  ]);

  const toggleTask = (id: number) => {
    setDailyTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      const newlyDone = updated.find((t) => t.id === id)?.done;
      if (newlyDone) {
        // Small confetti burst on completing a task!
        try {
          confetti({
            particleCount: 25,
            spread: 40,
            origin: { y: 0.7 },
            colors: ['#8b5cf6', '#10b981', '#f59e0b'],
          });
        } catch {
          // Ignore
        }
      }
      return updated;
    });
  };

  // Calculate ATS Score approximation
  const calculateResumeScore = () => {
    let score = 40;
    if (resume.personalInfo.fullName && resume.personalInfo.email) score += 15;
    if (resume.education.length > 0) score += 15;
    if (resume.experience.length > 0) score += 15;
    if (resume.projects.length >= 2) score += 15;
    return Math.min(score, 94);
  };

  const resumeScore = calculateResumeScore();
  const completedTasksCount = dailyTasks.filter((t) => t.done).length;
  const taskPercentage = Math.round((completedTasksCount / dailyTasks.length) * 100);

  // Calculate days remaining to placement drive
  const targetDate = new Date(profile.targetPlacementDate || '2026-11-20');
  const today = new Date();
  const diffDays = Math.max(1, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Dynamic user name greeting as requested:
  // "The greeting should display the name entered by the current user, not a hardcoded name."
  // "If no name has been entered, show 'Welcome to CareerMate!' instead."
  const hasEnteredName = Boolean(profile.name && profile.name.trim().length > 0);
  const studentFirstName = hasEnteredName ? profile.name.trim().split(' ')[0] : '';
  const greetingText = hasEnteredName ? `Hi, ${studentFirstName}! 👋` : 'Welcome to CareerMate!';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcoming Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-700 via-indigo-600 to-pink-600 text-white p-6 sm:p-10 shadow-xl shadow-purple-500/15">
        {/* Soft decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Personalized Greeting Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{greetingText}</span>
              <button
                onClick={onOpenNameModal}
                className="ml-1 text-[11px] underline opacity-90 hover:opacity-100 flex items-center gap-1 cursor-pointer transition-opacity"
                title="Edit name, university, and career target"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            {/* Required Headline and Subtitle */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Your Career Starts Here!
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-xl font-medium leading-relaxed">
              Build your skills, create your resume, and get ready for your dream job.
            </p>

            {/* Target Role & College Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-purple-200 pt-1">
              {profile.targetRole ? (
                <span>Targeting <strong>{profile.targetRole}</strong></span>
              ) : (
                <span>Ready for Placement & Career</span>
              )}
              {profile.college && (
                <>
                  <span>•</span>
                  <span>{profile.college}</span>
                </>
              )}
            </div>

            {/* Attractive Call-To-Action Button: "Let's Get Started" */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('resume')}
                className="py-3 px-6 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-sm shadow-lg shadow-black/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <span>Let&apos;s Get Started</span>
                <ArrowRight className="w-4 h-4 text-purple-600" />
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="py-3 px-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Daily Practice</span>
              </button>
            </div>
          </div>

          {/* Placement Countdown Box */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between bg-black/25 backdrop-blur-md rounded-3xl p-5 border border-white/15 shrink-0 shadow-inner">
            <div className="flex items-center gap-2 text-purple-200 text-xs font-semibold">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Campus Drives</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mt-1">
              {diffDays} <span className="text-xs font-semibold text-purple-200">Days</span>
            </div>
            <span className="text-[11px] text-purple-200/80 mt-1 hidden md:block">
              Season {profile.graduationYear}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Three Colorful Core Feature Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-purple-500" />
            <span>Featured Career Tools</span>
          </h2>
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
            Interactive & Student-Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Resume Builder */}
          <div
            onClick={() => onNavigate('resume')}
            className="group cursor-pointer rounded-3xl p-6 bg-linear-to-br from-purple-500/10 via-indigo-500/10 to-transparent dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-slate-900 border-2 border-purple-200 dark:border-purple-800/60 hover:border-purple-500 dark:hover:border-purple-400 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all transform hover:-translate-y-1 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/25 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 tabular-nums">
                  {resumeScore}% ATS
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Resume Builder
              </h3>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-300 mt-0.5">
                Create a resume that stands out.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                ATS scoring analyzer, Harvard standard formatting, quantified impact checks, and instant PDF export.
              </p>
            </div>

            <div className="pt-3 border-t border-purple-100 dark:border-purple-900/50 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>Launch Builder</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Interview Practice */}
          <div
            onClick={() => onNavigate('interview')}
            className="group cursor-pointer rounded-3xl p-6 bg-linear-to-br from-rose-500/10 via-orange-500/10 to-transparent dark:from-rose-950/40 dark:via-orange-950/30 dark:to-slate-900 border-2 border-rose-200 dark:border-rose-800/60 hover:border-rose-500 dark:hover:border-rose-400 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 transition-all transform hover:-translate-y-1 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-rose-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  STAR Method
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Interview Practice
              </h3>
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-300 mt-0.5">
                Practice, improve, and shine.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Behavioral questions with STAR breakdowns, DSA code patterns, Core CS concepts, and answer scratchpad.
              </p>
            </div>

            <div className="pt-3 border-t border-rose-100 dark:border-rose-900/50 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
              <span>Start Practicing</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Portfolio Creator */}
          <div
            onClick={() => onNavigate('portfolio')}
            className="group cursor-pointer rounded-3xl p-6 bg-linear-to-br from-blue-500/10 via-emerald-500/10 to-transparent dark:from-blue-950/40 dark:via-emerald-950/30 dark:to-slate-900 border-2 border-blue-200 dark:border-blue-800/60 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-1 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  Web Ready
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Portfolio Creator
              </h3>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-300 mt-0.5">
                Show the world what you can do.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Showcase engineering projects, GitHub repositories, skills matrix, and shareable web link.
              </p>
            </div>

            <div className="pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>View Portfolio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Progress & Aptitude Quizzes Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Placement Prep Tasks (2 Cols) */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Daily Prep Goals
                </h3>
                <p className="text-xs text-slate-500">Stay consistent to ace your technical rounds</p>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tabular-nums">
              {completedTasksCount} / {dailyTasks.length} Done ({taskPercentage}%)
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-linear-to-r from-purple-600 via-indigo-600 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${taskPercentage}%` }}
            />
          </div>

          {/* Motivational micro message */}
          <div className="p-3 rounded-2xl bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/40 text-xs flex items-center gap-2.5 text-purple-900 dark:text-purple-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span>
              {taskPercentage === 100
                ? "Incredible job! You completed all your placement goals for today! 🎉"
                : "You're making great progress! Complete remaining goals to maintain your streak."}
            </span>
          </div>

          {/* Task list */}
          <div className="space-y-2.5">
            {dailyTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer flex items-center gap-3 p-3.5 rounded-2xl transition-all border ${
                  task.done
                    ? 'bg-purple-50/40 dark:bg-slate-800/30 border-purple-200/50 dark:border-purple-900/30 text-slate-400 dark:text-slate-500 line-through'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 text-slate-800 dark:text-slate-200 shadow-2xs'
                }`}
              >
                {task.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600 shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-semibold">{task.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aptitude Quiz Shortcut & Dream Companies (1 Col) */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Aptitude Practice Card */}
          <div
            onClick={() => onNavigate('quiz')}
            className="cursor-pointer group p-6 rounded-3xl bg-linear-to-br from-amber-500/10 via-yellow-500/10 to-transparent dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-800/60 hover:border-amber-500 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                {quizAttempts.length} Tests Logged
              </span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Aptitude Quizzes
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Timed tests in Quant, Logical Reasoning, and Verbal with step-by-step math derivations.
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>Take 5-min Quiz</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Dream Companies Target Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Target Companies
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {profile.dreamCompanies.map((company, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-bold rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60"
                >
                  {company}
                </span>
              ))}
            </div>

            <button
              onClick={() => onNavigate('settings')}
              className="w-full mt-2 py-2 px-3 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 rounded-xl transition-colors"
            >
              Update Preferences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
