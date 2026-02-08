// ============================================================================
// CookiePass Background Service Worker — Message Handlers
// ============================================================================

import type { ExtensionMessage, ExtensionResponse, CookieData, TabInfo } from '@/types';
import { getActiveTab, getCookiesForUrl, setCookies, openTab } from './cookies';

/**
 * Handle messages from popup or content scripts.
 */
export function handleMessage(
  message: ExtensionMessage,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: ExtensionResponse) => void
): boolean {
  // Return true to indicate async response
  handleAsync(message).then(sendResponse).catch((error) => {
    sendResponse({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  });
  return true;
}

async function handleAsync(message: ExtensionMessage): Promise<ExtensionResponse> {
  switch (message.type) {
    case 'GET_TAB_INFO':
      return handleGetTabInfo();

    case 'GET_COOKIES':
      return handleGetCookies(message.payload as { url: string } | undefined);

    case 'SET_COOKIES':
      return handleSetCookies(message.payload as { cookies: CookieData[]; domain: string });

    case 'OPEN_TAB':
      return handleOpenTab(message.payload as { url: string });

    case 'GET_LOCAL_STORAGE':
      return handleGetLocalStorage();

    case 'GET_SESSION_STORAGE':
      return handleGetSessionStorage();

    case 'SET_LOCAL_STORAGE':
      return handleSetLocalStorage(message.payload as { data: Record<string, string> });

    case 'SET_SESSION_STORAGE':
      return handleSetSessionStorage(message.payload as { data: Record<string, string> });

    default:
      return { success: false, error: `Unknown message type: ${message.type}` };
  }
}

async function handleGetTabInfo(): Promise<ExtensionResponse<TabInfo>> {
  const tab = await getActiveTab();
  if (!tab) {
    return { success: false, error: 'No active tab found' };
  }
  return { success: true, data: tab };
}

async function handleGetCookies(
  payload?: { url: string }
): Promise<ExtensionResponse<CookieData[]>> {
  let url: string;

  if (payload?.url) {
    url = payload.url;
  } else {
    const tab = await getActiveTab();
    if (!tab?.url) {
      return { success: false, error: 'No active tab found' };
    }
    url = tab.url;
  }

  try {
    const cookies = await getCookiesForUrl(url);
    return { success: true, data: cookies };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get cookies',
    };
  }
}

async function handleSetCookies(
  payload: { cookies: CookieData[]; domain: string }
): Promise<ExtensionResponse<{ success: number; failed: number; errors: string[] }>> {
  if (!payload?.cookies?.length) {
    return { success: false, error: 'No cookies provided' };
  }

  const result = await setCookies(payload.cookies, payload.domain);
  return { success: true, data: result };
}

async function handleOpenTab(
  payload: { url: string }
): Promise<ExtensionResponse> {
  if (!payload?.url) {
    return { success: false, error: 'No URL provided' };
  }

  await openTab(payload.url);
  return { success: true };
}

async function handleGetLocalStorage(): Promise<ExtensionResponse<Record<string, string>>> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return { success: false, error: 'No active tab' };

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const data: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) data[key] = localStorage.getItem(key) || '';
        }
        return data;
      },
    });

    return { success: true, data: results[0]?.result || {} };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get localStorage',
    };
  }
}

async function handleGetSessionStorage(): Promise<ExtensionResponse<Record<string, string>>> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return { success: false, error: 'No active tab' };

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const data: Record<string, string> = {};
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key) data[key] = sessionStorage.getItem(key) || '';
        }
        return data;
      },
    });

    return { success: true, data: results[0]?.result || {} };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get sessionStorage',
    };
  }
}

async function handleSetLocalStorage(
  payload: { data: Record<string, string> }
): Promise<ExtensionResponse> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return { success: false, error: 'No active tab' };

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (data: Record<string, string>) => {
        for (const [key, value] of Object.entries(data)) {
          localStorage.setItem(key, value);
        }
      },
      args: [payload.data],
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to set localStorage',
    };
  }
}

async function handleSetSessionStorage(
  payload: { data: Record<string, string> }
): Promise<ExtensionResponse> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return { success: false, error: 'No active tab' };

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (data: Record<string, string>) => {
        for (const [key, value] of Object.entries(data)) {
          sessionStorage.setItem(key, value);
        }
      },
      args: [payload.data],
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to set sessionStorage',
    };
  }
}
