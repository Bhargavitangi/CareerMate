import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface DeviceFrameProps {
  isDeviceMode: boolean;
  onToggleMode: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  isDeviceMode,
  onToggleMode,
  children,
}) => {
  if (!isDeviceMode) {
    return <div className="min-h-screen w-full flex flex-col">{children}</div>;
  }

  // Current mock time for Android status bar
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="min-h-screen w-full bg-slate-900/95 dark:bg-black py-4 md:py-8 px-2 md:px-4 flex flex-col items-center justify-center">
      {/* Top Controller Bar */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between text-xs text-slate-300 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium tracking-tight">Pixel 8 • Android 15 (API 35)</span>
        </div>
        <button
          onClick={onToggleMode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
          title="Switch to full screen responsive layout"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Canvas</span>
        </button>
      </div>

      {/* Android Device Hardware Mockup */}
      <div className="relative w-full max-w-[412px] h-[870px] bg-black rounded-[46px] p-[10px] shadow-2xl ring-1 ring-slate-700/60 shadow-black/80 flex flex-col overflow-hidden">
        {/* Device Screen Bezel */}
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-950 rounded-[38px] overflow-hidden flex flex-col border border-slate-800/40">
          {/* Android Status Bar */}
          <div className="h-9 w-full bg-inherit px-6 flex items-center justify-between shrink-0 select-none z-50 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
            <span>{timeString}</span>

            {/* Camera Punch Hole */}
            <div className="w-3.5 h-3.5 bg-black rounded-full ring-2 ring-slate-800/20 dark:ring-slate-700/50"></div>

            {/* Android Status Icons */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-wider uppercase font-mono">5G</span>
              {/* WiFi SVG */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.32c3.81 0 7.28 1.48 9.87 3.92L12 18.23 2.13 11.24C4.72 8.8 8.19 7.32 12 7.32z" />
              </svg>
              {/* Battery SVG */}
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono">98%</span>
                <div className="w-4 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-current rounded-xs"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Applet Content Viewport */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar">
            {children}
          </div>

          {/* Android Bottom Navigation Gesture Pill */}
          <div className="h-5 w-full bg-inherit shrink-0 flex items-center justify-center select-none pointer-events-none">
            <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
