/**
 * Analythic Tracker v2.0 (Production-Ready)
 * Features: Deduplication, Command Queue, SPA Support
 * 
 * Installation:
 * <script src="https://your-domain.com/tracker.js" data-key="YOUR_WRITE_KEY"></script>
 */

(function() {
  'use strict';
  
  // ============================================
  // 1. COMMAND QUEUE PATTERN
  // ============================================
  // Handles calls to analythic.track() that happen BEFORE script loads
  // This prevents "analythic is not defined" errors
  
  var existingQueue = window.analythic || [];
  var queue = Array.isArray(existingQueue) ? existingQueue : [];
  
  // ============================================
  // 2. GET CONFIG
  // ============================================
  var script = document.currentScript;
  var API_URL = script.src.replace('/tracker.js', '/api/track');
  var WRITE_KEY = script.getAttribute('data-key');
  
  if (!WRITE_KEY) {
    console.error('[Analythic] Missing data-key attribute');
    return;
  }

  // ============================================
  // 3. HELPER FUNCTIONS
  // ============================================
  function getScreenSize() {
    return window.screen.width + 'x' + window.screen.height;
  }

  function getLanguage() {
    return navigator.language || 'en';
  }

  // Generate unique event ID for deduplication
  function generateEventId() {
    return WRITE_KEY + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // ============================================
  // 4. MAIN TRACKING FUNCTION
  // ============================================
  function track(eventName, properties) {
    var payload = {
      key: WRITE_KEY,
      name: eventName || 'pageview',
      url: window.location.pathname,
      referrer: document.referrer || undefined,
      screen: getScreenSize(),
      language: getLanguage(),
      eventId: generateEventId() // Prevents duplicates
    };

    // Merge additional properties
    if (properties && typeof properties === 'object') {
      for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
          payload[key] = properties[key];
        }
      }
    }

    // Use sendBeacon for reliability (works even when page unloads)
    if (navigator.sendBeacon) {
      var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(API_URL, blob);
    } else {
      // Fallback to fetch
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function(err) {
        if (console && console.error) {
          console.error('[Analythic] Track failed:', err);
        }
      });
    }
  }

  // ============================================
  // 5. PROCESS QUEUED EVENTS
  // ============================================
  // Handle events that were called before script loaded
  if (queue.length > 0) {
    queue.forEach(function(args) {
      if (Array.isArray(args) && args.length > 0) {
        track.apply(null, args);
      }
    });
  }

  // ============================================
  // 6. AUTO-TRACK PAGEVIEW
  // ============================================
  track('pageview');

  // ============================================
  // 7. SPA NAVIGATION TRACKING
  // ============================================
  var lastPath = window.location.pathname;
  
  function checkPathChange() {
    var currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      lastPath = currentPath;
      track('pageview');
    }
  }

  // Intercept history API calls
  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;

  history.pushState = function() {
    originalPushState.apply(this, arguments);
    checkPathChange();
  };

  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    checkPathChange();
  };

  // Listen for back/forward button
  window.addEventListener('popstate', checkPathChange);

  // ============================================
  // 8. EXPOSE GLOBAL API
  // ============================================
  window.analythic = { 
    track: track,
    version: '2.0.0'
  };

})();
