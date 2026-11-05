import React, { useState } from 'react';
import { Plus, Search, FolderKanban, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface ProjectsViewProps {
  activeSubId?: string;
  onSelectSubProject?: (id: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  activeSubId,
  onSelectSubProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const projects = [
    {
      id: 'proj-mobile',
      title: 'Mobile App v3.4',
      description: 'Touch-optimized navigation drawer, bottom sheets, and gesture dismissal.',
      category: 'Client Engineering',
      progress: 85,
      tasksCount: 14,
      status: 'active',
      dueDate: 'Nov 18, 2026',
    },
    {
      id: 'proj-ds',
      title: 'Design Tokens 2026',
      description: 'Unified theme tokens, WCAG AA contrast compliance, and typography scales.',
      category: 'Design Systems',
      progress: 100,
      tasksCount: 22,
      status: 'completed',
      dueDate: 'Completed Oct 30',
    },
    {
      id: 'proj-infra',
      title: 'Cloud Infrastructure',
      description: 'Vite 8 production build pipelines, edge caching, and serverless bundle optimization.',
      category: 'DevOps & Tooling',
      progress: 60,
      tasksCount: 9,
      status: 'active',
      dueDate: 'Dec 05, 2026',
    },
    {
      id: 'proj-accessibility',
      title: 'ARIA Navigation & Focus Trap',
      description: 'Full keyboard loop trapping for mobile off-canvas drawers and screen reader landmarks.',
      category: 'Accessibility',
      progress: 92,
      tasksCount: 7,
      status: 'active',
      dueDate: 'Nov 25, 2026',
    },
  ];

  const filtered = projects.filter((p) => {
    if (filter === 'active') return p.status === 'active';
    if (filter === 'completed') return p.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
            <span>Workspace</span>
            <span aria-hidden="true">·</span>
            <span>Projects Directory</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projects & Initiatives
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse and manage all active initiatives. Select any project to sync with drawer submenu.
          </p>
        </div>

        {/* Filter Controls (Real interactive buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                filter === f
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((proj) => {
          const isSelected = activeSubId === proj.id;
          return (
            <div
              key={proj.id}
              onClick={() => onSelectSubProject && onSelectSubProject(proj.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {proj.status === 'completed' ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1 font-medium text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        Due {proj.dueDate}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Progress</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    {proj.progress}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${proj.progress}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      proj.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono tabular-nums">
                    {proj.tasksCount} sprint tasks
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                    <span>{isSelected ? 'Selected in Drawer' : 'Select'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
