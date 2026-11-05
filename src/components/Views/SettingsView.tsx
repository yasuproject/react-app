import React from 'react';
import {
  Sliders,
  Moon,
  Sun,
  Layout,
  Smartphone,
  Keyboard,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { DrawerPosition, DrawerVariant, MobileVariant } from '../../types/navigation';

interface SettingsViewProps {
  position: DrawerPosition;
  onChangePosition: (pos: DrawerPosition) => void;
  variant: DrawerVariant;
  onChangeVariant: (variant: DrawerVariant) => void;
  mobileVariant: MobileVariant;
  onChangeMobileVariant: (mVariant: MobileVariant) => void;
  isRail: boolean;
  onToggleRail: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  position,
  onChangePosition,
  variant,
  onChangeVariant,
  mobileVariant,
  onChangeMobileVariant,
  isRail,
  onToggleRail,
  theme,
  onToggleTheme,
}) => {
  return (
    <div className="space-y-6 max-w-4xl pb-20 lg:pb-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
          <span>Preferences</span>
          <span aria-hidden="true">·</span>
          <span>Drawer Configuration</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Drawer Settings & Configuration
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize navigation drawer layout, desktop rail behaviors, mobile touch dismiss thresholds, and theme tokens.
        </p>
      </div>

      {/* Group 1: Appearance & Theme */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-indigo-500" />
          <span>Appearance & Color Theme</span>
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Active Theme Mode</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Powered by Tailwind CSS v4 custom dark variant with instant toggle.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => theme === 'dark' && onToggleTheme()}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => theme === 'light' && onToggleTheme()}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white shadow-xs border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Group 2: Desktop Layout Options */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layout className="w-4 h-4 text-indigo-500" />
          <span>Desktop Navigation Properties</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dock Edge */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Edge Position</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Left sidebar for LTR layouts or right sidebar for secondary consoles.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onChangePosition('left')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  position === 'left'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Left Side
              </button>
              <button
                onClick={() => onChangePosition('right')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  position === 'right'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Right Side
              </button>
            </div>
          </div>

          {/* Visual Container Variant */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Container Styling</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Flush docked border vs modern floating inset card style.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onChangeVariant('docked')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  variant === 'docked'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Docked Edge
              </button>
              <button
                onClick={() => onChangeVariant('floating')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  variant === 'floating'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Floating Inset
              </button>
            </div>
          </div>
        </div>

        {/* Rail state toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Rail / Compact Mode</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Collapse sidebar to a 74px icon rail with hover poppers (Shortcut: <kbd className="font-mono text-[10px]">[</kbd>).
            </p>
          </div>
          <button
            onClick={onToggleRail}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              isRail
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isRail ? 'Rail Active' : 'Expanded Active'}
          </button>
        </div>
      </div>

      {/* Group 3: Mobile Touch Patterns */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-indigo-500" />
          <span>Mobile & Touch Interaction</span>
        </h2>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                Mobile Drawer Presentation
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Choose between classic slide-in drawer or ergonomic bottom sheet with drag handle.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChangeMobileVariant('slide')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mobileVariant === 'slide'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Slide Drawer
              </button>
              <button
                onClick={() => onChangeMobileVariant('bottom-sheet')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mobileVariant === 'bottom-sheet'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Bottom Sheet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Group 4: Keyboard Shortcuts Reference */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-indigo-500" />
          <span>Keyboard Shortcuts</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850">
            <span className="text-slate-600 dark:text-slate-400">Toggle Rail / Expand</span>
            <kbd className="px-2 py-0.5 font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
              [
            </kbd>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850">
            <span className="text-slate-600 dark:text-slate-400">Focus Drawer Search</span>
            <kbd className="px-2 py-0.5 font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
              ⌘K / Ctrl+K
            </kbd>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850">
            <span className="text-slate-600 dark:text-slate-400">Close Mobile Drawer</span>
            <kbd className="px-2 py-0.5 font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
              ESC
            </kbd>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850">
            <span className="text-slate-600 dark:text-slate-400">Quick Route Switch</span>
            <kbd className="px-2 py-0.5 font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
              1 - 7
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
