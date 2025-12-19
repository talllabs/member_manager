(function () {
  const cfg = window.PaywallConfig;
  if (!cfg) return;

  if (!window.location.pathname.includes(cfg.pagePath)) return;

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "https://member-manager-lyart.vercel.app/styles.css";
  document.head.appendChild(style);

  const authScript = document.createElement("script");
  authScript.src = "https://member-manager-lyart.vercel.app/auth.js";
  document.head.appendChild(authScript);
})();
