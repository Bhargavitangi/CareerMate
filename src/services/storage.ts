import {
  ResumeData,
  InterviewQuestion,
  InterviewSessionRecord,
  QuizAttemptRecord,
  PortfolioData,
  StudentProfile,
  AppSettings,
} from '../types';
import {
  initialStudentProfile,
  initialSettings,
  sampleResumeData,
  sampleInterviewQuestions,
  samplePortfolioData,
} from '../data/mockData';

const STORAGE_KEYS = {
  PROFILE: 'careermate_profile_v1',
  SETTINGS: 'careermate_settings_v1',
  RESUME: 'careermate_resume_v1',
  INTERVIEW_QUESTIONS: 'careermate_interview_v1',
  INTERVIEW_SESSIONS: 'careermate_interview_sessions_v1',
  QUIZ_ATTEMPTS: 'careermate_quiz_attempts_v1',
  PORTFOLIO: 'careermate_portfolio_v1',
};

export const StorageService = {
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.name === 'Aarav Sharma') {
          parsed.name = '';
        }
        if (parsed.college === 'National Institute of Technology' && !parsed.name) {
          parsed.college = '';
        }
        if (parsed.targetRole === 'Software Development Engineer' && !parsed.name) {
          parsed.targetRole = '';
        }
        return { ...initialStudentProfile, ...parsed };
      }
      return initialStudentProfile;
    } catch {
      return initialStudentProfile;
    }
  },

  saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : initialSettings;
    } catch {
      return initialSettings;
    }
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  getResume(): ResumeData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESUME);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed?.personalInfo?.fullName === 'Aarav Sharma') {
          parsed.personalInfo.fullName = '';
        }
        return parsed;
      }
      return sampleResumeData;
    } catch {
      return sampleResumeData;
    }
  },

  saveResume(resume: ResumeData): void {
    try {
      const updated = { ...resume, lastModified: Date.now() };
      localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save resume', e);
    }
  },

  getInterviewQuestions(): InterviewQuestion[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERVIEW_QUESTIONS);
      if (data) {
        const stored = JSON.parse(data) as InterviewQuestion[];
        // Merge with sample questions so any new questions remain available
        const storedMap = new Map(stored.map((q) => [q.id, q]));
        return sampleInterviewQuestions.map((q) => {
          const match = storedMap.get(q.id);
          return match
            ? { ...q, isBookmarked: match.isBookmarked, userNotes: match.userNotes, mastered: match.mastered }
            : q;
        });
      }
      return sampleInterviewQuestions;
    } catch {
      return sampleInterviewQuestions;
    }
  },

  saveInterviewQuestions(questions: InterviewQuestion[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVIEW_QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save interview questions', e);
    }
  },

  getInterviewSessions(): InterviewSessionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERVIEW_SESSIONS);
      if (data) return JSON.parse(data);
      return [];
    } catch {
      return [];
    }
  },

  saveInterviewSession(session: InterviewSessionRecord): void {
    try {
      const existing = this.getInterviewSessions();
      const updated = [session, ...existing.slice(0, 49)]; // keep up to 50 recent sessions
      localStorage.setItem(STORAGE_KEYS.INTERVIEW_SESSIONS, JSON.stringify(updated));

      // Also update daily streak in profile
      const profile = this.getProfile();
      const today = new Date().toISOString().split('T')[0];
      if (profile.lastActiveDate !== today) {
        profile.streakDays = (profile.streakDays || 0) + 1;
        profile.lastActiveDate = today;
        this.saveProfile(profile);
      }
    } catch (e) {
      console.error('Failed to save interview session', e);
    }
  },

  getQuizAttempts(): QuizAttemptRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      if (data) return JSON.parse(data);
      // Pre-seed with 2 realistic attempts so score charts immediately render nicely
      return [
        {
          id: 'attempt-demo-1',
          date: 'Yesterday',
          category: 'quantitative',
          categoryLabel: 'Quantitative Aptitude',
          totalQuestions: 5,
          correctAnswers: 4,
          timeSpentSeconds: 180,
          percentage: 80,
        },
        {
          id: 'attempt-demo-2',
          date: '3 days ago',
          category: 'logical',
          categoryLabel: 'Logical Reasoning',
          totalQuestions: 5,
          correctAnswers: 5,
          timeSpentSeconds: 145,
          percentage: 100,
        },
      ];
    } catch {
      return [];
    }
  },

  recordQuizAttempt(attempt: QuizAttemptRecord): void {
    try {
      const existing = this.getQuizAttempts();
      const updated = [attempt, ...existing];
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(updated));

      // Also update daily streak in profile
      const profile = this.getProfile();
      const today = new Date().toISOString().split('T')[0];
      if (profile.lastActiveDate !== today) {
        profile.streakDays = (profile.streakDays || 0) + 1;
        profile.lastActiveDate = today;
        this.saveProfile(profile);
      }
    } catch (e) {
      console.error('Failed to record quiz attempt', e);
    }
  },

  getPortfolio(): PortfolioData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed?.fullName === 'Aarav Sharma') {
          parsed.fullName = '';
        }
        return {
          ...samplePortfolioData,
          ...parsed,
          socials: { ...samplePortfolioData.socials, ...(parsed.socials || {}) },
          template: parsed.template || samplePortfolioData.template || 'modern',
          educationList:
            parsed.educationList && parsed.educationList.length > 0
              ? parsed.educationList
              : samplePortfolioData.educationList,
          experienceList:
            parsed.experienceList && parsed.experienceList.length > 0
              ? parsed.experienceList
              : samplePortfolioData.experienceList,
          projects:
            parsed.projects && parsed.projects.length > 0
              ? parsed.projects
              : samplePortfolioData.projects,
          skills:
            parsed.skills && parsed.skills.length > 0 ? parsed.skills : samplePortfolioData.skills,
        };
      }
      return samplePortfolioData;
    } catch {
      return samplePortfolioData;
    }
  },

  savePortfolio(portfolio: PortfolioData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
    } catch (e) {
      console.error('Failed to save portfolio', e);
    }
  },

  exportAllDataJson(): string {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      resume: this.getResume(),
      interviewQuestions: this.getInterviewQuestions(),
      quizAttempts: this.getQuizAttempts(),
      portfolio: this.getPortfolio(),
      settings: this.getSettings(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importAllDataJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (parsed.resume) this.saveResume(parsed.resume);
      if (parsed.interviewQuestions) this.saveInterviewQuestions(parsed.interviewQuestions);
      if (parsed.quizAttempts) {
        localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(parsed.quizAttempts));
      }
      if (parsed.portfolio) this.savePortfolio(parsed.portfolio);
      if (parsed.settings) this.saveSettings(parsed.settings);
      return true;
    } catch (e) {
      console.error('Failed to parse import data', e);
      return false;
    }
  },

  resetAllToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.RESUME);
    localStorage.removeItem(STORAGE_KEYS.INTERVIEW_QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
  },
};
