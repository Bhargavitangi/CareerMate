export type NavDestination = 'home' | 'resume' | 'interview' | 'quiz' | 'portfolio' | 'settings' | 'kotlin_hub';

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentColor = 'indigo' | 'emerald' | 'amber' | 'rose';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string; // e.g. "CGPA: 8.9/10"
  location: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletPoints: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  bulletPoints: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolioUrl: string;
    summary: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: {
    languages: string[];
    frameworks: string[];
    developerTools: string[];
    coreConcepts: string[];
  };
  certifications: CertificationItem[];
  lastModified: number;
}

export type QuestionCategory = 'behavioral' | 'dsa' | 'core_cs' | 'system_design';
export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  categoryLabel: string;
  difficulty: QuestionDifficulty;
  question: string;
  subtopic: string;
  modelAnswer: string;
  keyPoints: string[];
  starBreakdown?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
  isBookmarked?: boolean;
  userNotes?: string;
  mastered?: boolean;
}

export type InterviewCategory = 'technical' | 'hr' | 'aptitude' | 'communication';
export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InterviewMCQOption {
  id: string;
  text: string;
}

export interface InterviewMCQQuestion {
  id: string;
  category: InterviewCategory;
  categoryLabel: string;
  difficulty: InterviewDifficulty;
  question: string;
  subtopic: string;
  options: InterviewMCQOption[];
  correctOptionId: string;
  explanation: string;
  keyTakeaway?: string;
}

export interface InterviewSessionResultItem {
  questionId: string;
  questionText: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  explanation: string;
}

export interface InterviewSessionRecord {
  id: string;
  date: string;
  timestamp: number;
  category: InterviewCategory;
  categoryLabel: string;
  difficulty: InterviewDifficulty;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds?: number;
  results: InterviewSessionResultItem[];
}

export type QuizCategory = 'quantitative' | 'logical' | 'verbal' | 'data_interpretation';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  categoryLabel: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  formulaOrRule?: string;
}

export interface QuizAttemptRecord {
  id: string;
  date: string;
  category: QuizCategory;
  categoryLabel: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  percentage: number;
}

export type PortfolioTemplate = 'modern' | 'creative' | 'minimal';

export interface PortfolioProject {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  github?: string;
  demo?: string;
}

export interface PortfolioEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  year: string;
  score?: string;
}

export interface PortfolioExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioData {
  fullName: string;
  headline: string;
  avatarUrl: string;
  bio: string;
  targetRole: string;
  university: string;
  graduationYear: string;
  educationList?: PortfolioEducation[];
  experienceList?: PortfolioExperience[];
  skills: string[];
  projects: PortfolioProject[];
  socials: {
    github: string;
    linkedin: string;
    leetcode?: string;
    email: string;
    website?: string;
    phone?: string;
  };
  template?: PortfolioTemplate;
  theme?: 'modern_slate' | 'nordic_forest' | 'cyber_terminal' | 'midnight_indigo';
}

export interface StudentProfile {
  name: string;
  email: string;
  college: string;
  graduationYear: string;
  targetRole: string;
  dreamCompanies: string[];
  streakDays: number;
  lastActiveDate: string;
  targetPlacementDate: string;
}

export interface AppSettings {
  themeMode: ThemeMode;
  accentColor: AccentColor;
  viewMode: 'device_frame' | 'responsive';
  soundEnabled: boolean;
  hapticFeedback: boolean;
}
