import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Layers,
  Sparkles,
  Sliders,
  ChevronRight,
  GripHorizontal,
} from 'lucide-react';
import {
  NavItemType,
  NavSection,
  Workspace,
  DrawerPosition,
  DrawerVariant,
  MobileVariant,
} from '../../types/navigation';
import { WorkspaceSelector } from './WorkspaceSelector';
import { NavItem } from './NavItem';
import { UserProfileCard } from './UserProfileCard';

interface NavigationDrawerProps {
  sections: NavSection[];
  activeId: string;
  activeSubId?: string;
  onSelectRoute: (id: string) => void;
  onSelectSubRoute?: (parentId: string, subId: string) => void;
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  onSelectWorkspace: (workspace: Workspace) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isRail: boolean;
  onToggleRail: () => void;
  position: DrawerPosition;
  variant: DrawerVariant;
  mobileVariant: MobileVariant;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSettings?: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  sections,
  activeId,
  activeSubId,
  onSelectRoute,
  onSelectSubRoute,
  workspaces,
  currentWorkspace,
  onSelectWorkspace,
  isOpenMobile,
  onCloseMobile,
  isRail,
  onToggleRail,
  position,
  variant,
  mobileVariant,
  theme,
  onToggleTheme,
  onOpenSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Touch Swipe Gesture State for Mobile Drawer Dismissal
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchTranslate, setTouchTranslate] = useState<number>(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.subItems?.some((sub) => sub.label.toLowerCase().includes(q))
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [sections, searchQuery]);

  // Handle touch events for gesture swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchTranslate(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    if (mobileVariant === 'bottom-sheet') {
      // Swiping down to close
      if (deltaY > 0) {
        setTouchTranslate(deltaY);
      }
    } else {
      // Side drawer swipe
      if (position === 'left' && deltaX < 0) {
        setTouchTranslate(deltaX);
      } else if (position === 'right' && deltaX > 0) {
        setTouchTranslate(deltaX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (mobileVariant === 'bottom-sheet') {
      if (touchTranslate > 100) {
        onCloseMobile();
      }
    } else {
      if (Math.abs(touchTranslate) > 80) {
        onCloseMobile();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchTranslate(0);
  };

  // Drawer Width classes
  const desktopWidthClass = isRail ? 'w-[74px]' : 'w-[264px]';

  // Desktop Inset/Floating vs Docked styling
  const desktopContainerStyle =
    variant === 'floating'
      ? 'my-3 mx-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl'
      : position === 'left'
      ? 'border-r border-slate-200 dark:border-slate-800'
      : 'border-l border-slate-200 dark:border-slate-800';

  // Content of the drawer shared between mobile and desktop
  const renderDrawerBody = (isMobileView = false) => (
    <div className="flex flex-col h-full select-none">
      {/* Drawer Top Header: Brand + Workspace */}
      <div className="shrink-0 border-b border-slate-100 dark:border-slate-800/80">
        <div
          className={`flex items-center ${
            isRail && !isMobileView ? 'justify-center p-3' : 'justify-between px-4 py-3.5'
          }`}
        >
          {(!isRail || isMobileView) ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-sm shrink-0">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white truncate">
                  OmniDrawer
                </h1>
                <p className="text-[10px] text-slate-400 font-medium">Design System</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-sm">
              <Layers className="w-4.5 h-4.5" />
            </div>
          )}

          {/* Desktop Rail Toggle Button */}
          {!isMobileView ? (
            <button
              onClick={onToggleRail}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              title={isRail ? 'Expand drawer ( [ )' : 'Collapse drawer to rail ( [ )'}
              aria-label="Toggle drawer rail mode"
            >
              {position === 'left' ? (
                isRail ? (
                  <PanelLeftOpen className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )
              ) : isRail ? (
                <PanelRightOpen className="w-4 h-4" />
              ) : (
                <PanelRightClose className="w-4 h-4" />
              )}
            </button>
          ) : (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              aria-label="Close navigation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Workspace Switcher */}
        <WorkspaceSelector
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
          onSelectWorkspace={onSelectWorkspace}
          isRail={isRail && !isMobileView}
        />
      </div>

      {/* Quick Search Bar (when expanded or on mobile) */}
      {(!isRail || isMobileView) && (
        <div className="px-3 pt-2.5 pb-1 shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search views..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-100/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-lg border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-[9px] font-mono text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      )}

      {/* Navigation Sections & Items */}
      <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
        {filteredSections.map((section, idx) => (
          <div key={section.title || idx} className="space-y-0.5">
            {(!isRail || isMobileView) && (
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                activeSubId={activeSubId}
                isRail={isRail && !isMobileView}
                onSelect={(id) => {
                  onSelectRoute(id);
                  if (isMobileView) onCloseMobile();
                }}
                onSelectSub={(parentId, subId) => {
                  if (onSelectSubRoute) onSelectSubRoute(parentId, subId);
                  if (isMobileView) onCloseMobile();
                }}
              />
            ))}
          </div>
        ))}

        {filteredSections.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
            No matches for "{searchQuery}"
          </div>
        )}
      </div>

      {/* User Profile & Footer Area */}
      <div className="shrink-0 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
        <UserProfileCard
          isRail={isRail && !isMobileView}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenSettings={onOpenSettings}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP DRAWER (hidden on mobile, visible lg and up) */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 ${desktopWidthClass} ${desktopContainerStyle} bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out relative z-30`}
      >
        {renderDrawerBody(false)}
      </aside>

      {/* MOBILE BACKDROP & DRAWER */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop blur overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Bottom Sheet Variant */}
          {mobileVariant === 'bottom-sheet' ? (
            <div
              ref={drawerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateY(${Math.max(0, touchTranslate)}px)`,
                transition: touchTranslate === 0 ? 'transform 0.2s ease-out' : 'none',
              }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] h-[580px] bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-slate-200 dark:border-slate-800"
            >
              {/* Drag Handle Bar */}
              <div className="w-full flex justify-center py-2.5 shrink-0 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
              </div>
              <div className="flex-1 overflow-hidden">
                {renderDrawerBody(true)}
              </div>
            </div>
          ) : (
            /* Side Drawer Variant (Left or Right) */
            <div
              ref={drawerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(${touchTranslate}px)`,
                transition: touchTranslate === 0 ? 'transform 0.25s ease-out' : 'none',
              }}
              className={`fixed top-0 bottom-0 ${
                position === 'left' ? 'left-0 animate-in slide-in-from-left' : 'right-0 animate-in slide-in-from-right'
              } w-[280px] max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col duration-300 border-${
                position === 'left' ? 'r' : 'l'
              } border-slate-200 dark:border-slate-800`}
            >
              {renderDrawerBody(true)}
            </div>
          )}
        </div>
      )}
    </>
  );
};
