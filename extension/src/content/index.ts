// ============================================================================
// CookiePass Content Script
// ============================================================================
// Injected into pages for localStorage/sessionStorage access.
// Communicates with the background service worker via messages.
// ============================================================================

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'CONTENT_GET_LOCAL_STORAGE') {
    try {
      const data: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          data[key] = localStorage.getItem(key) || '';
        }
      }
      sendResponse({ success: true, data });
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to read localStorage',
      });
    }
    return true;
  }

  if (message.type === 'CONTENT_SET_LOCAL_STORAGE') {
    try {
      const entries = message.payload?.data as Record<string, string>;
      if (entries) {
        for (const [key, value] of Object.entries(entries)) {
          localStorage.setItem(key, value);
        }
      }
      sendResponse({ success: true });
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to set localStorage',
      });
    }
    return true;
  }

  if (message.type === 'CONTENT_GET_SESSION_STORAGE') {
    try {
      const data: Record<string, string> = {};
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
          data[key] = sessionStorage.getItem(key) || '';
        }
      }
      sendResponse({ success: true, data });
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to read sessionStorage',
      });
    }
    return true;
  }

  if (message.type === 'CONTENT_SET_SESSION_STORAGE') {
    try {
      const entries = message.payload?.data as Record<string, string>;
      if (entries) {
        for (const [key, value] of Object.entries(entries)) {
          sessionStorage.setItem(key, value);
        }
      }
      sendResponse({ success: true });
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to set sessionStorage',
      });
    }
    return true;
  }

  return false;
});

// Signal that content script is loaded
console.debug('CookiePass content script loaded');
