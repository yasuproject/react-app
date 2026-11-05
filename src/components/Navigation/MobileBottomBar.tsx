import React from 'react';
import { LayoutDashboard, BarChart3, FolderKanban, CheckSquare, Menu } from 'lucide-react';

interface MobileBottomBarProps {
  activeId: string;
  onSelectRoute: (id: string) => void;
  onOpenDrawer: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activeId,
  onSelectRoute,
  onOpenDrawer,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 items-center px-1 pb-safe"
      aria-label="Mobile bottom navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectRoute(tab.id)}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            <span className="text-[10px] tracking-tight mt-1">{tab.label}</span>
          </button>
        );
      })}

      {/* 5th slot: Open Full Drawer */}
      <button
        onClick={onOpenDrawer}
        className="min-h-[44px] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        aria-label="Open full drawer menu"
      >
        <Menu className="w-4.5 h-4.5" />
        <span className="text-[10px] tracking-tight mt-1">Drawer</span>
      </button>
    </nav>
  );
};
