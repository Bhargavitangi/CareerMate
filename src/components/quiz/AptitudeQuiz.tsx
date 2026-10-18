import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BrainCircuit,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  TrendingUp,
  History,
  Calculator,
  Compass,
  BookA,
  BarChart3,
  HelpCircle,
} from 'lucide-react';
import { QuizQuestion, QuizCategory, QuizAttemptRecord } from '../../types';
import { sampleQuizQuestions } from '../../data/mockData';

interface AptitudeQuizProps {
  quizAttempts: QuizAttemptRecord[];
  onRecordAttempt: (attempt: QuizAttemptRecord) => void;
}

export const AptitudeQuiz: React.FC<AptitudeQuizProps> = ({
  quizAttempts,
  onRecordAttempt,
}) => {
  // Quiz session state
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(300); // 5 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  // Filter pool
  const getQuestionsForCategory = (cat: QuizCategory | 'all') => {
    if (cat === 'all') return sampleQuizQuestions;
    return sampleQuizQuestions.filter((q) => q.category === cat);
  };

  const startQuiz = (cat: QuizCategory | 'all') => {
    const questions = getQuestionsForCategory(cat);
    // Shuffle or pick up to 5 questions
    const picked = [...questions].sort(() => 0.5 - Math.random()).slice(0, 5);
    setSessionQuestions(picked.length > 0 ? picked : questions);
    setSelectedCategory(cat);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeftSeconds(300);
    setQuizSubmitted(false);
    setSessionActive(true);
    setStartTime(Date.now());
  };

  // Timer effect
  useEffect(() => {
    if (!sessionActive || quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionActive, quizSubmitted, userAnswers, sessionQuestions]);

  const selectOption = (questionId: string, optionId: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    setQuizSubmitted(true);

    const timeSpent = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    let correct = 0;
    sessionQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        correct++;
      }
    });

    const percentage = Math.round((correct / sessionQuestions.length) * 100);

    // Trigger confetti if scored 60% or above!
    if (percentage >= 60) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#8b5cf6', '#ec4899'],
        });
      } catch {
        // Ignore
      }
    }

    const categoryLabel =
      selectedCategory === 'all'
        ? 'Mixed Aptitude Mock'
        : sessionQuestions[0]?.categoryLabel || 'Aptitude';

    const newRecord: QuizAttemptRecord = {
      id: `attempt-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      category: selectedCategory as any,
      categoryLabel,
      totalQuestions: sessionQuestions.length,
      correctAnswers: correct,
      timeSpentSeconds: timeSpent,
      percentage,
    };

    onRecordAttempt(newRecord);
  };

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = sessionQuestions[currentQuestionIndex];
  const totalCorrect = sessionQuestions.filter(
    (q) => userAnswers[q.id] === q.correctOptionId
  ).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Active Quiz In-Progress Screen */}
      {sessionActive && !quizSubmitted && currentQ && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-6">
          {/* Top Progress & Timer Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                {currentQ.categoryLabel}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Question {currentQuestionIndex + 1} of {sessionQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
              <Timer className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / sessionQuestions.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug whitespace-pre-line">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = userAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => selectOption(currentQ.id, opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {opt.id.replace('opt-', '').toUpperCase()}
                    </div>
                    <span className="text-xs sm:text-sm">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Toolbar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Previous
            </button>

            {currentQuestionIndex < sessionQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="flex items-center gap-1.5 px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Quiz</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Results Screen with In-Depth Explanations */}
      {sessionActive && quizSubmitted && (
        <div className="space-y-6">
          {/* Result Score Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Quiz Complete!
              </h2>
              <p className="text-xs text-slate-500">
                Placement Aptitude Simulation Performance
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 py-2">
              <div>
                <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                  {totalCorrect} / {sessionQuestions.length}
                </div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Score</div>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
              <div>
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {Math.round((totalCorrect / sessionQuestions.length) * 100)}%
                </div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Accuracy</div>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSessionActive(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                Back to Aptitude Hub
              </button>
              <button
                onClick={() => startQuiz(selectedCategory)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Category</span>
              </button>
            </div>
          </div>

          {/* In-depth Answer Key & Step-by-Step Mathematical Derivations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Detailed Explanations & Step-by-Step Logic
            </h3>

            {sessionQuestions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctOptionId;
              const correctOptObj = q.options.find((o) => o.id === q.correctOptionId);
              const userOptObj = q.options.find((o) => o.id === selectedOpt);

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Q{idx + 1}. {q.categoryLabel}
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white whitespace-pre-line">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isCorrect
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      }`}
                    >
                      <span className="font-bold block">Your Answer:</span>
                      <span>{userOptObj?.text || 'Not Answered'}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                      <span className="font-bold block">Correct Answer:</span>
                      <span>{correctOptObj?.text}</span>
                    </div>
                  </div>

                  {/* Formula if present */}
                  {q.formulaOrRule && (
                    <div className="p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 text-xs text-indigo-900 dark:text-indigo-300 font-mono">
                      <strong>Formula / Rule: </strong>
                      {q.formulaOrRule}
                    </div>
                  )}

                  {/* Step-by-step logic */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line border border-slate-200/70 dark:border-slate-800 font-sans">
                    <strong className="block text-slate-900 dark:text-white mb-1">
                      Step-by-step Explanation:
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Aptitude Hub Screen (When not in an active quiz) */}
      {!sessionActive && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                  Campus Placement OA Tests
                </span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-500">Timed Practice Simulator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Aptitude Quizzes & Online Assessment Prep
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Master quantitative, logical reasoning, and verbal tests demanded by top tech firms.
              </p>
            </div>

            <button
              onClick={() => startQuiz('all')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors shrink-0"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Full Mock Test (All Topics)</span>
            </button>
          </div>

          {/* 4 Aptitude Category Launchers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                id: 'quantitative' as QuizCategory,
                title: 'Quantitative',
                desc: 'Work & Time, Permutations, Speed & Distance, Percentages',
                icon: Calculator,
                color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
              },
              {
                id: 'logical' as QuizCategory,
                title: 'Logical Reasoning',
                desc: 'Syllogisms, Blood Relations, Number Series, Arrangements',
                icon: Compass,
                color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
              },
              {
                id: 'verbal' as QuizCategory,
                title: 'Verbal Ability',
                desc: 'Grammar rules, Antonyms, Sentence Correction, Reading Comprehension',
                icon: BookA,
                color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
              },
              {
                id: 'data_interpretation' as QuizCategory,
                title: 'Data Interpretation',
                desc: 'CAGR, Charts, Tables, Ratio analysis for placement tests',
                icon: BarChart3,
                color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/50',
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => startQuiz(cat.id)}
                  className="cursor-pointer group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span>Start 5-min Test</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Historical Score Tracking & Performance Records */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Score Tracking & Recent Assessment History
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {quizAttempts.length} Attempts Logged
              </span>
            </div>

            {quizAttempts.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No quiz attempts logged yet. Complete your first test above to see your score tracking!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="pb-2.5 font-semibold">Date</th>
                      <th className="pb-2.5 font-semibold">Test Category</th>
                      <th className="pb-2.5 font-semibold">Score</th>
                      <th className="pb-2.5 font-semibold">Accuracy</th>
                      <th className="pb-2.5 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 font-sans">
                    {quizAttempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 text-slate-500 font-mono text-[11px]">{attempt.date}</td>
                        <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                          {attempt.categoryLabel}
                        </td>
                        <td className="py-3 font-mono tabular-nums">
                          {attempt.correctAnswers} / {attempt.totalQuestions}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md font-bold font-mono text-[11px] ${
                              attempt.percentage >= 80
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {attempt.percentage}%
                          </span>
                        </td>
                        <td className="py-3 text-slate-500 font-mono text-[11px]">
                          {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
