import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, Plus, Sparkles, Building2 } from 'lucide-react';
import { Workspace } from '../../types/navigation';

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  onSelectWorkspace: (workspace: Workspace) => void;
  isRail: boolean;
}

export const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  workspaces,
  currentWorkspace,
  onSelectWorkspace,
  isRail,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (isRail) {
    return (
      <div className="relative flex justify-center py-2 group" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-10 h-10 rounded-xl ${currentWorkspace.color} text-white font-semibold text-xs flex items-center justify-center shadow-sm hover:ring-2 hover:ring-indigo-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
          title={currentWorkspace.name}
          aria-label={`Current workspace: ${currentWorkspace.name}`}
        >
          {currentWorkspace.initials}
        </button>

        {/* Rail Flyout Menu */}
        {isOpen && (
          <div className="absolute left-full top-0 ml-3 w-64 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              WORKSPACES
            </div>
            <div className="space-y-1">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace(ws);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left ${
                    ws.id === currentWorkspace.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-6 h-6 rounded-md ${ws.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>
                      {ws.initials}
                    </span>
                    <span className="truncate">{ws.name}</span>
                  </div>
                  {ws.id === currentWorkspace.id && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative px-3 py-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all text-left shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-8 h-8 rounded-lg ${currentWorkspace.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
            {currentWorkspace.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
              {currentWorkspace.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {currentWorkspace.plan}
            </p>
          </div>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute left-3 right-3 top-full mt-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
            SWITCH WORKSPACE
          </div>
          <div className="space-y-0.5">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  onSelectWorkspace(ws);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-colors text-left ${
                  ws.id === currentWorkspace.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 rounded-md ${ws.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>
                    {ws.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{ws.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{ws.plan}</p>
                  </div>
                </div>
                {ws.id === currentWorkspace.id && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
              </button>
            ))}
          </div>

          <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

          <button
            onClick={() => {
              alert('Add Workspace modal triggered');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Plus className="w-4 h-4 text-slate-400" />
            <span>Create new workspace</span>
          </button>
        </div>
      )}
    </div>
  );
};
