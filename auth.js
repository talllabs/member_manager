(function () {
  const cfg = window.PaywallConfig;
  if (!cfg) return;
  if (window.location.pathname !== cfg.pagePath) return;

  const { accessKey, expiryKey } = cfg.access;

  const lockedEls = document.querySelectorAll('[data-paywall="locked"]');

  const exp = parseInt(localStorage.getItem(expiryKey), 10);
  const hasAccess =
    localStorage.getItem(accessKey) === "true" &&
    exp &&
    Date.now() < exp;

  if (!hasAccess) {
    lockedEls.forEach(el => (el.style.display = "none"));
  }
})();
