import React, { useState, useEffect } from 'react';
import {
  NavDestination,
  StudentProfile,
  AppSettings,
  ResumeData,
  InterviewQuestion,
  QuizAttemptRecord,
  PortfolioData,
  ThemeMode,
} from './types';
import { StorageService } from './services/storage';
import { DeviceFrame } from './components/common/DeviceFrame';
import { MaterialTopAppBar } from './components/common/MaterialTopAppBar';
import { MaterialNavigationBar } from './components/common/MaterialNavigationBar';
import { WelcomeNameModal } from './components/common/WelcomeNameModal';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { ResumeBuilder } from './components/resume/ResumeBuilder';
import { InterviewHub } from './components/interview/InterviewHub';
import { AptitudeQuiz } from './components/quiz/AptitudeQuiz';
import { PortfolioCreator } from './components/portfolio/PortfolioCreator';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { KotlinArchitectureHub } from './components/android/KotlinArchitectureHub';

export default function App() {
  // Navigation
  const [currentNav, setCurrentNav] = useState<NavDestination>('home');

  // Application Data States initialized from Local Storage
  const [profile, setProfile] = useState<StudentProfile>(() => StorageService.getProfile());
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [resume, setResume] = useState<ResumeData>(() => StorageService.getResume());
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>(() =>
    StorageService.getInterviewQuestions()
  );
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRecord[]>(() =>
    StorageService.getQuizAttempts()
  );
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => StorageService.getPortfolio());

  // Show Welcome Name Modal on first visit if user has not entered a name yet
  const [showNameModal, setShowNameModal] = useState<boolean>(() => {
    const existing = StorageService.getProfile();
    return !existing.name || existing.name.trim().length === 0;
  });

  // Dark Mode effect
  useEffect(() => {
    const isDark =
      settings.themeMode === 'dark' ||
      (settings.themeMode === 'system' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.themeMode]);

  // Accent theme colors mapping
  const getAccentClass = () => {
    switch (settings.accentColor) {
      case 'emerald':
        return 'theme-emerald';
      case 'amber':
        return 'theme-amber';
      case 'rose':
        return 'theme-rose';
      default:
        return 'theme-indigo';
    }
  };

  // Quick theme toggle
  const handleToggleTheme = () => {
    const nextMode: ThemeMode = settings.themeMode === 'dark' ? 'light' : 'dark';
    handleUpdateSettings({ ...settings, themeMode: nextMode });
  };

  // Profile mutator
  const handleUpdateProfile = (updated: StudentProfile) => {
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  // Save Name, University, and Career Target from Welcome / Edit Modal
  const handleSaveNameFromModal = (name: string, college?: string, targetRole?: string) => {
    const updatedProfile: StudentProfile = {
      ...profile,
      name,
      college: college !== undefined ? college : (profile.college || ''),
      targetRole: targetRole !== undefined ? targetRole : (profile.targetRole || ''),
    };
    handleUpdateProfile(updatedProfile);

    // If resume full name is empty, sync it
    if (!resume.personalInfo.fullName || !resume.personalInfo.fullName.trim()) {
      const updatedResume: ResumeData = {
        ...resume,
        personalInfo: { ...resume.personalInfo, fullName: name },
      };
      handleUpdateResume(updatedResume);
    }

    // Keep portfolio in sync with name, university, and role if empty
    if (!portfolio.fullName || !portfolio.fullName.trim()) {
      const updatedPortfolio: PortfolioData = {
        ...portfolio,
        fullName: name,
        university: college || portfolio.university,
        targetRole: targetRole || portfolio.targetRole,
      };
      handleUpdatePortfolio(updatedPortfolio);
    }
  };

  // Settings mutator
  const handleUpdateSettings = (updated: AppSettings) => {
    setSettings(updated);
    StorageService.saveSettings(updated);
  };

  // Resume mutator
  const handleUpdateResume = (updated: ResumeData) => {
    setResume(updated);
    StorageService.saveResume(updated);
  };

  // Interview Questions mutator
  const handleUpdateQuestions = (updated: InterviewQuestion[]) => {
    setInterviewQuestions(updated);
    StorageService.saveInterviewQuestions(updated);
  };

  // Record Quiz Attempt
  const handleRecordQuizAttempt = (attempt: QuizAttemptRecord) => {
    StorageService.recordQuizAttempt(attempt);
    setQuizAttempts(StorageService.getQuizAttempts());
    setProfile(StorageService.getProfile());
  };

  // Portfolio mutator
  const handleUpdatePortfolio = (updated: PortfolioData) => {
    setPortfolio(updated);
    StorageService.savePortfolio(updated);
  };

  // Export Full Data
  const handleExportAllData = () => {
    const jsonStr = StorageService.exportAllDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (profile.name || 'student').replace(/\s+/g, '_');
    a.download = `careermate_all_data_${safeName}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import Full Data
  const handleImportAllData = (jsonStr: string) => {
    const success = StorageService.importAllDataJson(jsonStr);
    if (success) {
      setProfile(StorageService.getProfile());
      setSettings(StorageService.getSettings());
      setResume(StorageService.getResume());
      setInterviewQuestions(StorageService.getInterviewQuestions());
      setQuizAttempts(StorageService.getQuizAttempts());
      setPortfolio(StorageService.getPortfolio());
    }
    return success;
  };

  // Reset to Factory Default
  const handleResetAllData = () => {
    StorageService.resetAllToDefault();
    setProfile(StorageService.getProfile());
    setSettings(StorageService.getSettings());
    setResume(StorageService.getResume());
    setInterviewQuestions(StorageService.getInterviewQuestions());
    setQuizAttempts(StorageService.getQuizAttempts());
    setPortfolio(StorageService.getPortfolio());
    setShowNameModal(true);
  };

  // Device mode toggle
  const toggleDeviceMode = () => {
    const nextMode = settings.viewMode === 'device_frame' ? 'responsive' : 'device_frame';
    handleUpdateSettings({ ...settings, viewMode: nextMode });
  };

  // Navigation Title Mapping
  const getNavTitle = () => {
    switch (currentNav) {
      case 'home':
        return {
          title: 'CareerMate',
          subtitle: profile.targetRole || 'College Placement Prep',
        };
      case 'resume':
        return {
          title: 'Resume Builder',
          subtitle: 'ATS-Optimized & Real-Time Parser',
        };
      case 'interview':
        return {
          title: 'Interview Practice',
          subtitle: 'STAR Method & Tech Foundations',
        };
      case 'quiz':
        return {
          title: 'Aptitude Assessments',
          subtitle: 'Timed Quizzes & Explanations',
        };
      case 'portfolio':
        return {
          title: 'Student Portfolio',
          subtitle: 'Showcase & Shareable Web Profile',
        };
      case 'settings':
        return {
          title: 'Settings',
          subtitle: 'Profile, Appearance & Local Storage',
        };
      case 'kotlin_hub':
        return {
          title: 'Kotlin & Compose Architecture',
          subtitle: 'Android Studio Code & Signed AAB Guide',
        };
      default:
        return { title: 'CareerMate', subtitle: 'Placement Companion' };
    }
  };

  const navInfo = getNavTitle();

  return (
    <DeviceFrame
      isDeviceMode={settings.viewMode === 'device_frame'}
      onToggleMode={toggleDeviceMode}
    >
      <div
        className={`min-h-full flex flex-col bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${getAccentClass()}`}
      >
        {/* Material 3 Top App Bar */}
        <MaterialTopAppBar
          title={navInfo.title}
          subtitle={navInfo.subtitle}
          currentNav={currentNav}
          onNavigate={(dest) => setCurrentNav(dest)}
          streakDays={profile.streakDays || 5}
          userName={profile.name}
          themeMode={settings.themeMode}
          onToggleTheme={handleToggleTheme}
          onOpenNameModal={() => setShowNameModal(true)}
          isDeviceMode={settings.viewMode === 'device_frame'}
          onToggleDeviceMode={toggleDeviceMode}
        />

        {/* Dynamic Destination Screen */}
        <main className="flex-1 w-full pb-8">
          {currentNav === 'home' && (
            <HomeDashboard
              profile={profile}
              resume={resume}
              quizAttempts={quizAttempts}
              onNavigate={(dest) => setCurrentNav(dest)}
              onUpdateProfile={handleUpdateProfile}
              onOpenNameModal={() => setShowNameModal(true)}
            />
          )}

          {currentNav === 'resume' && (
            <ResumeBuilder
              resume={resume}
              onUpdateResume={handleUpdateResume}
              studentName={profile.name}
            />
          )}

          {currentNav === 'interview' && (
            <InterviewHub
              questions={interviewQuestions}
              onUpdateQuestions={handleUpdateQuestions}
            />
          )}

          {currentNav === 'quiz' && (
            <AptitudeQuiz
              quizAttempts={quizAttempts}
              onRecordAttempt={handleRecordQuizAttempt}
            />
          )}

          {currentNav === 'portfolio' && (
            <PortfolioCreator
              portfolio={portfolio}
              onUpdatePortfolio={handleUpdatePortfolio}
              studentName={profile.name}
            />
          )}

          {currentNav === 'settings' && (
            <SettingsScreen
              profile={profile}
              settings={settings}
              onUpdateProfile={handleUpdateProfile}
              onUpdateSettings={handleUpdateSettings}
              onExportAllData={handleExportAllData}
              onImportAllData={handleImportAllData}
              onResetAllData={handleResetAllData}
            />
          )}

          {currentNav === 'kotlin_hub' && <KotlinArchitectureHub />}
        </main>

        {/* Material 3 Navigation Bar (Bottom Navigation) */}
        <MaterialNavigationBar
          currentNav={currentNav}
          onNavigate={(dest) => setCurrentNav(dest)}
        />

        {/* First Visit / Profile Name Welcome Modal */}
        <WelcomeNameModal
          isOpen={showNameModal}
          onClose={() => setShowNameModal(false)}
          currentProfile={profile}
          onSaveName={handleSaveNameFromModal}
          isInitialPrompt={!profile.name || profile.name.trim().length === 0}
        />
      </div>
    </DeviceFrame>
  );
}
