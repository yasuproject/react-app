import React, { useState } from 'react';
import { WifiOff, Download, Sparkles, Smartphone, CheckCircle, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { NativeNetworkStatus } from '../../services/capacitorNative';

interface NativeStatusBannerProps {
  networkStatus: NativeNetworkStatus;
}

export const NativeStatusBanner: React.FC<NativeStatusBannerProps> = ({ networkStatus }) => {
  const { isInstallable, isInstalled, isIOS, isNative, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  return (
    <>
      {/* Offline Alert Bar */}
      {!networkStatus.connected && (
        <div className="bg-amber-600 text-white px-3 py-1.5 text-xs font-medium flex items-center justify-between shrink-0 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Mode · Cached data is active</span>
          </div>
          <span className="text-[10px] font-mono opacity-80">Reconnecting...</span>
        </div>
      )}

      {/* iOS Install Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-500" />
                <span>Install on iOS</span>
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              1. Tap the <strong className="text-slate-900 dark:text-white">Share</strong> button in the Safari toolbar.<br />
              2. Scroll down and tap <strong className="text-slate-900 dark:text-white">Add to Home Screen</strong>.<br />
              3. Open OmniDrawer directly like a native app.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
