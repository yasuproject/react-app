import React from 'react';
import {
  CheckSquare,
  Users,
  FileText,
  Blocks,
  Image,
  History,
  ExternalLink,
  Plus,
} from 'lucide-react';

interface GenericViewProps {
  viewId: string;
}

const VIEW_METADATA: Record<
  string,
  { title: string; subtitle: string; icon: React.FC<{ className?: string }>; items: string[] }
> = {
  tasks: {
    title: 'Tasks & Sprints',
    subtitle: 'Manage active engineering backlog and agile sprint cycles.',
    icon: CheckSquare,
    items: [
      'Implement touch gesture physics for responsive drawer dismiss',
      'Benchmark WCAG AA color contrast on dark mode drawer surfaces',
      'Unify rail popover focus traps with screen reader aria attributes',
      'Optimize CSS transition GPU compositing on low-end mobile viewports',
    ],
  },
  customers: {
    title: 'Customers & CRM',
    subtitle: 'Unified enterprise customer and team contact directory.',
    icon: Users,
    items: [
      'Acme Industrial Corp · Enterprise Tier (1,200 seats)',
      'NextGen Logistics · Pro Team (450 seats)',
      'Design Collective Europe · Studio Plan (85 seats)',
      'AeroTech Systems · Defense & Aerospace (3,400 seats)',
    ],
  },
  documents: {
    title: 'Documentation & Architecture',
    subtitle: 'System manuals, navigation design guidelines, and design tokens.',
    icon: FileText,
    items: [
      'Navigation Drawer Human Interface Guidelines (v3.2)',
      'Thumb-Zone Reachability & 44px Touch Targets',
      'Keyboard Shortcut Convention (⌘K, [, Esc, Tab)',
      'Tailwind CSS v4 Dark Mode Variant Synchronization',
    ],
  },
  integrations: {
    title: 'Integrations & Plugins',
    subtitle: 'Connected third-party tools and webhook subscriptions.',
    icon: Blocks,
    items: [
      'Figma Token Sync · Active & Synced 12m ago',
      'GitHub Actions CI · Build pipeline passing',
      'Slack Notification Webhook · Alerts enabled',
      'Linear Issue Tracker · Bi-directional synchronization',
    ],
  },
  media: {
    title: 'Asset Library',
    subtitle: 'High-resolution images, brand vectors, and icons.',
    icon: Image,
    items: [
      'Elena Rostova Avatar (1:1 High-Res Portrait)',
      'OmniDrawer Vector Wordmark (SVG)',
      'Navigation Wireframe Blueprint (PNG)',
      'Design System Icon Sprite Pack (Lucide Icons)',
    ],
  },
  activity: {
    title: 'Audit & Activity Log',
    subtitle: 'Tamper-evident activity trail for workspace security.',
    icon: History,
    items: [
      'Elena Rostova updated workspace drawer position to Left Docked (14m ago)',
      'Marcus Vance toggled dark theme mode (48m ago)',
      'Automated build verified 0 lint errors (2h ago)',
      'Elena Rostova created project "Mobile App v3.4" (1d ago)',
    ],
  },
};

export const GenericView: React.FC<GenericViewProps> = ({ viewId }) => {
  const meta = VIEW_METADATA[viewId] || {
    title: 'Workspace View',
    subtitle: 'Custom workspace view configured for OmniDrawer.',
    icon: FileText,
    items: ['Resource entry #1', 'Resource entry #2', 'Resource entry #3'],
  };

  const Icon = meta.icon;

  return (
    <div className="space-y-6 max-w-4xl pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
            <span>Workspace</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{viewId}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>{meta.title}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {meta.subtitle}
          </p>
        </div>

        <button
          onClick={() => alert(`Created new item in ${meta.title}`)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800/80">
        {meta.items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-850/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[11px] font-semibold flex items-center justify-center shrink-0">
                0{idx + 1}
              </span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                {item}
              </p>
            </div>
            <button
              onClick={() => alert(`Viewing details for: ${item}`)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
