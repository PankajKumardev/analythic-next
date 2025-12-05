// Analythic Tracker Script - Privacy-First Analytics
(function() {
  'use strict';

  // Get the script element and extract the data-key
  var script = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  
  var key = script.getAttribute('data-key');
  if (!key) {
    console.warn('[Analythic] Missing data-key attribute');
    return;
  }

  // API endpoint - adjust for production
  var endpoint = script.src.replace('/tracker.js', '/api/track');

  // Generate a unique event ID to prevent duplicates
  function generateEventId() {
    return key + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // Get screen size
  function getScreen() {
    return window.screen.width + 'x' + window.screen.height;
  }

  // Get referrer
  function getReferrer() {
    if (!document.referrer) return null;
    try {
      var url = new URL(document.referrer);
      // Don't track same-site referrers
      if (url.hostname === window.location.hostname) return null;
      return url.hostname;
    } catch (e) {
      return null;
    }
  }

  // Send tracking event
  function track(name, properties) {
    var data = {
      key: key,
      name: name || 'pageview',
      url: window.location.pathname,
      referrer: getReferrer(),
      screen: getScreen(),
      language: navigator.language || navigator.userLanguage,
      eventId: generateEventId()
    };

    if (properties) {
      data.properties = properties;
    }

    // Use sendBeacon if available (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, JSON.stringify(data));
    } else {
      // Fallback to fetch
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(function() {});
    }
  }

  // Track pageview on load
  track('pageview');

  // Track SPA navigation (History API)
  var originalPushState = history.pushState;
  if (originalPushState) {
    history.pushState = function() {
      originalPushState.apply(history, arguments);
      track('pageview');
    };
  }

  // Track popstate (back/forward navigation)
  window.addEventListener('popstate', function() {
    track('pageview');
  });

  // Expose track function globally for custom events
  window.analythic = {
    track: track
  };

  console.log('[Analythic] Tracker initialized');
})();
