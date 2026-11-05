import React from 'react';
import { Menu, Search, Sun, Moon, Layers } from 'lucide-react';
import { DrawerPosition } from '../../types/navigation';

interface MobileHeaderProps {
  onOpenDrawer: () => void;
  activeTitle: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  position: DrawerPosition;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenDrawer,
  activeTitle,
  theme,
  onToggleTheme,
  position,
}) => {
  return (
    <header className="lg:hidden sticky top-0 z-40 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 flex items-center justify-between">
      {/* Left zone: Drawer Trigger if left, or brand */}
      {position === 'left' ? (
        <button
          onClick={onOpenDrawer}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">OmniDrawer</span>
        </div>
      )}

      {/* Center Zone: Current View Title */}
      <div className="text-center truncate px-2">
        <h2 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          {activeTitle}
        </h2>
      </div>

      {/* Right zone: Theme Toggle & (if right position) Drawer Trigger */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleTheme}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 rounded-xl transition-colors"
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 text-amber-500" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-indigo-500" />
          )}
        </button>

        {position === 'right' && (
          <button
            onClick={onOpenDrawer}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};
