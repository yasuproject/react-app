import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  CheckSquare,
  Users,
  FileText,
  Blocks,
  Image,
  Settings,
  Code2,
  History,
  ChevronDown,
  ChevronRight,
  Circle,
  LucideIcon,
} from 'lucide-react';
import { NavItemType, SubNavItem } from '../../types/navigation';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  CheckSquare,
  Users,
  FileText,
  Blocks,
  Image,
  Settings,
  Code2,
  History,
};

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  activeSubId?: string;
  isRail: boolean;
  onSelect: (id: string) => void;
  onSelectSub?: (parentId: string, subId: string) => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  activeSubId,
  isRail,
  onSelect,
  onSelectSub,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isActive);
  const [showRailFlyout, setShowRailFlyout] = useState<boolean>(false);

  const IconComponent = ICON_MAP[item.iconName] || LayoutDashboard;
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasSubItems) {
      setIsExpanded(!isExpanded);
    }
    onSelect(item.id);
  };

  // RAIL MODE VIEW
  if (isRail) {
    return (
      <div
        className="relative flex justify-center py-1 group"
        onMouseEnter={() => setShowRailFlyout(true)}
        onMouseLeave={() => setShowRailFlyout(false)}
      >
        <button
          onClick={() => onSelect(item.id)}
          className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            isActive
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
          }`}
          aria-label={item.label}
        >
          <IconComponent className="w-5 h-5 shrink-0" />
          {/* Subtle unboxed badge indicator if any */}
          {item.badge && !isActive && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
          )}
        </button>

        {/* Floating Tooltip / Flyout Menu */}
        {showRailFlyout && (
          <div className="absolute left-full top-0 ml-3 min-w-[200px] bg-slate-900 dark:bg-slate-900 text-white rounded-xl py-2 px-3 shadow-xl border border-slate-800 z-50 pointer-events-auto">
            <div className="flex items-center justify-between gap-3 pb-1 border-b border-slate-800/80">
              <span className="text-xs font-semibold whitespace-nowrap">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-mono tabular-nums text-indigo-400">
                  {item.badge}
                </span>
              )}
            </div>

            {hasSubItems && (
              <div className="pt-2 space-y-1">
                {item.subItems!.map((sub: SubNavItem) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSub && onSelectSub(item.id, sub.id)}
                    className={`w-full flex items-center justify-between py-1 px-1.5 text-xs rounded-md text-left transition-colors ${
                      activeSubId === sub.id
                        ? 'bg-indigo-600/40 text-indigo-200 font-medium'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className="text-[10px] font-mono tabular-nums text-slate-400">
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // EXPANDED MODE VIEW
  return (
    <div className="px-2 py-0.5">
      <button
        onClick={handleMainClick}
        className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
          isActive
            ? 'bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <IconComponent
            className={`w-4.5 h-4.5 shrink-0 transition-colors ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
            }`}
          />
          <span className="truncate whitespace-nowrap">{item.label}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {item.badge !== undefined && (
            <span
              className={`text-[11px] font-mono tabular-nums tracking-tight ${
                item.badgeType === 'accent'
                  ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {item.badge}
            </span>
          )}

          {item.shortcut && !hasSubItems && (
            <kbd className="hidden group-hover:inline-block px-1 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
              {item.shortcut}
            </kbd>
          )}

          {hasSubItems && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-transform"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </div>
      </button>

      {/* Accordion Nested Sub-items */}
      {hasSubItems && isExpanded && (
        <div className="ml-5 pl-3 mt-1 space-y-1 border-l border-slate-200 dark:border-slate-800">
          {item.subItems!.map((sub: SubNavItem) => {
            const isSubActive = activeSubId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSub && onSelectSub(item.id, sub.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-colors text-left ${
                  isSubActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="truncate">{sub.label}</span>
                {sub.count !== undefined && (
                  <span className="text-[10px] font-mono tabular-nums text-slate-400 dark:text-slate-500">
                    {sub.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
