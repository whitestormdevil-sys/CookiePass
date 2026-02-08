import React, { useState, useEffect, useCallback } from 'react';
import type { MainTab, TabInfo, User, AppSettings } from '@/types';
import { getSettings } from '@/lib/storage';
import { getUser, isAuthenticated } from '@/lib/auth';
import Header from './components/Header';
import TabBar from './components/TabBar';
import ExportView from './components/ExportView';
import ImportView from './components/ImportView';
import ShareList from './components/ShareList';
import SettingsView from './components/SettingsView';
import AuthView from './components/AuthView';
import Onboarding from './components/Onboarding';
import ErrorBoundary from './components/ErrorBoundary';
import { isOnboardingComplete } from '@/lib/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('export');
  const [tabInfo, setTabInfo] = useState<TabInfo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const applyTheme = useCallback((themeSetting: 'light' | 'dark' | 'system') => {
    let isDark = false;

    if (themeSetting === 'dark') {
      isDark = true;
    } else if (themeSetting === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setTheme(isDark ? 'dark' : 'light');

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Initialize
  useEffect(() => {
    async function init() {
      try {
        // Load settings
        const s = await getSettings();
        setSettings(s);

        // Apply theme
        applyTheme(s.theme);

        // Set up system theme watcher
        if (s.theme === 'system') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemThemeChange = () => applyTheme('system');
          mediaQuery.addEventListener('change', handleSystemThemeChange);
          
          // Cleanup on unmount
          return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
        }

        // Check auth
        const authed = await isAuthenticated();
        if (authed) {
          const u = await getUser();
          setUser(u || null);
        }

        // Check onboarding
        const onboardingDone = await isOnboardingComplete();
        if (!onboardingDone && s.showOnboarding) {
          setShowOnboarding(true);
        }

        // Get current tab info
        chrome.runtime.sendMessage(
          { type: 'GET_TAB_INFO' },
          (response) => {
            if (response?.success) {
              setTabInfo(response.data);
            }
          }
        );
      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [applyTheme]);

  const handleSettingsChange = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
    applyTheme(newSettings.theme);
  }, [applyTheme]);

  const handleAuthComplete = useCallback((newUser: User) => {
    setUser(newUser);
    setShowAuth(false);
  }, []);

  if (loading) {
    return (
      <div className="w-[380px] h-[500px] flex items-center justify-center bg-white dark:bg-surface-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-surface-500">Loading CookiePass...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="w-[380px] h-[550px]">
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      </div>
    );
  }

  if (showAuth) {
    return (
      <div className="w-[380px] h-[550px]">
        <AuthView
          onComplete={handleAuthComplete}
          onClose={() => setShowAuth(false)}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
    <div className="w-[380px] h-[550px] flex flex-col bg-white dark:bg-surface-900">
      <Header
        tabInfo={tabInfo}
        user={user}
        onProfileClick={() => {
          if (user) {
            setActiveTab('settings');
          } else {
            setShowAuth(true);
          }
        }}
      />

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'export' && (
          <ExportView
            tabInfo={tabInfo}
            user={user}
            settings={settings}
            onNeedAuth={() => setShowAuth(true)}
          />
        )}
        {activeTab === 'import' && (
          <ImportView
            user={user}
            onNeedAuth={() => setShowAuth(true)}
          />
        )}
        {activeTab === 'shares' && (
          <ShareList
            user={user}
            onNeedAuth={() => setShowAuth(true)}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsView
            user={user}
            settings={settings!}
            onSettingsChange={handleSettingsChange}
            onLogout={() => {
              setUser(null);
              setActiveTab('export');
            }}
            onNeedAuth={() => setShowAuth(true)}
          />
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}
