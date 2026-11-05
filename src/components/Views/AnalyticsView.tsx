import React, { useState } from 'react';
import { BarChart3, TrendingUp, ArrowUpRight, Calendar, Download, RefreshCw } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [metricPeriod, setMetricPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const chartData = [
    { label: 'Mon', desktop: 42, mobile: 68 },
    { label: 'Tue', desktop: 55, mobile: 79 },
    { label: 'Wed', desktop: 63, mobile: 94 },
    { label: 'Thu', desktop: 58, mobile: 88 },
    { label: 'Fri', desktop: 72, mobile: 110 },
    { label: 'Sat', desktop: 48, mobile: 85 },
    { label: 'Sun', desktop: 39, mobile: 72 },
  ];

  const maxVal = 120;

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
            <span>Drawer Engagement</span>
            <span aria-hidden="true">·</span>
            <span>Viewport Analytics</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Navigation Analytics & Telemetry
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time viewport distribution, rail toggle rates, and gesture dismiss metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setMetricPeriod(period)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                  metricPeriod === period
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting CSV analytics data...')}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
            title="Download CSV report"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Drawer Open Frequency by Viewport
            </h2>
            <p className="text-xs text-slate-400">Mobile Touch Gesture vs Desktop Sidebar</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">Mobile Drawer (Swipe & Tab)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-700 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">Desktop Rail / Expand</span>
            </div>
          </div>
        </div>

        {/* Custom Clean SVG Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 dark:border-slate-800">
          {chartData.map((d) => {
            const mobileHeight = (d.mobile / maxVal) * 100;
            const desktopHeight = (d.desktop / maxVal) * 100;
            return (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[36px] flex items-end gap-1.5 h-full">
                  <div
                    style={{ height: `${desktopHeight}%` }}
                    className="flex-1 bg-slate-200 dark:bg-slate-750 rounded-t-md transition-all duration-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-700"
                    title={`Desktop: ${d.desktop}`}
                  />
                  <div
                    style={{ height: `${mobileHeight}%` }}
                    className="flex-1 bg-indigo-600 rounded-t-md transition-all duration-300 group-hover:bg-indigo-500 shadow-xs"
                    title={`Mobile: ${d.mobile}`}
                  />
                </div>
                <span className="text-xs font-mono text-slate-400 mt-2">{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Average Drawer Dwell Time</p>
          <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            2.4s
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 inline-block">
            -0.8s (Rapid reach)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Swipe Dismiss Rate</p>
          <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            91.4%
          </p>
          <span className="text-xs text-slate-400 mt-1 inline-block">
            Natural touch gesture
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Keyboard Shortcut Usage</p>
          <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            38.2%
          </p>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1 inline-block">
            High power-user affinity
          </span>
        </div>
      </div>
    </div>
  );
};
