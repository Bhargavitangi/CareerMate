import React, { useState } from 'react';
import {
  Printer,
  Download,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Layout,
  FileCheck,
} from 'lucide-react';
import { ResumeData } from '../../types';

interface ResumePreviewProps {
  resume: ResumeData;
  onPrintPdf: () => void;
  onExportJson: () => void;
  studentName?: string;
}

export type ResumeTemplate = 'harvard_ats' | 'modern_tech' | 'minimalist_clean';

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onPrintPdf,
  onExportJson,
  studentName,
}) => {
  const [template, setTemplate] = useState<ResumeTemplate>('harvard_ats');
  const { personalInfo, education, experience, projects, skills, certifications } = resume;

  // Use either the resume full name or the current student profile name
  const displayName = personalInfo.fullName.trim() || studentName?.trim() || 'Your Full Name';

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Top Action Toolbar */}
      <div className="w-full max-w-[820px] flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm print:hidden">
        {/* Template Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setTemplate('harvard_ats')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              template === 'harvard_ats'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Harvard ATS
          </button>
          <button
            onClick={() => setTemplate('modern_tech')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              template === 'modern_tech'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Modern Tech
          </button>
          <button
            onClick={() => setTemplate('minimalist_clean')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              template === 'minimalist_clean'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Minimalist
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Download resume as JSON"
          >
            <Download className="w-3.5 h-3.5 text-purple-500" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={onPrintPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            title="Print or Save as PDF (Choose 'Save as PDF' in the print dialog)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Printable ATS Resume Canvas */}
      <div
        id="printable-resume-container"
        className={`w-full max-w-[820px] min-h-[1050px] bg-white text-slate-900 p-8 sm:p-12 shadow-xl rounded-2xl sm:rounded-3xl border border-slate-200 print:border-none print:shadow-none select-text ${
          template === 'harvard_ats'
            ? 'font-serif text-[13px] leading-relaxed'
            : template === 'modern_tech'
            ? 'font-sans text-[12.5px] leading-relaxed'
            : 'font-sans text-[12px] leading-normal'
        }`}
        style={{
          fontFamily:
            template === 'harvard_ats'
              ? '"Georgia", "Times New Roman", Times, serif'
              : '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header: Name & Contact Details */}
        <header className={`pb-3 text-center ${template === 'modern_tech' ? 'border-b-2 border-indigo-600' : 'border-b border-black'}`}>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-black ${template === 'modern_tech' ? 'text-indigo-900' : ''}`}>
            {displayName}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-black">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span aria-hidden="true">•</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="text-black hover:underline font-medium">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.location && (
              <>
                <span aria-hidden="true">•</span>
                <span>{personalInfo.location}</span>
              </>
            )}
            {personalInfo.linkedin && (
              <>
                <span aria-hidden="true">•</span>
                <span className="font-sans text-[11px] font-semibold">{personalInfo.linkedin}</span>
              </>
            )}
            {personalInfo.github && (
              <>
                <span aria-hidden="true">•</span>
                <span className="font-sans text-[11px] font-semibold">{personalInfo.github}</span>
              </>
            )}
            {personalInfo.portfolioUrl && (
              <>
                <span aria-hidden="true">•</span>
                <span className="font-sans text-[11px] font-semibold">{personalInfo.portfolioUrl}</span>
              </>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mt-4">
            <h2 className={`text-xs font-bold uppercase tracking-wider text-black pb-0.5 mb-1.5 font-sans ${template === 'modern_tech' ? 'border-b border-indigo-200 text-indigo-900 font-extrabold' : 'border-b border-black'}`}>
              Professional Summary
            </h2>
            <p className="text-justify text-black">{personalInfo.summary}</p>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mt-4">
            <h2 className={`text-xs font-bold uppercase tracking-wider text-black pb-0.5 mb-2 font-sans ${template === 'modern_tech' ? 'border-b border-indigo-200 text-indigo-900 font-extrabold' : 'border-b border-black'}`}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>{edu.institution}</span>
                    <span className="text-xs font-normal">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs italic">
                    <span>
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="font-semibold not-italic font-sans text-xs">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mt-4">
            <h2 className={`text-xs font-bold uppercase tracking-wider text-black pb-0.5 mb-2 font-sans ${template === 'modern_tech' ? 'border-b border-indigo-200 text-indigo-900 font-extrabold' : 'border-b border-black'}`}>
              Experience & Internships
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>{exp.company}</span>
                    <span className="text-xs font-normal">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs italic mb-1">
                    <span>{exp.title}</span>
                    <span className="not-italic text-xs">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-black">
                    {exp.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mt-4">
            <h2 className={`text-xs font-bold uppercase tracking-wider text-black pb-0.5 mb-2 font-sans ${template === 'modern_tech' ? 'border-b border-indigo-200 text-indigo-900 font-extrabold' : 'border-b border-black'}`}>
              Technical Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <div className="flex items-center gap-1.5">
                      <span>{proj.title}</span>
                      {proj.techStack.length > 0 && (
                        <span className="text-xs font-normal font-sans italic text-slate-700">
                          | {proj.techStack.join(', ')}
                        </span>
                      )}
                    </div>
                    {proj.githubUrl && (
                      <span className="text-[11px] font-sans text-slate-600">
                        Code Repository
                      </span>
                    )}
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-black mt-1">
                    {proj.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills Section */}
        <section className="mt-4">
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black pb-0.5 mb-2 font-sans ${template === 'modern_tech' ? 'border-b border-indigo-200 text-indigo-900 font-extrabold' : 'border-b border-black'}`}>
            Technical Skills
          </h2>
          <div className="space-y-1 text-xs text-black">
            {skills.languages.length > 0 && (
              <div>
                <span className="font-bold">Languages: </span>
                <span>{skills.languages.join(', ')}</span>
              </div>
            )}
            {skills.frameworks.length > 0 && (
              <div>
                <span className="font-bold">Frameworks & Libraries: </span>
                <span>{skills.frameworks.join(', ')}</span>
              </div>
            )}
            {skills.developerTools.length > 0 && (
              <div>
                <span className="font-bold">Developer Tools: </span>
                <span>{skills.developerTools.join(', ')}</span>
              </div>
            )}
            {skills.coreConcepts.length > 0 && (
              <div>
                <span className="font-bold">Core Concepts: </span>
                <span>{skills.coreConcepts.join(', ')}</span>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <section className="mt-4">
            <h2 className={`text-xs font-bold uppercase tracking-wider text-black pb-0.5 mb-2 font-sans ${template === 'modern_tech' ? 'border-b border-indigo-200 text-indigo-900 font-extrabold' : 'border-b border-black'}`}>
              Certifications & Honors
            </h2>
            <div className="space-y-1 text-xs text-black">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span>
                    <strong className="font-bold">{cert.name}</strong> — {cert.issuer}
                  </span>
                  <span className="text-slate-600 font-sans text-[11px]">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
