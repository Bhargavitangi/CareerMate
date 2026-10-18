import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  Eye,
  Sparkles,
  Plus,
  Trash2,
  Printer,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
  User,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { ResumeData, EducationItem, ExperienceItem, ProjectItem, CertificationItem } from '../../types';
import { ResumePreview } from './ResumePreview';
import { sampleResumeData } from '../../data/mockData';

interface ResumeBuilderProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  studentName?: string;
}

type TabKey = 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'certifications';

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resume,
  onUpdateResume,
  studentName,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // ATS Score analysis
  const calculateAtsMetrics = () => {
    let score = 20;
    const checks: { label: string; passed: boolean; tip: string }[] = [];

    // Personal info check (allow either resume personalInfo or studentName)
    const effectiveName = resume.personalInfo.fullName.trim() || studentName?.trim();
    const hasContact =
      Boolean(effectiveName) &&
      Boolean(resume.personalInfo.email) &&
      Boolean(resume.personalInfo.phone);
    if (hasContact) score += 15;
    checks.push({
      label: 'Contact Info',
      passed: Boolean(hasContact),
      tip: 'Provide full name, university email, phone number, and location.',
    });

    // Links check
    const hasLinks = Boolean(resume.personalInfo.linkedin) || Boolean(resume.personalInfo.github);
    if (hasLinks) score += 10;
    checks.push({
      label: 'Tech Links',
      passed: hasLinks,
      tip: 'Add LinkedIn and GitHub links for technical recruiters.',
    });

    // Education check
    const hasEdu = resume.education.length > 0;
    if (hasEdu) score += 15;
    checks.push({
      label: 'Education',
      passed: hasEdu,
      tip: 'Include university, degree, branch, and CGPA.',
    });

    // Experience check
    const hasExp = resume.experience.length > 0;
    if (hasExp) score += 15;
    checks.push({
      label: 'Internships',
      passed: hasExp,
      tip: 'Include industry internships, open source, or student leadership roles.',
    });

    // Projects check
    const hasProjects = resume.projects.length >= 2;
    if (hasProjects) score += 15;
    checks.push({
      label: 'Projects (≥2)',
      passed: hasProjects,
      tip: 'Demonstrate real-world implementation with 2 or more detailed projects.',
    });

    // Action verbs and metrics check in bullets
    const allBullets = [
      ...resume.experience.flatMap((e) => e.bulletPoints),
      ...resume.projects.flatMap((p) => p.bulletPoints),
    ].join(' ');

    const actionVerbsRegex = /(engineered|architected|built|developed|optimized|implemented|reduced|increased|scaled|spearheaded|automated)/i;
    const hasActionVerbs = actionVerbsRegex.test(allBullets);
    if (hasActionVerbs) score += 5;
    checks.push({
      label: 'Action Verbs',
      passed: hasActionVerbs,
      tip: 'Start bullet points with verbs like Engineered, Optimized, Architected.',
    });

    const metricsRegex = /(\d+%|\d+x|\d+ms|\d+,\d+|\d+\+|\$\d+|₹\d+)/i;
    const hasMetrics = metricsRegex.test(allBullets);
    if (hasMetrics) score += 10;
    checks.push({
      label: 'Impact Numbers',
      passed: hasMetrics,
      tip: 'Quantify results (e.g. reduced latency by 28%, 450+ users).',
    });

    return { score: Math.min(score, 100), checks };
  };

  const { score: atsScore, checks: atsChecks } = calculateAtsMetrics();

  const handlePrintPdf = () => {
    window.print();
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (resume.personalInfo.fullName || studentName || 'student').replace(/\s+/g, '_');
    a.download = `careermate_resume_${safeName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const updatePersonalInfo = (field: keyof typeof resume.personalInfo, value: string) => {
    const updated = {
      ...resume,
      personalInfo: { ...resume.personalInfo, [field]: value },
    };
    onUpdateResume(updated);
  };

  // Education mutators
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      grade: 'CGPA: 8.5/10.0',
      location: '',
    };
    onUpdateResume({ ...resume, education: [...resume.education, newItem] });
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    const updated = resume.education.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onUpdateResume({ ...resume, education: updated });
  };

  const removeEducation = (id: string) => {
    onUpdateResume({ ...resume, education: resume.education.filter((item) => item.id !== id) });
  };

  // Experience mutators
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: 'Software Engineer Intern',
      company: 'Tech Company',
      location: 'Remote',
      startDate: 'Jun 2025',
      endDate: 'Aug 2025',
      current: false,
      bulletPoints: ['Engineered scalable features using Kotlin, TypeScript, and modern APIs.'],
    };
    onUpdateResume({ ...resume, experience: [...resume.experience, newItem] });
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    const updated = resume.experience.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onUpdateResume({ ...resume, experience: updated });
  };

  const removeExperience = (id: string) => {
    onUpdateResume({ ...resume, experience: resume.experience.filter((item) => item.id !== id) });
  };

  // Projects mutators
  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Student Project',
      description: 'Project description here',
      techStack: ['Kotlin', 'Compose', 'Room'],
      githubUrl: 'https://github.com/your-username/project',
      liveUrl: '',
      bulletPoints: ['Architected core module achieving 99.9% uptime and sub-50ms latency.'],
    };
    onUpdateResume({ ...resume, projects: [...resume.projects, newItem] });
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    const updated = resume.projects.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onUpdateResume({ ...resume, projects: updated });
  };

  const removeProject = (id: string) => {
    onUpdateResume({ ...resume, projects: resume.projects.filter((item) => item.id !== id) });
  };

  const loadSampleResume = () => {
    if (confirm('Load high-scoring tech resume template? You can customize all fields afterwards.')) {
      const template = { ...sampleResumeData };
      if (studentName?.trim()) {
        template.personalInfo.fullName = studentName.trim();
      }
      onUpdateResume(template);
      triggerSaveNotification();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#8b5cf6', '#3b82f6', '#ec4899'],
        });
      } catch {
        // Ignore
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner & ATS Score Counter */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-linear-to-r from-purple-500/15 to-indigo-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
              ATS-Optimized Harvard Standard
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">1-Page Target</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Resume Builder & ATS Optimizer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Engineered to pass automated campus recruiter filters and impress technical hiring managers.
          </p>
        </div>

        {/* ATS Score & Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-linear-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 border border-purple-200/80 dark:border-slate-700">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={atsScore >= 80 ? 'text-emerald-500' : 'text-purple-600'}
                  strokeDasharray={`${atsScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black font-mono">{atsScore}</span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100">ATS Readiness</div>
              <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                {atsScore >= 85 ? '🌟 Excellent ATS Pass' : '🔨 Add key details'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowPreviewModal(!showPreviewModal)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>{showPreviewModal ? 'Edit Sections' : 'Live Preview & PDF'}</span>
          </button>

          <button
            onClick={loadSampleResume}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Load sample high-scoring engineering student resume"
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-500" />
            <span className="hidden sm:inline">Load Sample</span>
          </button>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Resume saved locally!</span>
        </div>
      )}

      {/* Main Content: If preview mode is toggled, show the full preview; otherwise show editor tabs */}
      {showPreviewModal ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1.5"
            >
              ← Back to Guided Editor
            </button>
          </div>
          <ResumePreview
            resume={resume}
            onPrintPdf={handlePrintPdf}
            onExportJson={handleExportJson}
            studentName={studentName}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* ATS Checklist Cards */}
          <div className="bg-linear-to-r from-purple-50/70 via-indigo-50/50 to-pink-50/70 dark:from-slate-900 dark:to-purple-950/20 rounded-3xl p-5 border border-purple-100 dark:border-purple-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>ATS Checklist & Feedback Engine</span>
              </span>
              <span className="text-slate-500 font-medium">Click items for recruiter advice</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {atsChecks.map((check, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-1.5 p-2 rounded-xl text-xs transition-colors ${
                    check.passed
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40'
                  }`}
                  title={check.tip}
                >
                  {check.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-tight font-bold">{check.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-purple-100 dark:border-purple-950/60">
            {[
              { id: 'personal', label: 'Contact Details', icon: User },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'skills', label: 'Skills & Tools', icon: Wrench },
              { id: 'certifications', label: 'Certifications', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Section Editors */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-6">
            {/* 1. Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Contact & Professional Profiles
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Recruiters will use these details to contact you for interview invitations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName || studentName || ''}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="e.g. Bhargavi Sharma"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="e.g. bhargavi@campus.edu"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      placeholder="e.g. Bengaluru, India"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.github}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      placeholder="github.com/username"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Summary (2-3 concise, impactful sentences)
                  </label>
                  <textarea
                    rows={3}
                    value={resume.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    placeholder="Highlight your university degree, key engineering stack, hackathons, and passion for software engineering."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* 2. Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Education & Academic Degrees
                    </h3>
                    <p className="text-xs text-slate-500">List your university, degree, and GPA.</p>
                  </div>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add School</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.education.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
                          Institution #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          placeholder="College / University Name"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          placeholder="Degree (e.g. B.Tech in CSE)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                          placeholder="Specialization / Branch"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                          placeholder="CGPA (e.g. 8.9 / 10.0)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          placeholder="Start Year (e.g. 2022)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          placeholder="Graduation Year (e.g. 2026)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Internships & Industry Roles
                    </h3>
                    <p className="text-xs text-slate-500">Highlight quantifiable achievements with action verbs.</p>
                  </div>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.experience.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
                          Role #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          placeholder="Company Name"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                          placeholder="Job Title / Role"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          placeholder="Start Date (e.g. May 2025)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          placeholder="End Date or 'Present'"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Bullet Points (One per line with action verbs & metrics)
                        </label>
                        <textarea
                          rows={3}
                          value={exp.bulletPoints.join('\n')}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              bulletPoints: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                            })
                          }
                          placeholder="Engineered X using Y, reducing latency by 35% across 10,000 requests."
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Technical Projects
                    </h3>
                    <p className="text-xs text-slate-500">Demonstrate practical coding proficiency with GitHub links.</p>
                  </div>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
                          Project #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                          placeholder="Project Title"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={proj.techStack.join(', ')}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          placeholder="Tech Stack (Kotlin, Compose, Room)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={proj.githubUrl || ''}
                          onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                          placeholder="GitHub Repository URL"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                        <input
                          type="text"
                          value={proj.liveUrl || ''}
                          onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                          placeholder="Live Demo URL (optional)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Bullet Points (Action verbs & outcomes)
                        </label>
                        <textarea
                          rows={3}
                          value={proj.bulletPoints.join('\n')}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              bulletPoints: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                            })
                          }
                          placeholder="Built native Android UI with Jetpack Compose, supporting 450+ student users with 99.8% crash-free sessions."
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Technical Skills & Core CS
                  </h3>
                  <p className="text-xs text-slate-500">Separate technologies with commas.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Programming Languages
                    </label>
                    <input
                      type="text"
                      value={resume.skills.languages.join(', ')}
                      onChange={(e) =>
                        onUpdateResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            languages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      placeholder="Kotlin, Java, Python, TypeScript, C++, SQL"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Frameworks & SDKs
                    </label>
                    <input
                      type="text"
                      value={resume.skills.frameworks.join(', ')}
                      onChange={(e) =>
                        onUpdateResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            frameworks: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      placeholder="Jetpack Compose, Android SDK, Spring Boot, React, Tailwind CSS"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Developer Tools & Cloud
                    </label>
                    <input
                      type="text"
                      value={resume.skills.developerTools.join(', ')}
                      onChange={(e) =>
                        onUpdateResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            developerTools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      placeholder="Android Studio, Git, GitHub, Docker, Postman, Linux"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Core Computer Science Concepts
                    </label>
                    <input
                      type="text"
                      value={resume.skills.coreConcepts.join(', ')}
                      onChange={(e) =>
                        onUpdateResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            coreConcepts: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      placeholder="Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Certifications & Hackathon Honors
                    </h3>
                    <p className="text-xs text-slate-500">Verified credentials and competition victories.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newCert: CertificationItem = {
                        id: `cert-${Date.now()}`,
                        name: 'New Certification',
                        issuer: 'Google Developers',
                        issueDate: '2025',
                      };
                      onUpdateResume({ ...resume, certifications: [...resume.certifications, newCert] });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certificate</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {resume.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const updated = resume.certifications.map((c) =>
                            c.id === cert.id ? { ...c, name: e.target.value } : c
                          );
                          onUpdateResume({ ...resume, certifications: updated });
                        }}
                        placeholder="Certificate Name"
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                      />
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => {
                          const updated = resume.certifications.map((c) =>
                            c.id === cert.id ? { ...c, issuer: e.target.value } : c
                          );
                          onUpdateResume({ ...resume, certifications: updated });
                        }}
                        placeholder="Issuer (e.g. Google, AWS)"
                        className="w-36 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                      />
                      <input
                        type="text"
                        value={cert.issueDate}
                        onChange={(e) => {
                          const updated = resume.certifications.map((c) =>
                            c.id === cert.id ? { ...c, issueDate: e.target.value } : c
                          );
                          onUpdateResume({ ...resume, certifications: updated });
                        }}
                        placeholder="Year"
                        className="w-24 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                      />
                      <button
                        onClick={() => {
                          onUpdateResume({
                            ...resume,
                            certifications: resume.certifications.filter((c) => c.id !== cert.id),
                          });
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
