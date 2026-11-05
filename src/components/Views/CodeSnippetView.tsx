import React, { useState } from 'react';
import {
  Copy,
  Check,
  Terminal,
  FileCode,
  Smartphone,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CapacitorNativeService } from '../../services/capacitorNative';

export const CodeSnippetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'android' | 'plugins' | 'react'>('android');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const isNative = CapacitorNativeService.isNative();
  const platform = CapacitorNativeService.getPlatform();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const androidBuildCommands = `# 1. Build the production React PWA assets
npm run build

# 2. Sync web assets and plugins to the native Android project
npm run cap:sync

# 3. Build Android APK (Debug for testing)
cd android && ./gradlew assembleDebug

# 4. Build Android Release APK (Direct installation)
cd android && ./gradlew assembleRelease

# 5. Build Android App Bundle (AAB for Google Play Console)
cd android && ./gradlew bundleRelease

# 6. Open project directly in Android Studio
npm run android`;

  const capacitorConfigCode = `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.omnidrawer.app',
  appName: 'OmniDrawer',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#0f172a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f172a',
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
  },
};

export default config;`;

  const pluginsCode = `import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';

// 1. Native Hardware Back Button (Drawer Intercept)
App.addListener('backButton', ({ canGoBack }) => {
  if (isDrawerOpen) {
    closeDrawer();
  } else if (canGoBack) {
    window.history.back();
  } else {
    App.exitApp();
  }
});

// 2. Dynamic Status Bar Styling
await StatusBar.setStyle({ style: Style.Dark });
await StatusBar.setBackgroundColor({ color: '#0f172a' });

// 3. Network Monitoring
Network.addListener('networkStatusChange', (status) => {
  console.log('Network connected:', status.connected);
});

// 4. Cross-Platform Persistent Preferences
await Preferences.set({ key: 'theme', value: 'dark' });`;

  return (
    <div className="space-y-6 max-w-4xl pb-20 lg:pb-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
          <span>Capacitor Android Native</span>
          <span aria-hidden="true">·</span>
          <span>Build & Architecture Specs</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Native Android Integration Guide</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete Capacitor configuration, Gradle build commands for APK/AAB, and native plugin lifecycles.
        </p>

        {/* Runtime Status Pill */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="text-slate-500">Current Runtime:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-semibold border border-indigo-200 dark:border-indigo-800">
            {isNative ? `Native Android (${platform})` : 'Web Browser / PWA (Capacitor Ready)'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('android')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'android'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Android Build & APK / AAB
        </button>
        <button
          onClick={() => setActiveTab('plugins')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'plugins'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Native Plugins Config
        </button>
        <button
          onClick={() => setActiveTab('react')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'react'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Capacitor Config (capacitor.config.ts)
        </button>
      </div>

      {/* Tab 1: Android Build */}
      {activeTab === 'android' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl text-slate-200">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-medium text-slate-300">
                  Terminal Commands (APK & AAB Generation)
                </span>
              </div>
              <button
                onClick={() => handleCopy(androidBuildCommands, 'cmds')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copiedIndex === 'cmds' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-emerald-400">
              <code>{androidBuildCommands}</code>
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-indigo-500" />
                <span>Direct APK Installation</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Run <code className="font-mono text-indigo-500">./gradlew assembleRelease</code> inside the <code className="font-mono">android/</code> directory to generate <code className="font-mono">app-release-unsigned.apk</code> in <code className="font-mono">android/app/build/outputs/apk/release/</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Google Play Store (AAB)</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Run <code className="font-mono text-indigo-500">./gradlew bundleRelease</code> to generate an optimized Android App Bundle (<code className="font-mono">.aab</code>) ready for upload to Google Play Console.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Plugins Code */}
      {activeTab === 'plugins' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl text-slate-200">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-medium text-slate-300">
                src/services/capacitorNative.ts
              </span>
            </div>
            <button
              onClick={() => handleCopy(pluginsCode, 'plugins')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copiedIndex === 'plugins' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-300">
            <code>{pluginsCode}</code>
          </pre>
        </div>
      )}

      {/* Tab 3: Capacitor Config */}
      {activeTab === 'react' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl text-slate-200">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-medium text-slate-300">
                capacitor.config.ts
              </span>
            </div>
            <button
              onClick={() => handleCopy(capacitorConfigCode, 'config')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copiedIndex === 'config' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-300">
            <code>{capacitorConfigCode}</code>
          </pre>
        </div>
      )}

      {/* Installed Capacitor Packages Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          Installed Capacitor Native Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@capacitor/core</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Runtime bridge between Web & Android</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@capacitor/android</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Native Android platform & Gradle project</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@capacitor/app</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Hardware back button & app lifecycle</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@capacitor/status-bar</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Dynamic status bar theming & color</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@capacitor/splash-screen</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Smooth splash fade out on React ready</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@capacitor/network</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Real-time connection listener & offline mode</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
