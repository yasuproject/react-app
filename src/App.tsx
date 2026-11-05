import React, { useState, useEffect } from 'react';
import {
  NAV_SECTIONS,
  WORKSPACES,
  USER_PROFILE,
} from './data/navigationData';
import {
  DrawerPosition,
  DrawerVariant,
  MobileVariant,
  Workspace,
  ViewportMode,
} from './types/navigation';
import { NavigationDrawer } from './components/NavigationDrawer/NavigationDrawer';
import { MobileHeader } from './components/Navigation/MobileHeader';
import { MobileBottomBar } from './components/Navigation/MobileBottomBar';
import { DashboardView } from './components/Views/DashboardView';
import { AnalyticsView } from './components/Views/AnalyticsView';
import { ProjectsView } from './components/Views/ProjectsView';
import { SettingsView } from './components/Views/SettingsView';
import { CodeSnippetView } from './components/Views/CodeSnippetView';
import { GenericView } from './components/Views/GenericView';
import { NativeStatusBanner } from './components/Native/NativeStatusBanner';
import {
  CapacitorNativeService,
  NativeNetworkStatus,
} from './services/capacitorNative';
import {
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Sliders,
  Sparkles,
  Sun,
  Moon,
  Search,
  Bell,
  PanelLeft,
} from 'lucide-react';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<string>('dashboard');
  const [activeSubId, setActiveSubId] = useState<string>('proj-mobile');
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(WORKSPACES[0]);
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isRail, setIsRail] = useState<boolean>(false);
  const [position, setPosition] = useState<DrawerPosition>('left');
  const [variant, setVariant] = useState<DrawerVariant>('docked');
  const [mobileVariant, setMobileVariant] = useState<MobileVariant>('slide');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [networkStatus, setNetworkStatus] = useState<NativeNetworkStatus>({
    connected: true,
    connectionType: 'unknown',
  });

  // Initialize Capacitor Native Android features (Splash, StatusBar, Preferences)
  useEffect(() => {
    CapacitorNativeService.initialize(theme);

    // Initial network status
    CapacitorNativeService.getNetworkStatus().then(setNetworkStatus);
    const unbindNetwork = CapacitorNativeService.onNetworkChange(setNetworkStatus);

    // Load persisted preferences
    CapacitorNativeService.getPreference<'light' | 'dark'>('theme', 'light').then(setTheme);
    CapacitorNativeService.getPreference<DrawerPosition>('position', 'left').then(setPosition);
    CapacitorNativeService.getPreference<DrawerVariant>('variant', 'docked').then(setVariant);
    CapacitorNativeService.getPreference<MobileVariant>('mobileVariant', 'slide').then(setMobileVariant);

    return () => {
      unbindNetwork();
    };
  }, []);

  // Hardware Back Button listener (closes drawer, or navigates back to dashboard, or exits)
  useEffect(() => {
    const unbindBack = CapacitorNativeService.registerBackButtonHandler(() => {
      if (isOpenMobile) {
        setIsOpenMobile(false);
        return true; // consumed
      }
      if (activeRoute !== 'dashboard') {
        setActiveRoute('dashboard');
        return true; // consumed
      }
      return false; // let default native exit handle
    });

    return () => {
      unbindBack();
    };
  }, [isOpenMobile, activeRoute]);

  // Sync theme with <html> class and Capacitor Status Bar
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    CapacitorNativeService.updateStatusBar(theme);
    CapacitorNativeService.setPreference('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handlePositionChange = (pos: DrawerPosition) => {
    setPosition(pos);
    CapacitorNativeService.setPreference('position', pos);
  };

  const handleVariantChange = (v: DrawerVariant) => {
    setVariant(v);
    CapacitorNativeService.setPreference('variant', v);
  };

  const handleMobileVariantChange = (mv: MobileVariant) => {
    setMobileVariant(mv);
    CapacitorNativeService.setPreference('mobileVariant', mv);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Rail with '['
      if (e.key === '[' && !e.metaKey && !e.ctrlKey && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setIsRail((prev) => !prev);
      }
      // Close mobile drawer with Escape
      if (e.key === 'Escape' && isOpenMobile) {
        setIsOpenMobile(false);
      }
      // Quick route switching 1-7
      if (!e.metaKey && !e.ctrlKey && !(e.target instanceof HTMLInputElement)) {
        if (e.key === '1') setActiveRoute('dashboard');
        if (e.key === '2') setActiveRoute('analytics');
        if (e.key === '3') setActiveRoute('projects');
        if (e.key === '4') setActiveRoute('tasks');
        if (e.key === '5') setActiveRoute('customers');
        if (e.key === '6') setActiveRoute('documents');
        if (e.key === '7') setActiveRoute('integrations');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenMobile]);

  // View router
  const renderViewContent = () => {
    switch (activeRoute) {
      case 'dashboard':
        return (
          <DashboardView
            onOpenMobileDrawer={() => setIsOpenMobile(true)}
            isRail={isRail}
            onToggleRail={() => setIsRail(!isRail)}
            position={position}
            onChangePosition={handlePositionChange}
            variant={variant}
            onChangeVariant={handleVariantChange}
            mobileVariant={mobileVariant}
            onChangeMobileVariant={handleMobileVariantChange}
            onNavigateToCode={() => setActiveRoute('code-docs')}
          />
        );
      case 'analytics':
        return <AnalyticsView />;
      case 'projects':
        return (
          <ProjectsView
            activeSubId={activeSubId}
            onSelectSubProject={(id) => {
              setActiveSubId(id);
              setActiveRoute('projects');
            }}
          />
        );
      case 'settings':
        return (
          <SettingsView
            position={position}
            onChangePosition={handlePositionChange}
            variant={variant}
            onChangeVariant={handleVariantChange}
            mobileVariant={mobileVariant}
            onChangeMobileVariant={handleMobileVariantChange}
            isRail={isRail}
            onToggleRail={() => setIsRail(!isRail)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
      case 'code-docs':
        return <CodeSnippetView />;
      default:
        return <GenericView viewId={activeRoute} />;
    }
  };

  const getActiveTitle = () => {
    for (const section of NAV_SECTIONS) {
      const match = section.items.find((item) => item.id === activeRoute);
      if (match) return match.label;
    }
    return 'Dashboard';
  };

  // Viewport simulator container class
  const getViewportContainerClass = () => {
    if (viewportMode === 'mobile') {
      return 'max-w-[400px] h-[780px] my-6 mx-auto rounded-3xl shadow-2xl border-4 border-slate-800 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col';
    }
    if (viewportMode === 'tablet') {
      return 'max-w-[820px] h-[850px] my-6 mx-auto rounded-3xl shadow-2xl border-4 border-slate-800 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col';
    }
    return 'min-h-screen w-full flex flex-col';
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Device Viewport Switcher Toolbar */}
      <header className="h-11 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between text-xs sticky top-0 z-40 select-none shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>OmniDrawer Demo</span>
          </span>
          <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
            Desktop Rail + Mobile Gestures
          </span>
        </div>

        {/* Viewport Simulator Segmented Control */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setViewportMode('responsive')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              viewportMode === 'responsive'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Native responsive layout"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden md:inline">Full Responsive</span>
          </button>

          <button
            onClick={() => setViewportMode('tablet')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              viewportMode === 'tablet'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Simulate Tablet frame (768px)"
          >
            <Tablet className="w-3 h-3" />
            <span className="hidden md:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              viewportMode === 'mobile'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Simulate Mobile frame (375px)"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right Action Quick Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            )}
          </button>

          <button
            onClick={() => setActiveRoute('settings')}
            className="px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Config
          </button>
        </div>
      </header>

      {/* Offline Alert and Native PWA Status Banner */}
      <NativeStatusBanner networkStatus={networkStatus} />

      {/* Main Workspace Frame (Responsive or simulated frame) */}
      <div className={getViewportContainerClass()}>
        <div
          className={`flex-1 flex min-w-0 ${
            position === 'right' ? 'flex-row-reverse' : 'flex-row'
          } relative`}
        >
          {/* Navigation Drawer Component */}
          <NavigationDrawer
            sections={NAV_SECTIONS}
            activeId={activeRoute}
            activeSubId={activeSubId}
            onSelectRoute={(id) => {
              setActiveRoute(id);
              if (id === 'projects') setActiveSubId('proj-mobile');
            }}
            onSelectSubRoute={(parentId, subId) => {
              setActiveRoute(parentId);
              setActiveSubId(subId);
            }}
            workspaces={WORKSPACES}
            currentWorkspace={currentWorkspace}
            onSelectWorkspace={setCurrentWorkspace}
            isOpenMobile={isOpenMobile}
            onCloseMobile={() => setIsOpenMobile(false)}
            isRail={isRail}
            onToggleRail={() => setIsRail(!isRail)}
            position={position}
            variant={variant}
            mobileVariant={mobileVariant}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSettings={() => setActiveRoute('settings')}
          />

          {/* Central Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Mobile Header (active on mobile/tablet viewports) */}
            <MobileHeader
              activeTitle={getActiveTitle()}
              onOpenDrawer={() => setIsOpenMobile(true)}
              theme={theme}
              onToggleTheme={toggleTheme}
              position={position}
            />

            {/* Desktop Top Workspace Breadcrumb & Action Bar */}
            <div className="hidden lg:flex items-center justify-between h-14 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              {/* Breadcrumb Trail */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {currentWorkspace.name}
                </span>
                <span className="text-slate-300 dark:text-slate-700">/</span>
                <span className="font-semibold text-slate-900 dark:text-white capitalize">
                  {getActiveTitle()}
                </span>
                {activeRoute === 'projects' && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700">/</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                      {activeSubId}
                    </span>
                  </>
                )}
              </div>

              {/* Action Buttons Zone */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRail(!isRail)}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <PanelLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isRail ? 'Expand ( [ )' : 'Rail Mode ( [ )'}</span>
                </button>

                <button
                  onClick={() => setIsOpenMobile(true)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Test Mobile Drawer</span>
                </button>
              </div>
            </div>

            {/* Scrollable Main Viewport */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {renderViewContent()}
            </main>

            {/* Mobile Thumb Zone Bottom Bar */}
            <MobileBottomBar
              activeId={activeRoute}
              onSelectRoute={setActiveRoute}
              onOpenDrawer={() => setIsOpenMobile(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
