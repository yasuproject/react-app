import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Sliders,
  PanelLeft,
  Smartphone,
  Laptop,
  Tablet,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { DrawerPosition, DrawerVariant, MobileVariant, ViewportMode } from '../../types/navigation';

interface DashboardViewProps {
  onOpenMobileDrawer: () => void;
  isRail: boolean;
  onToggleRail: () => void;
  position: DrawerPosition;
  onChangePosition: (pos: DrawerPosition) => void;
  variant: DrawerVariant;
  onChangeVariant: (variant: DrawerVariant) => void;
  mobileVariant: MobileVariant;
  onChangeMobileVariant: (mVariant: MobileVariant) => void;
  onNavigateToCode: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenMobileDrawer,
  isRail,
  onToggleRail,
  position,
  onChangePosition,
  variant,
  onChangeVariant,
  mobileVariant,
  onChangeMobileVariant,
  onNavigateToCode,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activityTasks, setActivityTasks] = useState([
    { id: 1, title: 'Refactor mobile touch gesture threshold', author: 'Elena Rostova', time: '12m ago', done: true },
    { id: 2, title: 'Implement smooth bottom sheet spring transition', author: 'Marcus Vance', time: '45m ago', done: false },
    { id: 3, title: 'Add keyboard shortcut navigation (⌘K, 1-7)', author: 'Elena Rostova', time: '2h ago', done: true },
    { id: 4, title: 'Audit light/dark contrast tokens for WCAG AA', author: 'Sarah Lin', time: '5h ago', done: false },
  ]);

  const toggleTask = (id: number) => {
    setActivityTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Top Banner / Hero Area with clean typography */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
            <span>Navigation Architecture</span>
            <span aria-hidden="true">·</span>
            <span>WCAG AA Ready</span>
            <span aria-hidden="true">·</span>
            <span>Touch Gestures Enabled</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Responsive Navigation Drawer
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl text-balance">
            State-of-the-art navigation drawer featuring desktop rail mode, inset floating styling, touch swipe dismiss, and mobile bottom sheet transitions.
          </p>
        </div>

        {/* Time Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                timeRange === range
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Drawer Configurator Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Drawer Live Controls
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time Props</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Rail Mode Toggle */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
              Desktop Mode
            </span>
            <button
              onClick={onToggleRail}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all flex items-center justify-between shadow-2xs"
            >
              <span>{isRail ? 'Rail / Icon Only (74px)' : 'Expanded Tree (264px)'}</span>
              <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">Toggle</span>
            </button>
          </div>

          {/* Position Selector */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
              Drawer Dock Edge
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onChangePosition('left')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  position === 'left'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Left Edge
              </button>
              <button
                onClick={() => onChangePosition('right')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  position === 'right'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Right Edge
              </button>
            </div>
          </div>

          {/* Variant Style Selector */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
              Desktop Styling
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onChangeVariant('docked')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  variant === 'docked'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Docked Edge
              </button>
              <button
                onClick={() => onChangeVariant('floating')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  variant === 'floating'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Floating Inset
              </button>
            </div>
          </div>

          {/* Mobile Variant */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
              Mobile Interaction
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onChangeMobileVariant('slide')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mobileVariant === 'slide'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Slide Drawer
              </button>
              <button
                onClick={() => onChangeMobileVariant('bottom-sheet')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mobileVariant === 'bottom-sheet'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Bottom Sheet
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Try testing drawer on mobile:</span>
            <button
              onClick={onOpenMobileDrawer}
              className="px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors border border-indigo-200 dark:border-indigo-800"
            >
              Trigger Mobile Drawer
            </button>
          </div>

          <button
            onClick={onNavigateToCode}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View Component Code & API</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Row (Strictly Tabular Figures, Clean Unboxed Metadata) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Sessions</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              28,492
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              +14.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Relative to previous 30 days</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Touch Target Score</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              100%
            </span>
            <span className="text-xs font-mono text-slate-500">
              44px min
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Zero mis-tap thumb zone</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Drawer Settle Latency</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              180ms
            </span>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
              spring
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">GPU transform compositor</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Team Collaborators</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              64
            </span>
            <span className="text-xs font-mono text-slate-500">
              3 active now
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across 3 synchronized workspaces</p>
        </div>
      </div>

      {/* 2-Column Split: Interactive Tasks + Architecture Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Checklist */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Sprint Navigation Tasks
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {activityTasks.filter((t) => t.done).length} / {activityTasks.length} Completed
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {activityTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    task.done
                      ? 'bg-slate-50 dark:bg-slate-850/50 border-slate-200/60 dark:border-slate-800'
                      : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="mt-0.5 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-medium transition-all ${
                        task.done
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span>{task.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>Click any item to toggle sprint status</span>
            <button
              onClick={() => {
                setActivityTasks((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    title: `Interactive drawer test #${prev.length + 1}`,
                    author: 'Elena Rostova',
                    time: 'Just now',
                    done: false,
                  },
                ]);
              }}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Add Item
            </button>
          </div>
        </div>

        {/* Feature Highlights of this Drawer */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Drawer Architecture Features
          </h2>

          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                01
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                  Multi-State Desktop Sidebar
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Seamless transition between 264px full tree view with accordion submenus and 74px rail view with hover poppers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                02
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                  Touch Swipe & Gesture Physics
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Natural drag-to-dismiss on touchscreens with touch translation and spring snapback.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                03
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                  Zero-Pill Accessibility & Clean Badging
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Zero static pill enclosures, tabular counters, keyboard navigation shortcuts (<kbd className="font-mono text-[10px]">⌘K</kbd>, <kbd className="font-mono text-[10px]">[</kbd>, <kbd className="font-mono text-[10px]">ESC</kbd>).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                04
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                  Dual-Theme Tailwind v4 Standard
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Equipped with <code className="text-[10px] font-mono">@custom-variant dark</code>, ensuring 100% split-brain-free light and dark contrast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
