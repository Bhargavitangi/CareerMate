import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  ShieldCheck,
  Play,
  FileCheck,
  ChevronRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { kotlinProjectFiles, testingAndAabGuide, KotlinFile } from '../../data/kotlinCodeData';

export const KotlinArchitectureHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'testing' | 'aab'>('code');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedFile = kotlinProjectFiles[selectedFileIndex];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadAllKotlinCode = () => {
    let combined = `# CareerMate Android Codebase (Kotlin & Jetpack Compose Material 3)\n\n`;
    kotlinProjectFiles.forEach((f) => {
      combined += `// ====================================================================\n`;
      combined += `// File: ${f.path}\n`;
      combined += `// Description: ${f.description}\n`;
      combined += `// ====================================================================\n\n`;
      combined += f.code + '\n\n\n';
    });
    const blob = new Blob([combined], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'careermate_kotlin_android_source.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              Android 15 • Kotlin 2.1 • Jetpack Compose
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-500">Material 3 Ready</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Kotlin & Jetpack Compose Architecture
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organized Android Studio architecture, Room local storage, Unit/UI testing, and Signed AAB release guide.
          </p>
        </div>

        <button
          onClick={downloadAllKotlinCode}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export All Kotlin Files</span>
        </button>
      </div>

      {/* Main Subtabs: Codebase, Testing, Signed AAB Release */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'code', label: 'Compose Architecture Files', icon: Code2 },
          { id: 'testing', label: 'Unit & Compose UI Testing', icon: FileCheck },
          { id: 'aab', label: 'Signed AAB & Play Store Release', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Android Code Explorer Tab */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* File selector column (1 col) */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
              Project Package Structure
            </span>

            <div className="space-y-1.5">
              {kotlinProjectFiles.map((file, idx) => {
                const isSelected = selectedFileIndex === idx;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold truncate">
                        {file.filename}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                      {file.path}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Syntax Code View Column (2 cols) */}
          <div className="md:col-span-2 bg-slate-950 rounded-3xl border border-slate-800 shadow-lg overflow-hidden flex flex-col">
            {/* Top Code File Header */}
            <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="space-y-0.5">
                <div className="font-mono font-semibold text-slate-100 flex items-center gap-2">
                  <span>{selectedFile.path}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {selectedFile.description}
                </div>
              </div>

              <button
                onClick={() => handleCopy(selectedFile.code, selectedFile.path)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors shrink-0"
              >
                {copiedKey === selectedFile.path ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <pre className="p-5 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto selection:bg-indigo-500/30 max-h-[600px] overflow-y-auto">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* 2. Unit & Compose UI Testing Guide */}
      {activeTab === 'testing' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {testingAndAabGuide.unitTesting.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {testingAndAabGuide.unitTesting.description}
                </p>
              </div>

              <button
                onClick={() => handleCopy(testingAndAabGuide.unitTesting.codeSnippet, 'unit-test')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100"
              >
                {copiedKey === 'unit-test' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Test</span>
              </button>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs flex items-center justify-between">
              <span>CLI: <strong>{testingAndAabGuide.unitTesting.command}</strong></span>
              <button
                onClick={() => handleCopy(testingAndAabGuide.unitTesting.command, 'cmd-unit')}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{testingAndAabGuide.unitTesting.codeSnippet}</code>
            </pre>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {testingAndAabGuide.composeTesting.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {testingAndAabGuide.composeTesting.description}
                </p>
              </div>

              <button
                onClick={() => handleCopy(testingAndAabGuide.composeTesting.codeSnippet, 'ui-test')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100"
              >
                {copiedKey === 'ui-test' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Test</span>
              </button>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs flex items-center justify-between">
              <span>CLI: <strong>{testingAndAabGuide.composeTesting.command}</strong></span>
              <button
                onClick={() => handleCopy(testingAndAabGuide.composeTesting.command, 'cmd-ui')}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{testingAndAabGuide.composeTesting.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}

      {/* 3. Signed AAB Generation for Google Play */}
      {activeTab === 'aab' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {testingAndAabGuide.aabGeneration.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {testingAndAabGuide.aabGeneration.description}
            </p>
          </div>

          <div className="space-y-4">
            {testingAndAabGuide.aabGeneration.steps.map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      {st.step}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {st.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopy(st.command, `step-${st.step}`)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === `step-${st.step}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>

                <pre className="p-3 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  <code>{st.command}</code>
                </pre>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Note: {st.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
