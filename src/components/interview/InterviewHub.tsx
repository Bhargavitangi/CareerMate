import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Code,
  Users,
  BrainCircuit,
  MessageSquare,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  Zap,
  Award,
  Layers,
  History,
  Search,
  Filter,
  Check,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import {
  InterviewCategory,
  InterviewDifficulty,
  InterviewMCQQuestion,
  InterviewSessionRecord,
  InterviewSessionResultItem,
  InterviewQuestion,
} from '../../types';
import { sampleInterviewMCQQuestions } from '../../data/interviewMCQData';
import { StorageService } from '../../services/storage';

interface InterviewHubProps {
  questions?: InterviewQuestion[];
  onUpdateQuestions?: (updated: InterviewQuestion[]) => void;
}

export const InterviewHub: React.FC<InterviewHubProps> = () => {
  // Navigation inside Interview Practice
  // 'dashboard' | 'practice' | 'results' | 'study_bank'
  const [viewMode, setViewMode] = useState<'dashboard' | 'practice' | 'results' | 'study_bank'>('dashboard');

  // Selected Category and Difficulty for practice
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory>('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState<InterviewDifficulty>('Intermediate');

  // Active Practice Session state
  const [sessionQuestions, setSessionQuestions] = useState<InterviewMCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<string, string>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Latest Results State
  const [lastSessionRecord, setLastSessionRecord] = useState<InterviewSessionRecord | null>(null);

  // Historical completed sessions from local storage
  const [historySessions, setHistorySessions] = useState<InterviewSessionRecord[]>(() =>
    StorageService.getInterviewSessions()
  );

  // Study Bank search and filter states
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategoryFilter, setBankCategoryFilter] = useState<'all' | InterviewCategory>('all');
  const [bankDifficultyFilter, setBankDifficultyFilter] = useState<'all' | InterviewDifficulty>('all');
  const [expandedBankQuestion, setExpandedBankQuestion] = useState<string | null>(null);

  // Category Configuration
  const categories = [
    {
      id: 'technical' as InterviewCategory,
      title: 'Technical Interviews',
      shortTitle: 'Technical',
      desc: 'Data Structures, System Design, Concurrency, Algorithms & DBMS fundamentals',
      icon: Code,
      badge: 'Code & Systems',
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      borderGlow: 'hover:border-purple-500/70',
      badgeTint: 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300',
      highlightColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 'hr' as InterviewCategory,
      title: 'HR Interviews',
      shortTitle: 'HR & Behavioral',
      desc: 'STAR method stories, culture fit, conflict resolution & teamwork questions',
      icon: Users,
      badge: 'STAR Behavioral',
      gradient: 'from-rose-500 via-pink-500 to-amber-500',
      borderGlow: 'hover:border-rose-500/70',
      badgeTint: 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300',
      highlightColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      id: 'aptitude' as InterviewCategory,
      title: 'Aptitude',
      shortTitle: 'Aptitude & Logic',
      desc: 'Quantitative problem solving, logical deduction, probability & data analysis',
      icon: BrainCircuit,
      badge: 'Problem Solving',
      gradient: 'from-amber-500 via-yellow-500 to-orange-500',
      borderGlow: 'hover:border-amber-500/70',
      badgeTint: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300',
      highlightColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'communication' as InterviewCategory,
      title: 'Communication Skills',
      shortTitle: 'Communication',
      desc: 'Stakeholder presentations, email etiquette, diplomacy & executive presence',
      icon: MessageSquare,
      badge: 'Workplace Soft Skills',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      borderGlow: 'hover:border-emerald-500/70',
      badgeTint: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300',
      highlightColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  // Difficulties configuration with educational descriptions
  const difficulties: { id: InterviewDifficulty; label: string; desc: string; badge: string }[] = [
    {
      id: 'Beginner',
      label: 'Beginner',
      desc: 'Foundational concepts & standard questions',
      badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60',
    },
    {
      id: 'Intermediate',
      label: 'Intermediate',
      desc: 'Real-world scenarios & practical trade-offs',
      badge: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/60',
    },
    {
      id: 'Advanced',
      label: 'Advanced',
      desc: 'Complex edge cases & architectural decisions',
      badge: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/60',
    },
  ];

  // Start a Practice Session
  const startSession = (category: InterviewCategory, difficulty: InterviewDifficulty) => {
    // Filter questions matching category and difficulty
    let pool = sampleInterviewMCQQuestions.filter(
      (q) => q.category === category && q.difficulty === difficulty
    );

    // If pool has fewer than 3, fallback to category questions
    if (pool.length === 0) {
      pool = sampleInterviewMCQQuestions.filter((q) => q.category === category);
    }

    // Pick questions (up to 4 or 5)
    const questionsToUse = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

    setSessionQuestions(questionsToUse);
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setCurrentIndex(0);
    setUserSelections({});
    setRevealedQuestions({});
    setSessionStartTime(Date.now());
    setShowQuitConfirm(false);
    setViewMode('practice');
  };

  // Select Option & Immediately Reveal Feedback
  const handleSelectOption = (questionId: string, optionId: string) => {
    // Record selection and reveal immediate feedback
    setUserSelections((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  // Complete Session and View Results
  const handleFinishSession = () => {
    const timeSpent = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
    let correctCount = 0;

    const results: InterviewSessionResultItem[] = sessionQuestions.map((q) => {
      const selectedId = userSelections[q.id] || '';
      const isCorrect = selectedId === q.correctOptionId;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionText: q.question,
        selectedOptionId: selectedId,
        correctOptionId: q.correctOptionId,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const categoryObj = categories.find((c) => c.id === selectedCategory);
    const percentage = sessionQuestions.length > 0 ? Math.round((correctCount / sessionQuestions.length) * 100) : 0;

    const record: InterviewSessionRecord = {
      id: `session-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      category: selectedCategory,
      categoryLabel: categoryObj?.title || 'Technical Interviews',
      difficulty: selectedDifficulty,
      totalQuestions: sessionQuestions.length,
      score: correctCount,
      percentage,
      timeSpentSeconds: timeSpent,
      results,
    };

    // Save persistently
    StorageService.saveInterviewSession(record);
    setHistorySessions(StorageService.getInterviewSessions());
    setLastSessionRecord(record);
    setViewMode('results');

    // Confetti celebration if scored 70%+
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'],
        });
      } catch {
        // Ignore
      }
    }
  };

  // Best score per category helper
  const getBestScore = (catId: InterviewCategory) => {
    const match = historySessions.filter((s) => s.category === catId);
    if (match.length === 0) return null;
    return Math.max(...match.map((s) => s.percentage));
  };

  // Average score across all completed sessions
  const getAverageScore = () => {
    if (historySessions.length === 0) return 0;
    const sum = historySessions.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / historySessions.length);
  };

  const currentQ = sessionQuestions[currentIndex];
  const isRevealed = currentQ ? Boolean(revealedQuestions[currentQ.id]) : false;

  // Filtered list for the Study Bank
  const filteredBankQuestions = sampleInterviewMCQQuestions.filter((q) => {
    const matchesSearch =
      bankSearch.trim() === '' ||
      q.question.toLowerCase().includes(bankSearch.toLowerCase()) ||
      q.subtopic.toLowerCase().includes(bankSearch.toLowerCase()) ||
      q.explanation.toLowerCase().includes(bankSearch.toLowerCase());
    const matchesCat = bankCategoryFilter === 'all' || q.category === bankCategoryFilter;
    const matchesDiff = bankDifficultyFilter === 'all' || q.difficulty === bankDifficultyFilter;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Sub-navigation pill between Practice Arena and Study Bank */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('dashboard')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'dashboard' || viewMode === 'practice' || viewMode === 'results'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Practice Arena
          </button>
          <button
            onClick={() => setViewMode('study_bank')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'study_bank'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Question Bank & Explanations ({sampleInterviewMCQQuestions.length})</span>
          </button>
        </div>

        {viewMode !== 'dashboard' && (
          <button
            onClick={() => setViewMode('dashboard')}
            className="text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            ← Practice Dashboard
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW: DASHBOARD                                                          */}
      {/* ========================================================================= */}
      {viewMode === 'dashboard' && (
        <div className="space-y-8">
          {/* Hero Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-700 via-indigo-600 to-pink-600 text-white p-6 sm:p-9 shadow-xl shadow-purple-500/15">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md border border-white/25">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>College Placement & Campus Recruitment Simulator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Interview Practice Arena
                </h2>
                <p className="text-sm sm:text-base text-purple-100 max-w-xl font-medium">
                  Master Technical rounds, HR & STAR behavioral prompts, quantitative aptitude, and professional communication skills with instant explanations and score tracking.
                </p>
              </div>

              {/* Quick Stats Pill */}
              <div className="flex items-center gap-4 bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0 shadow-inner">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center font-black">
                  <Trophy className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="text-2xl font-black font-mono tracking-tight text-white">
                    {historySessions.length}
                  </div>
                  <div className="text-xs text-purple-200 font-bold">Sessions Completed</div>
                  {historySessions.length > 0 && (
                    <div className="text-[11px] text-amber-300 font-semibold mt-0.5">
                      Avg. Accuracy: {getAverageScore()}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Difficulty Selection Bar */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Step 1: Choose Difficulty Level
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Difficulty applies when launching any category below
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {difficulties.map((diff) => {
                const isSelected = selectedDifficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/50 text-purple-950 dark:text-purple-100 shadow-sm scale-[1.01]'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-sm">{diff.label}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {diff.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Four Colorful Category Cards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Step 2: Select Category to Start Practice</span>
              </h3>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                Interactive Multiple-Choice Format
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const best = getBestScore(cat.id);
                const questionCount = sampleInterviewMCQQuestions.filter((q) => q.category === cat.id).length;

                return (
                  <div
                    key={cat.id}
                    onClick={() => startSession(cat.id, selectedDifficulty)}
                    className={`group cursor-pointer rounded-3xl p-6 border-2 border-slate-200/90 dark:border-slate-800 ${cat.borderGlow} bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between space-y-4`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${cat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>

                        {best !== null ? (
                          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 tabular-nums">
                            Best: {best}%
                          </span>
                        ) : (
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.badgeTint}`}>
                            {cat.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {cat.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold text-purple-600 dark:text-purple-400">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 font-normal">{questionCount} Qs pool ·</span>
                        <span>Start {selectedDifficulty} Session</span>
                      </div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Practice History */}
          {historySessions.length > 0 && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Recent Practice Sessions
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Saved in Local Storage</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="pb-2.5 font-bold">Date</th>
                      <th className="pb-2.5 font-bold">Category</th>
                      <th className="pb-2.5 font-bold">Difficulty</th>
                      <th className="pb-2.5 font-bold">Score</th>
                      <th className="pb-2.5 font-bold">Accuracy</th>
                      <th className="pb-2.5 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {historySessions.slice(0, 6).map((session) => (
                      <tr key={session.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 text-slate-500 font-mono text-[11px]">{session.date}</td>
                        <td className="py-3 font-extrabold text-slate-800 dark:text-slate-200">
                          {session.categoryLabel}
                        </td>
                        <td className="py-3 font-semibold text-slate-600 dark:text-slate-400">
                          {session.difficulty}
                        </td>
                        <td className="py-3 font-mono font-bold tabular-nums">
                          {session.score} / {session.totalQuestions}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full font-bold font-mono text-[11px] ${
                              session.percentage >= 70
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {session.percentage}%
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setLastSessionRecord(session);
                              setViewMode('results');
                            }}
                            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: ACTIVE PRACTICE SESSION                                             */}
      {/* ========================================================================= */}
      {viewMode === 'practice' && currentQ && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-purple-100 dark:border-purple-900/40 shadow-lg space-y-6 animate-in fade-in duration-200">
          {/* Header Row: Category Badge, Difficulty & Session Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-linear-to-r from-purple-500/15 to-indigo-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                {currentQ.categoryLabel}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {currentQ.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-black font-mono text-purple-600 dark:text-purple-400">
                Question {currentIndex + 1} of {sessionQuestions.length}
              </span>
              {showQuitConfirm ? (
                <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 px-2 py-1 rounded-xl border border-rose-200">
                  <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300">Quit?</span>
                  <button
                    onClick={() => setViewMode('dashboard')}
                    className="text-[11px] font-black text-rose-600 underline cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowQuitConfirm(false)}
                    className="text-[11px] font-bold text-slate-500 cursor-pointer"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowQuitConfirm(true)}
                  className="text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  Quit
                </button>
              )}
            </div>
          </div>

          {/* Interactive Question Jump Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {sessionQuestions.map((q, idx) => {
              const sel = userSelections[q.id];
              const isCurr = idx === currentIndex;
              const hasAnswered = Boolean(sel);
              const isCorr = sel === q.correctOptionId;

              let pillStyle = 'border-slate-200 dark:border-slate-800 text-slate-500';
              if (isCurr) {
                pillStyle = 'border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 ring-2 ring-purple-400 font-black';
              } else if (hasAnswered) {
                pillStyle = isCorr
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                  : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all shrink-0 ${pillStyle}`}
                >
                  <span>Q{idx + 1}</span>
                  {hasAnswered && isCorr && <Check className="w-3 h-3 text-emerald-600" />}
                  {hasAnswered && !isCorr && <XCircle className="w-3 h-3 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-purple-600 via-indigo-600 to-pink-500 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Prompt */}
          <div className="space-y-2">
            <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {currentQ.subtopic}
            </span>
            <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Multiple-Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const selectedOptionId = userSelections[currentQ.id];
              const isSelected = selectedOptionId === opt.id;
              const isCorrectOption = opt.id === currentQ.correctOptionId;

              // Compute styling based on whether question is revealed
              let optionStyle =
                'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 text-slate-800 dark:text-slate-200';
              let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

              if (isRevealed) {
                if (isCorrectOption) {
                  optionStyle =
                    'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold shadow-xs';
                  badgeStyle = 'bg-emerald-600 text-white font-black';
                } else if (isSelected) {
                  optionStyle =
                    'bg-rose-50/90 dark:bg-rose-950/50 border-rose-500 text-rose-950 dark:text-rose-100 font-bold';
                  badgeStyle = 'bg-rose-600 text-white font-black';
                } else {
                  optionStyle =
                    'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isRevealed}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}
                    >
                      {opt.id.replace('opt-', '').toUpperCase()}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                  </div>

                  {isRevealed && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isRevealed && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Card (Triggered upon selecting an answer) */}
          {isRevealed && (
            <div className="p-5 rounded-2xl bg-linear-to-r from-purple-50/90 via-indigo-50/70 to-pink-50/90 dark:from-slate-800 dark:to-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                {userSelections[currentQ.id] === currentQ.correctOptionId ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer! 🎉
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-rose-600 dark:text-rose-400">
                    <XCircle className="w-4 h-4" /> Incorrect Selection
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                <strong className="text-purple-700 dark:text-purple-300 font-bold block mb-1">
                  Why this is correct:
                </strong>
                {currentQ.explanation}
              </p>

              {currentQ.keyTakeaway && (
                <div className="pt-2 border-t border-purple-200/60 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-200 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Key Recruiter Takeaway: {currentQ.keyTakeaway}</span>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls: Previous / Next / Finish */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex < sessionQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-bold bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 transition-all cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishSession}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit & View Results</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: RESULTS PAGE                                                        */}
      {/* ========================================================================= */}
      {viewMode === 'results' && lastSessionRecord && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Result Card Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-purple-100 dark:border-purple-900/40 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-linear-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25">
              <Award className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold">
                <span>{lastSessionRecord.categoryLabel} • {lastSessionRecord.difficulty}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Session Complete!
              </h2>
            </div>

            {/* Score & Accuracy Numbers */}
            <div className="flex items-center justify-center gap-8 py-3">
              <div>
                <div className="text-4xl font-black font-mono text-purple-600 dark:text-purple-400">
                  {lastSessionRecord.score} / {lastSessionRecord.totalQuestions}
                </div>
                <div className="text-xs font-extrabold text-slate-500 mt-1 uppercase tracking-wider">
                  Correct Answers
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <div className="text-4xl font-black font-mono text-slate-900 dark:text-white">
                  {lastSessionRecord.percentage}%
                </div>
                <div className="text-xs font-extrabold text-slate-500 mt-1 uppercase tracking-wider">
                  Accuracy
                </div>
              </div>
            </div>

            {/* Performance Summary & Suggestions for Improvement */}
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-slate-800 border border-purple-200/80 dark:border-purple-900/40 text-left text-xs sm:text-sm space-y-1.5 max-w-xl mx-auto">
              <span className="font-extrabold text-purple-900 dark:text-purple-200 block">
                {lastSessionRecord.percentage === 100
                  ? '🌟 Flawless Mastery!'
                  : lastSessionRecord.percentage >= 75
                  ? '🎉 Solid Performance!'
                  : '🌱 Learning Opportunity'}
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                {lastSessionRecord.percentage >= 80
                  ? 'You demonstrated high clarity and structured problem solving. Challenge yourself by tackling the Advanced difficulty or practicing Communication Skills next!'
                  : lastSessionRecord.percentage >= 60
                  ? 'Good grasp of the foundational concepts! Review the explanations below, particularly regarding trade-offs and edge-case handling.'
                  : 'Take time to review each detailed explanation below. Understand why the alternative answers are common traps in campus interviews.'}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setViewMode('dashboard')}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white shadow-md shadow-purple-500/20 cursor-pointer"
              >
                Back to Interview Dashboard
              </button>
              <button
                onClick={() => startSession(lastSessionRecord.category, lastSessionRecord.difficulty)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Category</span>
              </button>
            </div>
          </div>

          {/* Full Question-by-Question Review */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Detailed Question Review & Explanations
            </h3>

            {lastSessionRecord.results.map((item, idx) => (
              <div
                key={item.questionId}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    Question {idx + 1}
                  </span>
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {item.questionText}
                </p>

                <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-purple-100 dark:border-purple-900/40">
                  <strong className="block text-purple-900 dark:text-purple-200 font-bold mb-1">
                    Explanation & Rationale:
                  </strong>
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: STUDY BANK & EXPLORATION                                            */}
      {/* ========================================================================= */}
      {viewMode === 'study_bank' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Comprehensive Interview Question Bank
              </h3>
              <p className="text-xs text-slate-500">
                Browse all high-yield placement questions with model solutions and recruiter notes.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search topics or terms..."
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {(['all', 'technical', 'hr', 'aptitude', 'communication'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setBankCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  bankCategoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat.toUpperCase()}
              </button>
            ))}

            <span className="text-xs font-bold text-slate-500 ml-2">Difficulty:</span>
            {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setBankDifficultyFilter(diff)}
                className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  bankDifficultyFilter === diff
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredBankQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                No questions found matching your filter criteria.
              </div>
            ) : (
              filteredBankQuestions.map((q) => {
                const isExpanded = expandedBankQuestion === q.id;
                return (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                          {q.categoryLabel}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {q.difficulty}
                        </span>
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-400">
                        {q.subtopic}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </h4>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isCorrect = opt.id === q.correctOptionId;
                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                              isCorrect && isExpanded
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold'
                                : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                              {opt.id.replace('opt-', '').toUpperCase()}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                            {isCorrect && isExpanded && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Expand Solution Button */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => setExpandedBankQuestion(isExpanded ? null : q.id)}
                        className="text-xs font-black text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isExpanded ? 'Hide Solution & Rationale' : 'Reveal Solution & Recruiter Notes'}</span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-slate-800 border border-purple-200/80 dark:border-purple-900/40 text-xs space-y-2 animate-in fade-in duration-200">
                        <div>
                          <strong className="text-purple-900 dark:text-purple-200 font-black block mb-1">
                            Detailed Explanation:
                          </strong>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                        {q.keyTakeaway && (
                          <div className="pt-2 border-t border-purple-200/60 dark:border-purple-900/40 text-purple-900 dark:text-purple-200 font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>Recruiter Note: {q.keyTakeaway}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
