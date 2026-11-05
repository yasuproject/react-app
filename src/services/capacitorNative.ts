import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';

export interface NativeNetworkStatus {
  connected: boolean;
  connectionType: string;
}

export class CapacitorNativeService {
  private static isInitialized = false;
  private static backButtonHandlers: Array<() => boolean> = [];

  public static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  public static getPlatform(): string {
    return Capacitor.getPlatform();
  }

  /**
   * Initializes Capacitor native listeners (StatusBar, SplashScreen, App, Keyboard)
   */
  public static async initialize(theme: 'light' | 'dark' = 'light') {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (!this.isNative()) {
      return;
    }

    try {
      // 1. Hide Splash Screen after React has rendered
      await SplashScreen.hide({
        fadeOutDuration: 350,
      });
    } catch (e) {
      console.warn('[Capacitor] SplashScreen.hide failed:', e);
    }

    try {
      // 2. Configure Status Bar
      await this.updateStatusBar(theme);
    } catch (e) {
      console.warn('[Capacitor] StatusBar setup failed:', e);
    }

    try {
      // 3. Android Hardware Back Button Listener
      App.addListener('backButton', ({ canGoBack }) => {
        // Execute handlers in LIFO order (most recent modal/drawer first)
        for (let i = this.backButtonHandlers.length - 1; i >= 0; i--) {
          const handled = this.backButtonHandlers[i]();
          if (handled) {
            return;
          }
        }

        if (canGoBack) {
          window.history.back();
        } else {
          // If on root screen and no modal is open, exit app
          App.exitApp();
        }
      });
    } catch (e) {
      console.warn('[Capacitor] App.backButton listener failed:', e);
    }

    try {
      // 4. Keyboard handling
      Keyboard.addListener('keyboardWillShow', (info) => {
        document.body.classList.add('keyboard-open');
      });
      Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-open');
      });
    } catch (e) {
      console.warn('[Capacitor] Keyboard listener setup failed:', e);
    }
  }

  /**
   * Dynamically update status bar color & icon style based on app theme
   */
  public static async updateStatusBar(theme: 'light' | 'dark') {
    if (!this.isNative()) return;
    try {
      if (theme === 'dark') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#0f172a' });
      } else {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });
      }
    } catch (e) {
      console.warn('[Capacitor] updateStatusBar error:', e);
    }
  }

  /**
   * Register a hardware back button interceptor.
   * If the handler returns true, the event is considered consumed.
   * Returns an unregister function.
   */
  public static registerBackButtonHandler(handler: () => boolean): () => void {
    this.backButtonHandlers.push(handler);
    return () => {
      this.backButtonHandlers = this.backButtonHandlers.filter((h) => h !== handler);
    };
  }

  /**
   * Get current network status
   */
  public static async getNetworkStatus(): Promise<NativeNetworkStatus> {
    if (!this.isNative()) {
      return {
        connected: typeof navigator !== 'undefined' ? navigator.onLine : true,
        connectionType: 'browser',
      };
    }
    try {
      const status = await Network.getStatus();
      return {
        connected: status.connected,
        connectionType: status.connectionType,
      };
    } catch (e) {
      return {
        connected: typeof navigator !== 'undefined' ? navigator.onLine : true,
        connectionType: 'unknown',
      };
    }
  }

  /**
   * Listen to network connection changes
   */
  public static onNetworkChange(callback: (status: NativeNetworkStatus) => void): () => void {
    if (!this.isNative()) {
      const onOnline = () => callback({ connected: true, connectionType: 'browser' });
      const onOffline = () => callback({ connected: false, connectionType: 'browser' });
      window.addEventListener('online', onOnline);
      window.addEventListener('offline', onOffline);
      return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
      };
    }

    const handle = Network.addListener('networkStatusChange', (status) => {
      callback({
        connected: status.connected,
        connectionType: status.connectionType,
      });
    });

    return () => {
      handle.then((h) => h.remove());
    };
  }

  /**
   * Cross-platform preference storage (Capacitor Preferences with localStorage fallback)
   */
  public static async getPreference<T>(key: string, defaultValue: T): Promise<T> {
    try {
      if (this.isNative()) {
        const { value } = await Preferences.get({ key });
        return value !== null ? (JSON.parse(value) as T) : defaultValue;
      } else {
        const value = localStorage.getItem(key);
        return value !== null ? (JSON.parse(value) as T) : defaultValue;
      }
    } catch {
      return defaultValue;
    }
  }

  public static async setPreference<T>(key: string, value: T): Promise<void> {
    const stringified = JSON.stringify(value);
    try {
      if (this.isNative()) {
        await Preferences.set({ key, value: stringified });
      } else {
        localStorage.setItem(key, stringified);
      }
    } catch (e) {
      console.warn('[Capacitor] setPreference failed:', e);
    }
  }
}
