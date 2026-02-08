// ============================================================================
// CookiePass Background Service Worker — Entry Point
// ============================================================================

import { handleMessage } from './messages';
import { setupHeartbeat, handleHeartbeat } from './heartbeat';

// --- Install / Update ---

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('CookiePass installed');
    // Open onboarding tab on first install
    chrome.tabs.create({
      url: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
    });
  } else if (details.reason === 'update') {
    console.log(`CookiePass updated to ${chrome.runtime.getManifest().version}`);
  }

  // Setup heartbeat alarm
  setupHeartbeat();
});

// --- Message Handling ---

chrome.runtime.onMessage.addListener(handleMessage);

// --- Alarm Handling ---

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cookiepass-heartbeat') {
    handleHeartbeat();
  }
});

// --- Action Click (popup fallback) ---

chrome.action.onClicked.addListener((_tab) => {
  // This only fires if default_popup is not set
  // Since we have a popup, this is a fallback
});

// --- Log startup ---
console.log('CookiePass service worker started');
