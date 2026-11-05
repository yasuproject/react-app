import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  User,
  Settings,
  Moon,
  Sun,
  LogOut,
  Keyboard,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { USER_PROFILE } from '../../data/navigationData';

interface UserProfileCardProps {
  isRail: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSettings?: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  isRail,
  theme,
  onToggleTheme,
  onOpenSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const avatarElement = (
    <div className="relative shrink-0">
      {!imgError ? (
        <img
          src={USER_PROFILE.avatar}
          alt={USER_PROFILE.name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-800"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center">
          ER
        </div>
      )}
      <span
        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"
        title="Online"
      />
    </div>
  );

  return (
    <div className="relative p-2" ref={containerRef}>
      {isRail ? (
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-full hover:ring-2 hover:ring-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
            aria-label="User account options"
          >
            {avatarElement}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/60 dark:bg-slate-850/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-slate-200/50 dark:border-slate-800/60">
          <div className="flex items-center gap-2.5 min-w-0">
            {avatarElement}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                {USER_PROFILE.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {USER_PROFILE.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors focus:outline-none"
            aria-label="Account menu"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Account Popover Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            isRail ? 'left-full bottom-0 ml-3 w-64' : 'bottom-full left-2 right-2 mb-2'
          } p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {USER_PROFILE.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {USER_PROFILE.email}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Workspace Admin</span>
            </div>
          </div>

          {/* Actions */}
          <div className="py-1 space-y-0.5">
            <button
              onClick={() => {
                if (onOpenSettings) onOpenSettings();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Account Preferences</span>
            </button>

            <button
              onClick={() => {
                onToggleTheme();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-500" />
                )}
                <span>Theme</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 capitalize">{theme}</span>
            </button>

            <button
              onClick={() => {
                alert('Keyboard shortcuts:\n• [ : Toggle drawer collapse\n• ⌘K : Focus drawer search\n• 1-7 : Direct navigation\n• Esc : Close drawer on mobile');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-slate-400" />
                <span>Shortcuts</span>
              </div>
              <kbd className="px-1 py-0.5 text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-400 rounded">
                ⌘/
              </kbd>
            </button>
          </div>

          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          <button
            onClick={() => {
              alert('Sign out action');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
