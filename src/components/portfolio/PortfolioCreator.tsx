import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  Copy,
  Palette,
  Sparkles,
  Printer,
  Globe,
  GraduationCap,
  Layers,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  RotateCcw,
  Check,
  User,
  Share2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import {
  PortfolioData,
  PortfolioProject,
  PortfolioEducation,
  PortfolioExperience,
  PortfolioTemplate,
} from '../../types';
import { samplePortfolioData } from '../../data/mockData';

interface PortfolioCreatorProps {
  portfolio: PortfolioData;
  onUpdatePortfolio: (updated: PortfolioData) => void;
  studentName?: string;
}

// Preset student avatars for instant visual polish
const AVATAR_PRESETS = [
  {
    label: 'Tech Student 1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Tech Student 2',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Tech Student 3',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Tech Student 4',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

// Preset project images
const PROJECT_IMAGE_PRESETS = [
  {
    label: 'Mobile App',
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Backend & Cloud',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Web Platform',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Data & AI',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
];

// Popular quick skills recommendations
const POPULAR_SKILLS = [
  'Kotlin',
  'Jetpack Compose',
  'Java',
  'Spring Boot',
  'React',
  'TypeScript',
  'Python',
  'SQL',
  'Docker',
  'Git',
  'System Design',
  'PostgreSQL',
];

export const PortfolioCreator: React.FC<PortfolioCreatorProps> = ({
  portfolio,
  onUpdatePortfolio,
  studentName,
}) => {
  // Active Mode: 'edit' or 'preview'
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Active section inside the editor accordion / tabs
  const [editorSection, setEditorSection] = useState<
    'profile' | 'education' | 'experience' | 'skills' | 'projects' | 'contact' | 'theme'
  >('profile');

  // Fallback for full name
  const effectiveFullName = portfolio.fullName.trim() || studentName?.trim() || 'Alex Morgan';
  const currentTemplate: PortfolioTemplate = portfolio.template || 'modern';

  // Save changes explicitly with visual feedback
  const handleManualSave = () => {
    onUpdatePortfolio({ ...portfolio });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2800);
  };

  // Copy shareable link
  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#portfolio`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);

      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#3b82f6', '#10b981'],
        });
      } catch {
        // Ignore
      }
    }
  };

  const handlePrintPortfolio = () => {
    window.print();
  };

  const handleResetToSample = () => {
    if (window.confirm('Reset portfolio to recommended student starter content?')) {
      onUpdatePortfolio({ ...samplePortfolioData });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    }
  };

  // Field updater
  const updateField = (field: keyof PortfolioData, value: any) => {
    onUpdatePortfolio({ ...portfolio, [field]: value });
  };

  // Social field updater
  const updateSocial = (key: keyof typeof portfolio.socials, value: string) => {
    onUpdatePortfolio({
      ...portfolio,
      socials: { ...portfolio.socials, [key]: value },
    });
  };

  // Skill management
  const handleAddSkill = (skillToAdd: string) => {
    const clean = skillToAdd.trim();
    if (!clean) return;
    if (!portfolio.skills.includes(clean)) {
      onUpdatePortfolio({
        ...portfolio,
        skills: [...portfolio.skills, clean],
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdatePortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((s) => s !== skillToRemove),
    });
  };

  // Project management
  const handleAddProject = () => {
    const newProj: PortfolioProject = {
      id: `p-${Date.now()}`,
      title: 'New Featured Project',
      tagline: 'Modern, high-performance application built for campus users',
      description: 'Detail the problem statement, technical stack, architecture, and measurable outcomes.',
      tags: ['Kotlin', 'Compose', 'Coroutines'],
      imageUrl: PROJECT_IMAGE_PRESETS[0].url,
      github: 'https://github.com/your-username/project',
      demo: 'https://project-demo.dev',
    };
    onUpdatePortfolio({
      ...portfolio,
      projects: [newProj, ...portfolio.projects],
    });
  };

  const handleUpdateProject = (id: string, updates: Partial<PortfolioProject>) => {
    const updated = portfolio.projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    onUpdatePortfolio({ ...portfolio, projects: updated });
  };

  const handleRemoveProject = (id: string) => {
    onUpdatePortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((p) => p.id !== id),
    });
  };

  // Education management
  const educationList: PortfolioEducation[] = portfolio.educationList || [
    {
      id: 'edu-def-1',
      institution: portfolio.university || 'National Institute of Technology',
      degree: 'B.Tech in Computer Science & Engineering',
      fieldOfStudy: 'Computer Science',
      year: portfolio.graduationYear || '2022 - 2026',
      score: 'CGPA: 8.92 / 10.0',
    },
  ];

  const handleAddEducation = () => {
    const newEdu: PortfolioEducation = {
      id: `edu-${Date.now()}`,
      institution: 'University / Institute Name',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science & Engineering',
      year: '2022 - 2026',
      score: 'CGPA: 8.8 / 10.0',
    };
    onUpdatePortfolio({
      ...portfolio,
      educationList: [...educationList, newEdu],
    });
  };

  const handleUpdateEducation = (id: string, updates: Partial<PortfolioEducation>) => {
    const updated = educationList.map((e) => (e.id === id ? { ...e, ...updates } : e));
    onUpdatePortfolio({ ...portfolio, educationList: updated });
  };

  const handleRemoveEducation = (id: string) => {
    onUpdatePortfolio({
      ...portfolio,
      educationList: educationList.filter((e) => e.id !== id),
    });
  };

  // Experience management
  const experienceList: PortfolioExperience[] = portfolio.experienceList || [
    {
      id: 'exp-def-1',
      role: 'Android & Full-Stack Developer Intern',
      company: 'Veloce Mobility Labs',
      period: 'May 2025 - Jul 2025',
      description:
        'Architected native Android telemetry module using Kotlin, Jetpack Compose, and Coroutines, reducing battery drain by 28%. Implemented offline caching layer with Room DB.',
    },
  ];

  const handleAddExperience = () => {
    const newExp: PortfolioExperience = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineering Intern',
      company: 'Tech Company / Startup',
      period: 'Jun 2025 - Aug 2025',
      description: 'Built customer-facing APIs and interactive UI components with 99.9% uptime.',
    };
    onUpdatePortfolio({
      ...portfolio,
      experienceList: [...experienceList, newExp],
    });
  };

  const handleUpdateExperience = (id: string, updates: Partial<PortfolioExperience>) => {
    const updated = experienceList.map((e) => (e.id === id ? { ...e, ...updates } : e));
    onUpdatePortfolio({ ...portfolio, experienceList: updated });
  };

  const handleRemoveExperience = (id: string) => {
    onUpdatePortfolio({
      ...portfolio,
      experienceList: experienceList.filter((e) => e.id !== id),
    });
  };

  // =========================================================================
  // TEMPLATE STYLING RESOLUTION
  // =========================================================================
  const getThemePalette = () => {
    switch (portfolio.theme) {
      case 'nordic_forest':
        return {
          headerGrad: 'from-emerald-700 via-teal-700 to-green-800',
          accentText: 'text-emerald-600 dark:text-emerald-400',
          pillBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
          cardBorder: 'border-emerald-200 dark:border-emerald-900/60',
          buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        };
      case 'cyber_terminal':
        return {
          headerGrad: 'from-slate-900 via-purple-950 to-black',
          accentText: 'text-emerald-400 font-mono',
          pillBg: 'bg-slate-900 text-emerald-300 border-emerald-800 font-mono',
          cardBorder: 'border-emerald-500/30',
          buttonBg: 'bg-emerald-500 hover:bg-emerald-600 text-black font-mono font-bold',
        };
      case 'midnight_indigo':
        return {
          headerGrad: 'from-indigo-900 via-purple-900 to-slate-950',
          accentText: 'text-indigo-600 dark:text-indigo-400',
          pillBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
          cardBorder: 'border-indigo-200 dark:border-indigo-900/60',
          buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        };
      default: // modern_slate
        return {
          headerGrad: 'from-purple-700 via-indigo-600 to-pink-600',
          accentText: 'text-purple-600 dark:text-purple-400',
          pillBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800/60',
          cardBorder: 'border-purple-100 dark:border-purple-900/40',
          buttonBg: 'bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white shadow-md shadow-purple-500/20',
        };
    }
  };

  const themeColors = getThemePalette();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification for Saving */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-xs font-black animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Portfolio Saved to Local Storage! 🎉</span>
        </div>
      )}

      {/* Header Banner & Mode Controls */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-linear-to-r from-purple-500/15 to-indigo-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
              Interactive Digital Showcase
            </span>
            <span className="text-xs font-semibold text-slate-500">· Campus Placement Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Student Portfolio Creator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Highlight your projects, education, internship experience, skills, and coding handles in 3 modern presentation templates.
          </p>
        </div>

        {/* Tab Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'edit'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>Edit Sections</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Preview</span>
          </button>

          <button
            onClick={handleManualSave}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
            title="Save changes to local storage"
          >
            <Check className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE: EDIT SECTIONS                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'edit' ? (
        <div className="space-y-6">
          {/* Section Navigation Pills */}
          <div className="no-print flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'profile', label: '👤 Profile & Photo' },
              { id: 'education', label: '🎓 Education' },
              { id: 'experience', label: '💼 Experience' },
              { id: 'skills', label: '🛠️ Skills' },
              { id: 'projects', label: '🚀 Projects' },
              { id: 'contact', label: '📬 Contact & Social' },
              { id: 'theme', label: '🎨 Template & Style' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setEditorSection(sec.id as any)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  editorSection === sec.id
                    ? 'bg-purple-600 text-white shadow-sm font-black'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* SECTION 1: PROFILE & PHOTO */}
          {editorSection === 'profile' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Personal Information & Photo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Basic information that introduces you to campus recruiters.
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Step 1 of 7</span>
              </div>

              {/* Avatar Photo Selection */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 space-y-3">
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200">
                  Profile Photo / Avatar
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src={portfolio.avatarUrl || AVATAR_PRESETS[0].url}
                    alt="Preview Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500 shadow-sm"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={portfolio.avatarUrl}
                      onChange={(e) => updateField('avatarUrl', e.target.value)}
                      placeholder="Enter Image URL (or pick a preset below)"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-bold">Quick Presets:</span>
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => updateField('avatarUrl', preset.url)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500 cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={portfolio.fullName || studentName || ''}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Headline
                  </label>
                  <input
                    type="text"
                    value={portfolio.headline}
                    onChange={(e) => updateField('headline', e.target.value)}
                    placeholder="e.g. Pre-final Year CS Student & Android Compose Developer"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={portfolio.targetRole}
                    onChange={(e) => updateField('targetRole', e.target.value)}
                    placeholder="e.g. Software Development Engineer (SDE)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Graduation Year / Class
                  </label>
                  <input
                    type="text"
                    value={portfolio.graduationYear}
                    onChange={(e) => updateField('graduationYear', e.target.value)}
                    placeholder="e.g. Class of 2026"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    University / College Name
                  </label>
                  <input
                    type="text"
                    value={portfolio.university}
                    onChange={(e) => updateField('university', e.target.value)}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Short Introduction / Bio
                  </label>
                  <textarea
                    rows={3}
                    value={portfolio.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    placeholder="Share your technical interests, problem-solving mindset, and hackathon highlights."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setEditorSection('education')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                >
                  <span>Next: Education</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: EDUCATION */}
          {editorSection === 'education' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Education History
                  </h3>
                  <p className="text-xs text-slate-500">
                    Degrees, colleges, academic years, and grades.
                  </p>
                </div>
                <button
                  onClick={handleAddEducation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400">
                        Education #{idx + 1}
                      </span>
                      {educationList.length > 1 && (
                        <button
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          title="Remove education"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Institution / University
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(edu.id, { institution: e.target.value })}
                          placeholder="e.g. National Institute of Technology"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Degree & Major
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                          placeholder="e.g. B.Tech in Computer Science & Engineering"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Years / Period
                        </label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleUpdateEducation(edu.id, { year: e.target.value })}
                          placeholder="e.g. 2022 - 2026"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Grade / CGPA / Percentage
                        </label>
                        <input
                          type="text"
                          value={edu.score || ''}
                          onChange={(e) => handleUpdateEducation(edu.id, { score: e.target.value })}
                          placeholder="e.g. CGPA: 8.92 / 10.0"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setEditorSection('profile')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Back to Profile
                </button>
                <button
                  onClick={() => setEditorSection('experience')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                >
                  <span>Next: Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: EXPERIENCE */}
          {editorSection === 'experience' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Internships & Experience
                  </h3>
                  <p className="text-xs text-slate-500">
                    Roles, companies, campus club responsibilities, and technical contributions.
                  </p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400">
                        Experience #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        title="Remove experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Job Title / Role
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleUpdateExperience(exp.id, { role: e.target.value })}
                          placeholder="e.g. Android Developer Intern"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                          placeholder="e.g. Veloce Mobility Labs"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => handleUpdateExperience(exp.id, { period: e.target.value })}
                          placeholder="e.g. May 2025 - Jul 2025"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Impact & Responsibilities
                      </label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                        placeholder="Detail the metrics achieved, libraries used, and features delivered."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setEditorSection('education')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Back to Education
                </button>
                <button
                  onClick={() => setEditorSection('skills')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                >
                  <span>Next: Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 4: SKILLS */}
          {editorSection === 'skills' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Technical Skills & Tools
                  </h3>
                  <p className="text-xs text-slate-500">
                    Languages, frameworks, developer tools, and core competencies.
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {portfolio.skills.length} Skills Listed
                </span>
              </div>

              {/* Add Custom Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(newSkillInput);
                    }
                  }}
                  placeholder="Type a skill and press Enter (e.g., GraphQL, Docker, C++)..."
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(newSkillInput)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 cursor-pointer shrink-0"
                >
                  Add Skill
                </button>
              </div>

              {/* Current Active Skills Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Your Current Skills:
                </label>
                <div className="flex flex-wrap gap-2 min-h-12 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  {portfolio.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 shadow-xs"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-rose-500 font-bold ml-1 cursor-pointer"
                        title="Remove skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Add Recommendations */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 space-y-2">
                <span className="text-xs font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Tech Skills (Click to add):</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SKILLS.filter((s) => !portfolio.skills.includes(s)).map((popSkill) => (
                    <button
                      key={popSkill}
                      type="button"
                      onClick={() => handleAddSkill(popSkill)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 cursor-pointer"
                    >
                      + {popSkill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setEditorSection('experience')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Back to Experience
                </button>
                <button
                  onClick={() => setEditorSection('projects')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                >
                  <span>Next: Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 5: PROJECTS */}
          {editorSection === 'projects' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Showcase Projects
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add, edit, and remove software projects with images, live demos, and GitHub links.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {portfolio.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400">
                        Project #{idx + 1}
                      </span>
                      {portfolio.projects.length > 1 && (
                        <button
                          onClick={() => handleRemoveProject(proj.id)}
                          className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          title="Remove project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(proj.id, { title: e.target.value })}
                          placeholder="e.g. CampusRide Android App"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          One-line Tagline
                        </label>
                        <input
                          type="text"
                          value={proj.tagline || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { tagline: e.target.value })}
                          placeholder="e.g. Peer Carpooling & Shuttle Tracker for Universities"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          GitHub Repository URL
                        </label>
                        <input
                          type="text"
                          value={proj.github || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { github: e.target.value })}
                          placeholder="https://github.com/username/project"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Live Demo URL
                        </label>
                        <input
                          type="text"
                          value={proj.demo || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { demo: e.target.value })}
                          placeholder="https://project-demo.dev"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>
                    </div>

                    {/* Project Image Selection */}
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        Project Cover Image
                      </label>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {proj.imageUrl && (
                          <img
                            src={proj.imageUrl}
                            alt="Project Preview"
                            className="w-20 h-12 rounded-lg object-cover border border-slate-200"
                          />
                        )}
                        <input
                          type="text"
                          value={proj.imageUrl || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { imageUrl: e.target.value })}
                          placeholder="Enter Image URL or pick preset below"
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400 font-bold">Presets:</span>
                        {PROJECT_IMAGE_PRESETS.map((pip, pidx) => (
                          <button
                            key={pidx}
                            type="button"
                            onClick={() => handleUpdateProject(proj.id, { imageUrl: pip.url })}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 cursor-pointer"
                          >
                            {pip.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Description & Architecture
                      </label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                        placeholder="Detail technical implementation, metrics, and architecture."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Technologies Used (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={proj.tags.join(', ')}
                        onChange={(e) =>
                          handleUpdateProject(proj.id, {
                            tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        placeholder="Kotlin, Jetpack Compose, Coroutines, Room DB"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setEditorSection('skills')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Back to Skills
                </button>
                <button
                  onClick={() => setEditorSection('contact')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                >
                  <span>Next: Contact Links</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 6: CONTACT & SOCIAL */}
          {editorSection === 'contact' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Contact & Professional Handles
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct communication and coding profile links for hiring recruiters.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={portfolio.socials.email}
                    onChange={(e) => updateSocial('email', e.target.value)}
                    placeholder="student@campus.edu"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={portfolio.socials.phone || ''}
                    onChange={(e) => updateSocial('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={portfolio.socials.linkedin}
                    onChange={(e) => updateSocial('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    value={portfolio.socials.github}
                    onChange={(e) => updateSocial('github', e.target.value)}
                    placeholder="https://github.com/your-username"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    LeetCode / Coding Platform URL
                  </label>
                  <input
                    type="text"
                    value={portfolio.socials.leetcode || ''}
                    onChange={(e) => updateSocial('leetcode', e.target.value)}
                    placeholder="https://leetcode.com/username"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Personal Website / Blog
                  </label>
                  <input
                    type="text"
                    value={portfolio.socials.website || ''}
                    onChange={(e) => updateSocial('website', e.target.value)}
                    placeholder="https://yourdomain.dev"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setEditorSection('projects')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Back to Projects
                </button>
                <button
                  onClick={() => setEditorSection('theme')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                >
                  <span>Next: Template & Style</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 7: TEMPLATES & VISUAL THEMES */}
          {editorSection === 'theme' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Portfolio Template & Theme Styles
                </h3>
                <p className="text-xs text-slate-500">
                  Select between 3 visually distinct portfolio templates and color schemes.
                </p>
              </div>

              {/* 3 VISUALLY DISTINCT TEMPLATES */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200">
                  Select Presentation Template:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'modern' as PortfolioTemplate,
                      name: 'Modern Template',
                      tagline: 'Sleek Tech & Gradient Cards',
                      desc: 'Clean software engineering aesthetics, gradient header banner, glowing badges, and card grid.',
                    },
                    {
                      id: 'creative' as PortfolioTemplate,
                      name: 'Creative Template',
                      tagline: 'Playful & Bold Visuals',
                      desc: 'Vibrant color accents, friendly rounded layout, expressive badges, and colorful highlights.',
                    },
                    {
                      id: 'minimal' as PortfolioTemplate,
                      name: 'Minimal Template',
                      tagline: 'Refined Editorial Monochrome',
                      desc: 'Harvard/Silicon Valley minimalist style, crisp typography, subtle hairline borders, and pure focus on substance.',
                    },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => updateField('template', tpl.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        currentTemplate === tpl.id
                          ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/50 shadow-md scale-[1.02]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-purple-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            {tpl.name}
                          </span>
                          {currentTemplate === tpl.id && (
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block mt-0.5">
                          {tpl.tagline}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {tpl.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR SCHEMES */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200">
                  Color Accent Palette:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'modern_slate', name: 'Modern Slate', desc: 'Purple & Electric Blue' },
                    { id: 'nordic_forest', name: 'Nordic Forest', desc: 'Emerald Pine & Mint' },
                    { id: 'cyber_terminal', name: 'Cyber Terminal', desc: 'Hacker Green & Dark' },
                    { id: 'midnight_indigo', name: 'Midnight Indigo', desc: 'Electric Dark Purple' },
                  ].map((th) => (
                    <button
                      key={th.id}
                      onClick={() => updateField('theme', th.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        portfolio.theme === th.id
                          ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{th.name}</div>
                      <div className="text-[11px] opacity-75 mt-0.5">{th.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleResetToSample}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Starter Content</span>
                </button>

                <button
                  onClick={() => setActiveTab('preview')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch Live Showcase Preview</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE: LIVE SHOWCASE PREVIEW                                               */
        /* ========================================================================= */
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Preview Viewport Toolbar */}
          <div className="no-print bg-white dark:bg-slate-900 rounded-2xl p-4 border border-purple-100 dark:border-purple-900/40 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Template:</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {(['modern', 'creative', 'minimal'] as PortfolioTemplate[]).map((tpl) => (
                  <button
                    key={tpl}
                    onClick={() => updateField('template', tpl)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize cursor-pointer transition-all ${
                      currentTemplate === tpl
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Responsive Device preview toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mr-2">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow-xs' : 'text-slate-400'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow-xs' : 'text-slate-400'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Functional Action Buttons */}
              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 cursor-pointer shadow-xs"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied! 🎉' : 'Copy Shareable Link'}</span>
              </button>

              <button
                onClick={handlePrintPortfolio}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-xs"
                title="Print clean 1-pager or Save as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print / PDF Export</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RENDERED PORTFOLIO DISPLAY (Adapts to chosen template)                    */}
          {/* ========================================================================= */}
          <div
            id="portfolio-printable"
            className={`mx-auto transition-all duration-300 ${
              previewDevice === 'mobile'
                ? 'max-w-md border-4 border-slate-300 dark:border-slate-700 rounded-[2.5rem] shadow-2xl p-4 sm:p-6 bg-white dark:bg-slate-900 overflow-hidden'
                : 'w-full max-w-4xl'
            }`}
          >
            {/* TEMPLATE A: MODERN */}
            {currentTemplate === 'modern' && (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/40 shadow-xl overflow-hidden space-y-8 p-6 sm:p-10">
                {/* Hero Header */}
                <div className={`rounded-3xl bg-linear-to-r ${themeColors.headerGrad} text-white p-6 sm:p-8 relative overflow-hidden shadow-lg`}>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                    <img
                      src={portfolio.avatarUrl || AVATAR_PRESETS[0].url}
                      alt={effectiveFullName}
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20 shadow-xl shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
                        <span>{portfolio.university || 'University Student'}</span>
                        <span>•</span>
                        <span>{portfolio.graduationYear || 'Class of 2026'}</span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{effectiveFullName}</h1>
                      <p className="text-sm sm:text-base font-bold text-purple-100">{portfolio.headline}</p>
                      <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-2xl">{portfolio.bio}</p>

                      {/* Social chips */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3 text-xs">
                        {portfolio.socials.github && (
                          <a
                            href={portfolio.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors font-bold backdrop-blur-md text-white"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {portfolio.socials.linkedin && (
                          <a
                            href={portfolio.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors font-bold backdrop-blur-md text-white"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {portfolio.socials.leetcode && (
                          <a
                            href={portfolio.socials.leetcode}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors font-bold backdrop-blur-md text-white"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>LeetCode</span>
                          </a>
                        )}
                        {portfolio.socials.email && (
                          <a
                            href={`mailto:${portfolio.socials.email}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors font-bold backdrop-blur-md text-white"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Technical Competencies</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill, idx) => (
                      <span key={idx} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${themeColors.pillBg}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    <span>Featured Engineering Projects</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {portfolio.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className={`rounded-2xl border ${themeColors.cardBorder} bg-slate-50/50 dark:bg-slate-800/40 p-5 flex flex-col justify-between space-y-3.5 hover:shadow-md transition-shadow`}
                      >
                        {proj.imageUrl && (
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-full h-36 object-cover rounded-xl border border-slate-200/80 dark:border-slate-700"
                          />
                        )}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white">{proj.title}</h4>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {proj.github && (
                                <a
                                  href={proj.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-slate-400 hover:text-slate-800 dark:hover:text-white"
                                  title="GitHub Repository"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                              {proj.demo && (
                                <a
                                  href={proj.demo}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-slate-400 hover:text-purple-600"
                                  title="Live Demo"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                          {proj.tagline && (
                            <p className={`text-xs font-bold mt-0.5 ${themeColors.accentText}`}>{proj.tagline}</p>
                          )}
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tags.map((t, tidx) => (
                            <span
                              key={tidx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Education Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {/* Experience */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                      <span>Experience</span>
                    </h3>
                    <div className="space-y-3">
                      {experienceList.map((exp) => (
                        <div
                          key={exp.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs font-black">
                            <span className="text-slate-900 dark:text-white">{exp.role}</span>
                            <span className="text-slate-400 text-[11px] font-mono">{exp.period}</span>
                          </div>
                          <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{exp.company}</div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                      <span>Education</span>
                    </h3>
                    <div className="space-y-3">
                      {educationList.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs font-black">
                            <span className="text-slate-900 dark:text-white">{edu.institution}</span>
                            <span className="text-slate-400 text-[11px] font-mono">{edu.year}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{edu.degree}</div>
                          {edu.score && (
                            <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                              {edu.score}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TEMPLATE B: CREATIVE (Playful, vibrant borders, warm stickers, expressive typography) */}
            {currentTemplate === 'creative' && (
              <div className="rounded-3xl bg-linear-to-b from-purple-50/60 via-pink-50/30 to-amber-50/40 dark:from-slate-900 dark:to-slate-950 border-2 border-purple-300 dark:border-purple-800 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
                {/* Creative Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-dashed border-purple-200 dark:border-purple-900/60 pb-8">
                  <div className="relative">
                    <img
                      src={portfolio.avatarUrl || AVATAR_PRESETS[0].url}
                      alt={effectiveFullName}
                      className="w-28 h-28 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-xl rotate-[-2deg]"
                    />
                    <span className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-linear-to-r from-amber-400 to-pink-500 text-white text-[10px] font-black shadow-md">
                      ✨ SDE Ready
                    </span>
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-purple-600/10 to-pink-600/10 border border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300 text-xs font-black">
                      <span>{portfolio.university}</span>
                      <span>•</span>
                      <span>{portfolio.graduationYear}</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                      {effectiveFullName}
                    </h1>
                    <p className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
                      {portfolio.headline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                      {portfolio.bio}
                    </p>

                    {/* Creative Social Buttons */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                      {portfolio.socials.github && (
                        <a
                          href={portfolio.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md hover:bg-purple-700 transition-colors flex items-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {portfolio.socials.linkedin && (
                        <a
                          href={portfolio.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {portfolio.socials.email && (
                        <a
                          href={`mailto:${portfolio.socials.email}`}
                          className="px-3.5 py-1.5 rounded-xl bg-pink-600 text-white text-xs font-bold shadow-md hover:bg-pink-700 transition-colors flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Say Hello</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Creative Skills Bubble Bar */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    My Tech Superpowers 🚀
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-2xl text-xs font-black bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 shadow-xs hover:scale-105 transition-transform"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Creative Projects Showcase */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    What I've Built 💻
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {portfolio.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-3xl border-2 border-purple-200 dark:border-purple-800/80 bg-white dark:bg-slate-900 p-5 shadow-md hover:shadow-xl transition-all space-y-3"
                      >
                        {proj.imageUrl && (
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-full h-36 object-cover rounded-2xl border"
                          />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-base font-black text-slate-900 dark:text-white">{proj.title}</h4>
                            <p className="text-xs font-bold text-pink-600 dark:text-pink-400 mt-0.5">{proj.tagline}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {proj.github && (
                              <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600">
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {proj.demo && (
                              <a href={proj.demo} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-600">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Education */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                  <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-purple-600">Work & Internships</h3>
                    {experienceList.map((exp) => (
                      <div key={exp.id} className="border-b border-slate-100 dark:border-slate-800 last:border-none pb-2">
                        <div className="text-xs font-black text-slate-900 dark:text-white">{exp.role}</div>
                        <div className="text-xs font-bold text-purple-600">{exp.company} • {exp.period}</div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-purple-600">Education</h3>
                    {educationList.map((edu) => (
                      <div key={edu.id} className="border-b border-slate-100 dark:border-slate-800 last:border-none pb-2">
                        <div className="text-xs font-black text-slate-900 dark:text-white">{edu.institution}</div>
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{edu.degree}</div>
                        <div className="text-[11px] text-purple-600 font-bold mt-0.5">{edu.year} • {edu.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TEMPLATE C: MINIMAL (Harvard / Silicon Valley minimalist editorial) */}
            {currentTemplate === 'minimal' && (
              <div className="rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg p-6 sm:p-12 space-y-10 text-slate-900 dark:text-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{effectiveFullName}</h1>
                    <span className="text-xs font-mono text-slate-500">
                      {portfolio.university} • {portfolio.graduationYear}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{portfolio.headline}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">{portfolio.bio}</p>

                  <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                    {portfolio.socials.email && <span>{portfolio.socials.email}</span>}
                    {portfolio.socials.phone && <span>{portfolio.socials.phone}</span>}
                    {portfolio.socials.github && (
                      <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="underline hover:text-black dark:hover:text-white">
                        github
                      </a>
                    )}
                    {portfolio.socials.linkedin && (
                      <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-black dark:hover:text-white">
                        linkedin
                      </a>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Skills</h3>
                  <p className="text-xs font-mono leading-relaxed text-slate-700 dark:text-slate-300">
                    {portfolio.skills.join(' • ')}
                  </p>
                </div>

                {/* Projects */}
                <div className="space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Projects</h3>
                  <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-900">
                    {portfolio.projects.map((proj) => (
                      <div key={proj.id} className="pt-4 first:pt-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                          <div className="flex items-center gap-3 text-xs font-mono">
                            {proj.github && (
                              <a href={proj.github} target="_blank" rel="noreferrer" className="underline hover:text-purple-600">
                                Code
                              </a>
                            )}
                            {proj.demo && (
                              <a href={proj.demo} target="_blank" rel="noreferrer" className="underline hover:text-purple-600">
                                Live
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{proj.description}</p>
                        <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                          Stack: {proj.tags.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Education */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Experience</h3>
                    {experienceList.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{exp.role}</span>
                          <span className="font-mono text-slate-400 text-[11px]">{exp.period}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">{exp.company}</div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Education</h3>
                    {educationList.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{edu.institution}</span>
                          <span className="font-mono text-slate-400 text-[11px]">{edu.year}</span>
                        </div>
                        <div className="text-xs text-slate-500">{edu.degree}</div>
                        {edu.score && <div className="text-xs font-mono text-slate-400">{edu.score}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
